<template>
    <div>
        <h2>Recipe Plan</h2>
        <h3>Specify an Output:</h3>
        <div>
            <label for="item-select">Select Item:</label>
            <select
                id="item-select"
                v-model="selectedItem"
            >
                <option
                    v-for="item in items"
                    :key="item.id"
                    :value="item.id"
                >
                    {{ item.name }}
                </option>
            </select>
        </div>
        <div>
            <label for="item-count">Item Count:</label>
            <input
                type="number"
                id="item-count"
                v-model.number="itemCount"
            />
        </div>
        <h3>Required Input:</h3>
        <div v-if="recipePlan">{{ recipePlan.count }}x {{ recipePlan.item.name }}</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { Item, Recipe } from './ItemsRecipes.vue'

export default defineComponent({
    name: 'RecipePlan',
    props: {
        items: {
            type: Array as PropType<Item[]>,
            required: true,
        },
        recipes: {
            type: Array as PropType<Recipe[]>,
            required: true,
        },
    },
    data() {
        return {
            selectedItem: null as number | null,
            itemCount: 0,
        }
    },
    computed: {
        baseItemIDs() {
            const recipeOutputs = this.recipes.map((recipe) => recipe.output.itemID)
            const baseItems = this.items.filter((item) => !recipeOutputs.includes(item.id))
            return baseItems.map((item) => item.id)
        },
        recipePlan() {
            if (this.selectedItem === null || this.itemCount <= 0) {
                return null
            }
            let currentItemId = this.selectedItem
            let currentCount = this.itemCount
            while (!this.baseItemIDs.includes(currentItemId)) {
                const recipe = this.recipes.find((recipe) => recipe.output.itemID === currentItemId)
                if (!recipe) {
                    throw new Error(
                        `Expected to be able to find a recipe for ${currentItemId} but none found`,
                    )
                }
                const recipeMultiple = Math.ceil(currentCount / recipe.output.quantity) // we round number of recipes up
                const recipeInputCount = recipe.input.quantity * recipeMultiple
                currentItemId = recipe.input.itemID
                currentCount = recipeInputCount
            }
            const currentItem = this.items.find((item) => item.id === currentItemId)
            if (!currentItem) {
                throw new Error(`Expected to be able to find item ${currentItemId} but none found`)
            }
            return {
                item: currentItem,
                count: currentCount,
            }
        },
    },
})
</script>
