// eslint-disable-next-line import/no-extraneous-dependencies
import { beforeEach, describe, expect, it } from "vitest";

import EncriptService from "./encriptService";

const SECRET = "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3";

describe("encriptService.ts", () => {
  let encriptService: EncriptService;

  beforeEach(() => {
    encriptService = new EncriptService(SECRET);
  });

  it("should able to encript and decript text", async () => {
    const value = "text";

    const encrypted = await encriptService.encriptText(value);

    expect(encrypted).not.toBe(value);
  });

  it("should able to decript text", async () => {
    const value = "text";

    const encrypted = await encriptService.encriptText(value);

    const decrypted = await encriptService.decriptText(encrypted);

    expect(decrypted).toBe(value);
  });
});
