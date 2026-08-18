import { cleanup, render } from "@testing-library/react";
import React from "react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { SeoHead } from "./SeoHead";

beforeEach(() => {
  document.head.innerHTML = `
    <meta name="description" content="" />
    <meta name="keywords" content="" />
    <meta property="og:title" content="" />
    <meta property="og:description" content="" />
    <meta property="og:site_name" content="" />
    <meta property="og:url" content="" />
    <meta property="og:type" content="" />
    <meta property="og:image" content="" />
    <meta property="og:image:alt" content="" />
    <meta name="twitter:title" content="" />
    <meta name="twitter:description" content="" />
    <meta name="twitter:image" content="" />
    <meta name="twitter:image:alt" content="" />
    <meta name="robots" content="" />
    <link rel="canonical" href="" />
  `;
});

afterEach(cleanup);

describe("SeoHead", () => {
  it("keeps regenerated social images and their alternatives in sync for client-side navigation", () => {
    render(<SeoHead title="Framework" description="A method" path="/framework" keywords={["B2B framework", "evidence systems"]} ogImage="/manus-storage/coreweaver-framework-method-v2_88c0f3a5.jpg" ogImageAlt="A measured evidence plane representing the Authority, Representation, and Measurement framework." />);

    expect(document.querySelector('meta[property="og:image"]')?.getAttribute("content")).toBe("http://localhost:3000/manus-storage/coreweaver-framework-method-v2_88c0f3a5.jpg");
    expect(document.querySelector('meta[property="og:image:alt"]')?.getAttribute("content")).toBe("A measured evidence plane representing the Authority, Representation, and Measurement framework.");
    expect(document.querySelector('meta[name="twitter:image"]')?.getAttribute("content")).toBe("http://localhost:3000/manus-storage/coreweaver-framework-method-v2_88c0f3a5.jpg");
    expect(document.querySelector('meta[name="twitter:image:alt"]')?.getAttribute("content")).toBe("A measured evidence plane representing the Authority, Representation, and Measurement framework.");
    expect(document.querySelector('meta[property="og:site_name"]')?.getAttribute("content")).toBe("Coreweaver Labs");
    expect(document.querySelector('meta[name="keywords"]')?.getAttribute("content")).toBe("B2B framework, evidence systems");
    expect(document.querySelector('meta[name="robots"]')?.getAttribute("content")).toBe("noindex, follow");
    expect(document.querySelector('link[rel="canonical"]')).toBeNull();
  });
});
