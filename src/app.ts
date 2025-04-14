import express from "express";
// import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';
// import compression from 'compression';
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import errorHandler from "./middleware/errorHandler";

import profileRoutes from "./routes/proflie.routes";
import ingredientRoutes from "./routes/ingredient.routes";
import userIngredientRoutes from "./routes/user-ingredient.routes";
import recipeRoutes from "./routes/recipes.routes";
import unitTypeRoutes from "./routes/unit-types.routes";
import bookmarkRecipeRoutes from "./routes/bookmarkRecipe.routes";
import shoppingListRoutes from "./routes/shoppingList.routes";
import ingredientCategoryRoutes from "./routes/ingredientCategories.route";

const app = express();

// app.use(cors({
//     credentials: true,
// }));

app.use(cors());
app.use(express.json());

/*************routes *************/

//profile routes
app.use("/api/v1/profile", profileRoutes);

// ingredient routes
app.use("/api/v1/ingredient", ingredientRoutes);

// user ingredients routes
app.use("/api/v1/user-ingredient", userIngredientRoutes);

// recipe routes
app.use("/api/v1/recipes", recipeRoutes);

// unit types routes
app.use("/api/v1/unit-types", unitTypeRoutes);

// bookmark recipe routes
app.use("/api/v1/bookmarks", bookmarkRecipeRoutes);

// shopping list routes
app.use("/api/v1/shopping-list", shoppingListRoutes);

// ingredient categories routes
app.use("/api/v1/ingredient-categories", ingredientCategoryRoutes);

// swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// error handler (this should be last middleware)
app.use(errorHandler);

export default app;
