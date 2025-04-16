import createHttpError from "http-errors";
import { Recipe } from "entities/Recipe";
import recipeRepository from "../repositories/recipeRepository";
import { CreateRecipeDTO, UpdateRecipeDTO } from "types/recipe";
import ingredientRepository from "../repositories/ingredientRepository";
import profileRepository from "../repositories/profileRepository";
import userIngredientRepository from "../repositories/userIngredientRepository";
import AppDataSource from "../database/data-source";
import { UnitType } from "../entities/UnitType";

const requiredFields: { key: keyof CreateRecipeDTO; label: string }[] = [
  { key: "recipe_name", label: "Recipe Name" },
  { key: "recipe_description", label: "Recipe Description" },
  { key: "cooking_time", label: "Cooking Time" },
  { key: "author_id", label: "Author ID" },
];

// looking into a better way to do the validation for the backend

export const addRecipe = async (recipe: CreateRecipeDTO): Promise<Recipe> => {
  // Check if all required fields are present
  const missingFields = requiredFields
    .filter((field) => !recipe[field.key])
    .map((field) => field.label);

  if (missingFields.length > 0) {
    throw new createHttpError.BadRequest(
      `Missing required fields: ${missingFields.join(", ")}.`
    );
  }

  if (recipe.cooking_time <= 0) {
    throw new createHttpError.BadRequest(
      "Cooking time must be a positive number."
    );
  }

  if (!Array.isArray(recipe.ingredients) || recipe.ingredients.length === 0) {
    throw new createHttpError.BadRequest(
      "Recipe must have at least one ingredient."
    );
  }

  for (const ingredient of recipe.ingredients) {
    const ingredientExists = await ingredientRepository.getIngredientById(
      ingredient.ingredient_id
    );

    if (!ingredientExists) {
      throw new createHttpError.NotFound(
        `Ingredient with ID ${ingredient.ingredient_id} not found.`
      );
    }
  }

  const user = await profileRepository.findProfileById(recipe.author_id);

  if (!user) {
    throw new createHttpError.NotFound("User not found.");
  }

  return await recipeRepository.addRecipe(recipe, user);
};

export const getRecipes = async (): Promise<Recipe[]> => {
  return await recipeRepository.getRecipes();
};

export const findRecipeById = async (
  id: string
): Promise<Recipe | undefined> => {
  const result = await recipeRepository.findRecipeById(id);

  if (!result) {
    throw new createHttpError.NotFound("Recipe not found.");
  }

  return result;
};

export const updateRecipe = async (
  id: string,
  updatedRecipe: UpdateRecipeDTO
): Promise<Recipe> => {
  const recipe = await recipeRepository.findRecipeById(id);
  const user = await profileRepository.findProfileById(updatedRecipe.author_id);
  if (!recipe) {
    throw new createHttpError.NotFound("Recipe not found.");
  }

  if (!user) {
    throw new createHttpError.NotFound("User not found.");
  }

  const fieldsToCheck: { key: keyof UpdateRecipeDTO; label: string }[] = [
    { key: "recipe_name", label: "Recipe name" },
    { key: "recipe_description", label: "Recipe description" },
    { key: "recipe_instructions", label: "Recipe instructions" },
  ];

  for (const field of fieldsToCheck) {
    const value = updatedRecipe[field.key];
    if (typeof value === "string" && value.trim() === "") {
      throw new createHttpError.BadRequest(`${field.label} cannot be empty.`);
    }
  }

  if (
    updatedRecipe.cooking_time !== undefined &&
    updatedRecipe.cooking_time <= 0
  ) {
    throw new createHttpError.BadRequest(
      "Cooking time must be a positive number."
    );
  }

  if (updatedRecipe.ingredients !== undefined) {
    if (
      !Array.isArray(updatedRecipe.ingredients) ||
      updatedRecipe.ingredients.length === 0
    ) {
      throw new createHttpError.BadRequest(
        "Recipe must have at least one ingredient."
      );
    }
  }

  if (updatedRecipe.ingredients) {
    for (const ingredient of updatedRecipe.ingredients) {
      if (ingredient.quantity <= 0) {
        throw new createHttpError.BadRequest(
          `Ingredient quantity of ${ingredient.ingredient_name}  must be a positive number.`
        );
      }
    }
  }

  for (const ingredient of updatedRecipe.ingredients) {
    const ingredientExists = await ingredientRepository.getIngredientById(
      ingredient.ingredient_id
    );

    if (!ingredientExists) {
      throw new createHttpError.NotFound(
        `Ingredient with ID ${ingredient.ingredient_id} not found.`
      );
    }
  }

  Object.assign(recipe, updatedRecipe);
  return await recipeRepository.updateRecipe(recipe, user);
};

export const deleteRecipe = async (id: string): Promise<void> => {
  const recipe = await findRecipeById(id);

  if (!recipe) {
    throw new createHttpError.NotFound("Recipe not found.");
  }

  await recipeRepository.deleteRecipe(id);
};

// export const getRecommendedRecipes = async (
//   userId: string,
//   ingredientsIdsArray: string[] = []
// ): Promise<Recipe[]> => {
//   const user = await profileRepository.findProfileById(userId);

//   if (!user) {
//     throw new createHttpError.NotFound("User not found.");
//   }

//   return await recipeRepository.getRecommendedRecipes(
//     userId,
//     ingredientsIdsArray
//   );
// };

//NEEDS A LOT OF TESTING SCENARIOS
export const getRecipeDeductionPreview = async (
  userId: string,
  recipeId: string
) => {
  const recipe = await recipeRepository.findRecipeById(recipeId);
  if (!recipe) throw new createHttpError.NotFound("Recipe not found");

  const pantry = await userIngredientRepository.getUserIngredients(userId);
  if (!pantry.length) throw new createHttpError.NotFound("Pantry is empty");

  // will change to a method instead of repository to maintain clean artchitecture
  const unitTypes = await AppDataSource.getRepository(UnitType).find();
  const getUnitMeta = (name: string) =>
    unitTypes.find(
      (u) => u.name.trim().toLowerCase() === name?.trim().toLowerCase()
    );

  // initial values
  const now = new Date();
  const previewResults = [];
  const MINIMUM_SCORE = 5; // Minimum score to consider a match

  // Goes through each ingredient in the recipe and finds the best match in the pantry
  for (const ingredient of recipe.ingredients) {
    const recipeUnit = getUnitMeta(ingredient.unit);
    if (!recipeUnit) continue;

    // Filter pantry items that match the recipe unit type and are not expired
    // TODO: needs to match with the next expriing date of the pantry item
    // may be handled by the dedecution service
    const potentialMatches = pantry.filter((item) => {
      const pantryUnit = getUnitMeta(item.unitType);
      if (!pantryUnit) return false;

      const sameType =
        recipeUnit.type === pantryUnit.type &&
        recipeUnit.baseUnit === pantryUnit.baseUnit;
      const notExpired = !item.expiry_date || new Date(item.expiry_date) > now;

      return sameType && notExpired;
    });

    // rank the match by a scoring system
    const scored = potentialMatches.map((batch) => {
      let score = 0;
      const reasons = [];

      // If the ingredient ID matches, max score given
      const isExactMatch = batch.ingredient.Ing_id == ingredient.ingredient_id;
      if (isExactMatch) {
        score += 10;
        reasons.push("Exact ingredient match");
      }

      // if recipe name contains a keyword from the pantry ingredient
      if (
        batch.ingredient.Ing_keywords?.some((kw) =>
          ingredient.ingredient_name?.toLowerCase().includes(kw)
        )
      ) {
        score += 2;
        reasons.push("Keyword match");
      }

      //if name includes the ingredient
      if (
        batch.ingredient.Ing_name?.toLowerCase().includes(
          ingredient.ingredient_name.toLowerCase()
        )
      ) {
        score += 1;
        reasons.push("Name inclusion match");
      }

      // we reduce the score if match wasn't exact but reached a high score
      if (!isExactMatch && score >= 10) {
        score = 5;
        reasons.push("Score reduced due to lack of exact match");
      }

      return {
        recipe_ingredient: ingredient,
        matched_user_ingredient: {
          id: batch.id,
          ingredient_id: batch.ingredient.Ing_id,
          ingredient_name: batch.ingredient.Ing_name,
          unit: batch.unitType,
        },
        confidence_score: score,
        reason: reasons.join(", "),
      };
    });

    scored.sort((a, b) => b.confidence_score - a.confidence_score);
    const topMatch =
      scored.length > 0 && scored[0].confidence_score >= MINIMUM_SCORE
        ? scored[0]
        : null;

    previewResults.push({
      recipe_ingredient: ingredient,
      matched_user_ingredient: topMatch?.matched_user_ingredient || null,
      reason: topMatch?.reason || "No match found",
      confidence_score: topMatch?.confidence_score || 0,
    });
  }

  return previewResults;
};

export default {
  addRecipe,
  getRecipes,
  findRecipeById,
  updateRecipe,
  deleteRecipe,
  // getRecommendedRecipes,
  getRecipeDeductionPreview,
};
