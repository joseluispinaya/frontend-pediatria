<template>
  <div class="container">
    <h1 class="mb-4">Lista de Consultas</h1>
    <button @click="openModal" class="btn btn-primary mb-3">Agregar Consulta</button>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Diagnóstico</th>
            <th>Tratamiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="consultation in consultations" :key="consultation.id">
            <td>{{ consultation.diagnosis }}</td>
            <td>{{ consultation.treatment }}</td>
            <td>
              <button @click="editConsultation(consultation)" class="btn btn-sm btn-warning me-2">Editar</button>
              <button @click="deleteConsultation(consultation.id)" class="btn btn-sm btn-danger">Borrar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ConsultationModal v-if="isModalOpen" :consultation="selectedConsultation" @close="closeModal" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useConsultationStore } from '@/stores/consultationStore';
import ConsultationModal from '@/components/ConsultationModal.vue';

export default {
  components: { ConsultationModal },
  setup() {
    const consultationStore = useConsultationStore();
    const isModalOpen = ref(false);
    const selectedConsultation = ref(null);

    const openModal = () => {
      selectedConsultation.value = null;
      isModalOpen.value = true;
    };

    const editConsultation = (consultation) => {
      selectedConsultation.value = consultation;
      isModalOpen.value = true;
    };

    const deleteConsultation = async (id) => {
      if (confirm('¿Estás seguro de que quieres borrar el registro?')) {
        await consultationStore.deleteConsultation(id);
      }
    };

    const closeModal = () => {
      isModalOpen.value = false;
      consultationStore.fetchConsultations();
    };

    onMounted(() => {
      consultationStore.fetchConsultations();
    });

    return {
      consultations: consultationStore.consultations,
      isModalOpen,
      selectedConsultation,
      openModal,
      editConsultation,
      deleteConsultation,
      closeModal,
    };
  },
};
</script>