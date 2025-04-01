# Social Media Dashboard

This project is a **Social Media Dashboard** built using **Angular 18** for the frontend, **Node.js** for the backend, and **MongoDB** as the database.

## Features
- User authentication (login/register)
- CRUD operations for posts and comments
- Like/unlike posts
- Edit/Delete Comments
- Role-based access (Admin/User)
- Dashboard for users and admins

## Technologies Used
### Frontend
- **Angular 18**
- **Bootstrap** (UI Styling)

### Backend
- **Node.js** (Express.js)
- **MongoDB** (Mongoose ORM)
- **Multer** (File Uploads) not implemented yet but soon..
- **JWT** (Authentication)

## Installation

### Prerequisites
- **Node.js** & **npm** installed
- **MongoDB** installed and running

### Backend Setup
```sh
cd backend
npm install
npm start
```

### Frontend Setup
```sh
cd frontend
npm install
ng serve
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user.
- `POST /api/auth/login` - Login user.

### Users
- `GET /api/user/getUserProfile/:userId` - Get logged-in user profile (Admin or User)
- `GET /api/user/getAllUsers` - Admin's Only.
- `Put /api/user/updateUserProfile/:userId` - Admin or User.
- `Delete /api/user/deleteUserById/:userId` - Admin's only.

### Posts
- `POST /api/post/createPost` - Create a new post
- `GET /api/post/getAllPosts` - Get all posts
- `GET /api/post/getMyPost/:postId` - Get a single post
- `PUT /api/post/updatePost/:postId` - Update a post
- `DELETE /api/post/deletePost/:postId` - Delete a post (Admin or User)
- `POST /api/post/likePost/:postId` - Like/unlike a post

### Comments
- `POST /api/comment/addComment` - Add a comment
- `GET /api/comment/getAllComments/:postId` - Get comments on a post
- `PUT /api/comment/editComment/:commentId` - Update a comment
- `DELETE /api/comment/deleteComment/:commentId` - Delete a comment
- `POST /api/comments/:id/like` - Like/unlike a comment not implemented yet but soon..

### Dashboard
- `GET /api/dashboard/user` - User dashboard data
- `GET /api/dashboard/admin` - Admin dashboard data (Admins only)

## Testing with Postman
1. Use `POST /api/auth/register` to create a new user.
2. Login using `POST /api/auth/login` to get the authentication token.
3. Use the token in the `Authorization` header for protected routes.
4. Test other endpoints by sending requests with appropriate data.

## Contributing
Feel free to fork this repository and contribute to its development!

## Project Report
Project is under implementation.....

