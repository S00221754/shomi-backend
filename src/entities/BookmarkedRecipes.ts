import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { Profile } from "./Profile";
import { Recipe } from "./Recipe";

@Entity("bookmarked_recipes")
export class BookmarkedRecipe {
  @PrimaryColumn("uuid")
  user_id: string;

  @PrimaryColumn("uuid")
  recipe_id: string;

  @ManyToOne(() => Profile, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: Profile;

  @ManyToOne(() => Recipe, { onDelete: "CASCADE" })
  @JoinColumn({ name: "recipe_id" })
  recipe: Recipe;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;
}
