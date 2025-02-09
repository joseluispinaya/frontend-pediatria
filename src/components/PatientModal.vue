<template>
  <div class="modal fade show" tabindex="-1" style="display: block">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ patient ? 'Editar Paciente' : 'Agregar Paciente' }}</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm">
            <div class="mb-3">
              <label for="name" class="form-label">Nombre</label>
              <input v-model="form.name" type="text" class="form-control" id="name" required />
            </div>
            <div class="mb-3">
              <label for="birthdate" class="form-label">Fecha de Nacimiento</label>
              <input v-model="form.birthdate" type="date" class="form-control" id="birthdate" required />
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
    patient: {
      type: Object,
      default: null,
    },
  },
  setup(props, { emit }) {
    const form = ref({
      name: '',
      birthdate: '',
    });

    // Acceder a $swal
    const instance = getCurrentInstance();
    const $swal = instance.appContext.config.globalProperties.$swal;

    watch(
      () => props.patient,
      (newPatient) => {
        if (newPatient) {
          form.value = { ...newPatient };
        } else {
          form.value = { name: '', birthdate: '' };
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
          text: props.patient ? 'Registro actualizado correctamente' : 'Registro creado correctamente',
        });
      } catch (error) {
        await $swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al guardar, verifique los datos e intente nuevamente.',
        });
      }
    };

    return { form, submitForm };
  },
};
</script>