import { supabase } from './supabase'

export async function getAll() {
  const { data } = await supabase
    .from('ingredients')
    .select('*')
    .order('name', { ascending: true })
    .returns<IngredientResponse[]>()
  return data ?? []
}

export async function getByIds(ingredientIds: string[]) {
  const { data } = await supabase
    .from('ingredients')
    .select('*')
    .in('id', ingredientIds)
    .order('name', { ascending: true })
    .returns<IngredientResponse[]>()
  return data ?? []
}

export async function getByRecipeId(recipeId: string) {
  const { data } = await supabase
    .from('recipes_ingredients')
    .select('ingredients (id, name, image)')
    .eq('recipe_id', recipeId)
    .order('name', { ascending: true })
    .returns<IngredientResponse[]>()
  return data ?? []
}
