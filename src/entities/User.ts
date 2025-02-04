import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, OneToMany } from "typeorm";
import { UserIngredient } from "./UserIngredient";
import { Recipe } from "./Recipe";
@Entity("tbl_Users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  user_id: string;

  @Column()
  user_name: string;

  @Column({ unique: true })
  user_email: string;

  @Column()
  user_password: string;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @OneToMany(() => UserIngredient, (userIngredient) => userIngredient.user)
  userIngredients: UserIngredient[];

  @OneToMany(() => Recipe, (recipe) => recipe.author)
  recipes: Recipe[];
}
