import { IngredientCategory } from "../entities/IngredientCategories";
import { UnitType } from "../entities/UnitType";
import AppDataSource from "./data-source";

console.log("🔥 SEED SCRIPT STARTED");

const defaultUnitTypes = [
  "g",
  "kg",
  "mg",
  "oz",
  "lb",
  "ml",
  "l",
  "tsp",
  "tbsp",
  "cup",
  "pinch",
  "slice",
  "clove",
  "can",
  "pack",
  "bottle",
  "jar",
  "piece",
  "unit",
  "serving",
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

export const seedUnitTypes = async () => {
  console.log("Seeding unit types...");

  const repo = AppDataSource.getRepository(UnitType);

  for (const name of defaultUnitTypes) {
    const exists = await repo.findOneBy({ name });
    if (!exists) {
      await repo.save(repo.create({ name }));
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
