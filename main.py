from enum import Enum
from typing import Union

from fastapi import FastAPI, Query
import uvicorn
from pydantic import BaseModel


from fastapi.middleware.cors import CORSMiddleware

import uuid
import datetime 
from datetime import timedelta

fake_api = [
  {
    "id": "04549f9a-514b-11ed-9602-91eb99f9e2ee",
    "text": "Do something",
    "isCompleted": False,
    # "createdAt": "2022-10-15T10:37:56.853291",
    "createdAt": str(datetime.datetime.now() - timedelta(days=5)),
  },
  {
    "id": "1c21aeec-514b-11ed-9602-91eb99f9e2ee", 
    "text": "Do more",
    "isCompleted": False,
    # "createdAt": "2022-10-19T10:38:56.941775",
    "createdAt": str(datetime.datetime.now() - timedelta(days=3)),

  },
  {
    "id": "3c1e876a-514b-11ed-9602-91eb99f9e2ee",
    "text": "Do better",
    "isCompleted": False,
    # "createdAt": "2022-10-20T10:39:42.262117",
    "createdAt": str(datetime.datetime.now() - timedelta(days=1)),

  }
  ]

app = FastAPI()

origins = [
  "http://localhost:3000",
  "*",
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

@app.get("/api/todos/")
async def fetch_fake_api():
  return fake_api

class TodoItem(BaseModel):
  text: str 

@app.post("/api/todos/")
async def create_new_todo(todo: TodoItem):
  global fake_api
  todo = {
    "id": str(uuid.uuid1()), 
    "text": todo.text, 
    "isCompleted": False, 
    "createdAt": str(datetime.datetime.now()),
    }
  fake_api.append(todo)
  return todo

@app.put("/api/todos/{todo_id}/completed")
async def update_todo(todo_id: str):
  global fake_api
  updated_todo = {}
  for todo in fake_api:
    if todo['id'] == todo_id:
      # print(todo['id'])
      todo.update({"isCompleted": True})
      updated_todo = todo

  # return fake_api
  return updated_todo

@app.delete("/api/todos/{todo_id}")
async def delete_todo(todo_id: str):
  global fake_api
  removed_todo = {}
  for todo in fake_api:
    if todo['id'] == todo_id:
      removed_todo = todo
      fake_api.remove(todo)

  return removed_todo

if __name__ == '__main__':
    uvicorn.run(app='main:app', reload=True, debug=True)