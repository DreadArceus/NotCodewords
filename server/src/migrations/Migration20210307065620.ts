import { Migration } from '@mikro-orm/migrations';

export class Migration20210307065620 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "room" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "words" text[] null);');
  }

}
