import { addItem, type Counter } from './counter'
import type { Item, Recipe } from '@/components/ItemsRecipes.vue'

export function getBaseItems(recipes: Recipe[], items: Item[]) {
    const recipeOutputStrings = recipes.reduce(
        (ids, recipe) => ids.concat(Object.keys(recipe.outputs)),
        [] as string[],
    )
    const recipeOutputs = recipeOutputStrings.map(Number)
    const baseItems = items.filter((item) => !recipeOutputs.includes(item.id))
    return baseItems.map((item) => item.id)
}

export function computeInputs(counter: Counter, recipes: Recipe[], items: Item[]): Counter {
    const baseItemIDs = getBaseItems(recipes, items)

    while (Object.keys(counter).some((id) => !baseItemIDs.includes(Number(id)))) {
        const nonBaseItemId = Number(
            Object.keys(counter).find((id) => !baseItemIDs.includes(Number(id))),
        )
        const validRecipe = recipes.find((recipe) =>
            Object.keys(recipe.outputs).includes(String(nonBaseItemId)),
        )
        if (!validRecipe) {
            throw new Error(`Expected to find a recipe for Item ${nonBaseItemId} but none found`)
        }
        const requiredCount = counter[nonBaseItemId]
        const recipeMultiple = Math.ceil(requiredCount / validRecipe.outputs[nonBaseItemId])
        delete counter[nonBaseItemId]
        for (const key in validRecipe.inputs) {
            const amountToAdd = validRecipe.inputs[key] * recipeMultiple
            addItem(counter, key, amountToAdd)
        }
    }

    return counter
}
