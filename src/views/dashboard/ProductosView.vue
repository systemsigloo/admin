<template>
  <div class="container">
    <h1>Productos</h1>

    <button class="btn agregar" @click="mostrarModal = true">Agregar Producto</button>

    <!-- Modal para agregar producto -->
    <div v-if="mostrarModal" class="modal-backdrop" @click.self="cerrarModal">
      <div class="modal">
        <h2>Agregar Producto</h2>
        <form @submit.prevent="guardarProducto">
          <div class="form-group">
            <label for="nombre">Nombre del producto</label>
            <input type="text" id="nombre" v-model="nuevoProducto.nombre" required />
          </div>

          <div class="form-group">
            <label for="categoria">Categoría</label>
            <select id="categoria" v-model="nuevoProducto.categoria" required>
              <option disabled value="">Seleccione una categoría</option>
              <option v-for="cat in categorias" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>

          <div class="form-group">
            <label for="precio">Precio</label>
            <input type="number" id="precio" v-model="nuevoProducto.precio" required />
          </div>

          <div class="form-group">
            <label for="descripcion">Descripción</label>
            <textarea id="descripcion" v-model="nuevoProducto.descripcion" rows="3"></textarea>
          </div>

          <div class="form-group">
            <label for="foto">Foto del producto</label>
            <input type="file" id="foto" accept="image/*" @change="onFileChange" />
            <div v-if="preview" class="preview">
              <p>Vista previa:</p>
              <img :src="preview" alt="Vista previa" />
            </div>
          </div>

          <div class="modal-buttons">
            <button type="submit" class="btn guardar">Guardar</button>
            <button type="button" class="btn cancelar" @click="cerrarModal">Cancelar</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Listado de productos -->
    <table class="productos-table" v-if="productos.length">
      <thead>
        <tr>
          <th>Foto</th>
          <th>Nombre</th>
          <th>Categoría</th>
          <th>Precio</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="prod in productos" :key="prod.id">
          <td>
            <img :src="getImageUrl(prod.imagen)" alt="Foto producto" class="foto-lista" />
          </td>
          <td>{{ prod.nombre }}</td>
          <td>{{ prod.categoria }}</td>
          <td>{{ prod.precio }}</td>
          <td>{{ prod.descripcion }}</td>
          <td>
            <button class="btn editar" @click="editarProducto(prod)">Editar</button>
            <button class="btn borrar" @click="borrarProducto(prod.id)">Borrar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>No hay productos para mostrar.</p>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
import api from '@/api' 
const BACKEND_URL = 'http://back.local';

const mostrarModal = ref(false)
const preview = ref(null)

const categorias = ['Bebidas', 'Comidas', 'Postres']
const isEditing = ref(false);
const editingProductId = ref(null);
const isLoading = ref(false);
const productos = ref([])
const error = ref(null);



const getImageUrl = (foto) => {
  if (!foto) return 'https://via.placeholder.com/80x80?text=Sin+foto';
  // Si la API devuelve una URL relativa, concatenamos la base
  return foto.startsWith('http') ? foto : `${BACKEND_URL}${foto}`;
};


const cargarProductos = async () => {
  try {
    const res = await fetch('http://back.local/api/productos')
    const data = await res.json()
    productos.value = data
  } catch (error) {
    console.error('Error cargando categorías:', error)
  }
}


onMounted(() => {
    const token = localStorage.getItem('token')
    console.log('veremos   ' + token);
  cargarProductos()
})

const nuevoProducto = reactive({
  nombre: '',
  categoria: '',
  precio: null,
  descripcion: '',
  foto: null
})

const onFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    nuevoProducto.foto = file
    preview.value = URL.createObjectURL(file)
  }
}




const guardarProducto = async () => {
  isLoading.value = true;
  error.value = null;
console.log('1');

  const formData = new FormData();
  formData.append('nombre', nuevoProducto.nombre);
  formData.append('categoria', nuevoProducto.categoria);
  formData.append('precio', nuevoProducto.precio);
  formData.append('descripcion', nuevoProducto.descripcion || '');
  console.log('2');
  if (nuevoProducto.foto) {
    formData.append('imagen', nuevoProducto.foto);
  }
  console.log('3');
  if (isEditing.value) {
    formData.append('_method', 'PUT');
  }
console.log('4');
  try {
    const url = isEditing.value ? `/productos/${editingProductId.value}` : '/productos';
    const response = await api.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('5');
    await cargarProductos(); // Refrescar la lista
    cerrarModal();
  } catch (err) {
    error.value = 'Error al guardar el producto: ' + (err.response?.data?.message || err.message);
  } finally {
    isLoading.value = false;
  }
};






const cerrarModal = () => {
  mostrarModal.value = false
  preview.value = null
  nuevoProducto.nombre = ''
  nuevoProducto.categoria = ''
  nuevoProducto.precio = null
  nuevoProducto.descripcion = ''
  nuevoProducto.foto = null
}

const editarProducto = (prod) => {
  alert('Funcionalidad editar no implementada aún')
}

const borrarProducto = (id) => {
  productos.value = productos.value.filter(p => p.id !== id)
}
</script>

<style>
.container {
  background-color: #7b1113;
  color: gold;
  min-height: 100vh;
  padding: 20px 40px;
  font-family: Arial, sans-serif;
}

h1 {
  margin-bottom: 20px;
}

.btn {
  background-color: gold;
  color: #7b1113;
  font-weight: bold;
  border: none;
  padding: 8px 16px;
  margin: 0 6px 12px 0;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn.agregar {
  margin-bottom: 20px;
}

.btn.guardar {
  margin-right: 10px;
}

.btn.cancelar {
  background-color: #b31734;
  color: gold;
}

.btn:hover {
  background-color: #ffd700;
  color: #7b1113;
}

.productos-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #8c1a1c;
  border-radius: 12px;
  overflow: hidden;
}

.productos-table th,
.productos-table td {
  padding: 12px 15px;
  border-bottom: 1px solid gold;
  text-align: left;
  color: gold;
}

.productos-table th {
  background-color: #7b1113;
}

.foto-lista {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid gold;
}

/* Modal */

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(123, 17, 19, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal {
  background-color: #8c1a1c;
  padding: 25px 30px;
  border-radius: 12px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 0 15px gold;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 6px;
  color: gold;
}

input,
select,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid gold;
  border-radius: 6px;
  background-color: #7b1113;
  color: gold;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #ffd700;
}

.preview img {
  max-width: 150px;
  margin-top: 8px;
  border-radius: 8px;
  border: 2px solid gold;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
