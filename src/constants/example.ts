export const exampleItems = [
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
]

export const exampleRecipes = [
    {
        name: 'Planks',
        input: {
            itemID: 0,
            quantity: 1,
        },
        output: {
            itemID: 1,
            quantity: 4,
        },
    },
    {
        name: 'Sticks',
        input: {
            itemID: 1,
            quantity: 2,
        },
        output: {
            itemID: 2,
            quantity: 4,
        },
    },
    {
        name: 'Ladder',
        input: {
            itemID: 2,
            quantity: 7,
        },
        output: {
            itemID: 3,
            quantity: 3,
        },
    },
]
