import { Context } from 'telegraf';
import fetch from 'node-fetch';

interface Quote {
  quoteText: string;
  quoteAuthor: string;
}

export const quote = () => async (ctx: Context) => {
  try {
    const res = await fetch('https://raw.githubusercontent.com/itzfew/Eduhub-KMR/master/quotes.json');
    const quotes: Quote[] = await res.json();

    if (!quotes || quotes.length === 0) {
      return ctx.reply('❌ No quotes found.');
    }

    const random = quotes[Math.floor(Math.random() * quotes.length)];
    const message = `_"${random.quoteText}"_\n\n— *${random.quoteAuthor || 'Unknown'}*`;

    await ctx.reply(message, { parse_mode: 'Markdown' });
  } catch (err) {
    console.error('Failed to fetch quote:', err);
    await ctx.reply('⚠️ Failed to fetch quote. Try again later.');
  }
};
