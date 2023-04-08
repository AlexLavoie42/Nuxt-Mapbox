import { describe, it, expect } from 'vitest'
import { setup, getBrowser } from '@nuxt/test-utils'

describe('ssr', async () => {
  await setup({
    fixture: '../playground',
    browser: true,
    dev: true
  })

  it('renders the map', async () => {
    const browser = await getBrowser();
    const page = await browser.newPage();
    await page.goto("http://localhost:3000/");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const html = await page.innerHTML('body');
    expect(html).toContain('<canvas');
  })

  it('map works across routes', async () => {
    const browser = await getBrowser();
    const page = await browser.newPage();
    await page.goto("http://localhost:3000/");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await page.getByText('TEST').click();

    await new Promise((resolve) => setTimeout(resolve, 1000));
    let html = await page.innerHTML('body');
    expect(html).toContain('<canvas');
    expect(page.url()).toContain('/test');

    await page.getByText('TEST').click();

    await new Promise((resolve) => setTimeout(resolve, 1000));
    html = await page.innerHTML('body');
    expect(html).toContain('<canvas');
    expect(page.url()).not.toContain('/test');
  })
}, {timeout: 20000})
