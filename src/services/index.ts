import * as ingredients from './ingredientsService'

export const services = {
  ingredients,
  storage: { imagePath: process.env.EXPO_PUBLIC_IMAGE_PATH ?? 'MISSING_IMAGE_PATH' },
}
