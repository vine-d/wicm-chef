import * as ingredients from './ingredientsService'
import * as recipes from './recipesService'
import * as preparations from './preparationsService'

export const services = {
  ingredients,
  recipes,
  preparations,
  storage: { imagePath: process.env.EXPO_PUBLIC_IMAGE_PATH ?? 'MISSING_IMAGE_PATH' },
}
