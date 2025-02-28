import { Router } from "express";
import { ProductsController } from "@/controllers/products-controller";

const productsRoutes = Router();
const productsController = new ProductsController();

productsRoutes.get("/", productsController.get);
productsRoutes.post("/", productsController.create);
productsRoutes.put("/:id", productsController.update);

export { productsRoutes };
