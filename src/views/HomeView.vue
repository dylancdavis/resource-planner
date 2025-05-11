<template>
    <BaseLayout>
        <h2>Welcome to Resource Planner</h2>
        <span>Please begin by adding a recipe below.</span>
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
