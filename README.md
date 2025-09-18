# SafeBank

SafeBank is a secure banking web application that allows users to register, log in with email/password or social accounts (Google/Facebook), manage accounts, and perform transactions. Role-based permissions ensure users can only access actions they are authorized to perform.
## Features

- User authentication: Email/password + Google/Facebook login
- Role-based authorization: Senders, Admins, etc.
- Secure transactions: Send and receive money
- Transaction history per user
- Frontend UI reflects permissions (buttons disabled/hidden based on roles)
- Secure communication via HTTPS and JWT


## Tech Stack

- Frontend: HTML, CSS, Tailwind, Vanilla JavaScript
- Backend: Node.js, Express.js
- Authentication: Passport.js (Google/Facebook) + JWT
- Database: MySQL
- Security: HTTPS, JWT tokens, role-based access control

## Installation

1. Clone the repository:

2. Install backend dependencies:

3. Setup environment variables in `.env`:

4. Setup MySQL database and tables (see `database.sql` if provided)
5. Run the server:

## Usage

1. Register using email/password or Google/Facebook login
2. After login, view your account balance and transactions
3. Send or receive money (only allowed based on your role)
4. Admins can view all users and all transactions
5. Buttons will be disabled if you don't have permission for an action


## Security & Authorization

- HTTPS is used to encrypt communication between frontend and backend
- JWT tokens handle authentication
- Role-based permissions control access to actions
- Frontend buttons are enabled/disabled based on user permissions

## Folder Structure

SafeBank/
├─ server/
│  ├─ config/        # DB & Passport config
│  ├─ controllers/   # API logic
│  ├─ middleware/    # JWT & authorization
│  ├─ models/        # DB queries
│  └─ routes/        # API endpoints
├─ client/           # Frontend
│  ├─ index.html
│  ├─ styles.css
│  └─ app.js
└─ .env              # Environment variables

## Contributing

Feel free to fork this repository and submit pull requests.  
Please follow coding conventions and maintain clean commits.
