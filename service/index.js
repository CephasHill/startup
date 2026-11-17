const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const DB = require('./database.js');

// Application configuration.
const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;
const authCookieName = 'token';

// Middleware parses requests, manages cookies, and serves the React frontend.
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

// All backend API routes are grouped under /api.
const apiRouter = express.Router();
app.use('/api', apiRouter);

// Register a new user and immediately authenticate the new account.
apiRouter.post('/auth/create', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send({ msg: 'Email and password are required' });
    return;
  }

  if (await findUser('email', email)) {
    res.status(409).send({ msg: 'Existing user' });
    return;
  }

  const user = await createUser(email, password);
  setAuthCookie(res, user.token);
  res.send({ email: user.email });
});

// Authenticate an existing user with their email and password.
apiRouter.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await findUser('email', email);

  if (user && await bcrypt.compare(password || '', user.password)) {
    user.token = uuid.v4();
    await DB.updateUser(user);
    setAuthCookie(res, user.token);
    res.send({ email: user.email });
    return;
  }

  res.status(401).send({ msg: 'Unauthorized' });
});

// Invalidate the current token and remove the authentication cookie.
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    await DB.updateUserRemoveAuth(user.email);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Protected route used to verify that the current session is authenticated.
apiRouter.get('/auth/me', verifyAuth, (req, res) => {
  res.send({ email: req.user.email });
});

// Load the authenticated user's reading progress.
apiRouter.get('/progress', verifyAuth, (req, res) => {
  res.send(req.user.progress || {});
});

// Persist the authenticated user's reading progress.
apiRouter.put('/progress', verifyAuth, async (req, res) => {
  const progress = req.body || {};
  await DB.updateProgress(req.user.email, progress);
  res.send(progress);
});

// Proxy a random New Testament verse from the Bible API to the frontend.
apiRouter.get('/verse/random', async (_req, res) => {
  try {
    const response = await fetch('https://bible-api.com/data/web/random/NT');
    if (!response.ok) {
      res.status(502).send({ msg: 'Bible API request failed' });
      return;
    }

    const result = await response.json();
    const verse = result.random_verse;
    if (!verse || !verse.text) {
      res.status(502).send({ msg: 'Bible API returned an invalid verse' });
      return;
    }

    res.send({
      reference: `${verse.book} ${verse.chapter}:${verse.verse}`,
      text: verse.text.trim(),
      translation: result.translation.name,
    });
  } catch (error) {
    console.error('Unable to retrieve random Bible verse', error);
    res.status(502).send({ msg: 'Unable to retrieve random Bible verse' });
  }
});

// Middleware that allows a request through only when its session token is valid.
async function verifyAuth(req, res, next) {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    req.user = user;
    next();
    return;
  }

  res.status(401).send({ msg: 'Unauthorized' });
}

// Hash a password and create the user's initial session token.
async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await DB.addUser(user);
  return user;
}

// Find a user by a property such as email or authentication token.
async function findUser(field, value) {
  if (!value) {
    return null;
  }
  if (field === 'token') {
    return DB.getUserByToken(value);
  }
  return DB.getUser(value);
}

// Store the session token in a secure, HTTP-only cookie.
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
  });
}

// Start the HTTP service after confirming MongoDB is available.
DB.testConnection()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(`Unable to connect to MongoDB: ${error.message}`);
    process.exit(1);
  });
