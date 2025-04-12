import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
  } from "typeorm";
  import { Ingredient } from "./Ingredient";
  import { Profile } from "./Profile";
  
  @Entity("shopping_list")
  export class ShoppingList extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    Shop_id: string;
  
    @Column("uuid")
    user_id: string;
  
    @ManyToOne(() => Profile)
    @JoinColumn({ name: "user_id" })
    user: Profile;
  
    @ManyToOne(() => Ingredient)
    @JoinColumn({ name: "ingredient_id" })
    ingredient: Ingredient;
  
    @Column()
    ingredient_id: number;
  
    @Column("float", { nullable: true })
    Shop_quantity: number;
  
    @Column({ default: false })
    Shop_added_automatically: boolean;
  
    @Column({ type: "text", nullable: true })
    Shop_reason: string;
  
    @CreateDateColumn()
    Shop_created_at: Date;
  }
  