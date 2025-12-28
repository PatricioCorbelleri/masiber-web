from app.database import SessionLocal
from app.models import Category

def run():
    db = SessionLocal()

    try:
        print("🧹 Limpiando categorías...")
        db.query(Category).delete()
        db.commit()

        print("🌱 Insertando categorías...")

        maquinaria = Category(name="Maquinaria Agrícola", parent_id=None)
        db.add(maquinaria)
        db.flush()

        subcats = [
            "Motocultivadores",
            "Tractores",
            "Implementos"
        ]

        for name in subcats:
            db.add(Category(name=name, parent_id=maquinaria.id))

        db.commit()
        print("✅ Categorías creadas correctamente")

    except Exception as e:
        db.rollback()
        print("❌ ERROR EN SEED:", e)
    finally:
        db.close()

if __name__ == "__main__":
    run()
