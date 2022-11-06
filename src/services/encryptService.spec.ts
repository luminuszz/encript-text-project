// eslint-disable-next-line import/no-extraneous-dependencies
import { randomBytes } from "node:crypto";
// eslint-disable-next-line import/no-extraneous-dependencies
import { beforeEach, describe, expect, it } from "vitest";

import EncryptService from "./encryptService";

const SECRET = "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3";

const iv = randomBytes(16);

describe("encriptService.ts", () => {
  let encriptService: EncryptService;

  beforeEach(() => {
    encriptService = new EncryptService(SECRET);
  });

  it("should able to encript and decript text", async () => {
    const value = "text";

    const encrypted = await encriptService.encryptText(
      value,
      iv.toString("hex")
    );

    expect(encrypted).not.toBe(value);
  });

  it("should able to decript text", async () => {
    const value = "text";

    const encrypted = await encriptService.encryptText(
      value,
      iv.toString("hex")
    );

    const decrypted = await encriptService.decryptText(
      encrypted,
      iv.toString("hex")
    );

    console.log({ encrypted, decrypted });

    expect(decrypted).toBe(value);
  });
});
