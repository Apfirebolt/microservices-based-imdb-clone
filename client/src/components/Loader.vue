<template>
    <div class="flex items-center justify-center min-h-screen">
        <div class="loader"></div>
    </div>
</template>

<script>
export default {
    name: "Loader",
};
</script>

<style>
.loader {
    border: 6px solid #e5e7eb;
    border-top: 6px solid #10b981;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    animation: spin 0.8s ease-in-out infinite;
    box-shadow: 0 0 10px #10b98133;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>