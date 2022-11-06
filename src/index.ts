#!/usr/bin/env node

import { Command } from "commander";
import { readFile } from "fs/promises";
import { randomBytes } from "node:crypto";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import shelljs from "shelljs";

import EncryptService from "./services/encryptService";

class Main {
  private readonly command: Command;

  private readonly shellJs: typeof shelljs;

  private readonly ivFilePath = resolve("./src", "iv.txt");

  constructor() {
    this.command = new Command();
    this.shellJs = shelljs;
  }

  private async createIvFile() {
    const iv = randomBytes(16);

    await this.shellJs.touch(this.ivFilePath);

    await this.shellJs.echo(iv.toString("hex")).to(this.ivFilePath);
  }

  private async getIvHash() {
    const iv = await readFile(this.ivFilePath);

    return iv.toString().replace(/\r?\n|\r/g, "");
  }

  private async registerClIIInstance() {
    this.command
      .name("fcrypt")
      .description("CLI to encrypt and decrypt text")
      .version("0.0.1");

    await this.shellJs.echo("Verify if iv file exists...");

    const existsFile = existsSync(this.ivFilePath);

    if (!existsFile) {
      await this.shellJs.echo("File not exists, creating file...");

      await this.createIvFile();

      await this.shellJs.echo(`make iv vector > ${this.ivFilePath}`);
    }
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
        const iv = await this.getIvHash();

        const encryptService = new EncryptService(secret);

        const encryptValue = await encryptService.encryptText(stringValue, iv);

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

        const iv = await this.getIvHash();

        const decryptedValue = await encryptService.decryptText(
          stringValue,
          iv
        );

        this.shellJs.echo("Value decrypted !");
        this.shellJs.echo(decryptedValue);
      });

    this.command.parse(process.argv);
  }

  public async run() {
    await this.registerClIIInstance();

    await this.registerCommands();
  }
}

(async () => {
  const main = new Main();

  await main.run();
})();
