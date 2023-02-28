import { Router } from "express";
const router = Router();

import auth from "./auth";
import result from "./result";
import user from "./user";
import text from "./text";

router.use("/auth", auth);
router.use("/result", result);
router.use("/user", user);
router.use("/text", text);

export default router;
