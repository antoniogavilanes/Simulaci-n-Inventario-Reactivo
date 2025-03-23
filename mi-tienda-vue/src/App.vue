<script setup>
import { crearInventario } from './inventario';

const { productos, ganancias, presupuesto, gastos, beneficios, reducirStock, aumentarStock } = crearInventario();
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

    <div class="grid">
      <div v-for="producto in productos" :key="producto.nombre" class="card">
        <h2>{{ producto.nombre }}</h2>
        <p>Precio: €{{ producto.precio }}</p>
        <p>Stock: {{ producto.stock }}</p>
        <p :class="{ disponible: producto.disponible, agotado: !producto.disponible }">
          {{ producto.disponible ? 'Disponible' : 'No Disponible' }}
        </p>
        <div class="buttons">
          <button @click="reducirStock(producto)">Vender</button>
          <button @click="aumentarStock(producto)">Reponer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./styles.css"></style>
