import discord
from discord.ext import commands
import aiohttp

class Mue(commands.Cog):
    @commands.command()
    async def quote(self, msg):
        async with aiohttp.ClientSession() as req:
            async with req.get('https://api.muetab.com/getQuote') as res:
                res = await res.json()
                await msg.send('"' + res['quote'] + '" - ' + res['author'])

    @commands.command()
    async def photo(self, msg):
        async with aiohttp.ClientSession() as req:
            async with req.get('https://api.muetab.com/getImage') as res:
                res = await res.json()
                embed = discord.Embed(
                    title='Mue Photo'
                )
                embed.set_image(url=res['file'])
                embed.add_field(name='Location', value=res['location'], inline=True)
                embed.add_field(name='Photographer', value=res['photographer'], inline=True)
                await msg.send(embed=embed)

def setup(bot):
    bot.add_cog(Mue())