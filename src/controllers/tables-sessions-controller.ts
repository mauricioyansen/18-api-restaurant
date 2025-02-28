import { knex } from "@/database/knex";
import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";
import z from "zod";

class TablesSessionsController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const sessions = await knex<TableSessionsRepository>(
        "tables_sessions"
      ).orderBy("closed_at");
      return res.json(sessions);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_id: z.number(),
      });
      const { table_id } = bodySchema.parse(req.body);

      const session = await knex<TableSessionsRepository>("tables_sessions")
        .where({ table_id })
        .orderBy("opened_at", "desc")
        .first();

      if (session && !session.closed_at)
        throw new AppError("This table is ocupied");

      await knex<TableSessionsRepository>("tables_sessions").insert({
        table_id,
        opened_at: knex.fn.now(),
      });
      return res.status(201).json();
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: "Id must be a number" })
        .parse(req.params.id);

      const session = await knex<TableSessionsRepository>("tables_sessions")
        .where({ id })
        .first();
      if (!session) throw new AppError("Session table not found");

      if (session.closed_at)
        throw new AppError("This session table is already closed");

      await knex<TableSessionsRepository>("tables_sessions")
        .update({ closed_at: knex.fn.now() })
        .where({ id });

      return res.json();
    } catch (error) {
      next(error);
    }
  }
}

export { TablesSessionsController };
