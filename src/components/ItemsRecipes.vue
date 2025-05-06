<template>
    <div class="table-wrapper">
        <ItemsTable
            :items="items"
            :addItem="addItem"
        />
        <RecipesTable
            :items="items"
            :recipes="recipes"
            :addRecipe="addRecipe"
        />
        <RecipePlan
            :items="items"
            :recipes="recipes"
        />
    </div>
</template>

<script lang="ts">
export type Item = {
    id: number
    name: string
}

export type Recipe = {
    id: number
    name: string
    inputs: IDCounter
    outputs: IDCounter
}

import { exampleItems, exampleRecipes } from '../constants/example.ts'
import ItemsTable from './ItemsTable.vue'
import RecipesTable from './RecipesTable.vue'
import RecipePlan from './RecipePlan.vue'
import type { IDCounter } from '@/utils/counter.ts'

export default {
    name: 'ItemsRecipes',

    data() {
        return {
            items: exampleItems,
            recipes: exampleRecipes,
        }
    },

    methods: {
        addItem(item: Item) {
            this.items.push(item)
        },
        addRecipe(recipe: Recipe) {
            this.recipes.push(recipe)
        },
    },

    components: {
        ItemsTable,
        RecipesTable,
        RecipePlan,
    },
}
</script>

<style lang="scss">
.table-wrapper {
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 24px;
}

.table-wrapper div {
    padding: 16px;
}

table {
    border: 1px solid grey;
}
</style>
