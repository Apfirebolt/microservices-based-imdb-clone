<template>
  <div class="movie-list mt-24">
    <header class="header">
      <h1>Top Movies</h1>
    </header>
    <div v-if="loading">
      <Loader />
    </div>
    <div class="p-4" v-else>
      <div class="movies-grid">
        <div v-for="movie in movieResults" :key="movie.id" class="movie-card">
          <img
            :src="movie.primaryImage"
            :alt="movie.primaryTitle"
            class="movie-image"
          />
          <h2 class="movie-title">{{ movie.primaryTitle }}</h2>
          <p class="movie-description">{{ movie.description }}</p>
          <div class="movie-details">
            <span>Year: {{ movie.startYear }}</span>
            <span>Rating: {{ movie.averageRating }}</span>
            <span>Genre: {{ movie.genres?.join(", ") }}</span>
            <span>Runtime: {{ movie.runtimeMinutes }} min</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useMovieStore } from "../stores/movies";
import Loader from "../components/Loader.vue";

const movieStore = useMovieStore();
const movieResults = computed(() => movieStore.getTopRatedEnglishMovies);
const loading = computed(() => movieStore.isLoading);
</script>

<style scoped>
.header {
  text-align: center;
  margin-bottom: 2rem;
}
.movies-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}
.movie-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.movie-image {
  width: 180px;
  height: 260px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 1rem;
}
.movie-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-align: center;
}
.movie-description {
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
  text-align: center;
}
.movie-details {
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  text-align: center;
}
</style>
