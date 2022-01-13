import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1642067388890 implements MigrationInterface {
    name = 'migration1642067388890'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher" DROP CONSTRAINT "FK_e574e9b6d0e633e0b825b136706"`);
        await queryRunner.query(`ALTER TABLE "teacher" ALTER COLUMN "studentsRollNumber" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "teacher" ALTER COLUMN "studentsRollNumber" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "teacher" ADD CONSTRAINT "FK_e574e9b6d0e633e0b825b136706" FOREIGN KEY ("studentsRollNumber") REFERENCES "student"("rollNumber") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher" DROP CONSTRAINT "FK_e574e9b6d0e633e0b825b136706"`);
        await queryRunner.query(`ALTER TABLE "teacher" ALTER COLUMN "studentsRollNumber" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "teacher" ALTER COLUMN "studentsRollNumber" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "teacher" ADD CONSTRAINT "FK_e574e9b6d0e633e0b825b136706" FOREIGN KEY ("studentsRollNumber") REFERENCES "student"("rollNumber") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
