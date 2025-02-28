import { knex } from "@/database/knex";
import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";
import z from "zod";

class OrdersController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { table_session_id } = req.params;
      const order = await knex("orders")
        .select(
          "orders.id",
          "orders.table_session_id",
          "orders.product_id",
          "products.name",
          "orders.price",
          "orders.quantity",
          knex.raw("(orders.price * orders.quantity) AS total"),
          "orders.created as created_at",
          "orders.updated as updated_at"
        )
        .join("products", "products.id", "orders.product_id")
        .where({ table_session_id })
        .orderBy("orders.created");
      return res.json(order);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_session_id: z.number(),
        product_id: z.number(),
        quantity: z.number(),
      });

      const { table_session_id, product_id, quantity } = bodySchema.parse(
        req.body
      );

      const session = await knex<TableSessionsRepository>("tables_sessions")
        .where({ id: table_session_id })
        .first();

      if (!session) throw new AppError("Session table not found");

      if (session.closed_at) throw new AppError("This table is closed");

      const product = await knex<ProductRepository>("products")
        .where({ id: product_id })
        .first();

      if (!product) throw new AppError("Product not found");

      await knex<OrderRepository>("orders").insert({
        table_session_id,
        product_id,
        quantity,
        price: product.price,
      });

      return res.status(201).json();
    } catch (error) {
      next(error);
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const { table_session_id } = req.params;

      const order = await knex("orders")
        .select(
          knex.raw("COALESCE(SUM(orders.price * orders.quantity), 0) AS total"),
          knex.raw("COALESCE(SUM(orders.quantity), 0) AS quantity"),
        )
        .where({ table_session_id })
        .first();

      return res.json(order);
    } catch (error) {
      next(error);
    }
  }
}

export { OrdersController };
