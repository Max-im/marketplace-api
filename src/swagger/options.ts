import swaggerJsDoc from 'swagger-jsdoc';
import { itemRequestSchema, itemResponseSchema } from './schema/item';
import { rentRequestSchema, rentResponseSchema } from './schema/rent';

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Peer-to-Peer Rental Platform API',
            description: 'API documentation for the peer-to-peer rental platform',
            version: '1.0.0',
        },
        tags: [
            {
                name: 'Item',
                description: 'Item endpoints',
            },
        ],
        components: {
            schemas: {
                ItemResponse: itemResponseSchema,
                ItemRequest: itemRequestSchema,
                RentResponse: rentResponseSchema,
                RentRequest: rentRequestSchema,
            },
        },
    },
    apis: process.env.NODE_ENV === 'production' ? ['./dist/**/*.js'] : ['./src/**/*.ts'],
    exposeRoute: true,
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;