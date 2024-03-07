import { MaterialIcons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import { View, Text, FlatList, ScrollView } from 'react-native'
import { styles } from './styles'
import { Recipe } from '@/components/Recipe'
import Ingredient from '@/components/Ingredient'
import { useEffect, useState } from 'react'
import { services } from '@/services'

export default function Recipes() {
  const params = useLocalSearchParams<{ ingredientIds: string }>()
  const ingredientIds = params.ingredientIds.split(',')
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([])
  const [recipes, setRecipes] = useState<RecipeResponse[]>([])

  useEffect(() => {
    services.ingredients.getByIds(ingredientIds).then(setIngredients)
  }, [])

  useEffect(() => {
    services.recipes.getByIngredientIds(ingredientIds).then(setRecipes)
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="arrow-back" size={32} color="black" onPress={router.back} />

        <Text style={styles.title}>Ingredients</Text>

        <ScrollView
          horizontal
          contentContainerStyle={styles.ingredient}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {ingredients.map((ingredient) => (
            <Ingredient
              key={ingredient.id}
              name={ingredient.name}
              image={`${services.storage.imagePath}/${ingredient.image}`}
              onPress={() => {}}
            />
          ))}
        </ScrollView>
      </View>
      <FlatList
        data={recipes}
        keyExtractor={(recipe) => recipe.id}
        renderItem={({ item }) => <Recipe recipe={item} />}
        style={styles.recipes}
        contentContainerStyle={styles.recipesContent}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ gap: 16 }}
        numColumns={2}
      ></FlatList>
    </View>
  )
}
