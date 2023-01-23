import { Router } from "express";
import { getApiResponse } from "../utils/Format";
import { getUserById } from "../functions/User";

const router = Router();

router.get("/:id", async (req, res) => {
  try {
    const data = await getUserById(req.params.id);
    res.send(getApiResponse(true, data, null));
  } catch (err: any) {
    res.send(getApiResponse(false, null, err.message));
  }
});

export default router;
