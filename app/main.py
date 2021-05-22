from fastapi import FastAPI
from fastapi import Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

version = '3.0.0'
app = FastAPI(
    docs_url=None,
    redoc_url=None,
)
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


@app.get('/', response_class=HTMLResponse)
async def index(request: Request):

    return templates.TemplateResponse(
        "index.html",
        {
            "request": request,
            "version": version,
        },
    )


@app.get('/app', response_class=HTMLResponse)
async def main(request: Request):

    return templates.TemplateResponse(
        "app.html",
        {
            "request": request,
            "version": version,
        },
    )


@app.get('/help', response_class=HTMLResponse)
async def main(request: Request):

    return templates.TemplateResponse(
        "help.html",
        {
            "request": request,
            "version": version,
        },
    )


@app.get('/old_app', response_class=HTMLResponse)
async def old_app(request: Request):

    return templates.TemplateResponse(
        "old_app.html",
        {
            "request": request,
            "version": "2.0.0",
        },
    )
