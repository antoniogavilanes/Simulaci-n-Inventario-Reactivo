import { reactive, watch, ref } from 'vue';

export function crearInventario() {
  const productos = reactive([
    { nombre: 'Laptop', precio: 800, stock: 5, disponible: true },
    { nombre: 'Mouse', precio: 20, stock: 15, disponible: true },
    { nombre: 'Teclado', precio: 50, stock: 10, disponible: true },
    { nombre: 'Monitor', precio: 200, stock: 8, disponible: true },
    { nombre: 'Silla Gamer', precio: 150, stock: 3, disponible: true },
    { nombre: 'Auriculares', precio: 40, stock: 12, disponible: true },
    { nombre: 'Micrófono', precio: 70, stock: 7, disponible: true },
    { nombre: 'Webcam', precio: 90, stock: 6, disponible: true },
    { nombre: 'Smartphone', precio: 600, stock: 4, disponible: true },
    { nombre: 'Tablet', precio: 350, stock: 5, disponible: true },
    { nombre: 'Router', precio: 80, stock: 10, disponible: true },
    { nombre: 'Disco Duro Externo', precio: 120, stock: 8, disponible: true },
    { nombre: 'Cámara Digital', precio: 400, stock: 3, disponible: true },
    { nombre: 'Cargador Inalámbrico', precio: 30, stock: 20, disponible: true },
    { nombre: 'Reloj Inteligente', precio: 180, stock: 6, disponible: true },
    { nombre: 'Parlantes Bluetooth', precio: 60, stock: 10, disponible: true },
    { nombre: 'Batería Externa', precio: 50, stock: 15, disponible: true },
    { nombre: 'Mochila', precio: 40, stock: 12, disponible: true },
    { nombre: 'Teclado Mecánico', precio: 120, stock: 8, disponible: true },
    { nombre: 'Silla de Oficina', precio: 250, stock: 2, disponible: true },
    { nombre: 'Gafas VR', precio: 300, stock: 4, disponible: true },
    { nombre: 'Lámpara LED', precio: 25, stock: 18, disponible: true },
    { nombre: 'Microondas', precio: 150, stock: 7, disponible: true },
    { nombre: 'Aspiradora Robot', precio: 220, stock: 5, disponible: true },
    { nombre: 'Tetera Eléctrica', precio: 40, stock: 10, disponible: true },
    { nombre: 'Bicicleta Estática', precio: 250, stock: 3, disponible: true },
    { nombre: 'Batidora', precio: 90, stock: 6, disponible: true },
    { nombre: 'Cafetera', precio: 75, stock: 12, disponible: true },
    { nombre: 'Plancha de Ropa', precio: 60, stock: 8, disponible: true },
    { nombre: 'Secador de Pelo', precio: 35, stock: 15, disponible: true },
    { nombre: 'Cámara de Seguridad', precio: 120, stock: 7, disponible: true },
    { nombre: 'Altavoz Inteligente', precio: 100, stock: 10, disponible: true },
    { nombre: 'Proyector', precio: 350, stock: 4, disponible: true },
    { nombre: 'Freidora sin Aceite', precio: 130, stock: 6, disponible: true },
    { nombre: 'Refrigerador', precio: 800, stock: 2, disponible: true },
    { nombre: 'Lavadora', precio: 500, stock: 3, disponible: true },
    { nombre: 'Aire Acondicionado', precio: 450, stock: 1, disponible: true },
    { nombre: 'Estufa Eléctrica', precio: 70, stock: 5, disponible: true },
    { nombre: 'Extractor de Jugo', precio: 60, stock: 8, disponible: true },
    { nombre: 'Licuadora', precio: 50, stock: 12, disponible: true },
    { nombre: 'Cámara Web HD', precio: 45, stock: 10, disponible: true },
    { nombre: 'Altavoces de PC', precio: 40, stock: 18, disponible: true },
    { nombre: 'Bocina Bluetooth', precio: 75, stock: 9, disponible: true },
    { nombre: 'Cable HDMI', precio: 15, stock: 25, disponible: true }
  ]);

  const ganancias = ref(0);
  const presupuesto = ref(500);
  const gastos = ref(0);

  const beneficios = ref(0);

  watch([ganancias, gastos], () => {
    beneficios.value = ganancias.value - gastos.value;
  });

  watch(
    () => productos.map(p => p.stock),
    (newStocks) => {
      newStocks.forEach((newStock, index) => {
        productos[index].disponible = newStock > 0;
      });
    }
  );

  const reducirStock = (producto) => {
    if (producto.stock > 0) {
      producto.stock--;
      ganancias.value += producto.precio;
      presupuesto.value += producto.precio;
    }
  };

  const aumentarStock = (producto) => {
    const costoReposicion = producto.precio * 0.8;

    if (presupuesto.value >= costoReposicion) {
      producto.stock++;
      presupuesto.value -= costoReposicion;
      gastos.value += costoReposicion;
    } else {
      alert('No tienes suficiente presupuesto para comprar este producto.');
    }
  };

  return { productos, ganancias, presupuesto, gastos, beneficios, reducirStock, aumentarStock };
}
