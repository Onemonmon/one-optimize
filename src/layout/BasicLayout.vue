<script lang="ts" setup>
import { ref } from "vue";
import routes from "../router/routes";
import type { MenuItemRegistered } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();
const menus = ref(routes[0].children);
const handleMenuClick = ({ index }: MenuItemRegistered) => {
  router.push(index);
};
</script>

<template>
  <el-container>
    <el-header class="layout-header">test</el-header>
    <el-container class="middle-layout-container">
      <el-aside width="240px">
        <el-menu default-active="2" class="el-menu-vertical-demo">
          <template :key="menu.name" v-for="menu in menus">
            <h3 class="aside-title">{{ menu.name }}</h3>
            <template :key="route.path" v-for="route in menu.children">
              <el-menu-item :index="route.path" @click="handleMenuClick">
                {{ route.name }}
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <el-scrollbar>
            <router-view />
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
}
.middle-layout-container {
  height: calc(100vh - 60px);
  .aside-title {
    padding-left: 12px;
  }
}
</style>
