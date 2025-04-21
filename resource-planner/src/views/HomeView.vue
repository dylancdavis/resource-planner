<template>
    <BaseLayout>
        <h2>Welcome to Recipe Planner</h2>
        <span>Please begin by uploading a recipe below.</span>
    </BaseLayout>
</template>

<script lang="ts">
import BaseLayout from '../components/BaseLayout.vue'
export default {
    name: 'HomeView',
    components: {
        BaseLayout,
    },
}
</script>
