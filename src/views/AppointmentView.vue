<template>
  <div class="container">
    <h1 class="mb-4">Lista de Citas</h1>
    <button @click="openModal" class="btn btn-primary mb-3">Agregar Cita</button>
    <div class="table-responsive">
      <table class="table table-striped">
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="appointment in appointments" :key="appointment.id">
          <td>{{ appointment.date }}</td>
          <td>{{ appointment.time }}</td>
          <td>
            <button @click="editAppointment(appointment)" class="btn btn-sm btn-warning me-2">Editar</button>
            <button @click="deleteAppointment(appointment.id)" class="btn btn-sm btn-danger">Borrar</button>
          </td>
        </tr>
      </tbody>
    </table>
    </div>    
    <AppointmentModal v-if="isModalOpen" :appointment="selectedAppointment" @close="closeModal" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useAppointmentStore } from '@/stores/appointmentStore';
import AppointmentModal from '@/components/AppointmentModal.vue';

export default {
  components: { AppointmentModal },
  setup() {
    const appointmentStore = useAppointmentStore();
    const isModalOpen = ref(false);
    const selectedAppointment = ref(null);

    const openModal = () => {
      selectedAppointment.value = null;
      isModalOpen.value = true;
    };

    const editAppointment = (appointment) => {
      selectedAppointment.value = appointment;
      isModalOpen.value = true;
    };

    const deleteAppointment = async (id) => {
      if (confirm('¿Estás seguro de que quieres borrar el registro?')) {
        await appointmentStore.deleteAppointment(id);
      }
    };

    const closeModal = () => {
      isModalOpen.value = false;
      appointmentStore.fetchAppointments();
    };

    onMounted(() => {
      appointmentStore.fetchAppointments();
    });

    return {
      appointments: appointmentStore.appointments,
      isModalOpen,
      selectedAppointment,
      openModal,
      editAppointment,
      deleteAppointment,
      closeModal,
    };
  },
};
</script>