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
        "post": {
            "summary": "Get recommended recipes for a user",
            "description": "Returns a list of recommended recipes based on the user's pantry ingredients. Users can optionally provide selected ingredients to prioritize specific recipes.",
            "tags": ["Recipe"],
            "parameters": [
                {
                    "name": "userId",
                    "in": "path",
                    "required": true,
                    "schema": {
                        "type": "string"
                    },
                    "description": "The unique identifier of the user for whom recipes are being recommended."
                }
            ],
            "requestBody": {
                "required": false,
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "selectedIngredients": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    },
                                    "description": "Array of ingredient IDs that the user wants to prioritize in the recommendations."
                                }
                            }
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "List of recommended recipes based on user's pantry and selected ingredients.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "array",
                                "items": {
                                    "$ref": "#/components/schemas/Recipe"
                                }
                            }
                        }
                    }
                },
                "400": {
                    "description": "Bad Request - Invalid input data."
                },
                "404": {
                    "description": "User not found or no recommendations available."
                },
                "500": {
                    "description": "Server error - Unexpected issue occurred."
                }
            }
        }
    },
    "components": {
        "schemas": {
            "Recipe": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "description": "The unique identifier of the recipe."
                    },
                    "name": {
                        "type": "string",
                        "description": "The name of the recipe."
                    },
                    "ingredients": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "ingredient_id": {
                                    "type": "string",
                                    "description": "The unique identifier of the ingredient."
                                },
                                "quantity": {
                                    "type": "string",
                                    "description": "The quantity of the ingredient required."
                                }
                            }
                        }
                    },
                    "instructions": {
                        "type": "string",
                        "description": "Step-by-step cooking instructions."
                    },
                    "time": {
                        "type": "string",
                        "description": "Estimated time required to prepare the recipe."
                    }
                }
            }
        }
    }
};

export default recipeDocs;
