import { Router } from "express";
import { getHeathHandler } from "@/modules/health/health.controller";

const healthRouter = Router();

healthRouter.get("/", getHeathHandler);

export default healthRouter;
