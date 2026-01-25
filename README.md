# ApplyFlow

A personal system I built to track job applications, manage interview schedules, and understand how my skills align with different roles.
It’s a tool I built and use to organize my own job search.While applying to multiple roles, I found myself juggling spreadsheets, browser tabs, notes, and calendar reminders. Important details were easy to lose track of, and it was hard to see patterns across applications and interviews.

I built ApplyFlow to turn that process into a single, structured system where I could:

- Track applications clearly
- Visualize interview timelines
- Compare job requirements with my own skill set
- Learn from outcomes instead of guessing

---

## What it does

- **Job application tracking**  
  Store and manage applications with status, company, role, and location.

- **Interview scheduling**  
  Calendar-based view for interviews, rounds, and follow-ups.

- **Skill alignment**  
  Compare required skills for a role against your own to identify gaps and strengths.

- **Progress insights**  
  View patterns across applications and interviews over time.

---

## Tech overview

The stack was chosen to stay simple, explicit, and easy to evolve.

### Frontend

- React
- React Router
- Tailwind CSS

### Backend

- Node.js
- Express
- REST APIs

### Database

- MongoDB
- Mongoose

### Validation

- express-validator

---

## Project Structure

applyflow/
├── client/ # Frontend React application
│ ├── dist/ # Production build files
│ ├── node_modules/ # Frontend dependencies
│ ├── public/ # Static assets
│ ├── src/
│ │ ├── assets/ # Images, fonts, etc.
│ │ ├── components/ # Reusable React components
│ │ ├── hooks/ # Custom React hooks
│ │ ├── pages/ # Page components
│ │ ├── services/ # API calls and external services
│ │ ├── utils/ # Helper functions
│ │ ├── App.jsx # Main app component
│ │ ├── index.css # Global styles
│ │ └── main.jsx # App entry point
│ ├── .gitignore
│ ├── eslint.config.js
│ ├── index.html
│ ├── package.json
│ ├── package-lock.json
│ └── vite.config.js # Vite configuration
├── controllers/ # Request handlers and business logic
├── errors/ # Custom error classes
├── middleware/ # Express middleware (auth, validation, etc.)
├── models/ # MongoDB schemas and models
├── node_modules/ # Backend dependencies
├── public/ # Backend static files
├── routes/ # API route definitions
├── utils/ # Backend helper functions
├── .env # Environment variables
├── .gitignore # Git ignore rules
├── package.json # Backend dependencies and scripts
├── package-lock.json # Locked dependency versions
├── README.md # Project documentation
└── server.js # Express server entry point

---

## Project status

This project is actively evolving as I continue to use it during my job search.  
New features and refinements are added based on real usage rather than artificial requirements.

## Current Limitations

While ApplyFlow is functional and solves real problems, there are areas I'm actively working to improve:

- Manual Data Entry - Currently requires manual input of application details (will be solved by ApplyBuddy extension)
- Basic Skill Matching - The skill comparison algorithm is relatively simple and may miss nuanced matches or related skills
- No Resume Parsing - Skills and experience must be entered manually rather than extracted from your resume
- Limited Job Description Analysis - Job requirement extraction could be more sophisticated and accurate

## Upcoming Features

- Resume Data Extraction - Automatically parse and extract skills, experience, and qualifications from uploaded resumes
- Enhanced Skill Matching - Improved accuracy in extracting skills from job descriptions and comparing them against your profile using advanced text analysis
- ApplyBuddy Browser Extension (In Development)
  I'm currently building a browser extension that will:
  - Automatically collect job application data from popular job sites (LinkedIn, Indeed, Glassdoor)
  - Extract job details, requirements, and company information with one click
  - Send data directly to ApplyFlow
  - Eliminate manual data entry entirely
