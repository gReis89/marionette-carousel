import Marionette from 'backbone.marionette'
import Container from './Container'

export default Marionette.Application.extend({
  region: '#app',
  onStart () {
    this.showView(new Container())
  }
})
