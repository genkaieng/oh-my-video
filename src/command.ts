import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

export async function command(url: string) {
  puppeteer.use(StealthPlugin());

  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(url);
  const html = await page.content();
  await browser.close();

  const results = html.match(
    /https:\/\/[a-zA-Z0-9_\.\/-]+\.mp4(\?[a-zA-Z0-9_=&,\.;\-]*)?/g,
  );

  return results;
};
