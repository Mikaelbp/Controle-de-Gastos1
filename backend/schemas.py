from pydantic import BaseModel
from datetime import date

class GastoBase(BaseModel):
    descricao: str
    categoria: str
    valor: float
    data: date

class GastoCreate(GastoBase):
    pass

class Gasto(GastoBase):
    id: int

    class Config:
        from_attributes = True
