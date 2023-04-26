import http from "http";
import https from "https";
import config from "../config";
import Express from "express";
import Logger from "./Logger";

const logger = new Logger("server");

class Server {
  private server: http.Server | null = null;

  public create(app: Express.Express) {
    this.server = http.createServer(app);
    return this;
  }

  public handleErrors() {
    if (!this.server) throw new Error("Сервер не был создан");
    function onError(error: NodeJS.ErrnoException) {
      if (error.syscall !== "listen") {
        throw error;
      }
      switch (error.code) {
        case "EACCES":
          logger.error(`Нет привилегий.`);
          process.exit(1);
        case "EADDRINUSE":
          logger.error(`Порт занят`);
          process.exit(1);
        default:
          throw error;
      }
    }
    this.server.on("error", onError);
    return this;
  }

  public start() {
    if (!this.server) throw new Error("Сервер не был создан");
    if (!config.server.host) throw new Error("В конфиге отсутствует хост.");
    if (!config.server.port) throw new Error("В конфиге отсутствует порт.");

    const protocol =
      this.server instanceof https.Server ? "https://" : "http://";

    function onListening() {
      logger.info(
        `Сервер запущен на ${protocol}${config.server.host}:${config.server.port}`
      );
    }
    this.server.on("listening", onListening);
    this.server.listen(config.server.port, config.server.host);
    return this;
  }
}

export default Server;
