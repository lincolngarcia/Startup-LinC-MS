# LinC-MS (Lincoln's Content Management System)

[My Notes](notes.md)

LinC-MS is a super simple **Content Management System** with the intended purpose of streamlining web development for small businesses with complete "out-of-the-box" features.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Are you a professional designer? How about a profesional software developer? The vast majority of people answer an emphatic 'no' to both, if not one of these questions. Why then, are website editors set up to give people who are not developers nor designers an interface to develop and design?

LinC-MS is a project with the goal of providing a beautiful prebuilt **Content Management System** complete with all the bells and whistles that small businesses are looking for, without shoveling on them the task of designing and programming these sites.

## 🚀 Specification Deliverable

### Design

![Design image](design.jpg)

```
graph TD
    users[Users]
    authUsers[Authenticated Users]
    database[Database]
    analytics[Analytics]
    googleAnalytics[Google Analytics]
    cms[CMS]
    cmsRoutes[Generated CMS Routes]

    users -->|Login| authUsers
    users --> cmsRoutes
    authUsers --> cms
    authUsers --> analytics
    cms --> database
    analytics --> database
    database --> cmsRoutes
    analytics --> googleAnalytics

```

### Key features

- A fully operational Content Management System to create, edit, and design web pages
- Google Analytics Integration
- An authentication feature for admin users.

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - For content, navigation, and as templates for web page generation
- **CSS** - For stylng said web pages, give a clean, smooth look
- **React** - For dynamic content serving, code cleanliness, and templating.
    - Content Serving: React provides a wide range of functions and utilities. 
    - Templating: I'll be including several templates that will be used to modually build web pages
- **Service** - I'll be using Google Analytics to display traffic, as well as NextJS and Content Layer
- **DB/Login** - JWT Token Authenticated and Encrypted database storage is completely necessary for an application that has endpoints to edit, create, and destroy data.
    - Next's ContentLayer's Database: This is will be used to store data associated with the routes and data for each page
    - MongoDB: This database will be used to store authenticated information-- like passwords, etc
- **WebSocket** - WebSocket will be  used to provide client-to-client and client-to-server communication in the following ways:
    - Live Changes: WebSocket will take the edits made to the website and autosave them to the server.
    - Live updates: WebSocket will be used to show live updates given by co-editors on the site

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://lincolngarcia.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - I included roughly 3 admin pages, followed by 2 basic content pages.
- [x] **Proper HTML element usage** - I used <header>, <nav>, <footer>, <main>, <a>, and 
    - For <header>, <footer>, <main> tags: see ~/src/app/posts/page.tsx
    - For <html>, <body> tags: see ~/src/app/layout.tsx
- [x] **Links** - I used several links to navigate between pages.
    - See ~/src/app/page.tsx
    - See ~/src/pages/admin/analytics.tsx
    - See ~/src/pages/admin/dashboard.tsx
    - See ~/src/pages/login.tsx
- [x] **Text** - I included text for various application, such as the CMS, analytics, including some filler text
- [x] **3rd party API placeholder** - See the ~/src/pages/admin/analytics.tsx for the placeholders for Google Analytics integration
- [x] **Images** - I included some default images to be used within the CMS. See [Here](https://lincolngarcia.click) for examples.
- [x] **Login placeholder** - See [Here](https://lincolngarcia.click) for an example. Code is found on the /login page mentioned above
- [x] **DB data placeholder** - See [Here](https://lincolngarcia.click/admin/dashboard) for an example. Code is found on the /admin/dashboard page mentioned above
- [x] **WebSocket placeholder** - See [Here](https://lincolngarcia.click/admin/dashboard) for an example. Code is found on the /admin/dashboard page mentioned above

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Header, footer, and main content body** - Used as appropriate. Please see admin/analytics and admin/dashboard for examples
- [x] **Navigation elements** - Used as appropriate Please see admin/analytics and admin/dashboard for examples.
- [x] **Responsive to window resizing** - Media queries in backend.css. Used to change grid to flex on smaller screens
- [x] **Application elements** - Used as appropriate. Please see all components, everything in the pages directory
- [x] **Application text content** - Text is styled throughout the application, especially on the homepage and admin/dashboard
- [x] **Application images** - The homepage has examples of images styled. Used as appropriate

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Bundled using Vite** - I used the nextJS in house build step. I cleared it with the professor.
- [x] **Components** - Check out the /src/app/components directory. Used liberally
- [x] **Router** - I used the router on the login page, however the NextJS docs prefer the <Link> component. It is used on the header component and where applicable.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **All functionality implemented or mocked out** - It is, mock data is used throughout the application where functionality is needed
- [x] **Hooks** - Please see the dashboard for this data, both useEffect and useState are used.

For this deliverable, be sure to visit the /admin/dashboard route. This is where the bulk of the project is. There is some test data for how the CMS will work, However, it will not save nor are there any way to manipulate pages (that comes in the database step)

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Node.js/Express HTTP service** - Installed Express with NPM. Default port on 3000.js`.
- [x] **Static middleware for frontend** - - Simple endpoints in service/index
- [x] **Calls to third party endpoints** - /admin/analytics page calls /api/analytics, which queries https://analyticsdata.googleapis.com, renders the resulting JSON with React and Chart.js.
- [x] **Backend service endpoints** - Simple endpoints for database updates and auth
- [x] **Frontend calls service endpoints** - All mocked functionality removed from the frontend and replaced with calls to the service.
- [x] **Supports registration, login, logout, and restricted endpoint** -  Fully support authentication and restrict access to database edits and admin-related information (analytics and page CRUD endpoings)


## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Stores data in MongoDB** - I stored all rhe pages and users in MongoDB
- [x] **Stores credentials in MongoDB** - The users collection incorporates credential storage

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
