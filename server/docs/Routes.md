# LostAndFound API Routes Documentation

## User Routes

<!-- use table to display routes -->

| Route | HTTP Verb | Description |
|-------|-----------|-------------|
| /api/create | POST | Create a new user |
| /api/users | GET | Get all users |
| /api/users/:id | GET | Get a single user |
| /api/update/:id | PUT | Update a user with new info |
| /api/delete/:id | DELETE | Delete a user |

## Post Routes

| Route | HTTP Verb | Description |
|-------|-----------|-------------|
| /api/create | POST | Create a new post |
| /api/post/:id | GET | Get a single post |
| /api/posts/:authorId | GET | Get all posts by a single user |
| /api/update/:id | PUT | Update a post with new info |
| /api/delete/:id | DELETE | Delete a post |
