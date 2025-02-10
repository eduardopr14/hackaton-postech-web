<template>
  <button 
    :class="{
      'bg-[#4DA3FF] text-white': selectedFilter === filter, 
      'bg-white text-[#4DA3FF] border border-[#4DA3FF]': selectedFilter !== filter
    }"
    class="px-4 py-2 rounded-md transition-colors hover:bg-[#3c98fb] hover:text-white"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  selectedFilter: {
    type: String,
    required: true
  },
  filter: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});
</script>
