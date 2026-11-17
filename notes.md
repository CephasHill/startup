# CS 260 Notes

This file records what I have learned while building NT Connect, my CS 260 startup project.

- [NT Connect](https://startup.peterhill.click)
- [Simon](https://simon.peterhill.click)
- [Startup repository](https://github.com/CephasHill/startup)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## Helpful commands

- Connect to the server: `ssh -i <key.pem> ubuntu@peterhill.click`
- Install frontend dependencies: `npm install`
- Start Vite: `npm run dev`
- Start the Express and MongoDB service: `npm run dev:service`
- Create a frontend production build: `npm run build`
- Deploy the application: `./deployService.sh -k <key.pem> -h <hostname> -s startup`

Vite normally serves the frontend on port `5173`. During development, Vite proxies `/api` requests to the Express service on port `4000`.

## AWS

- An EC2 instance hosts the startup application.
- A DNS domain points to the server and HTTPS makes the deployed application accessible over the internet.
- The deployed React build is served as static content from the Express service.
- The deployment script builds the React application, copies the backend files to the server, installs dependencies, and restarts the PM2 service.
- Keep private server keys and MongoDB credentials out of source control.

## HTML

- Semantic elements such as `header`, `nav`, `main`, `section`, and `footer` give the application clear structure.
- Forms need labels and meaningful field names for both accessibility and usability.
- Accessible controls include associated labels, checkbox labels, and descriptive button text.
- HTML progress elements communicate reading completion and work alongside React state.

## CSS

- Flexbox is used to arrange the navigation, dashboard cards, and reading controls.
- Bootstrap provides reusable layout and component styles.
- Custom CSS overrides Bootstrap when the application needs a more specific appearance or behavior.
- Responsive media queries adjust layouts and hide or resize content on smaller screens.
- The application should remain readable and usable without overflowing on mobile devices.

## React

- React Router handles navigation between Home, Read, Library, Friends, About, and Login views.
- React Context shares authenticated user settings and reading progress between components.
- Hooks such as `useState`, `useEffect`, and `useContext` manage component state and side effects.
- Reading assignments are derived from dates rather than hard-coded for every day.
- Browser local storage can act as a fallback or cache, but authenticated application data should ultimately be stored in MongoDB.
- React should receive only the data it needs from the backend and update its UI from the returned response.

## Express and authentication

- Express routes handle user registration, login, logout, authentication checks, progress, and third-party verse requests.
- Passwords are hashed with bcrypt before they are stored.
- MongoDB stores email addresses, password hashes, authentication tokens, and reading progress.
- A session token is stored in an HTTP-only cookie instead of exposing authentication credentials to JavaScript.
- Authentication middleware protects account-specific API routes.
- Cookies are cleared during logout, and the server removes or invalidates the associated authentication token.
- API routes should return a JSON error with an appropriate HTTP status instead of allowing a request to fail with an empty response.

## MongoDB

- MongoDB stores application data as BSON documents.
- The MongoDB Node.js driver connects to an Atlas cluster using a connection string built from a database configuration file.
- The service verifies the database connection with a ping and exits instead of starting without persistent storage.
- MongoDB collections should be used for related groups of records, such as users.
- MongoDB fields can store nested application state while remaining easy to update.
- The database stores the following account data:
  - Email address
  - bcrypt password hash
  - Authentication token
  - Daily reading progress
  - Completed date keys
  - Calculated streak
- `findOne`, `insertOne`, `updateOne`, and indexed unique fields provide the operations needed for account management.
- Authentication lookups can be based on email or token.
- Reading progress is loaded from MongoDB through `GET /api/progress` and saved through `PUT /api/progress`.
- The MongoDB-backed streak stores completed date keys and recalculates consecutive weekday completions.
- Browser local storage remains useful as a cache, but MongoDB is the source of persistent account data.
- Database credentials belong in a restricted configuration file and must not be committed to GitHub.

## Debugging

- VS Code breakpoints can inspect Express request handlers, database operations, and authentication state.
- The Node debugger should be used to step through account creation, login, logout, and progress updates.
- Browser Network tools reveal API requests, response codes, request bodies, and returned JSON.
- Browser Application tools can inspect cookies and local storage.
- A successful API request should include a valid JSON response, while missing backend services often produce proxy connection errors in Vite.
- The backend and frontend should both run during local development so `/api` requests reach Express.
- The frontend production build should be run after code changes to catch bundling errors.

## Development environment

1. Install dependencies with `npm install` and `npm install --prefix service`.
2. Start the backend with `npm run dev:service`.
3. Start Vite in another terminal with `npm run dev`.
4. Open the Vite URL displayed in the terminal.
5. Use browser developer tools and the VS Code debugger to verify API calls and application state.
