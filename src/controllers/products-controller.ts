import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";

class ProductsController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json({ message: "Ok" });
    } catch (error) {
      next(error);
    }
  }
}

export { ProductsController };
