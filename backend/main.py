from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
from bson import ObjectId
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGO_URL = "mongodb://localhost:27017"
client = AsyncIOMotorClient(MONGO_URL)

db = client["mydatabase"]
collection = db["order"]

# Define product FIRST
class Product(BaseModel):
    id: str
    name: str
    quantity: int
    img: str
    arrival:str

# Request model
class Item(BaseModel):
    products: List[Product]
    orderplaced:str
    total: str

# Endpoint
@app.post("/items/")
async def create_items(item: Item):
    item_dict = item.dict()

    result = await collection.insert_one(item_dict)

    return {
        "message": "Items stored successfully",
        "order_id": str(result.inserted_id)
    }


@app.get("/items/{order_id}")
async def get_item(order_id: str):
    try:
        obj_id = ObjectId(order_id)
    except:
        raise HTTPException(status_code=400, detail="Invalid order_id")

    item = await collection.find_one({"_id": obj_id})

    if not item:
        raise HTTPException(status_code=404, detail="Item not found")

    # Convert ObjectId to string for frontend
    item["_id"] = str(item["_id"])

    return item