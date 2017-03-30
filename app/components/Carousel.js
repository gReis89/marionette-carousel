import Marionette from 'backbone.marionette'
import template from '../templates/carousel.jsx'
import CarouselItem from './CarouselItem'
import Images from '../model/images'

export default Marionette.CollectionView.extend({
  template,
  childView: CarouselItem,
  collection: Images
})
