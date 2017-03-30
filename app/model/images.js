import { Model } from 'backbone'

export class Images extends Model {
  defaults () {
    return {
      title: 'Not specified',
      images: 'http://lorempixel.com/400/400/'
    }
  }
}

export default Images
