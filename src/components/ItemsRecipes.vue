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
    input: {
        itemID: number
        quantity: number
    }
    output: {
        itemID: number
        quantity: number
    }
}

import ItemsTable from './ItemsTable.vue'
import RecipesTable from './RecipesTable.vue'

export default {
    name: 'ItemsRecipes',

    data() {
        return {
            items: [] as Item[],
            recipes: [] as Recipe[],
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
