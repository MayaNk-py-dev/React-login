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


![Screenshot (225)](https://github.com/user-attachments/assets/1753cfaa-a722-436d-8d25-16dd2c737559)

![Screenshot (228)](https://github.com/user-attachments/assets/74617ff9-cb9c-4c35-9c3f-1db7c10b1e4d)
![Screenshot (229)](https://github.com/user-attachments/assets/e3c868b4-431b-40a9-beed-8309ca58834d)
![Screenshot (231)](https://github.com/user-attachments/assets/432f7d2a-21c6-4807-aa66-6763a9f7b4!)
[Screenshot (224)](https://github.com/user-attachments/assets/39ae8d05-9731-4b58-83f4-284751718b0f)

##mock json server
![Screenshot 2025-01-23 055727](https://github.com/user-attachments/assets/4309d668-544a-4da1-9921-a445fb33a614)
