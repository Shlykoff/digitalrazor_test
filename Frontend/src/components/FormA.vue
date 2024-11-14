<template>
  <form @submit.prevent="submitForm" class="form-container">
    <div class="form-group">
      <div class="input-row">
        <label class="form-label" for="name">Имя &nbsp;&#8432;:</label>
        <input
          class="form-input"
          v-model="formData.name"
          v-maska="'S*'"
          type="text"
          placeholder="Введите Имя"
          required
        />
      </div>
      <!-- <p class="error-message">{{ error.name ? error.name : " " }}</p> -->
    </div>

    <div class="form-group">
      <div class="input-row">
        <label class="form-label" for="email">Email:</label>
        <input
          class="form-input"
          v-model="formData.email"
          type="email"
          placeholder="Введите Email"
        />
      </div>
      <!-- <p class="error-message">{{ error.email ? error.email : " " }}</p> -->
    </div>

    <div class="form-group">
      <div class="input-row">
        <label class="form-label" for="inn">ИНН &nbsp;&#8432;:</label>
        <input
          class="form-input"
          v-model="formData.inn"
          type="text"
          @blur="isINN"
          placeholder="Введите ИНН"
          required
        />
      </div>
      <p class="error-message">{{ errors.inn ? errors.inn : " " }}</p>
    </div>

    <div class="form-group">
      <div class="input-row">
        <label class="form-label" for="phone">Телефон &nbsp;&#8432;:</label>
        <input
          class="form-input"
          v-model="formData.phone"
          @blur="isPhone"
          type="text"
          v-maska="'+7 (###) ###-##-##'"
          placeholder="+7 (XXX) XXX-XX-XX"
          required
        />
      </div>
      <p class="error-message">{{ errors.phone ? errors.phone : " " }}</p>
    </div>
    <button type="submit">Отправить</button>
  </form>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { useFormStore } from "@/stores/formStore";
import { validateINN } from "@/utils/validateINN";
import { vMaska } from "maska/vue";

type FormData = {
  name: string;
  email: string;
  inn: string;
  phone: string;
};

type FormErrors = {
  // name: string;
  // email: string;
  inn: string | null;
  phone: string | null;
};

function isINN(): void {
  if (!validateINN(formData.inn)) {
    errors.inn = "Некорректный ИНН";
  } else {
    errors.inn = null;
  }
}

function isPhone(): void {
  if (formData.phone.length < 18) {
    errors.phone = "Некорректный номер телефона";
  } else {
    errors.phone = null;
  }
}

const errors = reactive<FormErrors>({
  // name: "",
  // email: "",
  inn: "",
  phone: "",
});

const formData = reactive<FormData>({
  name: "",
  email: "",
  inn: "",
  phone: "",
});

const formStore = useFormStore();

const API_URL = "http://localhost:3000";

async function submitForm(): Promise<void> {
  if (errors.phone || errors.inn) return;
  try {
    const response = await fetch(`${API_URL}/form/a`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.ok) {
      await formStore.setResponse(data.applicationId, data.message);
      alert(
        `Форма A успешно отправлена!
        \n ${JSON.stringify(formStore.$state.applicationId)}
        \n ${JSON.stringify(formStore.$state.message)}`
      );
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    alert(`Ошибка: ${(error as Error).message}`);
  }
}
</script>
