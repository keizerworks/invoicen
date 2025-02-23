import { Router } from 'express';
import { createClient, deleteClient, updateClient } from "./clients.controller";
import { validateRequestBody } from "@/middleware/validate-request.middleware";
import { postClientBodySchema, putUpdateClientBodySchema } from "./clients.schema";

const clientRouter = Router();

clientRouter.post("/add",validateRequestBody(postClientBodySchema), createClient); 
clientRouter.put("/update/:id", validateRequestBody(putUpdateClientBodySchema), updateClient); 
clientRouter.delete("/delete/:id", deleteClient);

export default clientRouter;
