import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { User } from "./User";
import { RecipeIngredient } from "../types/recipeIngredient"; // Import the type

@Entity("tbl_Recipes")
export class Recipe extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    recipe_id: string;
    
    @Column()
    recipe_name: string;
    
    @Column({ type: "text" })
    recipe_description: string;
    
    @Column({ type: "text", nullable: true })
    recipe_instructions?: string;
    
    // uses jsonb type to store the ingredients in a flexible way
    @Column({ type: "jsonb", nullable: false })
    ingredients: RecipeIngredient[];

    @Column({ type: "int", nullable: false })
    cooking_time: number;

    @ManyToOne(() => User, (user) => user.recipes, { onDelete: "CASCADE" })
    @JoinColumn({ name: "author_id" })
    author: User;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;
}
