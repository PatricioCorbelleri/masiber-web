"""
Seed jerárquico definitivo de categorías
---------------------------------------
- Usa una sola tabla: categories
- Implementos tiene subniveles
- No borra datos
- No duplica
- Normaliza nombres (Capitalized)
"""

from app.database import SessionLocal
from app.models import Category

# =========================
# DATA DEFINITIVA (CLIENTE)
# =========================

DATA = {
    "Agrícola": {
        "Tractores": None,
        "Motocultivador": None,
        "Implementos": {
            "Alomador": None,
            "Aporcador": None,
            "Arado": None,
            "Cincel": None,
            "Desmalezadora": None,
            "Fertilizadora": None,
            "Fumigadora": None,
            "Hoyadora": None,
            "Niveladora": None,
            "Pala cargadora": None,
            "Pala frontal": None,
            "Rastra de discos": None,
            "Retroexcavadora": None,
            "Rotativas": None,
            "Subsolador": None,
            "Transportador de rollos": None,
            "Vibrocultivador": None,
        },
    },
    "Vial": {
        "Apilador": None,
        "Autoelevador": None,
        "Elevador de tijera": None,
        "Excavadora": None,
        "Mini pala": None,
        "Motoniveladora": None,
        "Pala cargadora": None,
        "Pala retro": None,
        "Zorra portapalets": None,
    },
    "Energía": {
        "Línea residencial": None,
        "Línea comercial e industrial": None,
        "Tablero de transferencia automático": None,
    },
    "Bosques y jardín": {
        "Bordeadora": None,
        "Cortadora de césped": None,
        "Cortacerco": None,
        "Hoyadora": None,
        "Motoguadaña": None,
        "Motosierra": None,
        "Pulverizador": None,
        "Sopladora de hojas": None,
        "Tractor cortacésped": None,
    },
    "Transporte": {
        "Acoplado": None,
        "Casilla": None,
        "Mixer": None,
        "Tanques": None,
        "Tolvas": None,
        "Trailers": None,
    },
}

# =========================
# HELPERS
# =========================

def normalize(name: str) -> str:
    """Primera letra mayúscula, resto minúscula"""
    name = name.strip().lower()
    return name.capitalize()


def get_or_create_category(db, name: str, parent_id: int | None):
    name = normalize(name)

    category = (
        db.query(Category)
        .filter(
            Category.name == name,
            Category.parent_id == parent_id,
        )
        .first()
    )

    if category:
        return category, False

    category = Category(
        name=name,
        parent_id=parent_id,
    )
    db.add(category)
    db.commit()
    db.refresh(category)
    return category, True


def seed_recursive(db, tree: dict, parent_id: int | None = None, level: int = 0):
    for name, children in tree.items():
        category, created = get_or_create_category(db, name, parent_id)

        prefix = "  " * level
        if created:
            print(f"{prefix}➕ {category.name}")
        else:
            print(f"{prefix}↪ {category.name}")

        if isinstance(children, dict):
            seed_recursive(db, children, category.id, level + 1)


# =========================
# RUN
# =========================

def run_seed():
    db = SessionLocal()
    try:
        print("🌱 Iniciando seed jerárquico de categorías...\n")
        seed_recursive(db, DATA)
        print("\n🎉 Seed jerárquico finalizado correctamente")
    finally:
        db.close()


if __name__ == "__main__":
    run_seed()
