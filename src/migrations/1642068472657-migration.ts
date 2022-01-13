import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1642068472657 implements MigrationInterface {
    name = 'migration1642068472657'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher" DROP CONSTRAINT "FK_ed004f768f4314ace896d617968"`);
        await queryRunner.query(`ALTER TABLE "teacher" DROP COLUMN "studentRollNumber"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher" ADD "studentRollNumber" uuid`);
        await queryRunner.query(`ALTER TABLE "teacher" ADD CONSTRAINT "FK_ed004f768f4314ace896d617968" FOREIGN KEY ("studentRollNumber") REFERENCES "student"("rollNumber") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
