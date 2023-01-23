import { Router } from "express";
import { getApiResponse } from "../utils/Format";

// Controllers
import {
  loginUser,
  createUser,
  deleteUser,
  getUserById,
} from "../functions/User";
import { createJwt, validateJwtMiddleware } from "../functions/Jwt";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await loginUser(login, password);
    const token = createJwt(user.id);
    res.send(getApiResponse(true, { user, token }, null));
  } catch (err: any) {
    res.send(getApiResponse(false, null, err.message));
  }
});

router.post("/register", async (req, res) => {
  try {
    const { login, password, email } = req.body;
    if (!login || !password || !email)
      throw new Error("Не все данные были переданы");

    const user = await createUser(login, password, email);
    const token = createJwt(user.id);
    res.send(getApiResponse(true, { user, token }, null));
  } catch (err: any) {
    res.send(getApiResponse(false, null, err.message));
  }
});

router.post("/token", validateJwtMiddleware, async (req, res) => {
  try {
    const userId = res.locals.user.id;
    const user = await getUserById(userId);
    if (!user) throw new Error("Пользователь с таким id не найден");
    res.send(getApiResponse(true, { user }, null));
  } catch (err: any) {
    res.send(getApiResponse(false, null, err.message));
  }
});

router.delete("/", validateJwtMiddleware, async (req, res) => {
  try {
    const userId = res.locals.user.id;
    const data = await deleteUser(userId);
    res.send(getApiResponse(true, data, null));
  } catch (err: any) {
    res.send(getApiResponse(false, null, err.message));
  }
});

export default router;
