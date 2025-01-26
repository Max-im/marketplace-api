import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import itemRouter from './item';
import { connect } from './db';
import { NOT_FOUND_MSG } from './constants';
import { appHandler } from './handlers';
import { swaggerDocs } from './swagger';

async function getApplication() {
    const app = express();
    app.use(cors());
    
    await connect()
    .then(console.log)
    .catch(console.error);
    
    app.use(express.json());
      app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    app.use(itemRouter);

    app.all('*', (req, res) => {
        res.status(404).json({ message: NOT_FOUND_MSG });
    });

    app.use(appHandler);

    return app;
}

export default getApplication;