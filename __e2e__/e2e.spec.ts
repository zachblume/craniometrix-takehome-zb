import { test, expect, type Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
});

test.describe("Clicking the board", () => {
    test("four in a row should win for player1", async ({ page }: { page: Page }) => {
        await page.locator("div:nth-child(5) > span:nth-child(2) > .tile").click();
        await page.locator("div:nth-child(5) > span:nth-child(3) > .tile").click();
        await page.locator("div:nth-child(5) > span:nth-child(2) > .tile").click();
        await page.locator("div:nth-child(5) > span:nth-child(3) > .tile").click();
        await page.locator("div:nth-child(4) > span:nth-child(2) > .tile").click();
        await page.locator("div:nth-child(4) > span:nth-child(3) > .tile").click();
        await page.locator("div:nth-child(3) > span:nth-child(2) > .tile").click();
        await page.getByRole("heading", { name: "player1 won!" }).click();
        // take a screenshot
        await page.screenshot({ path: `__e2e__/screenshots/1.png` });
        await page.getByRole("button", { name: "Restart game!" }).click();
        //  Should return to clickable:
        await page.locator("div:nth-child(6) > span:nth-child(7) > .tile").click();
    });
    test("four in a diagonal should win for player 2", async ({ page }: { page: Page }) => {
        await page.locator("div:nth-child(6) > span:nth-child(7) > .tile").click();
        await page.locator("div:nth-child(5) > span:nth-child(6) > .tile").click();
        await page.locator("div:nth-child(4) > span:nth-child(5) > .tile").click();
        await page.locator("div:nth-child(3) > span:nth-child(4) > .tile").click();
        await page.locator("div:nth-child(2) > span:nth-child(3) > .tile").click();
        await page.locator("span:nth-child(2) > .tile").first().click();
        await page.locator(".tile").first().click();
        await page.locator("div:nth-child(5) > span:nth-child(3) > .tile").click();
        await page.locator("div:nth-child(5) > span > .tile").first().click();
        await page.locator("div:nth-child(4) > span:nth-child(4)").click();
        await page.locator("div:nth-child(4) > span > .tile").first().click();
        await page.locator("div:nth-child(4) > span:nth-child(4) > .tile").click();
        await page.locator("div:nth-child(4) > span:nth-child(5) > .tile").click();
        await page.locator("div:nth-child(4) > span:nth-child(6) > .tile").click();
        await page.locator("div:nth-child(4) > span:nth-child(5) > .tile").click();
        await page.locator("div:nth-child(3) > span:nth-child(5) > .tile").click();
        await page.getByRole("heading", { name: "player2 won!" }).click();
        await page.getByRole("button", { name: "Restart game!" }).click();
        await page.getByRole("heading", { name: "It'splayer1's player2's turn now!" }).click();
    });
});
