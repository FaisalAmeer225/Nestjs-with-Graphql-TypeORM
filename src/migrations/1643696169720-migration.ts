import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1643696169720 implements MigrationInterface {
    name = 'migration1643696169720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "age" integer NOT NULL, "test" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teacher" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" text, "lastName" text, "email" text, "role" text array, "deleted" boolean NOT NULL DEFAULT false, "education" text NOT NULL, "studentsRollNumber" uuid, CONSTRAINT "PK_2f807294148612a9751dacf1026" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "teacher_id_UNIUQE" ON "teacher" ("id") WHERE deleted=true`);
        await queryRunner.query(`CREATE TABLE "student" ("rollNumber" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" text, "lastName" text, "email" text, "role" text array, "deleted" boolean NOT NULL DEFAULT false, "education" text, "section" text array NOT NULL, CONSTRAINT "PK_b9a599f176274d2cd1fe147653a" PRIMARY KEY ("rollNumber"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "student_rollNumber_UNIUQE" ON "student" ("rollNumber") WHERE deleted=false`);
        await queryRunner.query(`CREATE TABLE "student_teachers_teacher" ("studentRollNumber" uuid NOT NULL, "teacherId" uuid NOT NULL, CONSTRAINT "PK_e89f012d1726186d0e6ebb00f41" PRIMARY KEY ("studentRollNumber", "teacherId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_56cefed9fb5b92cac4a1a201b6" ON "student_teachers_teacher" ("studentRollNumber") `);
        await queryRunner.query(`CREATE INDEX "IDX_bbce22585af3071bbe4f355a12" ON "student_teachers_teacher" ("teacherId") `);
        await queryRunner.query(`ALTER TABLE "student_teachers_teacher" ADD CONSTRAINT "FK_56cefed9fb5b92cac4a1a201b6e" FOREIGN KEY ("studentRollNumber") REFERENCES "student"("rollNumber") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "student_teachers_teacher" ADD CONSTRAINT "FK_bbce22585af3071bbe4f355a12b" FOREIGN KEY ("teacherId") REFERENCES "teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student_teachers_teacher" DROP CONSTRAINT "FK_bbce22585af3071bbe4f355a12b"`);
        await queryRunner.query(`ALTER TABLE "student_teachers_teacher" DROP CONSTRAINT "FK_56cefed9fb5b92cac4a1a201b6e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bbce22585af3071bbe4f355a12"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_56cefed9fb5b92cac4a1a201b6"`);
        await queryRunner.query(`DROP TABLE "student_teachers_teacher"`);
        await queryRunner.query(`DROP INDEX "public"."student_rollNumber_UNIUQE"`);
        await queryRunner.query(`DROP TABLE "student"`);
        await queryRunner.query(`DROP INDEX "public"."teacher_id_UNIUQE"`);
        await queryRunner.query(`DROP TABLE "teacher"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
