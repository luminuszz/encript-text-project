import { createCipheriv, createDecipheriv } from "crypto";

class EncryptService {
  private readonly algorithm = "aes-256-cbc";

  constructor(private readonly secret: string) {}

  private makeCipheriv(secret: string, iv: string) {
    return createCipheriv(this.algorithm, secret, Buffer.from(iv, "hex"));
  }

  private makeDecipheriv(secret: string, iv: string) {
    return createDecipheriv(this.algorithm, secret, Buffer.from(iv, "hex"));
  }

  public async encryptText(text: string, iv: string) {
    const cipher = this.makeCipheriv(this.secret, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return encrypted.toString("hex");
  }

  public async decryptText(hash: string, iv: string) {
    const decipher = this.makeDecipheriv(this.secret, iv);

    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(hash, "hex")),
      decipher.final(),
    ]);

    return decrypted.toString();
  }
}

export default EncryptService;
