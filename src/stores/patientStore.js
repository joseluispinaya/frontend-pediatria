import { defineStore } from 'pinia';
import apiClient from '@/services/apiClient';

export const usePatientStore = defineStore('patient', {
  state: () => ({
    patients: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchPatients() {
      this.loading = true;
      try {
        const response = await apiClient.get('/patients');
        this.patients = response.data;
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
    async createPatient(patient) {
      try {
        const response = await apiClient.post('/patients', patient);
        this.patients.push(response.data);
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
    async updatePatient(patient) {
      try {
        const response = await apiClient.put(`/patients/${patient.id}`, patient);
        const index = this.patients.findIndex(p => p.id === patient.id);
        if (index !== -1) {
          this.patients.splice(index, 1, response.data);
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
    async deletePatient(id) {
      try {
        await apiClient.delete(`/patients/${id}`);
        this.patients = this.patients.filter(p => p.id !== id);
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