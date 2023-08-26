import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Historic {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  operation: string;

  @Column()
  category: string;

  @Column()
  value_item: number;

  @Column()
  date_input: string;
}
