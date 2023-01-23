import { Router } from "express";
import { validateJwtMiddleware } from "../functions/Jwt";
import { getBestResults, getResultsByUserId } from "../functions/Result";
import { getApiResponse } from "../utils/Format";
import { addResult, newResult } from "../functions/Result";
const router = Router();

router.get("/byUserId/:id", async (req, res) => {
  try {
    const result = await getResultsByUserId(req.params.id);
    res.send(getApiResponse(true, result, null));
  } catch (err: any) {
    res.send(getApiResponse(false, null, err.message));
  }
});

router.post("/add", validateJwtMiddleware, async (req, res) => {
  try {
    const userResult = req.body.result;
    if (!userResult) throw new Error("Результат не был передан");
    const newResult: newResult = {
      user_id: res.locals.user.id,
      value: userResult,
    };
    const data = await addResult(newResult);
    res.send(getApiResponse(true, data, null));
  } catch (err: any) {
    res.send(getApiResponse(false, null, err.message));
  }
});

router.get("/best", async (req, res) => {
  try {
    const result = await getBestResults();
    res.send(getApiResponse(true, result, null));
  } catch (err: any) {
    res.send(getApiResponse(false, null, err.message));
  }
});

export default router;
