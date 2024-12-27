# Chat Application

This is a full-stack chat application built with React, Node.js, Express, MongoDB, and Socket.io.

The application allows users to sign up, log in, and chat with other users in real-time.

## Features

- User authentication (sign up, log in, log out)
- Real-time messaging with Socket.io
- Profile management
- Online/offline status
- Responsive design

## Project Structure

```
/chat-app
├── backend
│   ├── config
│   │   └── db.js
│   ├── controllers
│   │   └── userController.js
│   ├── middleware
│   │   └── authMiddleware.js
│   ├── models
│   │   └── User.js
│   ├── routes
│   │   └── userRoutes.js
│   ├── utils
│   │   └── cloudinary.js
│   ├── server.js
│   └── package.json
├── frontend
│   ├── public
│   │   └── index.html
│   ├── src
│   │   ├── components
│   │   │   └── Chat.js
│   │   ├── context
│   │   │   └── AuthContext.js
│   │   ├── pages
│   │   │   └── Login.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles.css
│   ├── .env
│   └── package.json
├── README.md
└── package.json
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Cloudinary account (for image uploads)

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/chat-app.git
    cd chat-app
    ```

2. Install dependencies for both backend and frontend:

    ```sh
    npm install --prefix backend
    npm install --prefix frontend
    ```

3. Create a `.env` file in the backend directory and add the following environment variables:

    ```sh
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET_KEY=your_jwt_secret_key
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    NODE_ENV=development
    ```

### Running the Application

1. Build the frontend:

    ```sh
    npm run build --prefix frontend
    ```

2. Start the backend server:

    ```sh
    npm start --prefix backend
    ```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Development

To run the application in development mode:

1. Start the backend server with nodemon:

    ```sh
    npm run dev --prefix backend
    ```

2. Start the frontend development server:

    ```sh
    npm run dev --prefix frontend
    ```

The frontend will be available at [http://localhost:5173](http://localhost:5173).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.