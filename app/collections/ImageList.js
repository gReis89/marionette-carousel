import Marionette from 'backbone.marionette'
import CarouselItem from 'components/CarouselItem'

export default Marionette.CollectionView.extend({
  childView: CarouselItem,
  tagName: 'ul'
})
