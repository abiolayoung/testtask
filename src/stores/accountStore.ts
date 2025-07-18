import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { Account } from '@/types/account';

export const useAccountStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([]);

  // Initialize from localStorage if available
  const storedAccounts = localStorage.getItem('accounts');
  if (storedAccounts) {
    accounts.value = JSON.parse(storedAccounts);
  }

  // Watch for changes and update localStorage
  watch(
    accounts,
    (newAccounts) => {
      localStorage.setItem('accounts', JSON.stringify(newAccounts));
    },
    { deep: true }
  );

  const addAccount = () => {
    const newAccount: Account = {
      id: Date.now().toString(),
      labels: [],
      type: 'Локальная',
      login: '',
      password: '',
    };
    accounts.value.push(newAccount);
  };

  const removeAccount = (id: string) => {
    const index = accounts.value.findIndex(account => account.id === id);
    if (index !== -1) {
      accounts.value.splice(index, 1);
    }
  };

  const updateAccount = (updatedAccount: Account) => {
    const index = accounts.value.findIndex(acc => acc.id === updatedAccount.id);
    if (index !== -1) {
      accounts.value[index] = updatedAccount;
    }
  };

  return {
    accounts,
    addAccount,
    removeAccount,
    updateAccount
  };
});