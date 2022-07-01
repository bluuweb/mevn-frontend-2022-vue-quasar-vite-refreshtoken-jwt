<template>
  <q-page padding>
    <add-link />
    <ul>
      <template v-for="link in linkStore.links" :key="link._id">
        <li>{{ link }}</li>
      </template>
    </ul>
  </q-page>
</template>

<script setup>
import { useLinkStore } from "src/stores/link-store";

import AddLink from "src/components/AddLink.vue";

const linkStore = useLinkStore();
</script>
