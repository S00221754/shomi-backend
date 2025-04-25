import { Recipe } from "../entities/Recipe";
import { Ingredient } from "../entities/Ingredient";
import { RecipeIngredient } from "../types/recipeIngredient";
import createHttpError from "http-errors";
import ingredientRepository from "../repositories/ingredientRepository";
import userIngredientRepository from "../repositories/userIngredientRepository";
import recipeRepository from "../repositories/recipeRepository";

export const getRecommendedRecipes = async (
  userId: string,
  selectedIngredientIds: string[] = [],
  minIngredientMatchScore: number = 0.6 // this is the minimum score for a recipe ingredient to be considered a match
): Promise<Recipe[]> => {
  const pantry = await userIngredientRepository.getUserIngredients(userId);
  if (!pantry || pantry.length === 0) {
    throw new createHttpError.NotFound("No pantry ingredients found.");
  }

  const pantryIngredients = pantry.map((ui) => ui.ingredient);

  const selectedIngredients =
    selectedIngredientIds.length > 0
      ? await Promise.all(selectedIngredientIds.map((id) => ingredientRepository.getIngredientById(id))).then(
          (res) => res.filter(Boolean) as Ingredient[]
        )
      : [];

  const allIngredients = await ingredientRepository.getIngredients();
  const ingredientMap = new Map<string, Ingredient>();
  allIngredients.forEach((i) => ingredientMap.set(i.Ing_id.toString(), i));

  const { data: allRecipes } = await recipeRepository.getRecipes();

  // Filter recipes based on pantry match only
  const matchedRecipes = allRecipes.filter((recipe) => {
    const recipeIngredients = recipe.ingredients as RecipeIngredient[];
    let allMatched = true;

    for (const recipeIng of recipeIngredients) {
      const fullRecipeIng = ingredientMap.get(recipeIng.ingredient_id);
      if (!fullRecipeIng) {
        allMatched = false;
        break;
      }

      const recipeKeywords = fullRecipeIng.Ing_keywords ?? [];
      const recipeNameWords = fullRecipeIng.Ing_name.toLowerCase()
        .replace(/[^\w]+/g, " ")
        .split(" ");
      const fullRecipeWords = new Set([...recipeKeywords, ...recipeNameWords]);

      let bestScore = 0;

      // Checking matches between the recipe ingredient against each pantry item
      for (const candidate of pantryIngredients) {
        const candidateKeywords = candidate.Ing_keywords ?? [];
        const candidateNameWords = candidate.Ing_name.toLowerCase()
          .replace(/[^\w]+/g, " ")
          .split(" ");
        const fullCandidateWords = new Set([...candidateKeywords, ...candidateNameWords]);

        // Case 1: Exact match by ID
        if (candidate.Ing_id === fullRecipeIng.Ing_id) {
          bestScore = 1.0;
          break;
        }

        // Case 2: Soft match based on overlapping words
        const sharedWords = [...fullRecipeWords].filter((word) => fullCandidateWords.has(word));
        const wordOverlap = sharedWords.length / fullRecipeWords.size;
        const categoriesMatch = candidate.category?.id === fullRecipeIng.category?.id;

        // if categories match, we trust the match more
        if (categoriesMatch) {
          if (wordOverlap > 0.6 && bestScore < 0.8) {
            bestScore = 0.8; // strong keyword match
          } else if (sharedWords.length >= 2 && bestScore < 0.7) {
            bestScore = 0.7; // moderate match with at least 2 shared keywords
          } else if (sharedWords.length >= 1 && bestScore < 0.6) {
            bestScore = 0.6; // weak match, but at least 1 good keyword
          }
        } else {
          // if categories don't match, fallback scores are weaker
          if (wordOverlap > 0.6 && bestScore < 0.6) {
            bestScore = 0.6; // accept strong word overlap across categories
          } else if (sharedWords.length >= 2 && bestScore < 0.5) {
            bestScore = 0.5; // minimal fallback if at least 2 words match
          }
        }

        // category matches always boost minimum score to 0.85 if nothing stronger was found
        if (categoriesMatch && bestScore < 0.85) {
          bestScore = Math.max(bestScore, 0.85);
        }
      }

      // if no match for this ingredient reaches the required threshold, we reject the recipe
      if (bestScore < minIngredientMatchScore) {
        allMatched = false;
        break;
      }
    }

    return allMatched;
  });

  if (selectedIngredients.length === 0) {
    return matchedRecipes;
  }

  const scoredRecipes = matchedRecipes.map((recipe) => {
    const recipeIngredients = recipe.ingredients as RecipeIngredient[];
    const selectedIngredientIdsSet = new Set(selectedIngredients.map((i) => i.Ing_id));

    const selectedMatches = recipeIngredients.filter((ri) => selectedIngredientIdsSet.has(ri.ingredient_id)).length;

    return { recipe, selectedMatches };
  });

  scoredRecipes.sort((a, b) => b.selectedMatches - a.selectedMatches);

  return scoredRecipes.map((r) => r.recipe);
};

export default {
  getRecommendedRecipes,
};
