Backend 

fastapi
uvicorn[standard]

sqlalchemy
psycopg2-binary
alembic

passlib[bcrypt]
python-multipart

python-dotenv
pydantic

-----------------------------
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt

uvicorn app.main:app --reload


/-------------------------------/

Frontend

cd frontend
npm install
npm start


