<template>
  <div class="modal fade show" tabindex="-1" style="display: block">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ consultation ? 'Editar Consulta' : 'Agregar Consulta' }}</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm">
            <div class="mb-3">
              <label for="diagnosis" class="form-label">Diagnóstico</label>
              <input v-model="form.diagnosis" type="text" class="form-control" id="diagnosis" required />
            </div>
            <div class="mb-3">
              <label for="treatment" class="form-label">Tratamiento</label>
              <input v-model="form.treatment" type="text" class="form-control" id="treatment" required />
            </div>
            <button type="submit" class="btn btn-primary">Guardar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  props: {
    consultation: {
      type: Object,
      default: null,
    },
  },
  setup(props, { emit }) {
    const form = ref({
      diagnosis: '',
      treatment: '',
    });

    // Acceder a $swal
    const instance = getCurrentInstance();
    const $swal = instance.appContext.config.globalProperties.$swal;

    watch(
      () => props.consultation,
      (newConsultation) => {
        if (newConsultation) {
          form.value = { ...newConsultation };
        } else {
          form.value = { diagnosis: '', treatment: '' };
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
          text: props.consultation ? 'Registro actualizado correctamente' : 'Registro creado correctamente',
        });
      } catch (error) {
        await $swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al guardar, verifique los datos e inténtelo más tarde.',
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