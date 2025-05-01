<template>
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
                    <td>{{ items.length }}</td>
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
                            @click="handleAdd"
                            :disabled="itemName === ''"
                        >
                            Add Item
                        </button>
                    </td>
                </tr>
                <tr
                    v-for="item in items"
                    :key="item.id"
                >
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { Item } from './ItemsRecipes.vue'

export default defineComponent({
    props: {
        items: {
            type: Array as PropType<Array<Item>>,
            required: true,
        },
        addItem: {
            type: Function as PropType<(item: Item) => void>,
            required: true,
        },
    },
    data() {
        return {
            itemName: '',
        }
    },
    methods: {
        handleAdd() {
            this.addItem({
                id: this.items.length,
                name: this.itemName,
            })
            this.itemName = ''
        },
    },
})
</script>
