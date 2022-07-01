import { useQuasar } from "quasar";
export const useNotify = () => {
  const $q = useQuasar();

  const showNotify = (message, color = "negative") => {
    $q.notify({
      message,
      color,
      icon: color === "negative" && "report_problem",
    });
  };

  return { showNotify };
};
