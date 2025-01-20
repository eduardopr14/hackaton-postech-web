<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
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

        <div class="wrapper lg:flex lg:items-start lg:flex-wrap">
          <HelloWorld message="Quiz App" />

          <nav class="w-full text-center mt-8 text-xs lg:text-left lg:mt-4 lg:ml-[-1rem] lg:text-base lg:py-4">
            <RouterLink
              to="/"
              class="inline-block px-4 border-l border-black first-of-type:border-0 text-green-700 transition duration-400 hover:bg-green-100"
            >
              Home
            </RouterLink>
            <RouterLink
              to="/about"
              class="inline-block px-4 border-l border-black first-of-type:border-0 text-green-700 transition duration-400 hover:bg-green-100"
            >
              About
            </RouterLink>
          </nav>
        </div>
      </header>

      <RouterView class="lg:min-h-screen lg:flex lg:items-center" />
    </div>
  </div>
</template>
