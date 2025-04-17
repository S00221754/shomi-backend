const unitTypeDocs = {
  "/api/v1/unit-types": {
    get: {
      summary: "Get all unit types",
      tags: ["Unit Types"],
      responses: {
        200: { description: "Unit types retrieved successfully" },
        500: { description: "Server error" },
      },
    },
    patch: {
      summary: "Update unit types to include missing ones from ingredients",
      tags: ["Unit Types"],
      security: [{ BearerAuth: [] as string[] }],
      responses: {
        200: { description: "Unit types updated successfully" },
        500: { description: "Server error" },
      },
    },
  },

  "/api/v1/unit-types/:id": {
    get: {
      summary: "Get a unit type by ID",
      tags: ["Unit Types"],
      parameters: [
        {
          in: "path",
          name: "id",
          schema: { type: "string" },
          required: true,
          description: "ID of the unit type",
        },
      ],
      responses: {
        200: { description: "Unit type retrieved successfully" },
        404: { description: "Unit type not found" },
        500: { description: "Server error" },
      },
    },
    delete: {
      summary: "Delete a unit type by ID",
      tags: ["Unit Types"],
      security: [{ BearerAuth: [] as string[] }],
      parameters: [
        {
          in: "path",
          name: "id",
          schema: { type: "string" },
          required: true,
          description: "ID of the unit type to delete",
        },
      ],
      responses: {
        204: { description: "Unit type deleted successfully" },
        404: { description: "Unit type not found" },
        500: { description: "Server error" },
      },
    },
  },

  "/api/v1/unit-types/name/:name": {
    get: {
      summary: "Get a unit type by name",
      tags: ["Unit Types"],
      parameters: [
        {
          in: "path",
          name: "name",
          schema: { type: "string" },
          required: true,
          description: "Name of the unit type",
        },
      ],
      responses: {
        200: { description: "Unit type retrieved successfully" },
        404: { description: "Unit type not found" },
        500: { description: "Server error" },
      },
    },
  },
};

export default unitTypeDocs;
