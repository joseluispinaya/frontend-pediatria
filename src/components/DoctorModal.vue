<template>
  <div class="modal fade show" tabindex="-1" style="display: block">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ doctor ? 'Editar Doctor' : 'Agregar Doctor' }}</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm">
            <div class="mb-3">
              <label for="name" class="form-label">Nombre</label>
              <input v-model="form.name" type="text" class="form-control" id="name" required />
            </div>
            <div class="mb-3">
              <label for="specialization" class="form-label">Especialidad</label>
              <input v-model="form.specialty" type="text" class="form-control" id="specialty" required />
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
    doctor: {
      type: Object,
      default: null,
    },
  },
  setup(props, { emit }) {
    const form = ref({
      name: '',
      specialization: '',
    });

    // Acceder a $swal
    const instance = getCurrentInstance();
    const $swal = instance.appContext.config.globalProperties.$swal;

    watch(
      () => props.doctor,
      (newDoctor) => {
        if (newDoctor) {
          form.value = { ...newDoctor };
        } else {
          form.value = { name: '', specialty: '' };
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
          text: props.doctor ? 'Registro actualizado correctamente' : 'Registro creado correctamente',
        });
      } catch (error) {
        await $swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al guardar, verifique los datos y vuelva a intentarlo.',
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