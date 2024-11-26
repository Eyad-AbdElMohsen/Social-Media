# Social Media API

A RESTful API built with Node.js, Express, and TypeScript to handle user authentication, posts, comments, likes, and friendships for a social media platform.

## Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDb**
- **Rimraf** (for cleaning the build directory)
- **Concurrently** (for running multiple scripts)
- **Multer** (for handling file uploads)


## Setup Instructions

 **Clone the Repository**
 ```bash
 git clone https://github.com/Eyad-AbdElMohsen/Social-Media
 ```

## Install Dependencies

```bash
npm install
```
Scripts

Build: Compile TypeScript files.

```bash
npm run build
```

Start: Start the server.
```bash
npm start
```

Preserve: Clean and rebuild the project.
```bash
npm run preserve
```

Serve: Run the project in development mode with live reload.
```bash
npm run serve
```

## Routes
### User Routes
- POST /signup -- Register a new user.
- POST /login -- Login and get a JWT token.
- GET /users -- Get all users (Admin only).
- GET /users/me/posts -- Get posts of the logged-in user.
- GET /users/:userId/posts -- Get posts of a specific user.
- GET /users/me/friends -- Get friends of the logged-in user.
- GET /users/:userId/friends -- Get friends of a specific user.
### Post Routes
- GET /posts/ -- Get all posts (Admin only).
- POST /posts/ -- Create new post.
- GET /posts/:postId -- Get a post by ID.
- PATCH /posts/:postId -- Edit a post.
- DELETE /posts/:postId -- Delete a post.
- GET /posts/:postId/likes -- Get likes on a post.
- POST /posts/:postId/likes -- Like a post.
- DELETE /posts/:postId/likes -- Remove a like from a post.
- GET /posts/:postId/comments -- Get comments on a post.
- POST /posts/:postId/comments -- Add a comment to a post.
- GET /posts/:postId/comments/:commentId -- Get a specific comment.
- PATCH /posts/:postId/comments/:commentId -- Edit a comment.
- DELETE /posts/:postId/comments/:commentId -- Delete a comment.
- POST /posts/:postId/comments/:commentId/replies -- Add a reply to a comment.
### Friend Routes
- GET /friends/recieve-requests -- Get received friend requests.
- GET /friends/sent-requests -- Get sent friend requests.
- POST /friends/add-cancel/users/:userId -- Send or cancel a friend request.
- POST /friends/accept-refuse/users/:userId -- Accept or refuse a friend request.
- DELETE /friends/delete/users/:userId -- Delete a friend.
## Usage
#### Authentication: All routes (except signup and login) require a valid JWT token. Use the /login endpoint to get a token after signing up.<br>
#### Pagination: Most routes support pagination (e.g., for fetching posts or users) via query parameters like page and limit.
