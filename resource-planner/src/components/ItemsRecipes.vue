<script lang="ts">
export default {
    name: 'ItemsRecipes',
}
</script>

<template>
    <!-- "this is too big and should be refactored" -->
    <!-- correct. -->
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
                        <td>0</td>
                        <td>
                            <input
                                type="text"
                                placeholder="item name"
                            />
                        </td>
                        <td><button type="button">Add</button></td>
                    </tr>
                    <tr></tr>
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
                        <td>0</td>
                        <td>
                            <input
                                type="text"
                                placeholder="recipe name"
                            />
                        </td>
                        <td>
                            <select>
                                <option>Select an Input</option>
                            </select>
                            <input type="number" />
                        </td>
                        <td>
                            <select>
                                <option>Select an Output</option>
                            </select>
                            <input type="number" />
                        </td>
                        <td>
                            <button type="button">Add Recipe</button>
                        </td>
                    </tr>
                    <tr></tr>
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
