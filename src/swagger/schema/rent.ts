export const rentRequestSchema = {
    type: "object",
    properties: {
        startDate: {
            type: "string",
            description: "The start date of the rent.",
            example: "2025-01-27T00:00:00.000Z",
        },
        endDate: {
            type: "string",
            description: "The start date of the rent.",
            example: "2025-01-28T00:00:00.000Z",
        },
    }
};

export const rentResponseSchema = {
    type: "object",
    properties: {
        rentId: {
            type: "string",
            description: "The unique ID of the rent.",
            example: "6796bba057b5c024486f8438",
        },
        itemId: {
            type: "string",
            description: "The unique ID of the item.",
            example: "6796948e2cf0ee52025b335a",
        },
        ...rentRequestSchema.properties,
    }
};
