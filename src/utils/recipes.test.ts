import type { Item, Recipe } from '@/components/ItemsRecipes.vue'
import { getBaseItems, computeInputs } from './recipes'
import { describe, it, expect } from 'vitest'
import type { Counter } from './counter'

describe('getBaseItems', () => {
    it('returns empty array for empty recipes and items', () => {
        const recipes: Recipe[] = []
        const items: Item[] = []
        const result = getBaseItems(recipes, items)
        expect(result).toEqual([])
    })
    it('returns correct item in trivial case', () => {
        const recipes: Recipe[] = [
            { id: 1, name: 'Five-To-One', inputs: { 1: 5 }, outputs: { 2: 1 } },
        ]
        const items: Item[] = [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
        ]
        const result = getBaseItems(recipes, items)
        expect(result).toEqual([1])
    })
})

describe('computeInputs', () => {
    it('handles empty case', () => {
        const recipes: Recipe[] = []
        const items: Item[] = []
        const counter: Counter = {}

        const result = computeInputs(counter, recipes, items)
        expect(result).toEqual({})
    })

    it('should reduce a single item to its base form', () => {
        const recipes: Recipe[] = [
            { id: 1, name: 'Five-To-One', inputs: { 1: 5 }, outputs: { 2: 1 } },
        ]
        const items: Item[] = [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
        ]
        const counter: Counter = { 2: 1 }

        const result = computeInputs(counter, recipes, items)
        expect(result).toEqual({ 1: 5 })
    })

    it('does not reduce a base item', () => {
        const recipes: Recipe[] = [
            { id: 1, name: 'Five-To-One', inputs: { 1: 5 }, outputs: { 2: 1 } },
        ]
        const items: Item[] = [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
        ]
        const counter: Counter = { 1: 10 }

        const result = computeInputs(counter, recipes, items)
        expect(result).toEqual({ 1: 10 })
    })

    it('processes intermediates correctly', () => {
        const recipes: Recipe[] = [
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
        const items: Item[] = [
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
        // Output: 2 Wooden Pickaxes
        const counter: Counter = { 4: 2 }

        const result = computeInputs(counter, recipes, items)
        // Expecting 2 Wooden Pickaxes to require 6 Planks and 4 Sticks
        // Which is 2 Logs
        expect(result).toEqual({ 0: 2 })
    })
})
