import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'

import Categorias from '../views/dashboard/CategoriasView.vue'
import Productos from '../views/dashboard/ProductosView.vue'

// Rutas públicas y protegidas
const routes = [
  { path: '/', redirect: '/login' },
  
  { path: '/login', component: Login },
  { path: '/dashboard',
    component: DashboardLayout,
    children: [
      {
        path: 'configuracion/categorias',
        name: 'categorias',
        component: Categorias,
      },
       {
        path: 'configuracion/productos',
        name: 'productos',
        component: Productos,
      },
      // otras rutas hijas como pedidos, clientes, etc.
    ],
    meta: { requiresAuth: true }  // marcamos esta ruta como protegida
  },
 
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Guard global para verificar autenticación
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')  // o donde guardes el token
    console.log('en el router   '+token);
    
  if (to.meta.requiresAuth && !token) {
    // Si la ruta es protegida y no hay token, redirige a login
    next('/login')
  } else if (to.path === '/login' && token) {
    // Si intenta ir a login pero ya está autenticado, redirige a dashboard
    next('/dashboard')
  } else {
    next() // sigue con la navegación
  }
})

export default router
