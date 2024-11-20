const { Telegraf } = require('telegraf');

const bot = new Telegraf('7967859102:AAHtM2wtWPn_8AiIxO01qYj9zC8pZiu4Ciw');

bot.start((ctx) => {
  ctx.reply(`Hello, ${ctx.from.first_name}! Welcome. How may I help you? To see more options, press /welp.`);
});

bot.help((ctx) => {
  ctx.reply('You can use the following commands:\n/start - Start the bot\n/welp - Get help\n/echo - Echo back your message\n/profile - Display your profile photo.');
});

bot.command('echo', (ctx) => {
  const message = ctx.message.text.replace('/echo', '').trim();
  if (message) {
    ctx.reply(`Echo: ${message}`);
  } else {
    ctx.reply('Please provide a message to echo.');
  }
});

// New command to fetch and display profile photo
bot.command('profile', async (ctx) => {
  try {
    const userId = ctx.from.id;
    const photos = await ctx.telegram.getUserProfilePhotos(userId);
    
    if (photos.total_count > 0) {
      const fileId = photos.photos[0][0].file_id;
      await ctx.replyWithPhoto(fileId, { caption: `Here is your profile photo, ${ctx.from.first_name}!` });
    } else {
      ctx.reply("You don't have a profile photo set on Telegram.");
    }
  } catch (err) {
    console.error('Error fetching profile photo:', err);
    ctx.reply('Failed to retrieve your profile photo. Please try again later.');
  }
});

bot.on('text', (ctx) => {
  ctx.reply('I am just a basic bot. Use /welp to see what I can do.');
});

bot.launch()
  .then(() => console.log('Bot is running...'))
  .catch((err) => console.error('Failed to launch bot:', err));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
