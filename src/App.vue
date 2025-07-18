<template>
  <div class="app-container">
    <AccountForm />
    <div class="footer">
      Made by Abeeb Abiola Adeniyi
    </div>
  </div>
</template>

<script setup lang="ts">
import AccountForm from '@/components/AccountForm.vue';
</script>

<style>
body {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
  margin: 0;
  padding: 0;
  color: #333;
  background-color: #f5f7fa;
}

.app-container {
  min-height: 100vh;
  padding: 20px;
  position: relative;
  padding-bottom: 60px; /* Space for footer */
}

.footer {
  text-align: center;
  padding: 15px 0;
  color: #666;
  font-style: italic;
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
  background-color: #f5f7fa;
  border-top: 1px solid #eaeaea;
}
</style>