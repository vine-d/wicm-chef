import { supabase } from './supabase'

export async function getByRecipeId(recipeId: string) {
  const { data } = await supabase
    .from('preparations')
    .select()
    .eq('recipe_id', recipeId)
    .order('step', { ascending: true })
    .returns<PreparationResponse[]>()
  return data || []
}
