# User Management System - Frontend

A modern React-based user management dashboard with role-based access control.

![User Management Dashboard](https://via.placeholder.com/800x400?text=User+Management+Dashboard)

## Features

- **Authentication System**
  - User Login with validation
  - Signup with role selection
  - Session management
  
- **User Management**
  - View all users with filtering by role
  - Edit user details
  - Role-based permissions (Admin-only actions)
  - User profile management
  
- **Dashboard Analytics**
  - User statistics by role
  - Interactive UI components
  
- **Modern UI/UX**
  - Responsive design
  - Clean, intuitive interface
  - Form validation
  - Loading states
  - Modals for user interaction

## Tech Stack

- **React** - UI library
- **React Router** - Navigation and routing
- **CSS** - Styling (custom, no external UI libraries)
- **JavaScript ES6+** - Modern JavaScript

## Project Structure

```
frontend/
├── public/             # Static files
├── src/                # Source files
│   ├── components/     # Reusable UI components
│   │   ├── ConfirmModal.js
│   │   ├── Navbar.js
│   │   ├── UserModal.js
│   │   └── UserProfile.js
│   ├── pages/          # Page components
│   │   ├── Dashboard.js
│   │   ├── Login.js
│   │   └── Signup.js
│   ├── utils/          # Utility functions
│   │   └── userService.js
│   ├── App.js          # Main app component
│   ├── index.js        # Entry point
│   └── styles.css      # Global styles
└── package.json        # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/PadminiPriyanka28/user-management-system.git
   cd user-management-system/frontend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

### Login

- Use username: `admin` and password: `admin123` for administrator access
- Or sign up with a new account

### User Management

- **Admin users** can:
  - View all users
  - Edit any user
  - Delete users
  - Change user roles

- **Regular users** can:
  - View their profile
  - Edit their own information (except role)

### Dashboard

The dashboard provides an overview of all users with statistics by role. Administrators have additional controls for user management.

## Backend Integration

This frontend is designed to work with a RESTful API backend. Currently, it uses mock data for development, but can be easily connected to the actual backend by updating the `src/utils/userService.js` file.

The expected endpoints are:
- `POST /api/register` - User registration
- `POST /api/login` - User authentication
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Future Enhancements

- Add forgot password functionality
- Implement pagination for user list
- Add sorting capabilities
- Dark mode support
- Unit and integration tests
- State management with Redux/Context API
- Form handling with Formik or React Hook Form

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 