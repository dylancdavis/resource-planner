<template>
    <div>
        <h2>Recipes</h2>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Recipe Name</th>
                    <th>Input</th>
                    <th>Output</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ recipes.length }}</td>
                    <td>
                        <input
                            v-model="recipeName"
                            type="text"
                            placeholder="recipe name"
                        />
                    </td>
                    <td>
                        <select
                            v-model="itemInputID"
                            :disabled="items.length === 0"
                        >
                            <option value="">Select an Input</option>
                            <option
                                v-for="item in items"
                                :key="item.id.toString()"
                                :value="item.id"
                            >
                                {{ item.name }}
                            </option>
                        </select>
                        <input
                            type="number"
                            v-model="itemInputQuantity"
                        />
                    </td>
                    <td>
                        <select
                            v-model="itemOutputID"
                            :disabled="items.length === 0"
                        >
                            <option value="">Select an Output</option>
                            <option
                                v-for="item in items"
                                :key="item.id.toString()"
                                :value="item.id"
                            >
                                {{ item.name }}
                            </option>
                        </select>
                        <input
                            type="number"
                            v-model="itemOutputQuantity"
                        />
                    </td>
                    <td>
                        <button
                            type="button"
                            @click="handleAdd"
                            :disabled="
                                itemInputID === '' ||
                                itemOutputID === '' ||
                                itemInputQuantity === 0 ||
                                itemOutputQuantity === 0
                            "
                        >
                            Add Recipe
                        </button>
                    </td>
                </tr>
                <tr
                    v-for="recipe in recipes"
                    :key="recipe.id"
                >
                    <td>{{ recipe.id }}</td>
                    <td>{{ recipe.name }}</td>
                    <td>
                        {{ items.find(({ id }) => id === recipe.input.itemID)?.name }} ({{
                            recipe.input.quantity
                        }}x)
                    </td>
                    <td>
                        {{ items.find(({ id }) => id === recipe.output.itemID)?.name }} ({{
                            recipe.output.quantity
                        }}x)
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { Recipe, Item } from './ItemsRecipes.vue'

export default defineComponent({
    props: {
        items: {
            type: Array as PropType<Array<Item>>,
            required: true,
        },
        recipes: {
            type: Array as PropType<Array<Recipe>>,
            required: true,
        },
        addRecipe: {
            type: Function as PropType<(recipe: Recipe) => void>,
            required: true,
        },
    },
    data() {
        return {
            recipeName: '',
            itemInputID: '',
            itemInputQuantity: 0,
            itemOutputID: '',
            itemOutputQuantity: 0,
        }
    },
    methods: {
        handleAdd() {
            this.addRecipe({
                id: this.recipes.length,
                name: this.recipeName,
                input: {
                    itemID: Number(this.itemInputID),
                    quantity: this.itemInputQuantity,
                },
                output: {
                    itemID: Number(this.itemOutputID),
                    quantity: this.itemOutputQuantity,
                },
            })
            this.resetInputs()
        },
        resetInputs() {
            this.recipeName = ''
            this.itemInputID = ''
            this.itemInputQuantity = 0
            this.itemOutputID = ''
            this.itemOutputQuantity = 0
        },
    },
})
</script>
