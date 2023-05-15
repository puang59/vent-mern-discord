import discord
import config
from motor import motor_asyncio

intents = discord.Intents.default()
intents.message_content = True
client = discord.Client(intents=intents)

# Connect to MongoDB using motor_asyncio
mongo_client = motor_asyncio.AsyncIOMotorClient(config.mongourl)
db = mongo_client["test"]
collection = db["datas"]

# Discord channel ID where you want to send data
channel_id = 842248295351189506

@client.event
async def on_ready():
    print(f"Logged in as {client.user.name}")
    print(f"Channel ID: {channel_id}")
    print("Watching database...")

    # Set up an asynchronous cursor to monitor the MongoDB collection
    async with collection.watch() as stream:
        async for change in stream:
            # Check if the change event was an insert operation
            if change["operationType"] == "insert":
                data = change["fullDocument"]
                await send_data_to_channel(data)

async def send_data_to_channel(data):
    # Send the data to the Discord channel
    channel = client.get_channel(channel_id)
    embed = discord.Embed(title="New data added!", color=0x00ff00)
    embed.add_field(name="Para", value=data["para"], inline=False)
    embed.add_field(name="Username", value=data["username"], inline=False)
    await channel.send(embed=embed)

client.run(config.token)
