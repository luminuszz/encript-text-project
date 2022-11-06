// eslint-disable-next-line import/no-extraneous-dependencies
import { beforeEach, describe, expect, it } from "vitest";

import EncryptService from "./encryptService";

const SECRET = "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3";

describe("encriptService.ts", () => {
  let encriptService: EncryptService;

  beforeEach(() => {
    encriptService = new EncryptService(SECRET);
  });

  it("should able to encript and decript text", async () => {
    const value = "text";

    const encrypted = await encriptService.encryptText(value);

    expect(encrypted).not.toBe(value);
  });

  it("should able to decript text", async () => {
    const value = "text";

    const encrypted = await encriptService.encryptText(value);

    const decrypted = await encriptService.decryptText(encrypted);

    console.log({ encrypted, decrypted });

    expect(decrypted).toBe(value);
  });
});
