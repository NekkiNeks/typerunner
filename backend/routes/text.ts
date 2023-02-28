import { Router } from "express";
import { getText } from "../Controllers/Text";
import { getApiResponse } from "../utils/Format";
const router = Router();

router.get("/", async (req, res) => {
  try {
    const text = await getText();
    res.send(getApiResponse(true, text, null));
  } catch (err: any) {
    res.send(getApiResponse(false, null, err));
  }
});

export default router;
