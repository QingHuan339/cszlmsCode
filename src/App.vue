<script setup>
import HelloWorld from './components/HelloWorld.vue'
import Search from'./components/Search.vue'
</script>

<template>
  <router-view/>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
:root {
  --el-color-primary: #0fa4b3; /* 配置element-plus的主题变量为 #0fa4b3 */
}
</style>
