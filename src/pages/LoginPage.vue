<template>
  <h3>Login {{ token }}</h3>
</template>

<script setup>
import { useUserStore } from "../stores/user-store";

const { token } = useUserStore();
</script>
