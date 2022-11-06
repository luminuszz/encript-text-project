import { createCipheriv } from "crypto";
import { randomBytes } from "node:crypto";

class EncriptService {
  private readonly iv = randomBytes(16);

  private readonly algorithm = "aes-256-ctr";

  constructor(private readonly secret: string) {}

  private makeCipheriv(secret: string) {
    return createCipheriv("aes-256-ctr", this.secret, this.iv);
  }

  public async encriptText(text: string) {
    const cipher = this.makeCipheriv(this.secret);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return encrypted.toString("hex");
  }

  public async decriptText(hash: string) {
    const decipher = this.makeCipheriv(this.secret);

    const decrpyted = Buffer.concat([
      decipher.update(Buffer.from(hash, "hex")),
      decipher.final(),
    ]);

    return decrpyted.toString();
  }
}

export default EncriptService;
