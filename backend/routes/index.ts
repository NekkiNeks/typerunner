import { Router } from "express";
const router = Router();

import auth from "./auth";
import result from "./result";
import user from "./user";

router.use("/auth", auth);
router.use("/result", result);
router.use("/user", user);

export default router;
