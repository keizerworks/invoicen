import type { CreateUserInterface, UserInterface } from "~/db/schema/user";
import { db } from "~/db";
import { UserTable } from "~/db/schema/user";
import { eq } from "drizzle-orm";

export namespace User {
  export const findByEmail = async (
    email: string,
  ): Promise<UserInterface | undefined> => {
    return (
      await db
        .select()
        .from(UserTable)
        .where(eq(UserTable.email, email))
        .limit(1)
    )[0];
  };

  export const findById = async (id: string) => {
    return (
      await db.select().from(UserTable).where(eq(UserTable.id, id)).limit(1)
    )[0];
  };

  export const create = async (data: CreateUserInterface) => {
    return (await db.insert(UserTable).values(data).returning())[0];
  };

  export const update = async (id: string, data: Partial<UserInterface>) => {
    return await db
      .update(UserTable)
      .set(data)
      .where(eq(UserTable.id, id))
      .returning();
  };
}
