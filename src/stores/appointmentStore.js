import { defineStore } from 'pinia';
import apiClient from '@/services/apiClient';

export const useAppointmentStore = defineStore('appointment', {
  state: () => ({
    appointments: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchAppointments() {
      this.loading = true;
      try {
        const response = await apiClient.get('/appointments');
        this.appointments = response.data;
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
    async createAppointment(appointment) {
      try {
        const response = await apiClient.post('/appointments', appointment);
        this.appointments.push(response.data);
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
    async updateAppointment(appointment) {
      try {
        const response = await apiClient.put(`/appointments/${appointment.id}`, appointment);
        const index = this.appointments.findIndex(a => a.id === appointment.id);
        if (index !== -1) {
          this.appointments.splice(index, 1, response.data);
        }
        this.$swal.fire({
          icon: 'success',
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
    async deleteAppointment(id) {
      try {
        await apiClient.delete(`/appointments/${id}`);
        this.appointments = this.appointments.filter(a => a.id !== id);
        this.$swal.fire({
          icon: 'success',
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