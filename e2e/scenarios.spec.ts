import { test, expect } from "@playwright/test";

test.describe("Shadow DOM Scenarios", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/scenarios");
    await page.waitForLoadState("networkidle");
  });

  test.describe("DOM Access - Light DOM", () => {
    test("querySelector finds light DOM children directly", async ({
      page,
    }) => {
      await page.click('[data-testid="test-light-qs"]');
      await expect(
        page.locator('[data-testid="result-light-qs"]'),
      ).toContainText("FOUND");
    });

    test("shadowRoot is null for light DOM component", async ({ page }) => {
      await page.click('[data-testid="test-light-sr"]');
      await expect(
        page.locator('[data-testid="result-light-sr"]'),
      ).toContainText("null");
    });

    test("can read secret data from light DOM", async ({ page }) => {
      await page.click('[data-testid="test-light-secret"]');
      await expect(
        page.locator('[data-testid="result-light-secret"]'),
      ).toContainText("LIGHT-ABC-123");
    });
  });

  test.describe("DOM Access - Open Shadow", () => {
    test("querySelector does NOT find open shadow children directly", async ({
      page,
    }) => {
      await page.click('[data-testid="test-open-qs"]');
      await expect(
        page.locator('[data-testid="result-open-qs"]'),
      ).toContainText("NOT FOUND");
    });

    test("shadowRoot IS accessible for open shadow", async ({ page }) => {
      await page.click('[data-testid="test-open-sr"]');
      await expect(
        page.locator('[data-testid="result-open-sr"]'),
      ).toContainText("accessible");
    });

    test("CAN read secret via shadowRoot in open shadow", async ({ page }) => {
      await page.click('[data-testid="test-open-secret"]');
      await expect(
        page.locator('[data-testid="result-open-secret"]'),
      ).toContainText("OPEN-XYZ-789");
    });
  });

  test.describe("DOM Access - Closed Shadow", () => {
    test("querySelector does NOT find closed shadow children", async ({
      page,
    }) => {
      await page.click('[data-testid="test-closed-qs"]');
      await expect(
        page.locator('[data-testid="result-closed-qs"]'),
      ).toContainText("NOT FOUND");
    });

    test("shadowRoot is null for closed shadow", async ({ page }) => {
      await page.click('[data-testid="test-closed-sr"]');
      await expect(
        page.locator('[data-testid="result-closed-sr"]'),
      ).toContainText("null");
    });

    test("CANNOT read secret from closed shadow", async ({ page }) => {
      await page.click('[data-testid="test-closed-secret"]');
      await expect(
        page.locator('[data-testid="result-closed-secret"]'),
      ).toContainText("BLOCKED");
    });
  });

  test.describe("Slot Projection", () => {
    test("slotted content is findable via querySelector (lives in light DOM)", async ({
      page,
    }) => {
      await page.click('[data-testid="test-slot-qs"]');
      await expect(
        page.locator('[data-testid="result-slot-qs"]'),
      ).toContainText("FOUND");
    });
  });

  test.describe("Event Boundary", () => {
    test("composed:true event crosses shadow boundary", async ({ page }) => {
      await page.evaluate(() => {
        const wc = document.querySelector("wc-event-boundary") as any;
        wc.fireComposed();
      });
      await expect(
        page.locator('[data-testid="outer-event-log"]'),
      ).toContainText("composed");
    });

    test("composed:false event does NOT cross shadow boundary", async ({
      page,
    }) => {
      await page.evaluate(() => {
        const wc = document.querySelector("wc-event-boundary") as any;
        wc.fireTrapped();
      });
      await page.waitForTimeout(500);
      const logText = await page
        .locator('[data-testid="outer-event-log"]')
        .textContent();
      expect(logText).not.toContain("trapped");
    });

    test("host-dispatched event is always visible outside", async ({
      page,
    }) => {
      await page.evaluate(() => {
        const wc = document.querySelector("wc-event-boundary") as any;
        wc.fireHost();
      });
      await expect(
        page.locator('[data-testid="outer-event-log"]'),
      ).toContainText("host-dispatch");
    });
  });

  test.describe("Style Encapsulation", () => {
    test("outer CSS affects light DOM component title", async ({ page }) => {
      // Wait for web components to upgrade
      await page.waitForFunction(() => {
        const el = document.querySelector(
          '[data-testid="style-leak-light"] .wc-title',
        );
        return el !== null;
      });
      const color = await page.evaluate(() => {
        const el = document.querySelector(
          '[data-testid="style-leak-light"] .wc-title',
        );
        return el ? getComputedStyle(el).color : "not found";
      });
      // hotpink = rgb(255, 105, 180)
      expect(color).toBe("rgb(255, 105, 180)");
    });

    test("outer CSS does NOT affect open shadow component title", async ({
      page,
    }) => {
      // Wait for web components to upgrade
      await page.waitForFunction(() => {
        const el = document.querySelector(
          '[data-testid="style-leak-open"] wc-open-shadow',
        );
        return el?.shadowRoot?.querySelector(".title") !== null;
      });
      const color = await page.evaluate(() => {
        const el = document.querySelector(
          '[data-testid="style-leak-open"] wc-open-shadow',
        );
        const title = el?.shadowRoot?.querySelector(".title");
        return title ? getComputedStyle(title).color : "not found";
      });
      // Should NOT be hotpink
      expect(color).not.toBe("rgb(255, 105, 180)");
    });
  });

  test("no console errors on scenarios page", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    await page.goto("/scenarios");
    await page.waitForLoadState("networkidle");
    expect(errors).toHaveLength(0);
  });
});
