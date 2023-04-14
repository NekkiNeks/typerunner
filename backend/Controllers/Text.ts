import axios from "axios";
import { ServerError } from "../utils/Errors";

function replaceLongDash(text: string): string {
  return text.replace("—", "-");
}

export async function getText() {
  try {
    const data = await axios.get(
      "https://fish-text.ru/get?type=sentence&number=1"
    );
    if (data.data.status !== "success")
    throw new Error("Ошибка обращения к стороннему API");

    const text = data.data.text;
    return replaceLongDash(text);
  } catch (err: any) {
    throw new ServerError(err.message);
  }
}
