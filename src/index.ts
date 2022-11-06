#!/usr/bin/env node

import { Command } from "commander";
import shelljs from "shelljs";

import EncryptService from "./services/encryptService";

class Main {
  private readonly command: Command;

  private readonly shellJs: typeof shelljs;

  constructor() {
    this.command = new Command();
    this.shellJs = shelljs;
  }

  private registerClIIInstance() {
    this.command
      .name("fcrypt")
      .description("CLI to encrypt and decrypt text")
      .version("0.0.1");
  }

  private async registerCommands() {
    this.command
      .command("encrypt")
      .version("0.1")
      .alias("enc")
      .argument("<value>", "string to encrypt")
      .argument("<secret>", "secret to encrypt")

      .description("encrypt any text")
      .action(async (stringValue, secret) => {
        const encryptService = new EncryptService(secret);

        const encryptValue = await encryptService.encryptText(stringValue);

        this.shellJs.echo("Value encrypted !");
        this.shellJs.echo(encryptValue);
      });

    this.command
      .command("decrypt")
      .version("0.1")
      .alias("dec")
      .argument("<value>", "string to decrypt")
      .argument("<secret>", "secret to decrypt")

      .description("decrypt any text with secret")
      .action(async (stringValue, secret) => {
        const encryptService = new EncryptService(secret);

        console.log({ stringValue, secret });

        const decryptedValue = await encryptService.decryptText(stringValue);

        this.shellJs.echo("Value decrypted !");
        this.shellJs.echo(decryptedValue);
      });

    this.command.parse(process.argv);
  }

  public async run() {
    this.registerClIIInstance();

    await this.registerCommands();
  }
}

(async () => {
  const main = new Main();

  await main.run();
})();
