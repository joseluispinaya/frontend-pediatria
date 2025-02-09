<template>
  <div class="container">
    <h1 class="mb-4">Lista de Doctores</h1>
    <button @click="openModal" class="btn btn-primary mb-3">Agregar Doctor</button>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Especialidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="doctor in doctors" :key="doctor.id">
            <td>{{ doctor.name }}</td>
            <td>{{ doctor.specialty }}</td>
            <td>
              <button @click="editDoctor(doctor)" class="btn btn-sm btn-warning me-2">Editar</button>
              <button @click="deleteDoctor(doctor.id)" class="btn btn-sm btn-danger">Borrar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <DoctorModal v-if="isModalOpen" :doctor="selectedDoctor" @close="closeModal" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useDoctorStore } from '@/stores/doctorStore';
import DoctorModal from '@/components/DoctorModal.vue';

export default {
  components: { DoctorModal },
  setup() {
    const doctorStore = useDoctorStore();
    const isModalOpen = ref(false);
    const selectedDoctor = ref(null);

    const openModal = () => {
      selectedDoctor.value = null;
      isModalOpen.value = true;
    };

    const editDoctor = (doctor) => {
      selectedDoctor.value = doctor;
      isModalOpen.value = true;
    };

    const deleteDoctor = async (id) => {
      if (confirm('¿Estás seguro de que quieres borrar el registro?')) {
        await doctorStore.deleteDoctor(id);
      }
    };

    const closeModal = () => {
      isModalOpen.value = false;
      doctorStore.fetchDoctors();
    };

    onMounted(() => {
      doctorStore.fetchDoctors();
    });

    return {
      doctors: doctorStore.doctors,
      isModalOpen,
      selectedDoctor,
      openModal,
      editDoctor,
      deleteDoctor,
      closeModal,
    };
  },
};
</script>