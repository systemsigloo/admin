<template>
  <div class="login-container">
    <h1 class="login-title">Good Friends</h1>
    <form class="login-form" @submit.prevent="login">
      <input type="text" placeholder="Usuario" class="login-input" v-model="email" />
      <input type="password" placeholder="Contraseña" class="login-input" v-model="password" />
      <button type="submit" class="login-button">Ingresar</button>
    </form>
  </div>
</template>



<script>
import axios from 'axios'
import api from '@/api' 

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async login() {
      this.error = ''
      try {
        const response = await api.post('/login', {
          email: this.email,
          password: this.password
        })

        const token = response.data.token
        console.log(token);
        
        localStorage.setItem('token', token)
        console.log('login  ' + localStorage.getItem('token'))
        // Configurar token para siguientes requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        // Redirigir al dashboard
        this.$router.push('/dashboard')
      } catch (err) {
        this.error = 'Credenciales inválidas'
      }
    }
  }
}
</script>



<style>
body {
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
  background-color: #8B0000; /* Rojo oscuro */
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.login-title {
  color: #FFD700; /* Dorado */
  font-size: 3rem;
  margin-bottom: 40px;
  letter-spacing: 2px;
}

.login-form {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0,0,0,0.4);
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 300px;
}

.login-input {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login-button {
  background-color: #B22222; /* Rojo intenso */
  color: #FFD700; /* Dorado */
  font-weight: bold;
  padding: 10px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #a00000;
}
</style>
