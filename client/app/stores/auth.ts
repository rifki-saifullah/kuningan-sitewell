import { defineStore } from "pinia";
import type { LoginPayload } from "~/types/auth";

const FIVE_MINUTES = 5 * 60 * 1000;

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    isLoading: false,
    items: null as any,
    status: null as number | null,
    error: null as string | null,
    token: null as string | null,
    type: null as string | null,
    expiresAt: null as number | null,
    isAuthenticated: false,
  }),
  persist: {
    storage: sessionStorage
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
  actions: {
    setup(): void {
      this.isLoading = true;
      this.status = null;
      this.error = null;
    },
    setSession(token: string, type: string, expiresIn: number): void {
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("type", type);
      sessionStorage.setItem("expiresAt", String(Date.now() + expiresIn * 1000));
    },
    setAuthState(token: string, type: string, expiresIn: number): void {
      this.token = token;
      this.type = type;
      this.expiresAt = Date.now() + expiresIn * 1000;
      this.isAuthenticated = true;
    },
    setAuthStateFromStorage(token: string, type: string, expiresAt: number): void {
      this.token = token;
      this.type = type;
      this.expiresAt = expiresAt;
      this.isAuthenticated = true;
    },
    clearSession(): void {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("type");
      sessionStorage.removeItem("expiresAt");
    },
    clearAuthState(): void {
      this.token = null;
      this.type = null;
      this.expiresAt = null;
      this.isAuthenticated = false;
    },
    clearState(): void {
      this.items = null;
      this.status = null;
      this.error = null;
      this.token = null;
      this.type = null;
      this.expiresAt = null;
      this.isAuthenticated = false;
    },
    validateSession(): boolean {
      if (!this.token || !this.type || !this.expiresAt) {
        const token = sessionStorage.getItem("token");
        const type = sessionStorage.getItem("type");
        const expiresAt = Number(sessionStorage.getItem("expiresAt"));

        if (!token || !type || !expiresAt) {
          return false;
        }

        this.setAuthState(token, type, expiresAt)

        if (Date.now() > this.expiresAt!) {
          this.clearSession();
          this.clearState();
          return false;
        }
      }

      return true
      
    },
    async login(payload: LoginPayload) {
      const { $axios } = useNuxtApp();
      const router = useRouter();

      this.setup();

      try {
        const response = await $axios.post("/auths/login", payload);
        const data = response.data.data;

        this.status = response.status;
        this.setSession(data.token, data.type, data.expires_in);
        this.setAuthState(data.token, data.type, data.expires_in);

        router.push("/admins");

      } catch (error: any) {
        this.status = error.response?.status || 500;
        this.error = error.response?.data?.errors || "Internal server error. Please try again later.";

      } finally {
        this.isLoading = false;

      }
    },
    async check() {
      const { $axios } = useNuxtApp();
      const router = useRouter();

      this.setup();

      if (!this.validateSession()) {
        router.push("/login")
      }

      try {
        const response = await $axios.post("/auths/check", {}, {
          headers: {
            Authorization: `${this.type} ${this.token}`,
          },
        });

        this.status = response.status;

        if (this.expiresAt! - Date.now() < FIVE_MINUTES) {
          await this.refresh();
        }

      } catch (error: any) {
        this.status = error.response?.status || 500;
        this.error = error.response?.data?.errors || "Internal server error. Please try again later.";
        this.clearSession();
        this.clearState();
        router.push("/login");

      } finally {
        this.isLoading = false;
      }
      return false;
    },
    async refresh(): Promise<boolean> {
      const { $axios } = useNuxtApp();
      this.setup();

      try {
        const response = await $axios.post("/auths/refresh", {}, {
          headers: {
            Authorization: `${this.type} ${this.token}`,
          },
        });

        this.status = response.status;
        const data = response.data.data;

        this.setSession(data.token, data.type, data.expires_in);
        this.setAuthState(data.token, data.type, data.expires_in);

        return true;

      } catch (error: any) {
        this.status = error.response?.status || 500;
        this.error = error.response?.data?.errors || "Internal server error. Please try again later.";

        return false;

      } finally {
        this.isLoading = false;

      }
    },
    async logout() {
      const { $axios } = useNuxtApp();
      const router = useRouter();

      this.setup();

      try {
        const response = await $axios.post("/auths/logout", {}, {
          headers: {
            Authorization: `${this.type} ${this.token}`,
          },
        });

        this.status = response.status;

      } catch (error: any) {
        this.status = error.response?.status || 500;
        this.error = error.response?.data?.errors || "Internal server error. Please try again later.";

      } finally {
        this.isLoading = false;
        this.clearSession();
        this.clearAuthState();
        router.push("/login");

      }
    },
  },
});
