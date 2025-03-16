# Travel Tips & Destination Guides Backend Application

# Description

OnTheGo is a web application with a backend system that manages user profiles, travel stories, tips, and social interactions. Users can share experiences, follow fellow travelers, and access premium content. It helps people discover new destinations and plan their trips easily.

## Features

- **User Authentication:** Users can create an account, log in, and manage their profile securely. The system keeps them logged in using a secure token (JWT). They can reset their password if they forget it, change their password anytime, and update their personal details as needed
- **User Profile Management:** Users can update their profile details and upload a profile picture. A "My Profile" section shows their posts, followers, and following, similar to Facebook or X (Twitter), along with follower and following counts.Users can verify their profile by making an online payment (AAMARPAY/Stripe) after getting at least one upvote on their posts. Verified profiles get a badge and access to premium content.Users can also follow or unfollow others
- **Post Creation & Sharing:** Users can write and share travel tips, guides, and stories. They can also add images to their posts.Posts can be categorized into topics like Adventure, Business Travel, and Exploration for easy browsing.Users can edit or delete their posts anytime. Some posts can be marked as Premium, which only verified users can access.
- **Upvote & Downvote System:** Users can like (upvote) or dislike (downvote) posts to highlight the best content. Posts with the most upvotes appear at the top.
- **Commenting System:** Users can comment on posts and edit or delete their own comments. Post owners can also delete their own comments.
- **Payment Integration:** Secure payment processing using AMARPAY.Customers can make payments for their bookings online.
- **Error Handling:** Proper error messages are displayed for invalid inputs or failed operations.

## Technology Stack

- **Programming Language:** TypeScript
- **Web Framework:** Express.js
- **Database:** MongoDB (using Mongoose for ODM)
- **Authentication:** JSON Web Tokens (JWT)
- **Error Handling:** Custom middleware
- **Deployment:** Deployed on Vercel

## Installation and Setup

1. Clone the repository:

```
https://github.com/tonoy3125/On-The-Go-Backend
```

2. Install dependencies:

```
cd on-the-go-backend
npm install
```

3. Set up environment variables:
   Create a `.env` file with the following variables:

```
NODE_ENV=development
PORT=5000
DB_URI=Your Mongodb connnection Uri
BCRYPT_SALT_ROUNDS= any number
JWT_ACCESS_SECRET= Your JWT Secret
JWT_ACCESS_EXPIRES_IN= Your Jwt Token Expire time
JWT_REFRESH_SECRET= Your JWT Secret
JWT_REFRESH_EXPIRES_IN= Your Jwt Token Expire time
RESET_PASS_UI_LINK= your password reset link
CLOUDINARY_CLOUD_NAME= your cloudinary cloud name
CLOUDINARY_API_KEY= your cloudinary secret api
CLOUDINARY_API_SECRET=your cloudinary secret key
EMAIL_USER= your email
EMAIL_PASS= your nodemailer pass
STRIPE_SECRET_KEY=your stripe secret key
STORE_ID = your store id
SIGNATURE_KEY = your signature key
PAYMENT_URL= payment url

```

4. Start the server:

```
npm run start:dev
```

5. Access the application in your browser at `http://localhost:5000`

## API Documentation

- **Authentication Routes:**

  - `POST /api/auth/signup`: Register a new user.
  - `POST /api/auth/login`: Log in an existing user.
  - `POST /api/auth/refresh-token`: Refresh the access token for an authenticated user.
  - `POST /api/auth/forget-password`: Request a password reset link for a user who forgot their password.
  - `POST /api/auth/reset-password`: Reset the password using a token provided from the password reset request.
  - `POST /api/auth/change-password`: Allows users to update their password while logged in
  - `POST /api/auth/auth-state`: Checks the user's authentication status and session validity

- **User Routes:**

  - `GET /api/can-have-premium`: Checks if a user is eligible for premium access. (Only Accessible by Admin and User)
  - `GET /api/users`: Get All Users. (Only Accessible by Admin)
  - `GET /api/users/:id`: Get Single User By Id (Only Accessible by Admin And User)
  - `PATCH /api/users/role/:id`: Update User role (Only Accessible by Admin)
  - `PATCH /api/users/:id`: Update User By Id (Only Accessible by Admin And User)
  - `DELETE /api/users/:id`: Delete User By Id (Only Accessible by Admin)

- **Category Routes:**

  - `POST /api/category`: Create a Category. (Only Accessible by Admin)
  - `GET /api/category:` Get all Categories.
  - `GET /api/services/:name`: Get all category by name.(Only Accessible by Admin and User)
  - `DELETE /api/category/:id`: Delete (Soft Delete) a Category (Only Accessible by Admin)

- **Comment Routes:**

  - `POST /api/comment`: Create Comment (Only Accessible by Admin and User).
  - `GET /api/slots/comment/:postId`: Get Comment By Post Id.(Only Accessible by Admin and User)
  - `PUT /api/comment/:id`: Update Comment (Only Accessible by Admin and User).
  - `DELETE /api/comment/:id`: Delete Comment (Only Accessible by Admin and User)

- **Follower Routes:**

  - `POST /api/follower/create`: Create a Follower (Only Accessible by Admin and User).
  - `PUT /api/follower/delete`: Delete Follower (Only Accessible by Admin).
  - `GET /api/follower/following/get`: Get All Following (Only Accessible by Admin).
  - `GET /api/follower/get`: Get All Follower (Only Accessible by Admin).

- **Group Routes:**

  - `POST /api/group`: Create a Group (Accessible only to authenticated users).
  - `GET /api/group/my-group`: Get My Group (Accessible only to authenticated users)
  - `GET /api/group/my-group-suggestions`: Get My Group Suggestions (Accessible only to authenticated users)
  - `GET /api/group/groupDetails/:groupId`: Get Group Details by group id (Accessible only to authenticated users)
  - `GET /api/group/groupMember/:groupId`: Get Group Member by group id (Accessible only to authenticated users)
  - `PUT /api/group/updateGroup/:groupId`: Update Group by group id (Accessible only to authenticated users)

- **Group Member Routes:**

  - `POST /api/group-member/join-group/:groupId`: Join Group By Group Id (Accessible only to authenticated users).
  - `GET /api/group/:groupId`: Get Group Member by group id (Accessible only to authenticated users)
  - `POST /api/group/leave-group/:groupId`: Leave Group By Group Id (Accessible only to authenticated users)
  - `GET /api/group/check-membership/:groupId`: Check Group Membership By Group Id (Accessible only to authenticated users)

- **Post Routes:**

  - `POST /api/post`: Create a Post (Accessible only to authenticated users).
  - `GET /api/post/userPost/:userId`: Get User Post by user id (Accessible only to authenticated users)
  - `GET /api/post`: Get All Post (Accessible only to authenticated users).
  - `GET /api/post/:id`: Get Single Post by id (Accessible only to authenticated users).
  - `DELETE /api/post/:id`: Delete a post by id (Accessible only to authenticated users).

- **Reaction Routes:**

  - `PATCH /api/reaction`: Update Reaction toggle (Accessible only to authenticated users).
