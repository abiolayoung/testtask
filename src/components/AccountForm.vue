<template>
  <div class="account-management">
    <div class="header-section">
      <h1>Управление учетными записями</h1>
      <el-button type="primary" @click="addNewAccount" round>
        <el-icon><Plus /></el-icon>
      </el-button>
    </div>

    <div class="hint-section">
      <el-alert
        title="Подсказка"
        type="info"
        description="Введите текстовые метки через знак ; (максимум 50 символов)"
        show-icon
        :closable="false"
      />
    </div>

    <div class="accounts-list" v-if="accountStore.accounts.length > 0">
      <div class="account-header">
        <div class="account-header-item">Метка</div>
        <div class="account-header-item">Тип записи</div>
        <div class="account-header-item">Логин</div>
        <div class="account-header-item">Пароль</div>
        <div class="account-header-item action"></div>
      </div>

      <div v-for="account in accountStore.accounts" :key="account.id" class="account-item">
        <AccountItem :account="account" />
      </div>
    </div>

    <el-empty v-else description="Нет учетных записей. Добавьте новую запись, нажав на кнопку '+'" />
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from '@/stores/accountStore';
import AccountItem from '@/components/AccountItem.vue';
import { Plus } from '@element-plus/icons-vue';

const accountStore = useAccountStore();

const addNewAccount = () => {
  accountStore.addAccount();
};
</script>

<style scoped>
.account-management {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.hint-section {
  margin-bottom: 20px;
}

.accounts-list {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
}

.account-header {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr 60px;
  background-color: #f5f7fa;
  padding: 12px 16px;
  font-weight: bold;
}

.account-header-item {
  padding: 0 8px;
}

.account-item {
  border-top: 1px solid #dcdfe6;
}

.action {
  text-align: center;
}
</style>