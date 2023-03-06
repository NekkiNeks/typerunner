import Express from "express";
import router from "./routes/index";
import Server from "./utils/Server";
import cors from "cors";
import { urlLogger } from "./middleware/urlLogger";
import parsers from "./extensions/parsers";
const server = new Server();

const app = Express();

app.use(urlLogger);
app.use(cors());
app.use(Express.json());
app.use(parsers);
app.use(router);

app.get("/test", async (req, res) => {
  res.send("this is test route...");
});

server.create(app).handleErrors().start();
