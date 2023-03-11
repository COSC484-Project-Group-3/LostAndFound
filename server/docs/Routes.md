# LostAndFound API Routes Documentation

## User Routes

<!-- use table to display routes -->

| Route | HTTP Verb | Description |
|-------|-----------|-------------|
| /api/users/create | POST | Create a new user |
| /api/users/users | GET | Get all users |
| /api/users/users/:id | GET | Get a single user |
| /api/users/update/:id | PUT | Update a user with new info |
| /api/users/delete/:id | DELETE | Delete a user |

## Post Routes

| Route | HTTP Verb | Description |
|-------|-----------|-------------|
| /api/posts/create | POST | Create a new post |
| /api/posts/post/:id | GET | Get a single post |
| /api/posts/posts/posts/:distance/:lat/:long | GET | Get all posts within a certain distance of a location |
| /api/posts/posts/:authorId | GET | Get all posts by a single user |
| /api/posts/update/:id | PUT | Update a post with new info |
| /api/posts/delete/:id | DELETE | Delete a post |

## Location Routes

| Route | HTTP Verb | Description |
|-------|-----------|-------------|
| /api/locations/create | POST | Create a new location |
| /api/locations/location/:id | GET | Get a single location |
| /api/locations/locations | GET | Get all locations |
| /api/locations/update/:id | PUT | Update a location with new info |
| /api/locations/delete/:id | DELETE | Delete a location |
