<script lang="ts">
type Item = {
    id: Number
    name: String
}

type Recipe = {
    id: Number
    name: String
    input: {
        itemID: Number
        quantity: Number
    }
    output: {
        itemID: Number
        quantity: Number
    }
}

export default {
    name: 'ItemsRecipes',

    data() {
        return {
            itemID: 0,
            recipeID: 0,
            itemName: '',
            recipeName: '',
            itemInputID: '',
            itemInputQuantity: 0,
            itemOutputID: '',
            itemOutputQuantity: 0,
            items: [] as Item[],
            recipes: [] as Recipe[],
        }
    },

    methods: {
        addItem() {
            this.items.push({
                id: this.itemID,
                name: this.itemName,
            })

            this.itemName = ''
            this.itemID++
        },
        addRecipe() {
            this.recipes.push({
                id: this.recipeID,
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

            this.recipeName = ''
            this.recipeID++
            this.itemInputID = ''
            this.itemInputQuantity = 0
            this.itemOutputID = ''
            this.itemOutputQuantity = 0
        },
    },
}
</script>

<template>
    <!-- "this is way too big and should be refactored immediately!!" -->
    <!-- "yes." -->
    <div class="table-wrapper">
        <div>
            <h2>Items</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Item Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ itemID }}</td>
                        <td>
                            <input
                                v-model="itemName"
                                type="text"
                                placeholder="item name"
                            />
                        </td>
                        <td>
                            <button
                                type="button"
                                @click="addItem"
                                :disabled="itemName === ''"
                            >
                                Add Item
                            </button>
                        </td>
                    </tr>
                    <tr v-for="item in items">
                        <td>{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
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
                        <td>{{ recipeID }}</td>
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
                                @click="addRecipe"
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
                    <tr v-for="recipe in recipes">
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
    </div>
</template>

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
