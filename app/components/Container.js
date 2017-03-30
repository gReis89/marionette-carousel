import Marionette from 'backbone.marionette'
import template from '../templates/container.jsx'
import Carousel from './Carousel'

export default Marionette.View.extend({
  template,
  regions: {
    region1: '#carousel'
  },
  onRender () {
    this.showChildView('region1', new Carousel())
  }
})
