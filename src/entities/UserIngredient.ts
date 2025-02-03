import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity, Unique } from "typeorm";
import { User } from "./User";
import { Ingredient } from "./Ingredient";

@Entity("tbl_UserIngredients")
@Unique(["user", "ingredient"])
export class UserIngredient extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.userIngredients, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  // foreign key column for users, delete cascade if user is deleted
  user: User;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.userIngredients, { onDelete: "CASCADE" })
  @JoinColumn({ name: "ingredient_id" })
  // foreign key column for ingredients, delete cascade if ingredient is deleted
  ingredient: Ingredient;

  @Column({ type: "int", default: 1 })
  quantity: number; // this needs to be more flexible and should be adjusted based on the ingredients units.

  @Column({ type: "timestamp", nullable: true })
  expiry_date?: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  added_at: Date;
}