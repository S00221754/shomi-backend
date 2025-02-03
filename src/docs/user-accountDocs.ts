const userAccountDocs = {
    "/api/v1/user-account/signup": {
      post: {
        summary: "Register a new user",
        tags: ["User Account"],
        requestBody: {
          description: "User signup details",
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email", "password"],
                properties: {
                  name: { type: "string" },
                  email: { type: "string" },
                  password: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "User registered successfully" },
          400: { description: "User already exists / Bad Request" },
          500: { description: "Server error" },
        },
      },
    },
  
    "/api/v1/user-account/login": {
      post: {
        summary: "Log in a user",
        tags: ["User Account"],
        requestBody: {
          description: "User login credentials",
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string" },
                  password: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Login successful" },
          400: { description: "Invalid credentials" },
          500: { description: "Server error" },
        },
      },
    },
  };
  
  export default userAccountDocs;
  