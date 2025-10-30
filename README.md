## Task Tracker with Smart Insights

This is the **frontend client** application for the THWORKS system — a productivity/tracking web-app which helps users 

manage tasks, habits, priorities and view insights.  

The app is a Single-Page Application (SPA) using React and modern CSS, designed for clean UI and efficient state management.

The frontend interacts with a backend API (for example at `http://localhost:3000/api`) which handles user authentication, 

task/habit management and insights.

---

## Features  

- 🔐 **Authentication flow**: Sign up / Log in, token-based (JWT) stored in localStorage.  

- 📋 **Task/Habit CRUD**: Add, view, edit, delete tasks or habits.  

- 🔍 **Filtering & Sorting**: Filter by status (e.g., Open / In Progress / Done) and priority (Low / Medium / High); sort by due date or other criteria.  

- 📊 **Dynamic Insights Panel**: View summary statistics like number of open tasks, upcoming tasks, priority breakdown.  

- 🎨 **Clean UI/UX**: Styled with earth-toned design and user-friendly interface.  

- ✅ **Responsive design**: Works well on different screen sizes.

---

## Tech Stack  

- **Frontend**: React.js (functional components + hooks)  

- **Styling**: Regular CSS (or SCSS if applicable)  

- **Build Tooling**: Vite / Create React App (depending on setup)  

- **HTTP/Api**: Fetch/Axios + custom API helper  

- **State Management**: React built-in state & context (or Redux if applicable)  

- **Auth**: JWT token stored in localStorage, protected routes  

- **Linting/Formatting**: ESLint + Prettier (configured)

---

## Getting Started  

### Prerequisites  

- Node.js (v14 or higher)  

- npm (v6 or higher) or yarn  

- A running backend API (for example `http://localhost:3000/api`) with routes for auth & tasks/habits  

### Installation  

# Clone repository

git clone https://github.com/ibrahim9492/THworks_Assignment.git

cd THworks_Assignment

# Install dependencies

npm install

# or

yarn install

# Running Locally

npm run dev

# or

yarn dev

# Usage

Open the app in the browser.

Register a new user or login with an existing account.

Upon successful login you'll be taken to the dashboard where you can:

Create a new task/habit via the TaskForm.

View all tasks/habits in TaskList, filter by status/priority, sort by due date, inline edit (status, priority, etc.).

Check out the InsightsPanel to view real-time summary: open tasks count, upcoming tasks, priority breakdown.

Logout to end the session (clears token, returns to login screen).

# Contributing

Contributions are welcome! If you’d like to contribute:

Fork the repository

Create a feature branch (git checkout -b feature/YourFeature)

Commit your changes (git commit -m 'Add some feature')

Push to the branch (git push origin feature/YourFeature)

Open a Pull Request describing your changes

Please make sure your code follows the existing style, write appropriate tests (if applicable), and update the documentation.

# License

Distributed under the MIT License. See LICENSE for more information.

# Contact

Your Name – Ibrahim Khalandar – ibrahimkhalandar02@gmail.com