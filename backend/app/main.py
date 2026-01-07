from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session

from app.database import Base, engine, get_db
from app import crud
from app.database import engine
from app import models
from app.routes import auth, products, settings, categories, admins
from app.routes import admin_auth
from app.routes import brands
from app.routes import public_products


# =========================
# Crear app
# =========================
app = FastAPI(title="MASIBER API")


# =========================
# Crear tablas
# =========================
models.Base.metadata.create_all(bind=engine)

# =========================
# Crear Administradores
# =========================
app.include_router(admin_auth.router)

# =========================
# Static files (imágenes / videos)
# =========================
app.mount("/media", StaticFiles(directory="media"), name="media")


# =========================
# CORS (React)
# =========================
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # 👈 TEMPORAL
    allow_credentials=False,      # 👈 IMPORTANTE con "*"
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# Startup: crear admin
# =========================
@app.on_event("startup")
def startup():
    db: Session = next(get_db())
    crud.create_admin_if_not_exists(db)
    db.close()


# =========================
# Routers
# =========================
app.include_router(auth.router)       # /auth/login
app.include_router(products.router)   # /products
app.include_router(settings.router)   # /settings (USD)
app.include_router(categories.router)
app.include_router(admins.router)
app.include_router(brands.router)
app.include_router(public_products.router)


# =========================
# Root
# =========================
@app.get("/")
def root():
    return {"message": "MASIBER API funcionando correctamente"}
