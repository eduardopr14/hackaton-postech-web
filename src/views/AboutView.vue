<template>
  <div class="about">
    <About />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import About from '@/components/About.vue';

export default defineComponent({
  components: { About },
});
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
