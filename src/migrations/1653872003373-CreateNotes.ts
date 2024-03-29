import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateNotes1653872003373 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: "tb_notes",
                columns: [
                    {
                        name: "id",
                        type: "numeric",
                        isPrimary: true,
                        generatedIdentity: 'ALWAYS'
                    },
                    {
                        name: "title",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "body",
                        type: "text",
                        isNullable: true
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "editedAt",
                        type: "timestamp",
                        default: null
                    },
                    {
                        name: "userId",
                        type: "varchar"
                    },
                    {
                        name: "categoryId",
                        type: "numeric"
                    }
                ],
                foreignKeys: [
                    {
                        name: "fk_note_user",
                        columnNames: ["userId"],
                        referencedTableName: "tb_users",
                        referencedColumnNames: ["id"]
                    },
                    {
                        name: "fk_note_category",
                        columnNames: ["categoryId"],
                        referencedTableName: "tb_categories",
                        referencedColumnNames: ["id"]
                    }
                ]
            }),
            true,
            true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tb_notes")
    }

}
