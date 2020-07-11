import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export default class addIdTransaction1594242447107 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.dropColumn("tabela","coluna")
    await queryRunner.addColumn("Transaction", new TableColumn(
      {
        name: "user_id",
        type: "uuid",
        isNullable: true
      }
    ))

    await queryRunner.createForeignKey("Transaction", new TableForeignKey(
      {
        name: "userName",
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        // onDelete: "SET NULL",
        onUpdate: "CASCADE",

      }
    ))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("Transaction", "userName");

    await queryRunner.dropColumn("Transaction", "user_id");


  }

}
