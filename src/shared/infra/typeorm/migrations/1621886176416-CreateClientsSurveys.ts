import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateClientsSurveys1621886176416 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "clients_surveys",
        columns: [
          {
            name: "clientId",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "surveyId",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "answer",
            type: "jsonb",
            isNullable: true,
          },
          {
            name: "sentAt",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "answeredAt",
            type: "timestamp",
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: "FKClientSurvey",
            referencedTableName: "clients",
            referencedColumnNames: ["id"],
            columnNames: ["clientId"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FKSurveyClient",
            referencedTableName: "surveys",
            referencedColumnNames: ["id"],
            columnNames: ["surveyId"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("clients_surveys");
  }
}
