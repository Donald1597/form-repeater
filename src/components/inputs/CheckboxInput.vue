<template>
  <input
    type="checkbox"
    :id="id"
    :checked="modelValue"
    @change="$emit('update:modelValue', $event.target.checked)"
    class="form-checkbox h-5 w-5 text-blue-600"
  />
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

defineProps<{
  id: string;
  modelValue: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);
</script>
