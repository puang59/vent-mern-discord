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
    embed = discord.Embed(description=f"{data['para']}")
    embed.set_author(name=f"{data['username']}", icon_url="https://res.cloudinary.com/teepublic/image/private/s--UymRXkch--/t_Resized%20Artwork/c_fit,g_north_west,h_1054,w_1054/co_ffffff,e_outline:53/co_ffffff,e_outline:inner_fill:53/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_auto,h_630,q_90,w_630/v1570281377/production/designs/6215195_0.jpg")
    x = await channel.send(embed=embed)
    collection.update_one({'_id':data['_id']}, {'$set': {'jump': x.jump_url}})

client.run(config.token)
