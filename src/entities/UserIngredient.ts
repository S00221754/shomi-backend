import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity, Unique, Check } from "typeorm";
import { User } from "./User";
import { Ingredient } from "./Ingredient";

@Entity("tbl_UserIngredients")
@Unique(["user", "ingredient"])
@Check(`"unitQuantity" >= 0`) // allows the quantity to be 0 but not negative reason: instead of removing this item from the pantry when it is zero push a notification to the user that this item is expired or empty
@Check(`"totalAmount" >= 0`) 
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
  unitQuantity: number; // this needs to be more flexible and should be adjusted based on the ingredients units. (e.g. 1 egg)


  // figure out a better solution for this but for now this will do
  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  totalAmount?: number; // e.g. for liquids, 1 Litre but just the number without the unit

  @Column({ type: "varchar", length: 50, nullable: true })
  unitType?: string; // e.g. for liquids, Litre, weight, grams, etc.

  @Column({ type: "timestamp", nullable: true, default: null })
  expiry_date?: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  added_at: Date;
}