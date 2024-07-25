<template>
  <input
    type="date"
    :id="id"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-inner focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 transition duration-300 ease-in-out"
  />
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
  id: string;
  modelValue: string;
}>();

const emit = defineEmits(["update:modelValue"]);
</script>
