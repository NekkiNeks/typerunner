import config from "../config";
import moment from "moment";
import fs from "fs";
import chalk from "chalk";

class Logger {
  private name: string;
  private folder: string;

  constructor(moduleName: string) {
    this.name = moduleName;
    this.folder = config.logger.folder;

    // Создать папку для логирования если ее не существует.
    if (!fs.existsSync(config.logger.folder))
      fs.mkdirSync(config.logger.folder);

    // Удалить temp файл если существует (чтобы записать его снова).
    if (config.logger.tempFile && fs.existsSync(`${this.folder}/temp.log`))
      fs.unlinkSync(`${this.folder}/temp.log`);
  }

  public info(message: any) {
    this.log(message, "INFO");
  }

  public warn(message: any) {
    this.log(message, "WARN");
  }

  public error(message: any) {
    this.log(message, "ERROR");
  }

  // Приватный метод, который вызывается их публичных методов выше
  private log(message: any, type: "INFO" | "WARN" | "ERROR") {
    if (typeof message !== "string" && typeof message !== "number") {
      message = "\n" + JSON.stringify(message, null, 2);
    }

    // Нужно ли создавать временный файл для каждого запуска
    if (config.logger.tempFile) {
      fs.writeFileSync(`${this.folder}/temp.log`, message + "\n", {
        flag: "a",
      });
    }

    // Нужно ли логгировать в файл
    if (config.logger.file) {
      fs.writeFileSync(
        `${this.folder}/${moment().format(config.logger.datePattern)}.log`,
        message + "\n",
        { flag: "a" }
      );
    }

    // Нужно ли логгировать в консоль
    if (config.logger.console) {
      let header: string = type;

      if (config.logger.color) {
        switch (type) {
          case "INFO":
            header = chalk.green(type);
            break;
          case "WARN":
            header = chalk.yellow(type);
            break;
          case "ERROR":
            header = chalk.red(type);
            break;
        }
      }
      console.log(
        `[${moment().format("HH:mm:SS.sss")}] ${header} (${this.name}): ${
          config.logger.color ? chalk.cyan(message) : message
        }`
      );
    }
  }
}

export default Logger;
