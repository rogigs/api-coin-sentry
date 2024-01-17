import { Entity, Column, PrimaryGeneratedColumn, Check } from "typeorm";

@Entity("finances")
@Check(`"operation" IN ('entrada', 'saida')`)
export class Finances {
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

  // TODO: add date
  @Column()
  date_input: string;
}
