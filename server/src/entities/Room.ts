import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Room {
  @Field()
  @PrimaryKey()
  id: number;

  @Field(() => String)
  @Property()
  createdAt: Date = new Date();

  @Field(() => String)
  @Property()
  updatedAt: Date = new Date();

  @Field()
  @Property()
  name: string;

  @Field(() => [String])
  @Property()
  users: string[];

  @Field(() => [String], { nullable: true })
  @Property({ nullable: true })
  words: string[];
}
