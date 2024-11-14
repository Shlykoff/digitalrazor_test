import { defineStore } from "pinia";

export const useFormStore = defineStore("formStore", {
  state: () => ({
    applicationId: "",
    message: "",
  }),
  actions: {
    setResponse(applicationId: string, message: string) {
      this.applicationId = applicationId;
      this.message = message;
    },
  },
});
