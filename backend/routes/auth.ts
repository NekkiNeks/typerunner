import { Router } from "express";
import { getApiResponse } from "../utils/Format";

import {
  loginUser,
  registerUser,
  verifyUserByEmailLink,
} from "../Controllers/Auth";
import { getUser } from "../Controllers/User";

import { createJwt, validateJwtMiddleware } from "../functions/Jwt";
import { AuthError } from "../utils/Errors";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await loginUser(login, password);
    const token = createJwt(user.id);
    res.send(getApiResponse(true, { user, token }, null));
  } catch (err: any) {
    res.send(getApiResponse(false, null, err));
  }
});

router.post("/register", async (req, res) => {
  try {
    const { login, password, email } = req.body;
    if (!login || !password || !email)
      throw new AuthError("Не все данные были переданы");

    const user = await registerUser(login, password, email);
    const token = createJwt(user.id);
    res.send(getApiResponse(true, { user, token }, null));
  } catch (err: any) {
    res.send(getApiResponse(false, null, err));
  }
});

router.post("/token", validateJwtMiddleware, async (req, res) => {
  try {
    const userId = res.locals.user.id;
    const user = await getUser(userId);
    res.send(getApiResponse(true, { user }, null));
  } catch (err: any) {
    res.send(getApiResponse(false, null, err));
  }
});

router.get("/verify", async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) throw new Error("Не был передан id пользователя");
    const user = await verifyUserByEmailLink(userId as string);
    res.send(`Пользователь ${user.login} подтвержден`);
  } catch (err: any) {}
});

// router.delete("/", validateJwtMiddleware, async (req, res) => {
//   try {
//     const userId = res.locals.user.id;
//     const data = await deleteUser(userId);
//     res.send(getApiResponse(true, data, null));
//   } catch (err: any) {
//     res.send(getApiResponse(false, null, err.message));
//   }
// });

export default router;
