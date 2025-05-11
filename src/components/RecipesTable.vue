<template>
    <div class="flex flex-col gap-2">
        <h2>Add Recipe</h2>
        <div class="flex flex-col gap-6">
            <div class="recipe-creator flex flex-col gap-3">
                <BaseInput
                    v-model="recipeName"
                    type="text"
                    label-text="Recipe Name"
                    :placeholder="'e.g. &quot;Plank&quot;'"
                />
                <div class="recipe-creator__inputs-outputs-container flex gap-7">
                    <div class="inputs flex flex-col gap-2">
                        <h3>Inputs</h3>
                        <div class="flex gap-2">
                            <div class="flex gap-2">
                                <select
                                    v-model="itemInputID"
                                    :disabled="items.length === 0"
                                >
                                    <option value="">Select an Item</option>
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
                        </div>
                        <ul v-if="Object.keys(inputItems).length > 0">
                            <li
                                v-for="(value, key) in inputItems"
                                :key="key"
                            >
                                {{ items.find(({ id }) => id === Number(key))?.name }} ({{
                                    value
                                }}x)
                            </li>
                        </ul>
                    </div>
                    <div class="outputs flex flex-col gap-2">
                        <h3>Outputs</h3>
                        <div class="flex gap-2">
                            <select
                                v-model="itemOutputID"
                                :disabled="items.length === 0"
                            >
                                <option value="">Select an Item</option>
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
                        <ul v-if="Object.keys(outputItems).length > 0">
                            <li
                                v-for="(value, key) in outputItems"
                                :key="key"
                            >
                                {{ items.find(({ id }) => id === Number(key))?.name }} ({{
                                    value
                                }}x)
                            </li>
                        </ul>
                    </div>
                </div>
                <button
                    type="button"
                    @click="handleAdd"
                    :disabled="
                        Object.keys(inputItems).length === 0 ||
                        Object.keys(outputItems).length === 0
                    "
                >
                    Add Recipe
                </button>
            </div>
            <div class="flex flex-col gap-2">
                <h3>Recipes</h3>
                <table class="zebra">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Recipe Name</th>
                            <th>Input</th>
                            <th>Output</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="recipe in recipes"
                            :key="recipe.id"
                        >
                            <td>{{ recipe.id }}</td>
                            <td>{{ recipe.name }}</td>
                            <td>
                                <ul>
                                    <li
                                        v-for="(value, key) in recipe.inputs"
                                        :key="key"
                                    >
                                        {{ items.find(({ id }) => id === Number(key))?.name }} ({{
                                            value
                                        }}x)
                                    </li>
                                </ul>
                            </td>
                            <td>
                                <ul>
                                    <li
                                        v-for="(value, key) in recipe.outputs"
                                        :key="key"
                                    >
                                        {{ items.find(({ id }) => id === Number(key))?.name }} ({{
                                            value
                                        }}x)
                                    </li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import type { PropType } from 'vue'
import type { Recipe, Item } from './ItemsRecipes.vue'
import { addItem, type IDCounter } from '../utils/counter.ts'
import BaseInput from './BaseInput.vue'

export default defineComponent({
    components: {
        BaseInput,
    },
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
            addItem(this.outputItems, itemID, this.itemOutputQuantity)
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

<style></style>
