import { supabase } from './supabase'

export async function getByIngredientIds(ingredientIds: string[]) {
  const { data } = await supabase
    .rpc('recipes_by_ingredients', { ingredientids: ingredientIds })
    .returns<RecipeResponse[]>()
  return data ?? []
}
