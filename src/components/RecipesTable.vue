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
                        <div>
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
                            <button @click="addInput">+</button>
                        </div>
                        <ul>
                            <li
                                v-for="(key, value) in inputItems"
                                :key="key"
                            >
                                {{ items.find(({ id }) => id === key)?.name }} ({{ value }}x)
                            </li>
                        </ul>
                    </td>
                    <td>
                        <div>
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
                            <button @click="addOutput">+</button>
                        </div>
                        <ul>
                            <li
                                v-for="(key, value) in outputItems"
                                :key="key"
                            >
                                {{ items.find(({ id }) => id === key)?.name }} ({{ value }}x)
                            </li>
                        </ul>
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
                        <ul>
                            <li
                                v-for="(key, value) in recipe.outputs"
                                :key="key"
                            >
                                {{ items.find(({ id }) => id === key)?.name }} ({{ value }}x)
                            </li>
                        </ul>
                    </td>
                    <td>
                        <ul>
                            <li
                                v-for="(key, value) in recipe.inputs"
                                :key="key"
                            >
                                {{ items.find(({ id }) => id === key)?.name }} ({{ value }}x)
                            </li>
                        </ul>
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
import { addItem, type IDCounter } from '../utils/counter.ts'

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
            inputItems: {} as IDCounter,
            outputItems: {} as IDCounter,
        }
    },
    methods: {
        addInput() {
            const itemID = Number(this.itemInputID)
            addItem(this.inputItems, itemID, this.itemInputQuantity)
            this.itemInputID = ''
            this.itemInputQuantity = 0
        },
        addOutput() {
            const itemID = Number(this.itemOutputID)
            addItem(this.inputItems, itemID, this.itemOutputQuantity)
            this.itemOutputID = ''
            this.itemOutputQuantity = 0
        },
        handleAdd() {
            this.addRecipe({
                id: this.recipes.length,
                name: this.recipeName,
                inputs: this.inputItems,
                outputs: this.outputItems,
            })
            this.resetInputs()
        },
        resetInputs() {
            this.recipeName = ''
            this.itemInputID = ''
            this.itemInputQuantity = 0
            this.itemOutputID = ''
            this.itemOutputQuantity = 0
            this.inputItems = {} as IDCounter
            this.outputItems = {} as IDCounter
        },
    },
})
</script>
