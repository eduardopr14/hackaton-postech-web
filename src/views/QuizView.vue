<template>
  <div>
    <Quiz />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Quiz from '@/components/Quiz.vue';

export default defineComponent({
  components: { Quiz },
});
</script>
