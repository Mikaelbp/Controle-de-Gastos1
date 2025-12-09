from sqlalchemy.orm import Session
from .models import Gasto
from .schemas import GastoCreate

def criar_gasto(db: Session, gasto: GastoCreate):
    novo = Gasto(
        descricao=gasto.descricao,
        categoria=gasto.categoria,
        valor=gasto.valor,
        data=gasto.data
    )
    db.add(novo)
    db.commit()
    db.refresh(novo)
    return novo

def listar_gastos(db: Session):
    return db.query(Gasto).all()

def buscar_por_categoria(db: Session, categoria: str):
    return db.query(Gasto).filter(Gasto.categoria == categoria).all()

def deletar_gasto(db: Session, gasto_id: int):
    gasto = db.query(Gasto).filter(Gasto.id == gasto_id).first()
    if gasto:
        db.delete(gasto)
        db.commit()
        return True
    return False
