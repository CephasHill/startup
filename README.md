# Your startup name here

[My Notes](notes.md)

Daily NT Connect is a web application that takes structured New Testament reading plans and transforms them into a shared, social experience.

> [!NOTE]
> This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

> [!NOTE]
> If you are not familiar with Markdown then you should review the [documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) before continuing.

### Elevator pitch

Building a daily Bible reading habit is hard to do entirely alone. Daily NT Connect takes structured New Testament reading plans and transforms them into a shared, social experience. Users can log in, read their daily chapters, track their streaks, and instantly share their favorite verses with a network of friends. By adding live streak updates and real-time verse sharing, the app takes what is typically a solitary activity and turns it into a supportive, community-driven habit.

### Design

![Streak Tracking and Daily Assigned Readings](StreakAndAssignedReadings.png)
The home dashboard features a top-level progress bar, a live streak counter, and an interactive checklist of assigned readings for the current day.

![Active Reading Screen](ActiveReadingScreen.png)
The active reading interface provides a clean, readable canvas for the biblical text, complete with verse numbers, footnote support, and dropdowns for translation selection and user settings.

![Library Screen](LibraryScreen.png)
The library view allows users to seamlessly browse and navigate any part of the New Testament outside their assigned daily reading plan via a categorical tab system.

```mermaid
sequenceDiagram
    actor User
    actor Server
    actor Friends
    User->>Server: Logs in and completes daily NT reading
    Server->>Database: Saves updated streak
    Server->>Friends: WebSocket pushes live streak update
    Friends-->>User: View live progress on dashboard
```

### Key features

- Secure Authentication: User login, registration, and logout functionality.
- Structured Reading Plans: Users can select different timelines to read the New Testament, such as the weekly 5x5 Weekday Plan (260 chapters over 52 weeks) or the 90-Day Sprint.
- Reading Interface: A clean, responsive library canvas to read chapters, complete with footnote support and multiple translations.
- Live Friends & Streaks: View a friends list with their current reading streaks.
- Real-Time Sharing: A feature to highlight verses and push them instantly to friends.

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - The app will use correct, semantic HTML to structure the user interface. It will consist of at least two main views: a login/authentication screen and the main reading/dashboard canvas.
- **CSS** - The app will be styled to be fully responsive across mobile devices and desktop screens, utilizing whitespace and accessible color contrast.
- **React** - The frontend will be built as a Singe Page Application (SPA) using React. Components will modularize features like the reading screen, the friends list, and the login form. React Router will handle navigation between the dashboard and the reading canvas.
- **Service** - A backend Node.js service will provide endpoints for registering and authenticating users, saving and retrieving user reading progress (streaks), and fetching text data for the selected reading plan.
- **DB/Login** - A MongoDB database will securely store user credentials, user streak data, friend connections, and saved bookmarks/messages.
- **WebSocket** - Real-time communication will be used for the social features. When a user completes their daily reading, their streak update is broadcast live to their friends' dashboards. Users can also push a "shared verse" to a friend's screen in real time.

## 🚀 Specification Deliverable

> [!NOTE]
> Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Git commit requirement)
- [ ] Proper use of Markdown
- [ ] A concise and compelling elevator pitch
- [ ] Description of key features
- [ ] Description of how you will use each technology including your 3rd party API and use of WebSocket
- [ ] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Rented EC2 server** - I did not complete this part of the deliverable.
- [ ] **Leased domain name** - I did not complete this part of the deliverable.
- [ ] **Server accessible** from my domain: [https://yourdomainnamehere.click](https://yourdomainnamehere.click) - I did not complete this part of the deliverable.

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **HTML pages** - I did not complete this part of the deliverable.
- [ ] **Proper HTML element usage** - I did not complete this part of the deliverable.
- [ ] **Links** - I did not complete this part of the deliverable.
- [ ] **Text** - I did not complete this part of the deliverable.
- [ ] **3rd party API placeholder** - I did not complete this part of the deliverable.
- [ ] **Images** - I did not complete this part of the deliverable.
- [ ] **Login placeholder** - I did not complete this part of the deliverable.
- [ ] **DB data placeholder** - I did not complete this part of the deliverable.
- [ ] **WebSocket placeholder** - I did not complete this part of the deliverable.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Visually appealing colors and layout. No overflowing elements.** - I did not complete this part of the deliverable.
- [ ] **Use of a CSS framework** - I did not complete this part of the deliverable.
- [ ] **All visual elements styled using CSS** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing using flexbox and/or grid display** - I did not complete this part of the deliverable.
- [ ] **Use of a imported font** - I did not complete this part of the deliverable.
- [ ] **Use of different types of selectors including element, class, ID, and pseudo selectors** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - I did not complete this part of the deliverable.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.
- [ ] **Supports registration, login, logout, and restricted endpoint** - I did not complete this part of the deliverable.
- [ ] **Uses BCrypt to hash passwords** - I did not complete this part of the deliverable.

## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
