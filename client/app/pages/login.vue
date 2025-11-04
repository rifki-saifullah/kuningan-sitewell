<script setup lang="ts">
import * as z from 'zod'
import { useAuthStore } from "~/stores/auth";

definePageMeta({
  middleware: "guest",
});

const authStore = useAuthStore();
const toast = useToast();

const fields = [
    {
    name: 'email',
    type: 'text' as const,
    label: 'Email',
    placeholder: 'Masukkan email anda',
    required: true
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password' as const,
    placeholder: 'Masukkan password anda',
    required: true,
  },
];

const providers = [
  {
    label: 'Google',
    icon: 'i-simple-icons-google',
    onClick: () => {
      toast.add({ title: 'Google', description: 'Login with Google' })
    }
  },
  {
    label: 'GitHub',
    icon: 'i-simple-icons-github',
    onClick: () => {
      toast.add({ title: 'GitHub', description: 'Login with GitHub' })
    }
  }
];

const schema = z.object({
  email: z.email('Invalid email'),
  password: z.string('Password is required').min(8, 'Must be at least 8 characters')
})

type Schema = z.infer<typeof schema>;

async function onSubmit(payload: any) {
  await authStore.login({
    email: payload.data.email,
    password: payload.data.password,
  });

  if (authStore.status === 200) {
    toast.add({ title: "Success", color: "success", description: "Login successful!" });
  } else {
    toast.add({ title: "Error", color: "error", description: `Failed with status ${authStore.status} : ${authStore.error}` });
  }
}
</script>

<template>
  <div class="w-screen min-h-screen flex justify-center items-center">
    <UButton color="primary" variant="link" to="/" class="absolute top-4 left-4" icon="i-lucide-arrow-left" > Kembali</UButton>
    <div class="flex flex-col items-center justify-center gap-4 p-4">
      <UPageCard class="w-full max-w-md">
        <UColorModeButton class="w-fit flex self-end" />
        <UAuthForm
          :schema="schema"
          title="Login"
          description="Masukkan email dan password anda untuk masuk"
          icon="i-lucide-user"
          :fields="fields"
          @submit="onSubmit"
        />
      </UPageCard>
    </div>
  </div>
</template>