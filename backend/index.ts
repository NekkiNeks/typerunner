import Express from "express";
import config from "./config";
import router from "./routes/index";
import multer from "multer";
import Server from "./utils/Server";
import cors from "cors";
import { urlLogger } from "./middleware/urlLogger";
const server = new Server();

const app = Express();

app.use(cors());
app.use(Express.json());
app.use(urlLogger);
app.use(router);

app.get("/test", async (req, res) => {
  res.send("this is test route...");
});

server.create(app).handleErrors().start();

// connect();

// async function connect() {
//   try {
//     app.listen(config.server.port, () => {
//       console.log(`Server listening on port ${config.server.port}...`);
//     });
//   } catch (err: any) {
//     console.log(err.message);
//     console.error("Ошибка подключения к базе данных...");
//   }
// }
