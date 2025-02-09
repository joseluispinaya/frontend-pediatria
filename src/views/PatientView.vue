<template>
  <div class="container">
    <h1 class="mb-4">Lista de Pacientes</h1>
    <button @click="openModal" class="btn btn-primary mb-3">Agregar Paciente</button>
    <div class="table-responsive">
      <table class="table table-striped">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Fecha de Nacimiento</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="patient in patients" :key="patient.id">
          <td>{{ patient.name }}</td>
          <td>{{ patient.birthdate }}</td>
          <td>
            <button @click="editPatient(patient)" class="btn btn-sm btn-warning me-2">Editar</button>
            <button @click="deletePatient(patient.id)" class="btn btn-sm btn-danger">Borrar</button>
          </td>
        </tr>
      </tbody>
    </table>
    </div>    
    <PatientModal v-if="isModalOpen" :patient="selectedPatient" @close="closeModal" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { usePatientStore } from '@/stores/patientStore';
import PatientModal from '@/components/PatientModal.vue';

export default {
  components: { PatientModal },
  setup() {
    const patientStore = usePatientStore();
    const isModalOpen = ref(false);
    const selectedPatient = ref(null);

    const openModal = () => {
      selectedPatient.value = null;
      isModalOpen.value = true;
    };

    const editPatient = (patient) => {
      selectedPatient.value = patient;
      isModalOpen.value = true;
    };

    const deletePatient = async (id) => {
      if (confirm('¿Estás seguro de que quieres borrar el registro?')) {
        await patientStore.deletePatient(id);
      }
    };

    const closeModal = () => {
      isModalOpen.value = false;
      patientStore.fetchPatients();
    };

    onMounted(() => {
      patientStore.fetchPatients();
    });

    return {
      patients: patientStore.patients,
      isModalOpen,
      selectedPatient,
      openModal,
      editPatient,
      deletePatient,
      closeModal,
    };
  },
};
</script>