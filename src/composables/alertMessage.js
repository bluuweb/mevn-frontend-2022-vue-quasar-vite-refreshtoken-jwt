import { useQuasar } from "quasar";

export const useAlertMessage = () => {
  const $q = useQuasar();

  const alertDialogBackend = (message, title) => {
    $q.dialog({
      title,
      message,
    });
  };

  return { alertDialogBackend };
};
