from fastapi import FastAPI
from database import get_connection, create_tables

app = FastAPI()


@app.on_event("startup")
def startup():
    create_tables()


@app.get("/")
def root():
    return {"message": "DevOps Task Manager API running"}


@app.post("/tasks")
def create_task(title: str):
    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        "INSERT INTO tasks (title, status) VALUES (%s, %s)",
        (title, "todo")
    )

    conn.commit()
    cur.close()
    conn.close()

    return {"status": "task created"}


@app.get("/tasks")
def list_tasks():
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("SELECT id, title, status FROM tasks")
    tasks = cur.fetchall()

    cur.close()
    conn.close()

    return {"tasks": tasks}