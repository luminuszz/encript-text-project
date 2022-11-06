import { createCipheriv, createDecipheriv } from "crypto";
import { randomBytes } from "node:crypto";

import Config from "../config";

class EncryptService {
  private readonly iv = randomBytes(16);

  private readonly algorithm = "aes-256-cbc";

  constructor(private readonly secret: string) {}

  private makeCipheriv(secret: string) {
    return createCipheriv(
      this.algorithm,
      secret,
      Buffer.from(Config.iv, "hex" as any)
    ) as any;
  }

  private makeDecipheriv(secret: string) {
    return createDecipheriv(
      this.algorithm,
      secret,
      Buffer.from(Config.iv, "hex" as any)
    );
  }

  public async encryptText(text: string) {
    const cipher = this.makeCipheriv(this.secret);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return encrypted.toString("hex");
  }

  public async decryptText(hash: string) {
    const decipher = this.makeCipheriv(this.secret);

    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(hash, "hex")),
      decipher.final(),
    ]);

    return decrypted.toString();
  }
}

export default EncryptService;
