const { Client, GatewayIntentBits, Partials } = require('discord.js');
const puppeteer = require('puppeteer');
const client = new Client({ intents: 131071})
const youtubeLink = '';
const BotToken = ''
const channelID = '';
async function updateChannelName() {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(youtubeLink);

  const likeCount = await page.$eval('.yt-spec-button-shape-next.yt-spec-button-shape-next--tonal.yt-spec-button-shape-next--mono.yt-spec-button-shape-next--size-m.yt-spec-button-shape-next--icon-leading.yt-spec-button-shape-next--segmented-start .yt-spec-button-shape-next__button-text-content', (element) => {
    console.log(element);
    return element.textContent;
  });

  await browser.close();

  const channel = await client.channels.fetch(channelID);
  channel.setName(`Like Sayısı: ${likeCount}`);
}

client.on('ready', () => {
  console.log(`Bot ${client.user.tag} olarak aktif!`);

  setInterval(() => {
    updateChannelName();
  }, 60 * 60 * 1000);
});

client.login(BotToken);
