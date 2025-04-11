const profileDocs = {
  "/api/v1/profile/{id}": {
    get: {
      summary: "Get a user profile by ID",
      tags: ["Profiles"],
      parameters: [
        {
          in: "path",
          name: "id",
          schema: { type: "string", format: "uuid" },
          required: true,
          description: "The UUID of the user profile",
        },
      ],
      responses: {
        200: {
          description: "Profile retrieved successfully",
          content: {
            "application/json": {
              example: {
                id: "3bf5eea8-fed5-4695-a564-667a3a6767cd",
                username: "troystan",
                full_name: "Troy Shilton",
                avatar_url: "https://example.com/avatar.jpg",
                website: "https://shomi.app",
                updated_at: "2024-03-25T12:00:00.000Z",
              },
            },
          },
        },
        404: { description: "Profile not found" },
        500: { description: "Server error" },
      },
    },
    patch: {
      summary: "Update a user profile",
      tags: ["Profiles"],
      parameters: [
        {
          in: "path",
          name: "id",
          schema: { type: "string", format: "uuid" },
          required: true,
          description: "The UUID of the user profile",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                full_name: { type: "string" },
                username: { type: "string" },
                website: { type: "string", format: "uri" },
                avatar_url: { type: "string", format: "uri" },
                expo_push_token: { type: "string" },
              },
              example: {
                full_name: "John Doe",
                username: "johndoe",
                avatar_url: "https://example.com/avatar.jpg",
                website: "https://example.com",
                expo_push_token: "ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]",
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Profile updated successfully",
          content: {
            "application/json": {
              example: { message: "Profile updated" },
            },
          },
        },
        400: { description: "No update fields provided" },
        500: { description: "Server error" },
      },
    },
  },
};

export default profileDocs;
