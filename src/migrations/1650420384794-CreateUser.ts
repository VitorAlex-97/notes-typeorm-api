import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUser1650420384794 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "tb_users",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true
                    },
                    {
                        name: "username",
                        type: "varchar",
                        isUnique: true,
                        isNullable: false
                    },
                    {
                        type: "varchar",
                        name: "pass",
                        isNullable: false
                    },
                    {
                        type: "text",
                        name: "photo",
                        isNullable: true,
                        default: null
                    }
                ]
            }),
            true,
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tb_users")
    }

}
