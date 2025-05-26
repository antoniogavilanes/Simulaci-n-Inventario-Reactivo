import graphene
from graphene import ObjectType, Int, String, Float, Boolean, Field, List
from data import productos

class ProductoType(ObjectType):
    id = Int()
    nombre = String()
    precio = Float()
    stock = Int()
    disponible = Boolean()

class Query(ObjectType):
    productos = List(ProductoType)

    def resolve_productos(self, info):
        return productos

class ActualizarStock(graphene.Mutation):
    class Arguments:
        id = Int(required=True)
        cantidad = Int(required=True)

    producto = Field(ProductoType)

    def mutate(self, info, id, cantidad):
        if cantidad == 0:
            raise Exception("La cantidad debe ser distinta de cero.")

        for producto in productos:
            if producto["id"] == id:
                nuevo_stock = producto["stock"] + cantidad
                if nuevo_stock < 0:
                    nuevo_stock = 0

                producto["stock"] = nuevo_stock
                producto["disponible"] = nuevo_stock > 0
                return ActualizarStock(producto=producto)

        raise Exception("Producto no encontrado.")

class Mutation(ObjectType):
    actualizar_stock = ActualizarStock.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
