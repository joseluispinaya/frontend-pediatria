import { defineStore } from 'pinia';
import apiClient from '@/services/apiClient';

export const useDoctorStore = defineStore('doctor', {
  state: () => ({
    doctors: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchDoctors() {
      this.loading = true;
      try {
        const response = await apiClient.get('/doctors');
        this.doctors = response.data;
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
    async createDoctor(doctor) {
      try {
        const response = await apiClient.post('/doctors', doctor);
        this.doctors.push(response.data);
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
    async updateDoctor(doctor) {
      try {
        const response = await apiClient.put(`/doctors/${doctor.id}`, doctor);
        const index = this.doctors.findIndex(d => d.id === doctor.id);
        if (index !== -1) {
          this.doctors.splice(index, 1, response.data);
        }
        this.$swal.fire({
          icon:'success',
          title: 'Éxito',
          text: 'Registro actualizado correctamente',
        });
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
    async deleteDoctor(id) {
      try {
        await apiClient.delete(`/doctors/${id}`);
        this.doctors = this.doctors.filter(d => d.id !== id);
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