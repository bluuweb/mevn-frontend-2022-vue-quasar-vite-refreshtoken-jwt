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
      links.value.push(res.data.newLink);
    } catch (error) {
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
      links.value = [...res.data.links];
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  // por ahora tiene mejor rendimiento
  getLinks();

  const removeLink = async (id) => {
    try {
      await api({
        url: `/links/${id}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
      });
      // console.log("eliminado!");
      links.value = links.value.filter((item) => item._id !== id);
    } catch (error) {
      console.log(error.response?.data || error);
      throw error.response?.data || error;
    }
  };

  const updateLink = async (link) => {
    try {
      await api({
        url: `/links/${link._id}`,
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
        data: {
          longLink: link.longLink,
        },
      });
      links.value = links.value.map((item) =>
        item._id === link._id ? link : item
      );
    } catch (error) {
      // console.log(error.response?.data || error);
      throw error.response?.data || error;
    }
  };

  return { createLink, links, getLinks, removeLink, updateLink };
});
