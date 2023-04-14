import { test, expect, type Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
});

test.describe("Clicking the board", () => {
    test("should place a tile", async ({ page }: { page: Page }) => {
        page.click("#board > div:nth-child(1) > div:nth-child(1)");
        expect(await page.innerText("#board > div:nth-child(1) > div:nth-child(1)")).toBe("X");
    });
});
