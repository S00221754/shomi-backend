// File: src/services/recommendationService.ts

import { Recipe } from "../entities/Recipe";
import { Ingredient } from "../entities/Ingredient";
import { RecipeIngredient } from "../types/recipeIngredient";
import createHttpError from "http-errors";
import ingredientRepository from "../repositories/ingredientRepository";
import userIngredientRepository from "../repositories/userIngredientRepository";
import recipeRepository from "../repositories/recipeRepository";
import { RecipeMatchResult } from "../types/recipe";

export const getRecommendedRecipes = async (
  userId: string,
  selectedIngredientIds: string[] = []
): Promise<Recipe[]> => {
  // get all pantry ingredients for the user
  const pantry = await userIngredientRepository.getUserIngredients(userId);

  if (!pantry || pantry.length === 0) {
    throw new createHttpError.NotFound("No pantry ingredients found.");
  }

  const pantryIngredients = pantry.map((ui) => ui.ingredient);

  //  if the user selected ingredients, load them from repo
  const selectedIngredients =
    selectedIngredientIds.length > 0
      ? await Promise.all(
          selectedIngredientIds.map((id) =>
            ingredientRepository.getIngredientById(id)
          )
        ).then((res) => res.filter(Boolean) as Ingredient[])
      : [];

  // a helper that sets from pantry and selected ingredients
  const pantryIds = pantryIngredients.map((i) => i.Ing_id.toString());
  const pantryCategories = pantryIngredients
    .map((i) => i.category?.id)
    .filter(Boolean);
  const pantryKeywords = pantryIngredients.flatMap((i) => i.Ing_keywords || []);

  const selectedIds = selectedIngredients.map((i) => i.Ing_id.toString());
  const selectedCategories = selectedIngredients
    .map((i) => i.category?.id)
    .filter(Boolean);
  const selectedKeywords = selectedIngredients.flatMap(
    (i) => i.Ing_keywords || []
  );

  // get all recipes (further optimization by adding pagination)
  const { data: allRecipes } = await recipeRepository.getRecipes();

  // score each recipe based on the match type direct match with the selected ingredients, or pantry or category match
  const scoredRecipes: RecipeMatchResult[] = allRecipes.map((recipe) => {
    let score = 0;
    const matchDetails: RecipeMatchResult["matchDetails"] = [];

    for (const ing of recipe.ingredients as RecipeIngredient[]) {
      const id = ing.ingredient_id.toString();

      if (selectedIds.includes(id)) {
        score += 3;
        matchDetails.push({ ingredientId: id, type: "direct" });

        // Priority 2: direct match with pantry
      } else if (pantryIds.includes(id)) {
        score += 2;
        matchDetails.push({ ingredientId: id, type: "direct" });

        // Priority 3: category match from selected
      } else {
        const ingredientEntity = pantryIngredients.find(
          (i) => i.Ing_id.toString() === id
        );

        if (
          ingredientEntity &&
          selectedCategories.includes(ingredientEntity.category?.id)
        ) {
          score += 2;
          matchDetails.push({ ingredientId: id, type: "category" });

          // Priority 4: category match from pantry
        } else if (
          ingredientEntity &&
          pantryCategories.includes(ingredientEntity.category?.id)
        ) {
          score += 1;
          matchDetails.push({ ingredientId: id, type: "category" });

          // Priority 5: keyword match (from name split)
        } else {
          const recipeKeywords =
            ing.ingredient_name?.toLowerCase().split(" ") || [];

          if (
            recipeKeywords.some((kw) => selectedKeywords.includes(kw)) ||
            recipeKeywords.some((kw) => pantryKeywords.includes(kw))
          ) {
            score += 1;
            matchDetails.push({ ingredientId: id, type: "keyword" });
          }
        }
      }
    }

    return { recipe, score, matchDetails };
  });

  //return recipes sorted by score, removing non-matches
  return scoredRecipes
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.recipe);
};

export default {
  getRecommendedRecipes,
};
