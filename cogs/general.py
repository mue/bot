import discord
from discord.ext import commands

class General(commands.Cog):
    @commands.command()
    async def ping(self, msg):
        await msg.send('pong')

def setup(bot):
    bot.add_cog(General())