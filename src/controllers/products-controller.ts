import { knex } from "@/database/knex";
import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";
import { Knex } from "knex";
import z from "zod";

class ProductsController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.query;
      const products = await knex<ProductRepository>("products")
        .select()
        .whereLike("name", `%${name ?? ""}%`)
        .orderBy("name");
      return res.json(products);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        name: z.string().trim().min(6),
        price: z.number().gt(0, { message: "Price must be greater than 0" }),
      });

      const { name, price } = bodySchema.parse(req.body);

      await knex<ProductRepository>("products").insert({ name, price });

      return res.status(201).json();
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const ids = await knex<ProductRepository>("products").select();
      const idsArray = ids.map((index) => index.id);

      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: "id must be a number" })
        .parse(req.params.id);

      if (!idsArray.includes(id)) throw new AppError("Id must exist");

      const bodySchema = z.object({
        name: z.string().trim().min(6),
        price: z.number().gt(0, { message: "Price must be greater than 0" }),
      });

      const { name, price } = bodySchema.parse(req.body);

      await knex<ProductRepository>("products")
        .update({ name, price, updated_at: knex.fn.now() })
        .where({ id });

      return res.json();
    } catch (error) {
      next(error);
    }
  }
}

export { ProductsController };
