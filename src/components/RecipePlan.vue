<template>
    <div class="flex flex-col gap-2">
        <h2>Recipe Plan</h2>
        <h3>Specify an Output:</h3>
        <div class="flex gap-2">
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
        <div class="flex gap-2">
            <label for="item-count">Item Count:</label>
            <input
                type="number"
                id="item-count"
                v-model.number="itemCount"
            />
        </div>
        <h3>Required Inputs:</h3>
        <div v-if="recipePlan">
            <ul>
                <li
                    v-for="(value, key) in recipePlan"
                    :key="key"
                >
                    {{ items.find(({ id }) => id === Number(key))?.name }} ({{ value }}x)
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { addItem } from '@/utils/counter'

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
        /** Returns a list of IDs of the items that cannot be produced by a recipe. */
        baseItemIDs() {
            const recipeOutputStrings = this.recipes.reduce(
                (ids, recipe) => ids.concat(Object.keys(recipe.outputs)),
                [] as string[],
            )
            const recipeOutputs = recipeOutputStrings.map(Number)
            const baseItems = this.items.filter((item) => !recipeOutputs.includes(item.id))
            return baseItems.map((item) => item.id)
        },
        recipePlan() {
            if (this.selectedItem === null || this.itemCount <= 0) {
                return null
            }
            const counter = { [this.selectedItem]: this.itemCount }

            while (Object.keys(counter).some((id) => !this.baseItemIDs.includes(Number(id)))) {
                const nonBaseItemId = Number(
                    Object.keys(counter).find((id) => !this.baseItemIDs.includes(Number(id))),
                )
                const validRecipe = this.recipes.find((recipe) =>
                    Object.keys(recipe.outputs).includes(String(nonBaseItemId)),
                )
                if (!validRecipe) {
                    throw new Error(
                        `Expected to find a recipe for Item ${nonBaseItemId} but none found`,
                    )
                }
                const requiredCount = counter[nonBaseItemId]
                const recipeMultiple = Math.ceil(requiredCount / validRecipe.outputs[nonBaseItemId])
                delete counter[nonBaseItemId]
                for (const key in validRecipe.inputs) {
                    const amountToAdd = validRecipe.inputs[key] * recipeMultiple
                    addItem(counter, key, amountToAdd)
                }
            }
            return counter
        },
    },
})
</script>
