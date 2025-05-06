import type { Recipe, Item } from '@/components/ItemsRecipes.vue'

export const exampleItems: Item[] = [
    {
        id: 0,
        name: 'Log',
    },
    {
        id: 1,
        name: 'Plank',
    },
    {
        id: 2,
        name: 'Stick',
    },
    {
        id: 3,
        name: 'Ladder',
    },
    {
        id: 4,
        name: 'Wooden Pickaxe',
    },
]

export const exampleRecipes: Recipe[] = [
    {
        id: 0,
        name: 'Planks',
        inputs: {
            0: 1,
        },
        outputs: {
            1: 4,
        },
    },
    {
        id: 1,
        name: 'Sticks',
        inputs: {
            1: 2,
        },
        outputs: {
            2: 4,
        },
    },
    {
        id: 2,
        name: 'Ladder',
        inputs: {
            2: 7,
        },
        outputs: {
            3: 3,
        },
    },
    {
        id: 3,
        name: 'Wooden Pickaxe',
        inputs: {
            1: 3,
            2: 2,
        },
        outputs: {
            4: 1,
        },
    },
]
