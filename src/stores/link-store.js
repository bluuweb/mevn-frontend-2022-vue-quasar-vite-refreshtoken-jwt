import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";
import { useUserStore } from "./user-store";

export const useLinkStore = defineStore("link", () => {
  const userStore = useUserStore();

  const links = ref([]);

  const createLink = async (longLink) => {
    try {
      const res = await api({
        url: "/links",
        method: "POST",
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
        data: {
          longLink,
        },
      });
      //   console.log(res.data);
      links.value.push(res.data.newLink);
    } catch (error) {
      //   console.log(error.response?.data || error);
      throw error.response?.data || error;
    }
  };

  const getLinks = async () => {
    try {
      console.log("llamando a todos los link 🎉");
      const res = await api({
        url: "/links",
        method: "GET",
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
      });
      //   links.value = res.data.links.map((item) => item);
      links.value = [...res.data.links];
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  // por ahora tiene mejor rendimiento
  getLinks();

  return { createLink, links, getLinks };
});
