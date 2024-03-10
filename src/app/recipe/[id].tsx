import { useEffect, useState } from 'react'
import { FlatList, Image, ScrollView, Text, View } from 'react-native'
import { Redirect, router, useLocalSearchParams } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import { services } from '@/services'
import { Loading } from '@/components/Loading'
import Ingredient from '@/components/Ingredient'
import { Step } from '@/components/Step'

import { styles } from './styles'

export default function Recipes() {
  const [isLoading, setIsLoading] = useState(true)
  const [recipe, setRecipe] = useState<RecipeResponse | null>(null)
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([])
  const [preparations, setPreparations] = useState<PreparationResponse[]>([])

  const { id } = useLocalSearchParams<{ id: string }>()

  useEffect(() => {
    services.recipes
      .get(id)
      .then((response) => setRecipe(response))
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    services.ingredients.getByRecipeId(id).then(setIngredients)
  }, [])

  useEffect(() => {
    services.preparations.getByRecipeId(id).then(setPreparations)
  }, [])

  if (isLoading) {
    return <Loading />
  }

  if (!id || !recipe) {
    return <Redirect href="/" />
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: recipe.image }} style={styles.image} />

      <View style={styles.body}>
        <View style={styles.header}>
          <MaterialIcons size={32} name="arrow-back" onPress={() => router.back()} />

          <Text style={styles.name}>{recipe.name}</Text>
          <Text style={styles.time}>{recipe.minutes} minutos de preparo</Text>
        </View>

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

        <View style={styles.content}>
          <Text style={styles.preparation}>How to do</Text>

          <FlatList
            data={preparations}
            renderItem={({ item }) => <Step step={item.step} description={item.description} />}
            contentContainerStyle={{ gap: 16 }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  )
}
