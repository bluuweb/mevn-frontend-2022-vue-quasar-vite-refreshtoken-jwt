<script setup>
import { useLinkStore } from "../stores/link-store";
import { useQuasar } from "quasar";
import { useNotify } from "../componsables/notifyHook";

defineProps({
  link: Object,
});

const $q = useQuasar();
const useLink = useLinkStore();
const { showErrorNotify, showSuccessNotify } = useNotify();

const confirmDelete = (id) => {
  $q.dialog({
    title: "Cuidado 💔",
    message: "¿Está seguro de eliminar?",
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    try {
      await useLink.removeLink(id);
      showSuccessNotify("Link eliminado con éxito");
    } catch (error) {
      if (error.errors) {
        return error.errors.forEach((item) => {
          showErrorNotify(item.msg);
        });
      }
      showErrorNotify(error);
    }
  });
};

const promptUpdate = (link) => {
  $q.dialog({
    title: "Actualizar",
    message: "Actualice su enlace",
    prompt: {
      model: link.longLink,
      isValid: (val) => val.length > 2, // << here is the magic
      type: "text", // optional
    },
    cancel: true,
    persistent: true,
  }).onOk(async (data) => {
    try {
      $q.loading.show();
      const newLink = { ...link, longLink: data };
      await useLink.updateLink(newLink);
      showSuccessNotify("Link actualizado con éxito");
    } catch (error) {
      console.log("vista:", error.errors);
      if (error.errors) {
        return error.errors.forEach((item) => {
          showErrorNotify(item.msg);
        });
      }
      showErrorNotify(error);
    } finally {
      $q.loading.hide();
    }
  });
};

const copyLink = (nanoLink) => {
  const textURL = `${process.env.FRONTEND_URI}/${nanoLink}`;

  navigator.clipboard.writeText(textURL).then(() => {
    showSuccessNotify("Link copiado en el portapapeles");
  });
};
</script>

<template>
  <q-card class="my-card q-mb-sm">
    <q-card-section>
      <div class="text-overline">{{ link.nanoLink }}</div>
      {{ link.longLink }}
    </q-card-section>
    <q-card-actions>
      <q-btn
        flat
        round
        icon="mdi-trash-can-outline"
        @click="confirmDelete(link._id)"
      />
      <q-btn flat round icon="mdi-pencil-outline" @click="promptUpdate(link)" />
      <q-btn flat color="primary" @click="copyLink(link.nanoLink)">
        Copy
      </q-btn>
    </q-card-actions>
  </q-card>
</template>
