# React+Redux Login App

## This repository contains the frontend code, which will be integrated with the backend API. The backend team will implement the necessary APIs, and we will integrate them with this frontend.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Backend Integration](#backend-integration)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started with the project, follow the steps below:

1. **Clone the repository** to your local machine:
   ```bash
   git clone https://github.com/<your-username>/<repo-name>.git
Navigate to the project directory:

cd <repo-name>

##Install dependencies: Ensure you have Node.js installed, and then run:
npm install

##Run the development server: To start the application locally and see it in action:
npm run dev

##This will start the development server, and you can access the app at http://localhost:3000.

Usage
The app currently uses mock data to simulate the backend responses. You can start working on the frontend part by updating the API calls once the backend team has implemented the actual APIs.

Features Implemented:
User Authentication (Login form with email and password).
Password visibility toggle (Show/Hide password).
Error Handling (Alert on login failure).
Responsive Design (Works on mobile, tablet, and desktop).

Backend Integration
The backend team will implement the following APIs:

POST /login: Authenticate the user with email and password.
GET /users: Get a list of users (for testing purposes).

Once the APIs are ready, you can replace the mock data in the app with the actual API calls.

Sample API Integration
Here’s how you can integrate the backend API once it’s ready:

1. Install axios to make HTTP requests:

npm install axios
2. Replace the mock data with actual API calls in the relevant components (e.g., Login.jsx).

##javascript
import axios from 'axios';

const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
        setError('Please fill in both fields.');
        return;
    }

    try {
        const response = await axios.post('https://your-backend-api.com/login', {
            email: email,
            password: password
        });

        if (response.data.success) {
            localStorage.setItem('authToken', response.data.token);
            navigate('/home');
        } else {
            setError('Invalid email or password');
        }
    } catch (error) {
        setError('Something went wrong. Please try again later.');
    }
};

##Once the backend is ready, replace the http://localhost:5000/users URL with the actual API endpoint.
![Screenshot (226)](https://github.com/user-attachments/assets/7239c5b3-d5f7-4fda-937b-c9f9ec00b66a)
![Screenshot (231)](https://github.com/user-attachments/assets/f52c70e2-6fa0-41d8-9257-288f21e1f487)
![Screenshot (225)](https://github.com/user-attachments/assets/08d97840-100b-49d3-a100-f756a4159a38)

![Screenshot (228)](https://github.com/user-attachments/assets/ead2a93d-c08b-4739-8d44-45a7a72275e2)
![Screenshot 2025-01-23 055727](https://github.com/user-attachments/assets/06797e32-f476-4d29-809e-742a585fb229)


