<template>
  <nav class="sidebar">
    <h2 class="logo">Mi Panel</h2>
    <ul class="menu">
      <li>
        <router-link to="/dashboard/pedidos" class="link">Pedidos</router-link>
      </li>
      <li>
        <router-link to="/dashboard/clientes" class="link">Clientes</router-link>
      </li>
      <li>
        <router-link to="/dashboard/pagos" class="link">Pagos</router-link>
      </li>
      <li class="submenu-title">Configuración</li>
      <ul class="submenu">
        <li>
          <router-link to="/dashboard/configuracion/categorias" class="link">Categorías</router-link>
        </li>
        <li>
          <router-link to="/dashboard/configuracion/productos" class="link">Productos</router-link>
        </li>
      </ul>
    </ul>
  </nav>
</template>

<style scoped>
.sidebar {
  width: 240px;
  background-color: #402d2d;
  color: #f1c40f; /* Dorado */
  height: 100vh;
  padding: 30px 20px;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.3);
  font-family: 'Segoe UI', sans-serif;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
}

.logo {
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 30px;
  text-align: center;
  color: #f39c12;
  letter-spacing: 1px;
}

.menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.link {
  display: block;
  padding: 12px 15px;
  margin-bottom: 8px;
  border-radius: 6px;
  color: #f1c40f;
  text-decoration: none;
  transition: background 0.3s;
}

.link:hover {
  background-color: #750e0e;
  color: #fff2b2;
}

.submenu-title {
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 0.95rem;
  color: #d4af37;
  padding-left: 10px;
}

.submenu {
  list-style: none;
  padding-left: 15px;
}

.submenu .link {
  font-size: 0.9rem;
  color: #e1b12c;
}
</style>

