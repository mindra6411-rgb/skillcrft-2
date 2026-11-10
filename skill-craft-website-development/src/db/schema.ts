import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

/**
 * Pedidos enviados pelo formulário de contato.
 * `userId` / `userEmail` são preenchidos apenas quando o aluno está logado (Supabase Auth).
 */
export const serviceRequests = pgTable("service_requests", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  service: varchar("service", { length: 60 }).notNull(),
  description: text("description").notNull(),
  contactMethod: varchar("contact_method", { length: 20 }).notNull(),
  contactValue: varchar("contact_value", { length: 160 }).notNull(),
  userId: varchar("user_id", { length: 80 }),
  userEmail: varchar("user_email", { length: 200 }),
  status: varchar("status", { length: 30 }).notNull().default("recebido"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type ServiceRequest = typeof serviceRequests.$inferSelect;
