import axios from "axios";
import { ServerError } from "../utils/Errors";

export async function getText() {
  try {
    const data = await axios.get(
      "https://fish-text.ru/get?type=sentence&number=1"
    );
    if (data.data.status !== "success")
      throw new Error("Ошибка обращения к стороннему API");
    return data.data.text;
  } catch (err: any) {
    throw new ServerError(err.message);
  }
}
