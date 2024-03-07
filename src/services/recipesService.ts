import { supabase } from './supabase'

export async function getByIngredientIds(ingredientIds: string) {
  const { data } = await supabase
    .rpc('recipes_by_ingredients', { ingredientIds })
    .order('name', { ascending: true })
    .returns<RecipeResponse[]>()
  return data || []
}
