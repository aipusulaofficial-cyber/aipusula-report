import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import Admin from "./Admin";

it("renders a labeled admin form", () => {
  const html = renderToStaticMarkup(createElement(Admin));
  expect(html).toContain("post-title");
  expect(html).toContain("post-category");
  expect(html).toContain('role="status"');
});
