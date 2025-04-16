import { DeepPartial } from "typeorm";
import { IngredientCategory } from "../entities/IngredientCategories";
import { UnitType } from "../entities/UnitType";
import AppDataSource from "./data-source";

const defaultUnitTypes = [
  // mass
  {
    name: "g",
    label: "Grams",
    type: "mass",
    baseUnit: "g",
    multiplierToBase: 1,
  },
  {
    name: "kg",
    label: "Kilograms",
    type: "mass",
    baseUnit: "g",
    multiplierToBase: 1000,
  },
  {
    name: "mg",
    label: "Milligrams",
    type: "mass",
    baseUnit: "g",
    multiplierToBase: 0.001,
  },
  {
    name: "oz",
    label: "Ounces",
    type: "mass",
    baseUnit: "g",
    multiplierToBase: 28.35,
  },
  {
    name: "lb",
    label: "Pounds",
    type: "mass",
    baseUnit: "g",
    multiplierToBase: 453.592,
  },

  // volume
  {
    name: "ml",
    label: "Milliliters",
    type: "volume",
    baseUnit: "ml",
    multiplierToBase: 1,
  },
  {
    name: "l",
    label: "Liters",
    type: "volume",
    baseUnit: "ml",
    multiplierToBase: 1000,
  },
  {
    name: "tsp",
    label: "Teaspoons",
    type: "volume",
    baseUnit: "ml",
    multiplierToBase: 4.93,
  },
  {
    name: "tbsp",
    label: "Tablespoons",
    type: "volume",
    baseUnit: "ml",
    multiplierToBase: 14.79,
  },
  {
    name: "cup",
    label: "Cups",
    type: "volume",
    baseUnit: "ml",
    multiplierToBase: 240,
  },
];

const defaultIngredientCategories = [
  { name: "Vegetables", description: "e.g. carrots, broccoli, spinach" },
  { name: "Fruits", description: "e.g. apples, bananas, berries" },
  { name: "Dairy", description: "e.g. milk, butter, yoghurt" },
  { name: "Meat", description: "e.g. beef, pork, lamb" },
  { name: "Seafood", description: "e.g. salmon, prawns, tuna" },
  { name: "Poultry", description: "e.g. chicken, turkey, duck" },
  { name: "Spices & Herbs", description: "e.g. basil, cumin, oregano" },
  { name: "Condiments", description: "e.g. ketchup, mustard, brown sauce" },
  { name: "Baking", description: "e.g. flour, sugar, baking powder" },
  { name: "Grains & Pasta", description: "e.g. rice, pasta, oats" },
  { name: "Pantry Staples", description: "e.g. salt, vinegar, oil" },
  { name: "Canned Goods", description: "e.g. tinned tomatoes, baked beans" },
  { name: "Frozen Foods", description: "e.g. frozen veg, oven chips" },
  { name: "Snacks", description: "e.g. crisps, nuts, cereal bars" },
  { name: "Beverages", description: "e.g. squash, tea, juice" },
  { name: "Oils & Fats", description: "e.g. olive oil, lard, butter" },
  {
    name: "Legumes & Beans",
    description: "e.g. lentils, kidney beans, chickpeas",
  },
  { name: "Sauces & Marinades", description: "e.g. gravy, pesto, curry sauce" },
  { name: "Nuts & Seeds", description: "e.g. almonds, sunflower seeds" },
  { name: "Breakfast Foods", description: "e.g. Weetabix, jam, porridge oats" },
  { name: "Sweets & Desserts", description: "e.g. chocolate, biscuits, cake" },
  {
    name: "Tofu & Plant-Based Proteins",
    description: "e.g. tofu, Quorn, tempeh",
  },
  { name: "Cheese", description: "e.g. cheddar, mozzarella, Red Leicester" },
  { name: "Bread & Bakery", description: "e.g. sliced bread, rolls, scones" },
  { name: "Uncategorized", description: "Items not yet categorised" },
];

// may need updating for production database
export const seedUnitTypes = async () => {
  const repo = AppDataSource.getRepository(UnitType);
  for (const unit of defaultUnitTypes) {
    const exists = await repo.findOneBy({ name: unit.name });
    if (!exists) {
      await repo.save(repo.create(unit as DeepPartial<UnitType>));
    }
  }
};

export const seedIngredientCategories = async () => {
  const repo = AppDataSource.getRepository(IngredientCategory);

  for (const { name, description } of defaultIngredientCategories) {
    const existing = await repo.findOneBy({ name });

    if (!existing) {
      const newCategory = repo.create({ name, description });
      await repo.save(newCategory);
    } else if (!existing.description) {
      existing.description = description;
      await repo.save(existing);
    }
  }
};
