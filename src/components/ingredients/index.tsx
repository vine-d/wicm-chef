import { useState, useEffect } from 'react'
import { ScrollView, Alert } from 'react-native'
import { router } from 'expo-router'

import Ingredient from '@/components/Ingredient'
import Selection from '@/components/Selection'
import { styles } from './styles'
import { services } from '@/services'

export default function Ingredients() {
  const [selected, setSelected] = useState<string[]>([])
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([])

  function handleToggleSelected(value: string) {
    if (selected.includes(value)) {
      return setSelected(selected.filter((item) => item !== value))
    }
    return setSelected([...selected, value])
  }

  function handleClearSelection() {
    Alert.alert('Clear selection', 'Clear all the selected ingredients?', [
      { text: 'No', style: 'cancel' },
      { text: 'Yes', onPress: () => setSelected([]) },
    ])
  }

  function handleOnSearch() {
    router.navigate('/recipes/' + selected)
  }

  useEffect(() => {
    services.ingredients.getAll().then(setIngredients)
  }, [])

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {ingredients.map((ingredient, index) => (
          <Ingredient
            key={ingredient.id}
            name={ingredient.name}
            image={`${services.storage.imagePath}/${ingredient.image}`}
            onPress={() => handleToggleSelected(ingredient.id)}
            selected={selected.includes(ingredient.id) ? true : false}
          />
        ))}
      </ScrollView>
      {selected.length > 0 && (
        <Selection quantity={selected.length} onClear={handleClearSelection} onSearch={handleOnSearch} />
      )}
    </>
  )
}
