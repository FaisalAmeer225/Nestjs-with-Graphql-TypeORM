import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1641896443684 implements MigrationInterface {
    name = 'migration1641896443684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student_teachers_teacher" DROP CONSTRAINT "FK_bbce22585af3071bbe4f355a12b"`);
        await queryRunner.query(`ALTER TABLE "teacher" ADD "studentRollNumber" uuid DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "student" ADD "teacherId" uuid DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "student_teachers_teacher" ADD CONSTRAINT "FK_bbce22585af3071bbe4f355a12b" FOREIGN KEY ("teacherId") REFERENCES "teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student_teachers_teacher" DROP CONSTRAINT "FK_bbce22585af3071bbe4f355a12b"`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "teacherId"`);
        await queryRunner.query(`ALTER TABLE "teacher" DROP COLUMN "studentRollNumber"`);
        await queryRunner.query(`ALTER TABLE "student_teachers_teacher" ADD CONSTRAINT "FK_bbce22585af3071bbe4f355a12b" FOREIGN KEY ("teacherId") REFERENCES "teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
