import { defineStore } from 'pinia';
import apiClient from '@/services/apiClient';

export const useConsultationStore = defineStore('consultation', {
  state: () => ({
    consultations: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchConsultations() {
      this.loading = true;
      try {
        const response = await apiClient.get('/consultations');
        this.consultations = response.data;
      } catch (error) {
        this.error = error.message;
        this.$swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al cargar los registros',
        });
      } finally {
        this.loading = false;
      }
    },
    async createConsultation(consultation) {
      try {
        const response = await apiClient.post('/consultations', consultation);
        this.consultations.push(response.data);
        this.$swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Registro creado correctamente',
        });
        return response.data;
      } catch (error) {
        this.$swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al crear el registro',
        });
        throw error;
      }
    },
    async updateConsultation(consultation) {
      try {
        const response = await apiClient.put(`/consultations/${consultation.id}`, consultation);
        const index = this.consultations.findIndex(c => c.id === consultation.id);
        if (index !== -1) {
          this.consultations.splice(index, 1, response.data);
          this.$swal.fire({
            icon:'success',
            title: 'Éxito',
            text: 'Registro actualizado correctamente',
          });
        }
        return response.data;
      } catch (error) {
        this.$swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al actualizar el registro',
        });
        throw error;
      }
    },
    async deleteConsultation(id) {
      try {
        await apiClient.delete(`/consultations/${id}`);
        this.consultations = this.consultations.filter(c => c.id !== id);
        this.$swal.fire({
          icon:'success',
          title: 'Éxito',
          text: 'Registro eliminado correctamente',
        });
      } catch (error) {
        this.$swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al eliminar el registro',
        });
        throw error;
      }
    },
  },
});