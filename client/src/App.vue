<template>
  <div class="bg-secondary-300">
    <HeaderComponent />
    <main class="mt-12 sm:mt-6">
      <router-view v-slot="{ Component }">
        <transition name="slide-left" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <FooterComponent />
  </div>
</template>

<script setup>
import FooterComponent from './components/Footer.vue';
import HeaderComponent from './components/Header.vue';
</script>