import images from './images.json'

/**
 * Mock method to request image data
 * @return {Array} array of image objects
 */
export const getImages = () => {
  return new Promise(resolve => setTimeout(() => resolve(images), 500))
}
