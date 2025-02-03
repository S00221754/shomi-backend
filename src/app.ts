import express from 'express';
// import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';
// import compression from 'compression';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import errorHandler from './middleware/errorHandler';

import userAccountRoutes from './routes/user-account.routes';
import ingredientRoutes from './routes/ingredient.routes';

const app = express();

// app.use(cors({
//     credentials: true,
// }));

app.use(cors());
app.use(express.json());

/*************routes *************/

// user account routes
app.use('/api/v1/user-account', userAccountRoutes);

// ingredient routes
app.use('/api/v1/ingredient', ingredientRoutes);

// swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// error handler (this should be last middleware)
app.use(errorHandler);

export default app;
