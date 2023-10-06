
const {
     clickElement, getText, chooseDay, chooseMovie, chooseSeat
 } = require("./lib/commands.js");
const { generateName } = require("./lib/util.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(60000);
});

afterEach(async() => {
  await page.close();
});

describe("Going to cinema tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("http://qamid.tmweb.ru/client/index.php", {
        timeout: 60000,
    });
    });
  
    test("One ticket booking", async() => {
      await chooseDay(page, "2");
      await chooseMovie(page, "3", "4");
      await page.waitForSelector("h1");
      await chooseSeat(page, "2", "6");
      await clickElement(page, ".acceptin-button");
      const actual = await getText(page, "h2");
      const expected = "Вы выбрали билеты:";
      expect(actual).toContain(expected);
    });

    test("Two ticket booking", async() => {
      await chooseDay(page, "4");
      await chooseMovie(page, "2", "2");
      await page.waitForSelector("h1");
      await chooseSeat(page, "2", "8");
      await chooseSeat(page, "2", "9");
      await clickElement(page, ".acceptin-button");
      const actual = await getText(page, "h2");
      const expected = "Вы выбрали билеты:";
      expect(actual).toContain(expected);
    });

    test("Should not booking seat", async() => {
      await chooseDay(page, "3");
      await chooseMovie(page, "2", "2");
      await page.waitForSelector("h1");
      const actual = await page.$eval('.acceptin-button', (button) => {
        return button.disabled;
      });
      expect(actual).toEqual(true);
    });
  })
