import os, sys
os.system('cls' if os.name == 'nt' else 'clear')
from fastapi import FastAPI, Request, Depends, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

# # # # # # # # # #   SQL   # # # # # # # # # #
from sqlalchemy import text
from sqlalchemy.exc import ProgrammingError

# # # # # # # # # #  Files  # # # # # # # # # #
from dependencies import get_db
from routers import api

app = FastAPI()
app.include_router(api.router)

app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")

sys.setrecursionlimit(1500)

@app.get("/")
async def forms(request: Request, db=Depends(get_db)):

    return templates.TemplateResponse("index.html",{"request":request})

@app.get("/measure")
async def forms(request: Request, db=Depends(get_db)):

    return templates.TemplateResponse("measure.html",{"request":request})