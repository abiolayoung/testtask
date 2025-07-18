<template>
  <div class="account-form">
    <div class="account-field">
      <el-input
        v-model="labelInput"
        placeholder="Введите метки через ;"
        maxlength="50"
        show-word-limit
        @blur="processLabels"
      />
    </div>

    <div class="account-field">
      <el-select v-model="localAccount.type" placeholder="Выберите тип" @change="handleTypeChange">
        <el-option label="LDAP" value="LDAP" />
        <el-option label="Локальная" value="Локальная" />
      </el-select>
    </div>

    <div class="account-field">
      <el-input
        v-model="localAccount.login"
        placeholder="Введите логин"
        maxlength="100"
        :class="{ 'is-error': validationErrors.login }"
        @blur="validateLogin"
      />
    </div>

    <div class="account-field">
      <el-input
        v-if="localAccount.type === 'Локальная'"
        v-model="localAccount.password"
        placeholder="Введите пароль"
        maxlength="100"
        show-password
        :class="{ 'is-error': validationErrors.password }"
        @blur="validatePassword"
      />
      <div v-else class="disabled-field">
        <el-tag>Не требуется для LDAP</el-tag>
      </div>
    </div>

    <div class="account-field action">
      <el-button type="danger" @click="removeAccount" circle>
        <el-icon><Delete /></el-icon>
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { Delete } from '@element-plus/icons-vue';
import { useAccountStore } from '@/stores/accountStore';
import type { Account, ValidationErrors } from '@/types/account';

const props = defineProps<{
  account: Account;
}>();

const accountStore = useAccountStore();
const localAccount = reactive<Account>({ ...props.account });
const validationErrors = reactive<ValidationErrors>({});

// Convert labels array to string for input field
const labelInput = ref(props.account.labels.map(label => label.text).join(';'));

// Process labels when input field loses focus
const processLabels = () => {
  // Split by semicolon and remove empty entries
  const labelsArray = labelInput.value
    .split(';')
    .map(label => label.trim())
    .filter(label => label.length > 0);

  // Convert to required format
  localAccount.labels = labelsArray.map(text => ({ text }));
  saveChanges();
};

const validateLogin = () => {
  validationErrors.login = localAccount.login.trim() === '';
  if (!validationErrors.login) {
    saveChanges();
  }
};

const validatePassword = () => {
  // Only validate password for local accounts
  if (localAccount.type === 'Локальная') {
    validationErrors.password = !localAccount.password || localAccount.password.trim() === '';
  } else {
    validationErrors.password = false;
  }
  
  if (!validationErrors.password) {
    saveChanges();
  }
};

const handleTypeChange = () => {
  // Set password to null for LDAP accounts
  if (localAccount.type === 'LDAP') {
    localAccount.password = null;
    validationErrors.password = false;
  } else {
    localAccount.password = '';
    validatePassword();
  }
  saveChanges();
};

const saveChanges = () => {
  // Only save if all validations pass
  if (
    !validationErrors.login &&
    !(localAccount.type === 'Локальная' && validationErrors.password)
  ) {
    accountStore.updateAccount(localAccount);
  }
};

const removeAccount = () => {
  accountStore.removeAccount(props.account.id);
};

// Watch for changes in props and update local state
watch(
  () => props.account,
  (newAccount) => {
    Object.assign(localAccount, newAccount);
    labelInput.value = newAccount.labels.map(label => label.text).join(';');
  },
  { deep: true }
);
</script>

<style scoped>
.account-form {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr 60px;
  padding: 12px 16px;
  align-items: center;
}

.account-field {
  padding: 0 8px;
}

.is-error :deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px #f56c6c inset;
}

.disabled-field {
  padding: 8px 0;
}

.action {
  text-align: center;
}
</style>