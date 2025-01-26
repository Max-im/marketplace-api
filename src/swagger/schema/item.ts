export const itemRequestSchema = {
    type: "object",
    properties: {
        name: {
            type: "string",
            description: "The name of the item.",
            example: "Item Name",
        },
        description: {
            type: "string",
            description: "The description of the item.",
            example: "Item Description",
        },
        price: {
            type: "number",
            description: "The price of the item.",
            example: 100.00,
        }
    }
};


export const itemResponseSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",
            description: "The unique ID of the item.",
            example: "6796948e2cf0ee52025b335a",
        },
        ...itemRequestSchema.properties
    }
};

