<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainMessage from './components/MainMessage.vue'
import Navbar from './components/Navbar.vue'
import Notification from './components/Common/Notification.vue';
</script>

<template>
  <div class="bg-[#F8F8F8]">
    <div id="app" class="max-w-screen-xl mx-auto p-8 font-normal grid lg:grid-cols-2 lg:gap-8">
      <header class="max-h-screen leading-6 lg:flex lg:items-center lg:pr-[var(--section-gap)/2]">
        <img
          alt="Vue logo"
          class="block mx-auto mb-8 lg:m-0 lg:mr-8"
          src="@/assets/logo.svg"
          width="165"
          height="165"
        />

        <Notification />
        <div class="wrapper lg:flex lg:items-start lg:flex-wrap">
          <MainMessage main-text="Quiz App" />
          <Navbar />
        </div>
      </header>

      <RouterView class="lg:min-h-screen lg:flex lg:items-center" />
    </div>
  </div>
</template>
