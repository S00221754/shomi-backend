import express from 'express';
// import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';
// import compression from 'compression';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';

import userAccountRoutes from './routes/user-account.routes';

const app = express();

// app.use(cors({
//     credentials: true,
// }));

app.use(cors());
app.use(express.json());

// routes
app.use('/api/v1/user-account', userAccountRoutes);

// swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
  });

export default app;
