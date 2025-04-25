# Shomi Backend – Project 400

Welcome to the backend of **Shomi**, a full-stack application designed to help users manage their pantry, scan barcodes, track food expiration, create and cook recipes, and maintain a shopping list.

This backend is built using **Node.js**, **Express**, **TypeScript**, and **PostgreSQL**, and provides a RESTful API that integrates with the Shomi mobile app (built in React Native).

---

## Tech Stack

- **Node.js** + **Express**
- **TypeScript**
- **PostgreSQL** (with TypeORM)
- **Supabase Auth** integration (via JWT)
- **REST API structure**
- **Axios** for API consumption (frontend)
- **CI/CD** with GitHub Actions / Azure DevOps (if configured)

---

## Project Structure

```
src/
├── controllers/       # Route logic for each API endpoint
├── services/          # Business logic and helpers
├── repositories/      # Database access using TypeORM
├── entities/          # TypeORM entities (database models)
├── middleware/        # Authentication, error handling, etc.
├── routes/            # API route definitions
├── utils/             # Utility functions
└── index.ts           # Entry point of the app
```

---

## Authentication

This backend expects a `Bearer` token (JWT) from **Supabase Auth** to be attached to all protected requests.

- Use `Authorization: Bearer <access_token>` in the request headers.
- JWTs are verified on protected routes via middleware.

---

## License

This project is private and intended for academic and educational use only.
