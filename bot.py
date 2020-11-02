import discord
import os
from discord.ext import commands

client = commands.Bot(command_prefix='mue ')

for file in os.listdir('cogs'):
    if file.endswith('.py'):
        name = file[:-3]
        client.load_extension(f'cogs.{name}')

client.run('removed')