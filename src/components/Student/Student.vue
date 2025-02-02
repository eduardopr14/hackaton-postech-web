<script setup lang="ts">
import DefaultView from '@/views/DefaultView.vue';
import { useCrudStore } from '@/stores/crud';
import { computed } from 'vue';

const crudStore = useCrudStore();

const userId = computed(() => crudStore.getUserLogged());

const getUserInfo = (userId: string | null) => {
  return crudStore.getUserInfo(userId)
}
</script>

<template>
  <DefaultView>
    <router-view></router-view>
    oi, {{ getUserInfo(userId)?.name }}
  </DefaultView>
</template>
