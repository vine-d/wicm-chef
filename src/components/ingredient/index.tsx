import { Pressable, PressableProps, Image, Text } from 'react-native'

import { styles } from './styles'
import { services } from '@/services'

export type IngredientProps = {
  name: string
  image: string
  selected?: boolean
}

export default function Ingredient({ name, image, selected = false, ...rest }: IngredientProps & PressableProps) {
  return (
    <Pressable style={[styles.container, selected && styles.selected]} {...rest}>
      <Image style={styles.image} source={{ uri: image }} />
      <Text style={styles.title}>{name}</Text>
    </Pressable>
  )
}
