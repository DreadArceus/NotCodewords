import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { __prod__ } from "./constants";
import { Room } from "./entities/Room";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Room],
  dbName: "codewordsDB",
  type: "postgresql",
  user: "dreadarceus",
  password: "123",
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
