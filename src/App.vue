<template>
  <div class="flex flex-col h-screen">
    <Navbar />
    <main
      class="flex-1 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 p-6 shadow-xl"
    >
      <FormRepeater />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import FormRepeater from "./components/FormRepeater.vue";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>
