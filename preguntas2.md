
# Preguntas frecuentes sobre la implementación de GraphQL en el sistema de inventario

## ¿Qué ventajas ofrece GraphQL sobre REST en este contexto?

GraphQL ofrece varias ventajas sobre REST, especialmente en un sistema de inventario como el nuestro:

- **Petición única y eficiente:** Permite obtener exactamente los datos que se necesitan en una sola consulta, evitando múltiples llamadas como en REST.
- **Reducción de sobrecarga de datos:** Al poder seleccionar campos específicos, evitamos enviar información innecesaria.
- **Mejor control del cliente:** El frontend define qué datos necesita, lo cual mejora la flexibilidad y la eficiencia del consumo de la API.
- **Esquema tipado:** El sistema es auto-documentado gracias al esquema, lo que facilita el desarrollo y mantenimiento.

## ¿Cómo se definen los tipos y resolvers en una API con GraphQL?

En GraphQL, todo parte del **schema**, que define los tipos, consultas (`Query`) y mutaciones (`Mutation`). Por ejemplo:

```graphql
type Producto {
  id: ID!
  nombre: String!
  stock: Int!
  disponible: Boolean!
}
```

Los **resolvers** son funciones que le dicen a GraphQL cómo obtener los datos para esos tipos. Por ejemplo, un resolver para actualizar stock:

```python
def resolver_actualizar_stock(root, info, id, cantidad):
    producto = obtener_producto_por_id(id)
    producto.stock += cantidad
    producto.disponible = producto.stock > 0
    guardar_producto(producto)
    return producto
```

## ¿Por qué es importante que el backend también actualice disponible y no depender solo del frontend?

Porque la lógica de negocio debe residir en el backend para mantener la **integridad del sistema**. Si dejamos que el frontend maneje variables críticas como `disponible`, corremos riesgos como:

- Datos inconsistentes entre clientes.
- Vulnerabilidad a errores o manipulaciones maliciosas desde el cliente.
- Duplicación de lógica y difícil mantenimiento.

Al centralizar esta lógica en el backend, garantizamos que las reglas del negocio se cumplan de forma uniforme.

## ¿Cómo garantizas que la lógica de actualización de stock y disponibilidad sea coherente?

Para garantizar coherencia, se siguen estos principios:

1. **Lógica centralizada:** Toda actualización de stock y disponibilidad ocurre exclusivamente en el backend.
2. **Reglas automáticas:** Cada vez que se actualiza el stock, el valor de `disponible` se recalcula automáticamente (`disponible = stock > 0`).
3. **Pruebas unitarias:** Se implementan tests que validan el comportamiento esperado en diversos escenarios (stock negativo, compras masivas, etc.).
4. **Control de concurrencia:** Se usan mecanismos como locks o transacciones para evitar condiciones de carrera en actualizaciones simultáneas.

Esto asegura que el sistema se mantenga robusto, predecible y confiable.
