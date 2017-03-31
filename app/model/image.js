import { Model } from 'backbone'

export class Image extends Model {
  defaults () {
    return {
      title: 'Not specified',
      image: 'http://lorempixel.com/400/400/'
    }
  }
}

export default Image
