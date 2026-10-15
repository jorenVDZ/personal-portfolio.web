import { expect, test } from '@playwright/test';

const chapters = ['app-about-page', 'app-career-page', 'app-skills-page'];

test.describe('desktop pinned chapters', () => {
  for (const tag of chapters) {
    test(`${tag}: panel stays pinned and steps advance one by one`, async ({ page }) => {
      await page.goto('/');
      const scroller = page.locator('.overflow-y-scroll').first();
      await page.locator(`${tag} .step`).first().waitFor();
      await page.waitForTimeout(1000); // ScrollTrigger refresh

      const count = await page.locator(`${tag} .step`).count();
      const top = await scroller.evaluate((s, t) => {
        const el = document.querySelector(`${t} .scrolly`) as HTMLElement;
        return el.getBoundingClientRect().top - s.getBoundingClientRect().top + s.scrollTop;
      }, tag);
      const vh = page.viewportSize()!.height;

      let pinnedY: number | undefined;
      for (let i = 0; i < count; i++) {
        await scroller.evaluate((s, y) => { s.scrollTop = y; }, top + i * vh);
        await expect(page.locator(`${tag} .step`).nth(i)).toHaveClass(/is-active/);
        await expect(page.locator(`${tag} .step.is-active`)).toHaveCount(1);
        // centre stays put while the fade-in (12px translate) settles; height may vary per step
        const centre = async () => { const b = (await page.locator(`${tag} .panel`).boundingBox())!; return b.y + b.height / 2; };
        pinnedY ??= await centre();
        await expect.poll(async () => Math.abs((await centre()) - pinnedY!), { message: `panel moved at step ${i}` }).toBeLessThan(2);
        const box = (await page.locator(`${tag} .panel`).boundingBox())!;
        expect(box.y).toBeGreaterThanOrEqual(0);
        expect(box.y + box.height).toBeLessThanOrEqual(vh);
      }
    });
  }

  test('snaps to a step after scrolling mid-way', async ({ page }) => {
    await page.goto('/');
    const scroller = page.locator('.overflow-y-scroll').first();
    await page.waitForTimeout(1000);
    const top = await scroller.evaluate((s) => {
      const el = document.querySelector('app-about-page .scrolly') as HTMLElement;
      return el.getBoundingClientRect().top - s.getBoundingClientRect().top + s.scrollTop;
    });
    const vh = page.viewportSize()!.height;
    await page.mouse.move(400, 400);
    await scroller.evaluate((s, y) => { s.scrollTop = y; }, top + vh * 0.4);
    await expect.poll(async () => ((await scroller.evaluate(s => s.scrollTop)) - top) % vh, { timeout: 4000 }).toBeLessThan(2);
  });
});

test('a small wheel nudge advances to the next step', async ({ page }) => {
  await page.goto('/');
  const scroller = page.locator('.overflow-y-scroll').first();
  await page.waitForTimeout(1000);
  const top = await scroller.evaluate((s) => {
    const el = document.querySelector('app-about-page .scrolly') as HTMLElement;
    return el.getBoundingClientRect().top - s.getBoundingClientRect().top + s.scrollTop;
  });
  await scroller.evaluate((s, y) => { s.scrollTop = y; }, top - 300);
  await page.waitForTimeout(500);
  await page.mouse.move(400, 400);
  await page.mouse.wheel(0, 300); // arrive on the first step like a user would
  await page.waitForTimeout(1500);
  await page.mouse.wheel(0, 100);
  await expect(page.locator('app-about-page .step').nth(1)).toHaveClass(/is-active/, { timeout: 4000 });
});

test('arriving from above lands on the first step, not the second', async ({ page }) => {
  await page.goto('/');
  const scroller = page.locator('.overflow-y-scroll').first();
  await page.waitForTimeout(1000);
  const top = await scroller.evaluate((s) => {
    const el = document.querySelector('app-about-page .scrolly') as HTMLElement;
    return el.getBoundingClientRect().top - s.getBoundingClientRect().top + s.scrollTop;
  });
  await scroller.evaluate((s, y) => { s.scrollTop = y; }, top - 300);
  await page.waitForTimeout(500);
  await page.mouse.move(400, 400);
  for (let i = 0; i < 5; i++) { await page.mouse.wheel(0, 100); await page.waitForTimeout(40); } // casual: 500px, 200px into chapter
  await page.waitForTimeout(1500);
  await expect(page.locator('app-about-page .step').nth(0)).toHaveClass(/is-active/);
  expect(Math.abs((await scroller.evaluate(s => s.scrollTop)) - top)).toBeLessThan(2);
});

test.describe('mobile', () => {
  test.use({ viewport: { width: 390, height: 800 } });
  test('no pinned panel and no horizontal overflow', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);
    await expect(page.locator('app-about-page .panel')).toBeHidden();
    const pos = await page.locator('app-about-page .scrolly-pin').evaluate(e => getComputedStyle(e).position);
    expect(pos).toBe('static');
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
