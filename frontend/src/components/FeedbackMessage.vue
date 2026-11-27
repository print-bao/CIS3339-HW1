<script setup>
defineProps({
    loading: Boolean,
    error: String,
    message: String
})
</script>
<template>
    <div class="feedback" aria-live="polite">
        <p v-if="loading" class="loading">
            Loading...
        </p>
        <p v-if="error" class="error">
            {{ error }}
        </p>
        <p v-if="message" class="success">
            {{ message }}
        </p>
    </div>
</template>
<style scoped>
.feedback p{
    padding: 12px 16px;
    border-radius: 6px;
    margin: 12px 0;
}
.loading{
    background-color: #f3f4f6;
    color: #374151;
}
.error{
    background-color: #fee2e2;
    color: #b91c1c;
}
.success{
    background-color: #dcfce7;
    color: #166534;
}
</style>