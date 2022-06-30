<script setup>
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useUserStore } from "../stores/user-store";
const $q = useQuasar();

const userStore = useUserStore();
const router = useRouter();
const email = ref("");
const password = ref("");
const repassword = ref("");

const handleSubmit = async () => {
  try {
    console.log("pasó las validaciones");
    await userStore.register(email.value, password.value, repassword.value);
    router.push("/");
    email.value = "";
    password.value = "";
  } catch (error) {
    console.log("error", error);
    if (error.error) {
      alertDialogBackend(error.error);
    } else if (error.errors[0].msg) {
      alertDialogBackend(error.errors[0].msg);
    } else {
      alertDialogBackend();
    }
  }
};

const alertDialogBackend = (message = "Error en el servidor") => {
  $q.dialog({
    title: "Error",
    message,
  });
};
</script>

<template>
  <q-page class="row justify-center">
    <div class="col-12 col-sm-6 col-md-5">
      <h3>Register</h3>
      <q-form @submit.prevent="handleSubmit">
        <q-input
          v-model="email"
          label="Ingrese email"
          type="text"
          :rules="[
            (val) =>
              (val && /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(val)) ||
              'Formato email incorrecto',
          ]"
        ></q-input>

        <q-input
          v-model="password"
          label="Ingrese contraseña"
          type="password"
          :rules="[
            (val) =>
              (val && val.length > 5) || 'Contraseña mínimo 6 carácteres',
          ]"
        ></q-input>

        <q-input
          v-model="repassword"
          label="Repita contraseña"
          type="password"
          :rules="[
            (val) =>
              (val && val === password) || 'No coinciden las contraseñas',
          ]"
        ></q-input>

        <div>
          <q-btn label="Login" type="submit"></q-btn>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<style></style>
