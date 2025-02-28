import { knex } from "@/database/knex";
import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";
import { Knex } from "knex";
import z from "zod";

class TablesController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const tables = await knex<TableRepository>("tables")
        .select()
        .orderBy("table_number");
      return res.json(tables);
    } catch (error) {
      next(error);
    }
  }
}

export { TablesController };
