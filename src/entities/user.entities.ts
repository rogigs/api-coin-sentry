import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index("email_index")
  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  toJSON() {
    return { ...this, password: undefined, verified: undefined };
  }
}
