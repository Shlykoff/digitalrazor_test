<template>
  <form @submit.prevent="submitForm" class="form-container">
    <div class="form-group">
      <div class="input-row">
        <label class="form-label" for="firstName">Имя &nbsp;&#8432;:</label>
        <input
          class="form-input"
          v-model="formData.firstName"
          type="text"
          required
        />
      </div>
      <!-- <p class="error-message">{{ error.firstName ? error.firstName : " " }}</p> -->
    </div>

    <div class="form-group">
      <div class="input-row">
        <label class="form-label" for="lastName">Фамилия &nbsp;&#8432;:</label>
        <input
          class="form-input"
          v-model="formData.lastName"
          type="text"
          required
        />
      </div>
      <!-- <p class="error-message">{{ error.lastName ? error.lastName : " " }}</p> -->
    </div>

    <div class="form-group">
      <div class="input-row">
        <label class="form-label" for="patronymic"
          >Отчество &nbsp;&#8432;:</label
        >
        <input
          class="form-input"
          v-model="formData.patronymic"
          type="text"
          required
        />
      </div>
      <!-- <p class="error-message">{{ error.patronymic ? error.patronymic : " " }}</p> -->
    </div>

    <div class="form-group">
      <div class="input-row">
        <label class="form-label" for="birthDate"
          >Дата рождения &nbsp;&#8432;:</label
        >
        <input
          class="form-input"
          v-model="formData.birthDate"
          v-maska="'##/##/####'"
          @blur="isDate"
          type="text"
          placeholder="ДД/ММ/ГГГГ"
          required
        />
      </div>
      <p class="error-message">
        {{ errors.birthDate ? errors.birthDate : " " }}
      </p>
    </div>

    <div class="form-group">
      <div class="input-row">
        <label class="form-label" for="login">Логин &nbsp;&#8432;:</label>
        <input v-model="formData.login" type="text" required />
      </div>
      <!-- <p class="error-message">{{ error.login ? error.login : " " }}</p> -->
    </div>

    <div class="form-group">
      <div class="input-row">
        <label class="form-label" for="email">Email &nbsp;&#8432;:</label>
        <input
          class="form-input"
          v-model="formData.email"
          type="text"
          required
        />
      </div>
      <!-- <p class="error-message">{{ error.email ? error.email : " " }}</p> -->
    </div>

    <button type="submit">Отправить</button>
  </form>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { useFormStore } from "@/stores/formStore";
import { vMaska } from "maska/vue";

// Определение типов для формы
interface FormData {
  firstName: string;
  lastName: string;
  patronymic: string;
  birthDate: string;
  login: string;
  email: string;
}

interface FormErrors {
  // firstName: string | null;
  // lastName: string | null;
  // patronymic: string | null;
  birthDate: string | null;
  // login: string | null;
  // email: string | null;
  // birthDate: string | null;
}

const errors = reactive<FormErrors>({
  // firstName: null,
  // lastName: null,
  // patronymic: null,
  birthDate: null,
  // login: null,
  // email: null,
});

const formData = reactive<FormData>({
  firstName: "",
  lastName: "",
  patronymic: "",
  birthDate: "",
  login: "",
  email: "",
});

const formStore = useFormStore();

const API_URL = "http://localhost:3000";

function isDate(): void {
  if (formData.birthDate.length < 10) {
    errors.birthDate = "Некорректная дата рождения";
  } else {
    errors.birthDate = null;
  }
}

async function submitForm(): Promise<void> {
  if (errors.birthDate) return;
  try {
    const response = await fetch(`${API_URL}/form/b`, {
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
        `Форма B успешно отправлена! 
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
