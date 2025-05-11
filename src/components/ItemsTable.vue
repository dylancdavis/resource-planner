<template>
    <div class="flex flex-col gap-2">
        <h2>Add Item</h2>
        <div class="flex flex-col gap-6">
            <div class="flex flex-col gap-3">
                <BaseInput
                    v-model="itemName"
                    :placeholder="'e.g. &quot;Plank&quot;'"
                    label-text="Item Name"
                />
                <button
                    type="button"
                    @click="handleAdd"
                    :disabled="itemName === ''"
                >
                    Add Item
                </button>
            </div>
            <div class="flex flex-col gap-2">
                <h3>Items</h3>
                <table class="zebra">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Item Name</th>
                        </tr>
                    </thead>
                    <tbody>
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
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { Item } from './ItemsRecipes.vue'
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

<style scoped></style>
