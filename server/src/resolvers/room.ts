import { Room } from "../entities/Room";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { MyContext } from "../types";

@InputType()
class RoomCreateInput {
  @Field()
  username: string;

  @Field()
  name: string;
}

@Resolver()
export class RoomResolver {
  @Query(() => Room, { nullable: true })
  async me(@Ctx() { em, req }: MyContext): Promise<Room | null> {
    if (!req.session.roomID) {
      return null;
    }
    const room = await em.findOne(Room, { id: req.session.roomID });
    return room;
  }

  @Mutation(() => Room, { nullable: true })
  async create(
    @Arg("input") input: RoomCreateInput,
    @Ctx() { em, req }: MyContext
  ): Promise<Room | null> {
    const room = em.create(Room, { name: input.name, users: [input.username] });
    try {
      await em.persistAndFlush(room);
    } catch {
      return null;
    }
    req.session.roomID = room.id;
    return room;
  }

  @Mutation(() => Room, { nullable: true })
  async join(
    @Arg("input") input: RoomCreateInput,
    @Ctx() { em, req }: MyContext
  ): Promise<Room | null> {
    const room = await em.findOne(Room, { name: input.name });
    if (!room) {
      return null;
    }
    req.session.roomID = room.id;
    room.users.push(input.username)
    await em.persistAndFlush(room);
    return room;
  }

  @Query(() => [Room])
  async dev(@Ctx() { em }: MyContext): Promise<Room[] | null> {
    const rooms = em.find(Room, {});
    return rooms;
  }
}
