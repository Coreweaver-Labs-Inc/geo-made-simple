import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "../../../");

describe("brand discovery assets", () => {
  it("uses the stable Coreweaver favicon and references a web app manifest from the document head", () => {
    const html = readFileSync(resolve(projectRoot, "client/index.html"), "utf8");
    const manifest = JSON.parse(readFileSync(resolve(projectRoot, "client/public/site.webmanifest"), "utf8"));

    expect(html).toContain('/manus-storage/coreweaver-favicon_42d5aba9.svg');
    expect(html).toContain('rel="manifest" href="/site.webmanifest"');
    expect(manifest.name).toBe("Coreweaver Labs");
    expect(manifest.icons).toEqual(expect.arrayContaining([expect.objectContaining({ src: "/manus-storage/coreweaver-favicon_42d5aba9.svg", type: "image/svg+xml" })]));
  });
});
