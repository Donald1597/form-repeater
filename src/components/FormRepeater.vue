<template>
  <div class="p-6 max-w-6xl mx-auto">
    <!-- Add Field to All Sections -->
    <div
      class="mb-6 bg-gradient-to-r from-blue-400 to-blue-500 p-6 rounded-xl shadow-lg text-center"
    >
      <label
        for="global-field-label"
        class="block text-lg font-semibold text-white"
        >Global Field Name</label
      >
      <input
        id="global-field-label"
        v-model="globalField.label"
        placeholder="Field Name"
        class="block w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-inner focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 transition duration-300 ease-in-out"
      />
      <label
        for="global-field-type"
        class="block text-lg font-semibold text-white mt-4"
        >Field Type</label
      >
      <select
        id="global-field-type"
        v-model="globalField.type"
        class="block w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-inner focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 transition duration-300 ease-in-out"
      >
        <option value="text">Text</option>
        <option value="email">Email</option>
        <option value="number">Number</option>
        <option value="date">Date</option>
        <option value="checkbox">Checkbox</option>
      </select>
      <button
        @click="addFieldToAllSections"
        class="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-md hover:from-blue-700 hover:to-blue-900 transition-colors duration-300"
      >
        Add Field to All Sections
      </button>
    </div>

    <!-- Add and Remove Sections -->
    <div class="flex justify-end mb-6 space-x-3">
      <button
        @click="addSection"
        class="p-3 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full shadow-md hover:from-green-600 hover:to-green-800 transition-colors duration-300"
        aria-label="Add Section"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16M4 12h16"
          ></path>
        </svg>
      </button>
    </div>

    <!-- Sections -->
    <div
      v-for="(section, index) in sections"
      :key="index"
      class="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 shadow-lg rounded-xl p-6 mb-6 flex items-start relative"
    >
      <!-- Remove Section Button -->
      <div>
        <button
          @click="removeSection(index)"
          class="p-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-full shadow-md hover:from-red-500 hover:to-red-700 transition-colors duration-300"
          aria-label="Remove Section"
        >
          <svg
            class="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
      <!-- Ordering Buttons -->
      <div class="absolute top-3 right-3 flex space-x-2">
        <button
          v-if="sections.length > 1 && index !== 0"
          @click="moveSection(index, -1)"
          class="p-2 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 rounded-full shadow-md hover:from-gray-400 hover:to-gray-500 transition-colors duration-300"
          aria-label="Move Up"
        >
          <svg
            class="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7-7-7 7"
            ></path>
          </svg>
        </button>
        <button
          v-if="sections.length > 1 && index !== sections.length - 1"
          @click="moveSection(index, 1)"
          class="p-2 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 rounded-full shadow-md hover:from-gray-400 hover:to-gray-500 transition-colors duration-300"
          aria-label="Move Down"
        >
          <svg
            class="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 15l7 7 7-7"
            ></path>
          </svg>
        </button>
      </div>

      <div class="flex-1 ml-4 text-center">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {{ section.name }}
          </h3>
        </div>

        <div
          v-for="(field, fieldIndex) in section.fields"
          :key="fieldIndex"
          class="mb-6"
        >
          <div class="flex items-center space-x-4">
            <label
              :for="`field-${index}-${fieldIndex}`"
              class="block text-sm font-medium text-gray-900 dark:text-gray-100"
            >
              {{ field.label }}:
            </label>
            <component
              :is="getFieldComponent(field.type)"
              v-model="field.value"
              :id="`field-${index}-${fieldIndex}`"
              :placeholder="field.label"
              :type="field.type"
              :class="[
                'mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-inner focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 transition duration-300 ease-in-out',
                { 'border-red-500': errors[index]?.fields[fieldIndex] },
              ]"
              :options="field.options"
            />
            <button
              @click="removeField(index, fieldIndex)"
              class="p-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-full shadow-md hover:from-red-500 hover:to-red-700 transition-colors duration-300"
              aria-label="Remove Field"
            >
              <svg
                class="w-2 h-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div
            v-if="errors[index]?.fields[fieldIndex]"
            class="text-red-500 text-sm mt-1 ml-4"
          >
            {{ errors[index].fields[fieldIndex] }}
          </div>
        </div>

        <button
          @click="openAddFieldModal(index)"
          class="mt-4 px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg shadow-md hover:from-blue-500 hover:to-blue-700 transition-colors duration-300"
        >
          <svg
            class="w-6 h-6 inline-block mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16M4 12h16"
            ></path>
          </svg>
          Add Field
        </button>
      </div>
    </div>

    <!-- Add Field Modal -->
    <transition name="fade">
      <div
        v-if="showModal"
        class="fixed inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center"
      >
        <div
          class="bg-gradient-to-r from-gray-600 to-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full dark:text-gray-300"
        >
          <h3 class="text-lg font-semibold mb-4 text-white">Add Field</h3>
          <label
            for="modal-field-label"
            class="block text-lg font-medium text-white"
            >Field Name</label
          >
          <input
            id="modal-field-label"
            v-model="modalField.label"
            placeholder="Field Name"
            class="block w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-inner focus:ring-2 focus:ring-blue-400 bg-gray-800 text-gray-300 transition duration-300 ease-in-out"
          />
          <label
            for="modal-field-type"
            class="block text-lg font-medium text-white mt-3"
            >Field Type</label
          >
          <select
            id="modal-field-type"
            v-model="modalField.type"
            class="block w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-inner focus:ring-2 focus:ring-blue-400 bg-gray-800 text-gray-300 transition duration-300 ease-in-out"
          >
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
            <option value="checkbox">Checkbox</option>
          </select>
          <div class="flex justify-end space-x-3 mt-4">
            <button
              @click="addFieldToCurrentSection"
              class="px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg shadow-md hover:from-blue-500 hover:to-blue-700 transition-colors duration-300"
            >
              Add Field
            </button>
            <button
              @click="closeAddFieldModal"
              class="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-lg shadow-md hover:from-gray-600 hover:to-gray-800 transition-colors duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Submit Button -->
    <div class="text-center">
      <button
        @click="submitForm"
        class="mt-6 px-4 py-2 bg-gradient-to-r from-green-400 to-green-700 text-white rounded-lg shadow-md hover:from-green-600 hover:to-green-800 transition-colors duration-300"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import useForm from "../composables/useForm";

const {
  sections,
  errors,
  globalField,
  showModal,
  modalField,
  addSection,
  removeSection,
  moveSection,
  openAddFieldModal,
  closeAddFieldModal,
  addFieldToCurrentSection,
  removeField,
  addFieldToAllSections,
  getFieldComponent,
  submitForm,
} = useForm();
</script>
