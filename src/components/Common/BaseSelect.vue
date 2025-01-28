<script setup lang="ts">
import { computed, ref, defineProps, defineEmits } from 'vue';

const props = defineProps<{
  items: any[];
  modelValue: any;
  itemText?: string;
  itemValue?: string;
  disabled?: boolean;
  multiple?: boolean;
  placeholder?: string;
  loading?: boolean;
  error?: boolean;
  errorText?: string;
  useSearch?: boolean;
  searchPlaceholder?: string;
}>();

const emit = defineEmits(['update:model-value']);

const showMenu = ref(false);
const search = ref('');
const filteredItems = computed(() => {
  if (search.value.length) {
    return props.items.filter(item =>
      getItemText(item).toLowerCase().includes(search.value.toLowerCase())
    );
  }
  return props.items;
});

const selectedItems = computed(() => {
  if (!props.items.length) return null;

  if (props.multiple) {
    return props.items.filter(item =>
      props.modelValue.includes(getItemValue(item))
    );
  }

  return props.items.find(item => JSON.stringify(getItemValue(item)) === JSON.stringify(props.modelValue));
});

function getItemValue(item: any) {
  return props.itemValue ? item[props.itemValue] : item;
}

function getItemText(item: any) {
  return props.itemText ? item[props.itemText] : item;
}

function toggleMenu() {
  showMenu.value = !showMenu.value;
}

function onSelect(item: any) {
  if (props.disabled) return;

  if (props.multiple) {
    const newSelection = [...props.modelValue];
    const value = getItemValue(item);

    if (newSelection.includes(value)) {
      newSelection.splice(newSelection.indexOf(value), 1);
    } else {
      newSelection.push(value);
    }

    emit('update:model-value', newSelection);
  } else {
    emit('update:model-value', getItemValue(item));
    showMenu.value = false;
  }
}
</script>

<template>
  <div class="relative w-full">
    <button
      type="button"
      class="w-full px-2 py-[6px] border text-base rounded-md focus:outline-none focus:border-green-500 text-left"
      :class="{ 'border-gray-300': !props.error, 'border-red-600': props.error, 'cursor-not-allowed': props.disabled }"
      @click="toggleMenu"
      :disabled="props.disabled"
    >
      <span v-if="selectedItems && !multiple" class="truncate">
        {{ getItemText(selectedItems) }}
      </span>
      <span v-else-if="selectedItems && selectedItems.length" class="truncate">
        {{ getItemText(selectedItems[0]) }}
      </span>
      <span v-else class="text-gray-400">{{ props.placeholder || 'Selecione uma opção' }}</span>
    </button>

    <div v-if="showMenu" class="absolute w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto z-10">
      <div v-if="props.useSearch" class="px-2 py-1">
        <input
          v-model="search"
          type="text"
          :placeholder="props.searchPlaceholder || 'Pesquisar...'"
          class="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
        />
      </div>

      <ul class="max-h-48 overflow-auto">
        <li
          v-for="item in filteredItems"
          :key="getItemValue(item)"
          @click="onSelect(item)"
          class="p-2 hover:bg-green-100 active:bg-green-200 cursor-pointer"
        >
          <input
            v-if="props.multiple"
            type="checkbox"
            :checked="selectedItems.some((selected: any) => getItemValue(selected) === getItemValue(item))"
            class="mr-2"
          />
          <span>{{ getItemText(item) }}</span>
        </li>
      </ul>
    </div>

    <div v-if="props.error && props.errorText" class="text-red-600 text-xs mt-1">
      {{ props.errorText }}
    </div>
  </div>
</template>
