<template>
  <div class="dashboard-layout">
    <aside class="sidebar">
      <h2>Menú</h2>
      <ul>
        <li><router-link to="/dashboard/pedidos">Pedidos</router-link></li>
        <li><router-link to="/dashboard/clientes">Clientes</router-link></li>
        <li><router-link to="/dashboard/pagos">Pagos</router-link></li>
        <li>
          Configuración
          <ul>
            <li><router-link to="/dashboard/configuracion/categorias">Categorías</router-link></li>
            <li><router-link to="/dashboard/configuracion/productos">Productos</router-link></li>
          </ul>
        </li>
      </ul>
    </aside>

    <main class="content">
      <router-view />
    </main>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const token = localStorage.getItem('token')
  console.log('Token desde vista:', token)
})
</script>
<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 220px;
  background: #900;
  color: gold;
  padding: 20px;
}

.sidebar a {
  color: gold;
  text-decoration: none;
  display: block;
  margin: 8px 0;
}

.sidebar a.router-link-active {
  font-weight: bold;
}

.content {
  flex-grow: 1;
  padding: 20px;
  background: #fff;
}
</style>
