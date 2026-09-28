import { db } from "../../../config/db.js";
import { users } from "../models/user.model.js";
import { eq } from "drizzle-orm";

export const userRepository = {
  async create(data) {
    const [user] = await db.insert(users).values(data).returning();
    return user;
  },
  async findByEmail(email) {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  },
  async findAll() {
    return await db.select().from(users);
  },
  async update(id, data) {
    const [user] = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  },
  async delete(id) {
    const [user] = await db.delete(users).where(eq(users.id, id)).returning();
    return user;
  }
};