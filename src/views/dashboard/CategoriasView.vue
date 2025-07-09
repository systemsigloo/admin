<template>
  <div class="container">
   
      <h1>Categorías</h1>
      
 
 <button class="btn agregar" @click="openAgregarCategoria()">Agregar Categoria</button>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(categoria, index) in categorias" :key="categoria.id">
          <td>{{ index + 1 }}</td>
          <td>{{ categoria.nombre }}</td>
          <td>
            <button class="btn editar" @click="editarCategoria(categoria)">Editar</button>
            <button class="btn cancelar" @click="eliminarCategoria(categoria.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="modalVisible" class="modal-overlay">
      <div class="modal">
        <h3>{{ editando ? 'Editar Categoría' : 'Agregar Categoría' }}</h3>
        <form @submit.prevent="agregarCategoria">
      <input
        v-model="nuevaCategoria"
        type="text"
        placeholder="Nueva categoría"
        required
      />
      <input
        v-model="idCategoria"
        type="hidden"
        
      />
      <button type="submit" class="btn agregar">{{ editando ? 'Editar' : 'Agregar' }}</button>
       <button type="button" class="btn cancelar" @click="cancelar">Cerrar</button>
    </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref , onMounted } from 'vue'
import axios from 'axios'
import api from '@/api' 

const modalVisible = ref(false)
const form = ref({ id: null, nombre: '' })
const editando = ref(false)
const categorias = ref([])
const nuevaCategoria = ref('')
const idCategoria = ref('')
const cargarCategorias = async () => {
  try {
    const res = await fetch('http://back.local/api/categorias')
    const data = await res.json()
    categorias.value = data
  } catch (error) {
    console.error('Error cargando categorías:', error)
  }
}

onMounted(() => {
    const token = localStorage.getItem('token')
    console.log('veremos   ' + token);
  cargarCategorias()
})

const openAgregarCategoria = () => {
  form.value = { id: null, nombre: '' }
  editando.value = false
  modalVisible.value = true
}

const editarCategoria = (categoria) => {
  form.value = { ...categoria }
  console.log('editar');
  console.log(categoria.nombre);
  
  
  nuevaCategoria.value = categoria.nombre
  idCategoria.value = categoria.id
  editando.value = true
  modalVisible.value = true
}

const eliminarCategoria = async (id) => {
  if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
    try {
      await api.delete(`/categorias/${id}`); // Llamada DELETE al backend
      categorias.value = categorias.value.filter(cat => cat.id !== id); // Actualiza frontend
      alert('Categoría eliminada con éxito');
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
      alert('No se pudo eliminar la categoría');
    }
  }
};

const agregarCategoria = async () => {
  try {
    
    
     const res = editando ? await api.put('/categorias/'+idCategoria.value, {
      nombre: nuevaCategoria.value,
    }) : await api.post('/categorias', {
      nombre: nuevaCategoria.value,
    })
    cargarCategorias();
    
    nuevaCategoria.value = ''
    
    console.log('como regresa  ' );
    console.log(res.data);
    
    
    
    cancelar()
  } catch (error) {
    console.error('Error al agregar categoría:', error)
    alert('No se pudo agregar la categoría')
  }
}

const cancelar = () => {
  modalVisible.value = false
}
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.container {
  background-color: #7b1113;
  color: gold;
  min-height: 100vh;
  padding: 40px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h1 {
  margin: 0;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: #8c1a1c;
  color: gold;
}

th, td {
  padding: 12px;
  border: 1px solid gold;
  text-align: left;
}

th {
  background-color: #990f11;
}

.btn {
  padding: 6px 12px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  border-radius: 4px;
}

.editar {
  background-color: gold;
  color: #7b1113;
  margin-right: 5px;
}

.eliminar {
  background-color: #b30000;
  color: white;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 320px;
}

.modal h3 {
  margin-top: 0;
}

.modal input {
  width: 100%;
  padding: 8px;
  margin-top: 10px;
  margin-bottom: 20px;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.cancelar {
  background-color: #ccc;
}

.guardar {
  background-color: #7b1113;
  color: gold;
}
</style>
