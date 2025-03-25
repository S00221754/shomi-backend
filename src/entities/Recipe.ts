import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { RecipeIngredient } from "../types/recipeIngredient"; // Import the type
import { Profile } from "./Profile";

// potential ideas: add a field for the image of the recipe, add a field for the category of the recipe, add a field for the tags of the recipe

@Entity("recipes")
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

    @ManyToOne(() => Profile, { onDelete: "CASCADE" })
    @JoinColumn({ name: "author_id" })
    author: Profile;
    

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;
}
