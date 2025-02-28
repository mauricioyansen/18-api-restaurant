import { knex } from "@/database/knex";
import { Request, Response, NextFunction } from "express";

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
