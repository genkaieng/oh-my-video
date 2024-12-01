import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

const [target] = process.argv.slice(2);
if (!target) {
  throw new Error("pnpm dev <url>");
}

const Command = async (url: string) => {
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
  results?.forEach((item) => console.log(item));
};
Command(target);
