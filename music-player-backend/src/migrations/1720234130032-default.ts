import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1720234130032 implements MigrationInterface {
    name = 'Default1720234130032'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "song" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "artista" varchar(70) NOT NULL, "title" varchar(50) NOT NULL, "album" varchar(50) NOT NULL, "imgPath" varchar NOT NULL, "audioPath" varchar NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "song"`);
    }

}
