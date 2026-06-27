# graphql-basic

A GraphQL API server built with Apollo Server and TypeScript.

## Tech Stack

- Node.js 22
- TypeScript
- Apollo Server 4
- Docker / Docker Compose

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Run

```bash
docker compose up --build
```

The server starts at http://localhost:4000/.
Open this URL in a browser to access **Apollo Sandbox**, where you can explore the schema and run queries interactively.

## Schema Overview

### Types

| Type | Description |
|------|-------------|
| `User` | User with name, email, avatar, and related posts |
| `Post` | Blog post with title, body, author, comments, and tags |
| `Comment` | Comment on a post by a user |
| `Tag` | Tag for categorizing posts |

### Queries

| Query | Description |
|-------|-------------|
| `users` | List all users |
| `user(id)` | Get a single user by ID |
| `posts(first, after, filter)` | List posts with cursor-based pagination and filtering |
| `post(id)` | Get a single post by ID |
| `tags` | List all tags |

### Mutations

| Mutation | Description |
|----------|-------------|
| `createPost(input)` | Create a new post |
| `updatePost(id, input)` | Update an existing post |
| `deletePost(id)` | Delete a post |
| `createComment(postId, input)` | Add a comment to a post |
| `deleteComment(id)` | Delete a comment |

## Example Query

```graphql
query {
  posts(first: 2) {
    edges {
      node {
        title
        author { name }
        tags { name }
      }
    }
    pageInfo {
      hasPageNext
      endCursor
    }
  }
}
```

## Project Structure

```
api/
├── Dockerfile
├── package.json
└── src/
    └── server.ts
docker-compose.yml
README.md
```
