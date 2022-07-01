<script setup>
import { ref } from "vue";
import { useLinkStore } from "src/stores/link-store";
import { useNotify } from "../composables/notify";

const link = ref("");
const loading = ref(false);
const useLink = useLinkStore();
const { showNotify } = useNotify();

const handleSubmitLink = async () => {
  try {
    loading.value = true;
    await useLink.addLink(link.value);
    showNotify("Link Agregado con éxito 🎉", "green");
    link.value = "";
  } catch (error) {
    console.log(error);
    if (error.errors) {
      return error.errors.forEach((item) => showNotify(item.msg));
    }
    showNotify(error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <q-form @submit.prevent="handleSubmitLink">
    <q-input label="Ingrese Link" v-model="link"></q-input>
    <q-btn
      type="submit"
      label="Agregar"
      color="primary"
      class="q-mt-sm full-width"
      :loading="loading"
    />
  </q-form>
</template>
