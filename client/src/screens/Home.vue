<template>
    <div class="min-h-screen bg-info container mx-auto px-4 py-8">
        <div class="max-w-2xl bg-white text-blue-500 shadow-lg mx-auto rounded-lg p-8">
            <h1 class="text-3xl font-bold text-primary mb-4 mt-16">
                Welcome to IMDB Movies
            </h1>
            <p class="text-dark leading-relaxed mb-4">
                Discover a wide range of movies from different genres and eras. Whether
                you're a fan of action, drama, comedy, or documentaries, there's
                something for everyone.
            </p>
            <p class="text-dark leading-relaxed mb-4">
                Explore our top-rated movies, search for your favorites, and enjoy
                detailed information about each film. Happy watching!
            </p>
        </div>

        <Loader v-if="isLoading" />
    </div>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";

</script>
