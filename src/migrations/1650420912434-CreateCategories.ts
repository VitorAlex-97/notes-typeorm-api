import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateCategories1650420912434 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "tb_categories",
                columns: [
                    {
                        name: "id",
                        type: "numeric",
                        isPrimary: true,
                        generatedIdentity: "ALWAYS"
                    },
                    {
                        name: "label",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "id_user",
                        type: "varchar",
                    }
                ],
                foreignKeys: [
                    {
                        name: "fk_categories_user",
                        columnNames: ["id_user"],
                        referencedTableName: "tb_users",
                        referencedColumnNames: ["id"]
                    }
                ]
            }),
            true,
            true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tb_categories")
    }

}
