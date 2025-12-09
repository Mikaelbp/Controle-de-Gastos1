from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from . import models, schemas, crud
from .database import engine, SessionLocal

from fastapi.middleware.cors import CORSMiddleware

# Criar tabelas
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Sistema de Controle de GERENCIAMENTO",
    description="API para registrar, listar e gerenciar gastos pessoais.",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Dependência do banco
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ------------------------
#       ROTAS
# ------------------------

@app.get("/gastos", tags=["GERENCIAMENTO"], response_model=list[schemas.Gasto])
def listar_gastos(db: Session = Depends(get_db)):
    return crud.listar_gastos(db)


@app.post("/gastos", tags=["GERENCIAMENTO"], response_model=schemas.Gasto)
def criar_gasto(gasto: schemas.GastoCreate, db: Session = Depends(get_db)):
    return crud.criar_gasto(db, gasto)


@app.get("/gastos/categoria/{categoria}", tags=["GERENCIAMENTO"], response_model=list[schemas.Gasto])
def listar_por_categoria(categoria: str, db: Session = Depends(get_db)):
    return crud.buscar_por_categoria(db, categoria)


@app.delete("/gastos/{gasto_id}", tags=["GERENCIAMENTO"])
def deletar(gasto_id: int, db: Session = Depends(get_db)):
    deleted = crud.deletar_gasto(db, gasto_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Gasto não encontrado")
    return {"message": "Gasto deletado com sucesso"}
