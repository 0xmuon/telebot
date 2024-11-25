const { Telegraf } = require('telegraf');

const bot = new Telegraf('7967859102:AAHtM2wtWPn_8AiIxO01qYj9zC8pZiu4Ciw');
const userData = {};

bot.start((ctx) => {
  const userId = ctx.from.id;

  // Record the first interaction time if not already recorded
  if (!userData[userId]) {
    userData[userId] = { firstInteraction: new Date() };
  }

  ctx.reply(
    `Hello, ${ctx.from.first_name}! Welcome. How may I help you? To see more options, press /welp.`
  );
});

bot.help((ctx) => {
  ctx.reply(
    '/start - Start the bot\n/welp - Get help\n/echo - Echo back your message\n/profile - Display your profile photo\n/days - See how long you have been using this bot.'
  );
});

bot.command('echo', (ctx) => {
  const message = ctx.message.text.replace('/echo', '').trim();
  if (message) {
    ctx.reply(`Echo: ${message}`);
  } else {
    ctx.reply('Please provide a message to echo.');
  }
});

bot.command('profile', async (ctx) => {
  try {
    const userId = ctx.from.id;
    const photos = await ctx.telegram.getUserProfilePhotos(userId);

    if (photos.total_count > 0) {
      const fileId = photos.photos[0][0].file_id;
      await ctx.replyWithPhoto(fileId, {
        caption: `Here is your profile photo, ${ctx.from.first_name}!`,
      });
    } else {
      ctx.reply("You don't have a profile photo set on Telegram.");
    }
  } catch (err) {
    console.error('Error fetching profile photo:', err);
    ctx.reply('Failed to retrieve your profile photo. Please try again later.');
  }
});

bot.command('days', (ctx) => {
  const userId = ctx.from.id;

  if (!userData[userId]) {
    userData[userId] = { firstInteraction: new Date() };
    ctx.reply(
      "It seems like this is your first interaction with me. Welcome!"
    );
    return;
  }

  const firstInteractionDate = new Date(userData[userId].firstInteraction);
  const currentDate = new Date();
  const daysSinceFirstInteraction = Math.floor(
    (currentDate - firstInteractionDate) / (1000 * 60 * 60 * 24)
  );

  ctx.reply(
    `You have been using this bot for ${daysSinceFirstInteraction} day(s) since ${firstInteractionDate.toDateString()}!`
  );
});

bot.on('text', (ctx) => {
  ctx.reply('I am just a basic bot. Use /welp to see what I can do.');
});

bot.launch()
  .then(() => console.log('Bot is running...'))
  .catch((err) => console.error('Failed to launch bot:', err));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
