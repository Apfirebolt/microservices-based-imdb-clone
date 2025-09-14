<template>
  <footer class="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white py-12 px-8">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
        <div class="flex flex-col items-center md:items-start">
          <h2 class="font-bold text-2xl mb-2">Vue IMDB</h2>
          <p class="text-sm opacity-80">Your source for movies and TV shows.</p>
        </div>
        <div>
          <h3 class="font-semibold text-lg mb-4">Movies</h3>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="hover:text-yellow-300 transition">Popular Movies</a></li>
            <li><a href="#" class="hover:text-yellow-300 transition">Top Rated</a></li>
            <li><a href="#" class="hover:text-yellow-300 transition">Upcoming</a></li>
          </ul>
        </div>
        <div>
          <h3 class="font-semibold text-lg mb-4">TV Shows</h3>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="hover:text-yellow-300 transition">Popular TV Shows</a></li>
            <li><a href="#" class="hover:text-yellow-300 transition">Top Rated</a></li>
            <li><a href="#" class="hover:text-yellow-300 transition">On Air</a></li>
          </ul>
        </div>
        <div>
          <h3 class="font-semibold text-lg mb-4">Indian Movies</h3>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="hover:text-yellow-300 transition">Bollywood</a></li>
            <li><a href="#" class="hover:text-yellow-300 transition">South Indian</a></li>
            <li><a href="#" class="hover:text-yellow-300 transition">Regional</a></li>
          </ul>
        </div>
      </div>
      <div class="flex flex-col md:flex-row items-center justify-between border-t border-white/20 pt-6">
        <p class="text-center md:text-left text-sm opacity-80">
          &copy; {{ currentYear }} Vue IMDB. Built with <span class="font-semibold">Vue 3</span> &amp; <span class="font-semibold">Tailwind CSS</span>
        </p>
        <div class="mt-4 md:mt-0 flex space-x-4">
          <a href="#" class="hover:text-yellow-300 transition" aria-label="Twitter">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99A12.13 12.13 0 0 1 3.15 5.13a4.29 4.29 0 0 0 1.33 5.72c-.7-.02-1.36-.21-1.94-.53v.05c0 2.01 1.43 3.69 3.33 4.07-.35.09-.72.14-1.1.14-.27 0-.53-.03-.78-.07.53 1.65 2.07 2.85 3.89 2.88A8.6 8.6 0 0 1 2 19.54a12.13 12.13 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.38-.01-.57A8.72 8.72 0 0 0 24 4.59a8.48 8.48 0 0 1-2.54.7z"/></svg>
          </a>
          <a href="#" class="hover:text-yellow-300 transition" aria-label="GitHub">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.93.58.11.79-.25.79-.56v-2.02c-3.2.7-3.87-1.54-3.87-1.54-.53-1.35-1.3-1.71-1.3-1.71-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.75-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 2.92-.39c.99.01 1.99.13 2.92.39 2.22-1.49 3.2-1.18 3.2-1.18.63 1.58.23 2.75.11 3.04.74.8 1.19 1.83 1.19 3.09 0 4.43-2.7 5.41-5.27 5.7.42.36.8 1.09.8 2.2v3.26c0 .31.21.67.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"/></svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  setup() {
    const currentYear = computed(() => new Date().getFullYear())

    return {
      currentYear,
    }
  },
})
</script>