import { Migration } from '@mikro-orm/migrations';

export class Migration20210307153208 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "room" add column "users" text[] not null;');
  }

}
