import { Router } from "express";
import { validateJwtMiddleware } from "../functions/Jwt";
import { getBestResults, getLastResults } from "../Controllers/Results";
import { getApiResponse } from "../utils/Format";
import { addResult } from "../Controllers/Results";
import { ClientError, ServerError } from "../utils/Errors";
import { exclude } from "../utils/Database";
const router = Router();

router.get("/best", async (req, res) => {
  try {
    const result = await getBestResults();
    res.send(getApiResponse(true, result, null));
  } catch (err: any) {
    res.send(getApiResponse(false, null, err));
  }
});

router.get("/last", validateJwtMiddleware, async (req, res) => {
  try {
    let userId = res.locals.user.id;
    const result = await getLastResults(userId);
    res.send(getApiResponse(true, result, null));
  } catch (err: any) {
    res.send(getApiResponse(false, null, err));
  }
});

router.post("/add", validateJwtMiddleware, async (req, res) => {
  try {
    const userid = res.locals.user.id;
    const userResult = req.body.result;
    if (!userResult) throw new ClientError("Результат не был передан");
    const data = await addResult(userid, userResult);
    res.send(getApiResponse(true, data, null));
  } catch (err: any) {
    res.send(getApiResponse(false, null, err));
  }
});

export default router;
