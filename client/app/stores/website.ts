export const useWebsiteStore = defineStore("websiteStore", {
    state: () => ({
        isLoading: false,
        status: null as number | null,
        error: null as string | null,

        items: null as any,
        total: 0 as number,
        currentPage: 1 as number,
        totalPages: 1 as number,

        itemsAsc: null as any,
        itemsDesc: null as any,
        itemsHealthy: null as any,
        itemsResponseTime: null as any,
        itemsDown: null as any,
    }),
    persist: {
        storage: sessionStorage
    },
    actions: {
        async createWebsite(payload: any) {
            const { $axios } = useNuxtApp();
            const router = useRouter();
            const authStore = useAuthStore();

            this.isLoading = true;
            this.error = null;

            try {
                const response = await $axios.post("/websites", payload, {
                headers: {
                    Authorization: `${authStore.type} ${authStore.token}`,
                },
                });

                this.status = response.status;
                this.items = response.data.data;

                router.push(`/admins/websites/${this.items.id}`);

            } catch (error: any) {
                this.status = error.response?.status || 500;
                this.error = error.response?.data?.errors || "Internal server error. Please try again later.";

            } finally {
                this.isLoading = false;
            }
        },
        async updateWebsite(websiteId: string, payload: any) {
            const { $axios } = useNuxtApp();
            const router = useRouter();
            const authStore = useAuthStore();

            this.isLoading = true;
            this.error = null;

            try {
                const response = await $axios.put(`/websites/${websiteId}`, payload, {
                headers: {
                    Authorization: `${authStore.type} ${authStore.token}`,
                },
                });

                this.status = response.status;
                this.items = response.data.data;

                router.push(`/admins/websites/${websiteId}`);

            } catch (error: any) {
                this.status = error.response?.status || 500;
                this.error = error.response?.data?.errors || "Internal server error. Please try again later.";

            } finally {
                this.isLoading = false;
            }
        },
        async getWebsites(page: number = 1) {
            const { $axios } = useNuxtApp();
            const authStore = useAuthStore();
            const SIZE = 10;

            this.isLoading = true;
            this.error = null;

            try {
                const response = await $axios.get(`/websites?page=${page}&size=${SIZE}`, {
                    headers: {
                        Authorization: `${authStore.type} ${authStore.token}`,
                    },
                });

                this.status = response.status;
                this.items = response.data.data;
                this.total = response.data.meta.total;
                this.currentPage = response.data.meta.page;
                this.totalPages = response.data.meta.total_pages;

            } catch (error: any) {
                this.status = error.response?.status || 500;
                this.error = error.response?.data?.errors || "Internal server error. Please try again later.";

            } finally {
                this.isLoading = false;
            }
        },
        async findWebsite(websiteId: string) {
            const { $axios } = useNuxtApp();
            const authStore = useAuthStore();

            this.isLoading = true;
            this.error = null;

            try {
                const response = await $axios.get(`/websites/${websiteId}`, {
                    headers: {
                        Authorization: `${authStore.type} ${authStore.token}`,
                    },
                });

                this.status = response.status;
                this.items = response.data.data;

            } catch (error: any) {
                this.status = error.response?.status || 500;
                this.error = error.response?.data?.errors || "Internal server error. Please try again later.";

            } finally {
                this.isLoading = false;
            }
        },
        async deleteWebsite(websiteId: string) {
            const { $axios } = useNuxtApp();
            const router = useRouter();
            const authStore = useAuthStore();

            this.isLoading = true;
            this.error = null;

            try {
                const response = await $axios.delete(`/websites/${websiteId}`, {
                    headers: {
                        Authorization: `${authStore.type} ${authStore.token}`,
                    },
                });

                this.status = response.status;
                this.items = response.data.data;

                router.push("/admins/websites");

            } catch (error: any) {
                this.status = error.response?.status || 500;
                this.error = error.response?.data?.errors || "Internal server error. Please try again later.";

            } finally {
                this.isLoading = false;
            }
        },
        async getResponseTimeWebsites() {
            const { $axios } = useNuxtApp();
            const authStore = useAuthStore();

            this.isLoading = true;
            this.error = null;

            try {
                const response = await $axios.get(`/websites/response-time`, {
                    headers: {
                        Authorization: `${authStore.type} ${authStore.token}`,
                    },
                });

                this.status = response.status;
                this.itemsResponseTime = response.data.data;

            } catch (error: any) {
                this.status = error.response?.status || 500;
                this.error = error.response?.data?.errors || "Internal server error. Please try again later.";

            } finally {
                this.isLoading = false;
            }
        },
        async getWebsiteAsc() {
            const { $axios } = useNuxtApp();
            const authStore = useAuthStore();

            this.isLoading = true;
            this.error = null;

            try {
                const response = await $axios.get(`/websites/asc`, {
                    headers: {
                        Authorization: `${authStore.type} ${authStore.token}`,
                    },
                });

                this.status = response.status;
                this.itemsAsc = response.data.data;

            } catch (error: any) {
                this.status = error.response?.status || 500;
                this.error = error.response?.data?.errors || "Internal server error. Please try again later.";

            } finally {
                this.isLoading = false;
            }
        },
        async getWebsiteDesc() {
            const { $axios } = useNuxtApp();
            const authStore = useAuthStore();

            this.isLoading = true;
            this.error = null;

            try {
                const response = await $axios.get(`/websites/desc`, {
                    headers: {
                        Authorization: `${authStore.type} ${authStore.token}`,
                    },
                });

                this.status = response.status;
                this.itemsDesc = response.data.data;

            } catch (error: any) {
                this.status = error.response?.status || 500;
                this.error = error.response?.data?.errors || "Internal server error. Please try again later.";

            } finally {
                this.isLoading = false;
            }
        },
        async checkWebsite(websiteId: number) {
            const { $axios } = useNuxtApp();
            const authStore = useAuthStore();

            this.isLoading = true;
            this.error = null;

            try {
                const response = await $axios.get(`/websites/${websiteId}/check`, {
                    headers: {
                        Authorization: `${authStore.type} ${authStore.token}`,
                    },
                });

                this.status = response.status;
                this.items = response.data.data;

            } catch (error: any) {
                this.status = error.response?.status || 500;
                this.error = error.response?.data?.errors || "Internal server error. Please try again later.";

            } finally {
                this.isLoading = false;
            }
        },
        async checkAllWebsites() {
            const { $axios } = useNuxtApp();
            const authStore = useAuthStore();

            this.isLoading = true;
            this.error = null;

            try {
                const response = await $axios.get(`/websites/check-all`, {
                    headers: {
                        Authorization: `${authStore.type} ${authStore.token}`,
                    },
                });

                this.status = response.status;
                this.items = response.data.data;

            } catch (error: any) {
                this.status = error.response?.status || 500;
                this.error = error.response?.data?.errors || "Internal server error. Please try again later.";

            } finally {
                this.isLoading = false;
            }
        },
        async getHealthyCount() {
            const { $axios } = useNuxtApp();
            const authStore = useAuthStore();

            this.isLoading = true;
            this.error = null;

            try {
                const response = await $axios.get(`/websites/healthy-count`, {
                    headers: {
                        Authorization: `${authStore.type} ${authStore.token}`,
                    },
                });

                this.status = response.status;
                this.itemsHealthy = response.data.data;

            } catch (error: any) {
                this.status = error.response?.status || 500;
                this.error = error.response?.data?.errors || "Internal server error. Please try again later.";

            } finally {
                this.isLoading = false;
            }
        },
        async getDownWebsites() {
            const { $axios } = useNuxtApp();
            const authStore = useAuthStore();

            this.isLoading = true;
            this.error = null;

            try {
                const response = await $axios.get(`/websites/down`, {
                    headers: {
                        Authorization: `${authStore.type} ${authStore.token}`,
                    },
                });

                this.status = response.status;
                this.itemsDown = response.data.data;

            } catch (error: any) {
                this.status = error.response?.status || 500;
                this.error = error.response?.data?.errors || "Internal server error. Please try again later.";

            } finally {
                this.isLoading = false;
            }
        },
        async printReport() {
            const { $axios } = useNuxtApp();
            const authStore = useAuthStore();

            this.isLoading = true;
            this.error = null;

            try {
                const response = await $axios.get(`/websites/report`, {
                    headers: {
                        Authorization: `${authStore.type} ${authStore.token}`,
                    },
                    responseType: "blob",
                });

                this.status = response.status;

                // Create a link to download the file
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", `website_report_${new Date().toISOString()}.pdf`);
                document.body.appendChild(link);
                link.click();

                // Hapus elemen & bebaskan URL blob
                link.remove();
                window.URL.revokeObjectURL(url);
            } catch (error: any) {
                this.status = error.response?.status || 500;
                this.error = error.response?.data?.errors || "Internal server error. Please try again later.";

            } finally {
                this.isLoading = false;
            }
        },
    },
});