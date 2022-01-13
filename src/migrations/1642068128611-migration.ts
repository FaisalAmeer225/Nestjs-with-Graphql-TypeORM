import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1642068128611 implements MigrationInterface {
    name = 'migration1642068128611'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher" DROP CONSTRAINT "FK_e574e9b6d0e633e0b825b136706"`);
        await queryRunner.query(`CREATE TABLE "teacher_students_student" ("teacherId" uuid NOT NULL, "studentRollNumber" uuid NOT NULL, CONSTRAINT "PK_1db889b1fb65f62ffb325995cd3" PRIMARY KEY ("teacherId", "studentRollNumber"))`);
        await queryRunner.query(`CREATE INDEX "IDX_099234f0e507f8d97fbcacd14b" ON "teacher_students_student" ("teacherId") `);
        await queryRunner.query(`CREATE INDEX "IDX_346993f803ad94ff8dcbc07ac1" ON "teacher_students_student" ("studentRollNumber") `);
        await queryRunner.query(`ALTER TABLE "teacher" ADD "studentRollNumber" uuid`);
        await queryRunner.query(`ALTER TABLE "teacher" ADD CONSTRAINT "FK_ed004f768f4314ace896d617968" FOREIGN KEY ("studentRollNumber") REFERENCES "student"("rollNumber") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teacher_students_student" ADD CONSTRAINT "FK_099234f0e507f8d97fbcacd14b3" FOREIGN KEY ("teacherId") REFERENCES "teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "teacher_students_student" ADD CONSTRAINT "FK_346993f803ad94ff8dcbc07ac19" FOREIGN KEY ("studentRollNumber") REFERENCES "student"("rollNumber") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher_students_student" DROP CONSTRAINT "FK_346993f803ad94ff8dcbc07ac19"`);
        await queryRunner.query(`ALTER TABLE "teacher_students_student" DROP CONSTRAINT "FK_099234f0e507f8d97fbcacd14b3"`);
        await queryRunner.query(`ALTER TABLE "teacher" DROP CONSTRAINT "FK_ed004f768f4314ace896d617968"`);
        await queryRunner.query(`ALTER TABLE "teacher" DROP COLUMN "studentRollNumber"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_346993f803ad94ff8dcbc07ac1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_099234f0e507f8d97fbcacd14b"`);
        await queryRunner.query(`DROP TABLE "teacher_students_student"`);
        await queryRunner.query(`ALTER TABLE "teacher" ADD CONSTRAINT "FK_e574e9b6d0e633e0b825b136706" FOREIGN KEY ("studentsRollNumber") REFERENCES "student"("rollNumber") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
