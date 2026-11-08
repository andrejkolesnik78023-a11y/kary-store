const { chromium } = require('playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const errors = [];
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  page.on('pageerror', error => errors.push(error.message));

  await page.route('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2', route =>
    route.fulfill({ contentType: 'application/javascript', body: 'window.supabase={createClient:()=>({})};' })
  );
  await page.route('https://krdhfzbinbxyketfcrdg.supabase.co/rest/v1/**', route => {
    const url = new URL(route.request().url());
    if (url.pathname.endsWith('/kary_categories')) {
      return route.fulfill({ contentType: 'application/json', body: JSON.stringify([
        { id: 1, name: 'Дизайн', slug: 'design', icon: '🎨', sort_order: 1, is_active: true }
      ]) });
    }
    if (url.pathname.endsWith('/kary_products')) {
      return route.fulfill({ contentType: 'application/json', body: JSON.stringify([
        { id: 101, category_id: 1, name: 'Дизайн группы ВК', description: 'Оформление сообщества и баннер', price: 1399, original_price: 1900, image_url: null, is_active: true, sort_order: 1, sales_count: 12 },
        { id: 102, category_id: 1, name: 'Аватар для профиля', description: 'Авторский дизайн аватара', price: 500, original_price: null, image_url: null, is_active: true, sort_order: 2, sales_count: 4 }
      ]) });
    }
    return route.fulfill({ status: 200, contentType: 'application/json', body: '[]' });
  });

  await page.goto('http://127.0.0.1:4173', { waitUntil: 'domcontentloaded' });
  await page.locator('#products .product').first().waitFor({ timeout: 15000 });
  assert.equal(await page.locator('#products .product').count(), 2, 'catalog should render mocked products');
  assert.equal(await page.locator('#faq').count(), 1, 'FAQ section should exist');
  assert.equal(await page.locator('#discountFilter').count(), 1, 'discount filter should exist');

  await page.locator('#discountFilter').check();
  assert.equal(await page.locator('#products .product').count(), 1, 'discount filter should show only discounted product');
  await page.locator('#resetFilters').click();

  await page.locator('[data-fav="102"]').click();
  await page.locator('#favoriteFilter').check();
  assert.equal(await page.locator('#products .product').count(), 1, 'favorites filter should show selected favorite');
  await page.locator('#resetFilters').click();

  await page.locator('#priceLimit').fill('600');
  assert.equal(await page.locator('#products .product').count(), 1, 'maximum price filter should work');
  await page.locator('#resetFilters').click();

  await page.locator('#search').fill('аватар');
  assert.equal(await page.locator('#products .product').count(), 1, 'catalog search should work');
  await page.locator('#search').fill('');

  await page.locator('#products [data-open="101"]').click();
  assert.match(await page.locator('#modalContent').innerText(), /Дизайн группы ВК/, 'product details should open');
  assert.equal(await page.locator('#recentBlock').isVisible(), true, 'recently viewed block should appear');

  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: 'artifacts/kary-mobile.png', fullPage: true });
  const mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  assert.equal(mobileOverflow, false, 'mobile page should not overflow horizontally');

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({ path: 'artifacts/kary-desktop.png', fullPage: true });
  assert.deepEqual(errors, [], 'page should not emit uncaught JavaScript errors');

  await browser.close();
  console.log('PASS: catalog, discount/favorite/price filters, search, product details, recent history, mobile overflow, desktop/mobile screenshots, no uncaught JS errors.');
})().catch(error => {
  console.error(error);
  process.exit(1);
});
