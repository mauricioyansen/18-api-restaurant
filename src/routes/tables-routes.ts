import { Router } from "express";
import { TablesController } from "@/controllers/tables-controller";

const tablesRoutes = Router();
const tablesController = new TablesController();

tablesRoutes.get("/", tablesController.get);
// tablesRoutes.post("/", tablesController.create);
// tablesRoutes.put("/:id", tablesController.update);
// tablesRoutes.delete("/:id", tablesController.deleteById);

export { tablesRoutes };
