import { ref, computed } from 'vue';

const API_URL = 'http://localhost:5000/graphql';

const productos = ref([]);
const presupuesto = ref(1000);
const ganancias = ref(0);
const gastos = ref(0);

const beneficios = computed(() => ganancias.value - gastos.value);

async function cargarProductos() {
  const query = `
    query {
      productos {
        id
        nombre
        precio
        stock
        disponible
      }
    }
  `;

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    const json = await res.json();
    if (json.data?.productos) {
      productos.value = json.data.productos;
    }
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
}

async function actualizarStock(id, cantidad) {
  const mutation = `
    mutation {
      actualizarStock(id: ${id}, cantidad: ${cantidad}) {
        producto {
          id
          stock
          disponible
        }
      }
    }
  `;

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: mutation }),
    });

    const json = await res.json();
    return json.data?.actualizarStock?.producto;
  } catch (error) {
    console.error("Error al actualizar stock:", error);
  }
}

async function recargarPresupuesto() {
  if (presupuesto.value <= 200) {
    presupuesto.value += ganancias.value;
    ganancias.value = 0;
  }
}

async function vender(producto) {
  if (producto.stock > 0) {
    const actualizado = await actualizarStock(producto.id, -1);
    if (actualizado) {
      producto.stock = actualizado.stock;
      producto.disponible = actualizado.disponible;
      ganancias.value += producto.precio;
    }
    await recargarPresupuesto();
  }
}

async function reponer(producto) {
  if (presupuesto.value >= producto.precio) {
    const actualizado = await actualizarStock(producto.id, 1);
    if (actualizado) {
      producto.stock = actualizado.stock;
      producto.disponible = actualizado.disponible;
      gastos.value += producto.precio;
      presupuesto.value -= producto.precio;
    }
    await recargarPresupuesto();
  } else {
    alert("Presupuesto insuficiente");
  }
}

export function usarInventario() {
  return {
    productos,
    presupuesto,
    ganancias,
    gastos,
    beneficios,
    cargarProductos,
    vender,
    reponer
  };
}
