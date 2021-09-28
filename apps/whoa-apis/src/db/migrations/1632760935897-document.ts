import {MigrationInterface, QueryRunner} from "typeorm";

export class document1632760935897 implements MigrationInterface {
    name = 'document1632760935897'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "document" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "active" boolean NOT NULL DEFAULT true, "archived" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" character varying(300) NOT NULL, "last_change_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "last_change_by" character varying(300) NOT NULL, "internal_comment" character varying(300), "title" character varying(150) NOT NULL, "document_type" character varying(150) NOT NULL, "document_path" character varying(1000) NOT NULL, CONSTRAINT "PK_e57d3357f83f3cdc0acffc3d777" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "document"`);
    }

}
