const { Telegraf } = require('telegraf');

const bot = new Telegraf('7967859102:AAHtM2wtWPn_8AiIxO01qYj9zC8pZiu4Ciw');

bot.start((ctx) => {
  ctx.reply(`Hello, ${ctx.from.first_name}! Welcome how may I help you,to see more options,press /welp .`);
});

bot.help((ctx) => {
  ctx.reply('You can use the following commands:\n/start - Start the bot\n/welp - Get help\n/echo - Echo back your message.');
});

bot.command('echo', (ctx) => {
  const message = ctx.message.text.replace('/echo', '').trim();
  if (message) {
    ctx.reply(`Echo: ${message}`);
  } else {
    ctx.reply('Please provide a message to echo.');
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
