
<template>
  <div class="dashboard">
    <Sidebar />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue'
</script>

<script>
export default {
  mounted() {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/'; // Redirige al login si no hay token
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
  }
};
</script>

<style>
.dashboard {
  display: flex;
  
  color: goldenrod;
  background-color: #a40000;

}
.content {
  flex: 1;
  padding: 20px;
}
.welcome {
  font-size: 2rem;
  margin-bottom: 10px;
}

.info {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.logout-button {
  padding: 10px 20px;
  background-color: goldenrod;
  border: none;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  color: #a40000;
}
.logout-button:hover {
  background-color: #ffcc33;
}
</style>
