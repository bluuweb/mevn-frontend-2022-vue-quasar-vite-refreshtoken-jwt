import { defineStore } from "pinia";
import { ref } from "vue";

import { api } from "src/boot/axios";
import { useUserStore } from "./user-store";

export const useLinkStore = defineStore("link", () => {
  const userStore = useUserStore();
  const link = ref({});
  const links = ref([]);

  const addLink = async (link) => {
    try {
      const { data } = await api({
        method: "POST",
        url: "/links",
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
        data: {
          longLink: link,
        },
      });
      links.value.push(data.newLink);
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  const getLinks = async () => {
    try {
      console.log("se ejecutó");
      const { data } = await api({
        method: "GET",
        url: "/links",
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
      });
      links.value = [...data.links];
    } catch (error) {
      return console.log(error.response?.data || error);
    }
  };

  getLinks();

  return {
    link,
    links,
    addLink,
    getLinks,
  };
});
