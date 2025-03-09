const recipeDocs = {
    "/api/v1/recipes": {
        post: {
            summary: "Create a new recipe",
            tags: ["Recipe"],
            requestBody: {
                description: "Recipe details",
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/CreateRecipeDTO",
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: "Recipe created successfully",
                },
                400: {
                    description: "Bad Request",
                },
                500: {
                    description: "Server error",
                },
            },
        },
        get: {
            summary: "Get all recipes",
            tags: ["Recipe"],
            responses: {
                200: {
                    description: "List of recipes",
                },
                500: {
                    description: "Server error",
                },
            },
        },
    },
    "/api/v1/recipes/{id}": {
        get: {
            summary: "Get a recipe by ID",
            tags: ["Recipe"],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string",
                    },
                },
            ],
            responses: {
                200: {
                    description: "Recipe details",
                },
                404: {
                    description: "Recipe not found",
                },
                500: {
                    description: "Server error",
                },
            },
        },
        patch: {
            summary: "Update a recipe by ID",
            tags: ["Recipe"],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string",
                    },
                },
            ],
            requestBody: {
                description: "Updated recipe details",
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/UpdateRecipeDTO",
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "Recipe updated successfully",
                },
                400: {
                    description: "Bad Request",
                },
                404: {
                    description: "Recipe not found",
                },
                500: {
                    description: "Server error",
                },
            },
        },
        delete: {
            summary: "Delete a recipe by ID",
            tags: ["Recipe"],
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string",
                    },
                },
            ],
            responses: {
                200: {
                    description: "Recipe deleted successfully",
                },
                404: {
                    description: "Recipe not found",
                },
                500: {
                    description: "Server error",
                },
            },
        },
    },
    "/api/v1/recipes/recommended/{userId}": {
        get: {
            summary: "Get recommended recipes for a user",
            tags: ["Recipe"],
            parameters: [
                {
                    name: "userId",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string",
                    },
                },
            ],
            responses: {
                200: {
                    description: "List of recommended recipes based on user's ingredients",
                },
                400: {
                    description: "Bad Request",
                },
                404: {
                    description: "User not found or no recommendations available",
                },
                500: {
                    description: "Server error",
                },
            },
        },
    },
};

export default recipeDocs;
