from sqlalchemy import Column, Integer, String, Float, Date
from .database import Base
import datetime

class Gasto(Base):
    __tablename__ = "gastos"

    id = Column(Integer, primary_key=True, index=True)
    descricao = Column(String, index=True)
    categoria = Column(String, index=True)
    valor = Column(Float)
    data = Column(Date, default=datetime.date.today)
