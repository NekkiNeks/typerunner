import { Router } from "express";
import { getApiResponse } from "../utils/Format";
import { getUser } from "../Controllers/User";
import Database from "../utils/Database";
import { validateJwtMiddleware } from "../functions/Jwt";

const router = Router();

router.get("/:userid", async (req, res) => {
  try {
    const data = await getUser(req.params.userid);
    res.send(getApiResponse(true, data, null));
  } catch (err: any) {
    res.send(getApiResponse(false, null, err));
  }
});

export default router;
