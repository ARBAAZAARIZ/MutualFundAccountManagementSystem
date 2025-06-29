🏦 Fundify Vault - Mutual Fund Investment Platform
Fundify Vault is a full-stack web application built with React and Spring Boot, designed to help users explore, buy, and sell mutual funds in a secure and intuitive environment. It provides both user and admin roles, personalized transaction tracking, and real-time fund management.

✅ Key Features
🔐 Role-Based Authentication (USER / ADMIN) with Spring Security

📊 Mutual Fund Listing with NAV, category, and last updated info

🛒 Buy/Sell Operations with transaction recording

👤 User Profile with full transaction history

✏️ Admin Panel to add, update, or delete funds

🔄 Session-Based Login using CSRF protection and cookies

💅 Modern UI styled with Bootstrap, custom gradients, and Google Fonts

🔍 Clean navigation with React Router DOM

⚙️ Tech Stack
Frontend	Backend	Security & Auth
React (Vite)	Spring Boot (Java)	Spring Security + CSRF
Bootstrap 5	RESTful APIs	Session-based login
Axios + HookForm	JPA + Hibernate	Role-based access control

🧑‍💻 Roles
USER
View mutual funds

Buy/Sell units

View own transaction history

ADMIN
All USER privileges

Add/Update/Delete funds

🚀 How to Run
📦 Backend (Spring Boot)
Clone the repository

Open the backend project in your IDE

Run the Spring Boot app (port 6060)

💻 Frontend (React + Vite)
Navigate to the frontend folder:

cd mfams-frontend
Install dependencies:

npm install
Start the development server:

npm run dev
Open http://localhost:5173 in your browser
