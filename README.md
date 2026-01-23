# Thrive365 Frontend

Frontend application for **Thrive365**, an intentional yearly planning and goal-tracking app designed to help users structure their year around meaningful goals and consistent progress.

Built as part of the **TripleTen January 2026 Code Jam** using a collaborative design and engineering workflow.

**Live Application:**  
https://thrive365-frontend.vercel.app/  

**Figma Design:**  
https://www.figma.com/design/Ffg3nRi8wDoHhnsO82G6lT/Thrive365?node-id=386-1277&t=Vd2hP36iEYmwuIk4-0  

---

## About the App

Thrive365 is a **year-planning system**, not a task manager.

The experience is designed to feel calm, intentional, and long-term focused.  
Instead of managing endless tasks, users concentrate on only a few meaningful goals and track steady progress throughout the year.

Users can:

- Create up to four yearly focus goals  
- Define what each goal means and why it matters  
- Break goals into actionable steps  
- Track progress visually  
- Pause or complete goals intentionally  

---

## Key Features

### Authentication
- Sign up and log in flow  
- Persistent login using JWT tokens  
- Protected routes (dashboard accessible only when authenticated)  

### Dashboard
- Displays up to four active goals  
- Visual progress indicators  
- Quick navigation to manage each goal  

### Goal Management
- Create and edit goals with:
  - Title  
  - Definition  
  - Reason  
  - Notes  
  - Optional images  
- Assign goals to yearly focus slots  

### Steps & Progress
- Add, edit, and delete steps  
- Mark steps complete  
- Automatic progress calculation  
- Goal statuses: active, paused, completed  

### UI / UX
- Figma-driven layout and spacing  
- Calm color palette and typography  
- Responsive design for desktop and mobile  
- Modal-based editing and smooth transitions  

---

## Tech Stack

- React (Vite)  
- React Router  
- Custom CSS  
- REST API integration  
- Context API for authentication and user state  

---

## Architecture Overview

- App routing controlled through React Router  
- Protected routes prevent logged-in users from seeing public pages  
- Central API utility handles:
  - Token storage  
  - Authorization headers  
  - Error handling  
- Context manages:
  - Current user  
  - Login state  

---

## Running Locally

Install dependencies:

npm install  

Create a .env file:

VITE_API_URL=http://localhost:3000  

Start the app:

npm run dev  

Open:

http://localhost:5173  

---

## Deployment

This frontend is deployed on **Vercel**:

https://thrive365-frontend.vercel.app/

The production environment variable `VITE_API_URL` is configured to point to the deployed backend API.

---

## Team & Contributions

UI / UX Designers  
- Beth — Research, layout system, visual design  
- Andrea — Prototyping and interaction design  

Software Engineers  
- Farida Nelson — Frontend & Backend  
- Serouj Kdenian — Frontend & Backend  
- Blake — Frontend styling and animation ideas  

Serouj and Farida led application architecture, routing, authentication integration, and backend communication.

---

## Project Goal

Thrive365 was built to demonstrate:

- Full-stack MERN architecture  
- Authentication and protected routing  
- Real-world CRUD and progress logic  
- Thoughtful UX for long-term planning tools  

---

## License

MIT
