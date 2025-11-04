export const useUserStore = defineStore("userStore", {
    state: () => ({
        isLoading: false,
        items: null as any,
        status: null as number | null,
        error: null as string | null,
    }),
    persist: {
        storage: sessionStorage
    },
    actions: {
        async fetchProfile() {
            const { $axios } = useNuxtApp();
            const authStore = useAuthStore();

            this.isLoading = true;
            this.status = null;
            this.error = null;

            try {
                const response = await $axios.get("/users/current", {
                    headers: {
                        Authorization: `${authStore.type} ${authStore.token}`,
                    },
                });

                this.items = response.data.data;
                this.status = response.status;

            } catch (error: any) {
                this.status = error.response?.status || 500;
                this.error = error.response?.data?.errors || "Internal server error. please try agan later.";

            } finally {
                this.isLoading = false;

            }
        },
        async updateProfile(payload: { username: string; email: string; }) {
            const { $axios } = useNuxtApp();
            const authStore = useAuthStore();

            this.isLoading = true;
            this.status = null;
            this.error = null;

            try {
                const response = await $axios.put("/users/profile", payload, {
                    headers: {
                        Authorization: `${authStore.type} ${authStore.token}`,
                    },
                });

                this.items = response.data.data;
                this.status = response.status;

                console.log(response.data);

            } catch (error: any) {
                this.status = error.response?.status || 500;
                this.error = error.response?.data?.errors || "Internal server error. please try agan later.";

            } finally {
                this.isLoading = false;

            }
        },
        async updatePassword(payload: { current_password: string; new_password: string; }) {
            const { $axios } = useNuxtApp();
            const authStore = useAuthStore();

            this.isLoading = true;
            this.status = null;
            this.error = null;

            try {
                const response = await $axios.put("/users/password", payload, {
                    headers: {
                        Authorization: `${authStore.type} ${authStore.token}`,
                    },
                });

                this.status = response.status;

            } catch (error: any) {
                this.status = error.response?.status || 500;
                this.error = error.response?.data?.errors || "Internal server error. please try agan later.";

            } finally {
                this.isLoading = false;

            }
        },
    }
})