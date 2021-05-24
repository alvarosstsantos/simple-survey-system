import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSurveysQuestions1621886202549 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "surveys_questions",
        columns: [
          {
            name: "surveyId",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "questionId",
            type: "uuid",
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            name: "FKSurveyQuestion",
            referencedTableName: "surveys",
            referencedColumnNames: ["id"],
            columnNames: ["surveyId"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "FKQuestionSurvey",
            referencedTableName: "questions",
            referencedColumnNames: ["id"],
            columnNames: ["questionId"],
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("surveys_questions");
  }
}
