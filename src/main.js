import { createApp } from 'vue';
import router from './router';

import { createPinia } from 'pinia';

import App from './App.vue';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

const app = createApp(App);

// Configuración de SweetAlert2
const sweetAlertOptions = {
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
};

app.use(createPinia())
.use(router)
.use(VueSweetalert2, sweetAlertOptions)

// Proveer $swal globalmente
app.config.globalProperties.$swal = app.config.globalProperties.$swal;

app.mount('#app');
