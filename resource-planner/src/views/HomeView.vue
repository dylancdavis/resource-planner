<template>
    <BaseLayout>
        <h2>Welcome to Recipe Planner</h2>
        <span>Please begin by uploading a recipe below.</span>
        <ItemsRecipes />
    </BaseLayout>
</template>

<script lang="ts">
import BaseLayout from '../components/BaseLayout.vue'
import ItemsRecipes from '@/components/ItemsRecipes.vue'

export default {
    name: 'HomeView',
    components: {
        BaseLayout,
        ItemsRecipes,
    },
}
</script>
