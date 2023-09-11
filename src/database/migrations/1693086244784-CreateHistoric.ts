import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateHistoric1693086244784 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "historic",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          { name: "title", type: "varchar" },
          { name: "operation", type: "varchar" },
          { name: "category", type: "varchar" },
          { name: "value_item", type: "integer" },
          { name: "date_input", type: "varchar" },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("historic");
  }
}
