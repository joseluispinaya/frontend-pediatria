<template>
  <div class="modal fade show" tabindex="-1" style="display: block">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ appointment ? 'Editar Cita' : 'Agregar Cita' }}</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm">
            <div class="mb-3">
              <label for="date" class="form-label">Fecha</label>
              <input v-model="form.date" type="date" class="form-control" id="date" required />
            </div>
            <div class="mb-3">
              <label for="time" class="form-label">Hora</label>
              <input v-model="form.time" type="time" class="form-control" id="time" required />
            </div>
            <button type="submit" class="btn btn-primary">Guardar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, getCurrentInstance } from 'vue';

export default {
  props: {
    appointment: {
      type: Object,
      default: null,
    },
  },
  setup(props, { emit }) {
    const form = ref({
      date: '',
      time: '',
    });

    // Acceder a $swal
    const instance = getCurrentInstance();
    const $swal = instance.appContext.config.globalProperties.$swal;

    watch(
      () => props.appointment,
      (newAppointment) => {
        if (newAppointment) {
          form.value = { ...newAppointment };
        } else {
          form.value = { date: '', time: '' };
        }
      },
      { immediate: true }
    );

    const submitForm = async () => {
      try {
        emit('save', form.value);
        emit('close');
        await $swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: props.appointment ? 'Registro actualizado correctamente' : 'Registro creado correctamente',
        });
      } catch (error) {
        await $swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al guardar, verifique los datos ingresados e intente nuevamente.',
        });
      }
    };

    return { form, submitForm };
  },
};
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>