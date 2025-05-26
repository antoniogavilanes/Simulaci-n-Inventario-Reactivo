<script setup>
import { onMounted } from 'vue';
import { usarInventario } from './inventario.js';

const {
  productos,
  presupuesto,
  ganancias,
  gastos,
  beneficios,
  cargarProductos,
  vender,
  reponer
} = usarInventario();

onMounted(() => {
  cargarProductos();
});
</script>

<template>
  <div class="container">
    <h1>Inventario de Productos</h1>

    <div class="info">
      <div class="ganancias">💰 Ganancias: €{{ ganancias }}</div>
      <div class="presupuesto">💵 Presupuesto: €{{ presupuesto }}</div>
      <div class="gastos">💸 Gastos: €{{ gastos }}</div>
      <div class="beneficios">📊 Beneficios: €{{ beneficios }}</div>
    </div>

    <div class="grid" v-if="productos.length > 0">
      <div v-for="producto in productos" :key="producto.id" class="card">
        <h2>{{ producto.nombre }}</h2>
        <p>Precio: €{{ producto.precio }}</p>
        <p>Stock: {{ producto.stock }}</p>
        <p :class="{ disponible: producto.disponible, agotado: !producto.disponible }">
          {{ producto.disponible ? 'Disponible' : 'No Disponible' }}
        </p>
        <div class="buttons">
          <button @click="vender(producto)">Vender</button>
          <button @click="reponer(producto)">Reponer</button>
        </div>
      </div>
    </div>
    <div v-else>
      Cargando productos...
    </div>
  </div>
</template>

<style src="./styles.css"></style>
