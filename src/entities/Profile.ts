import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("profiles")
export class Profile {
  @PrimaryColumn("uuid")
  id: string;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  full_name: string;

  @Column({ nullable: true })
  avatar_url: string;

  @Column({ nullable: true })
  website: string;

  @Column({ type: "timestamp", nullable: true })
  updated_at: Date;
}
