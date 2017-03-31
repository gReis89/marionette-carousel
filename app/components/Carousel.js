import Marionette from 'backbone.marionette'
import {Collection} from 'backbone'
import template from 'templates/carousel.jsx'
import CarouselItem from './CarouselItem'
import ImageList from 'collections/ImageList'
import Image from 'model/image'
import {getImages} from 'api/images.api'
import _forEach from 'lodash/forEach'
import $ from 'jquery'

export default Marionette.View.extend({
  template,
  regions: {
    items: '#carousel-items'
  },
  childView: CarouselItem,
  pageSize: 1140,
  blockSize: 284,
  actualPage: 1,
  numPages: 1,
  onRender () {
    let itemList = new Collection()
    getImages().then(response => {
      const totalImages = response.length
      this.numPages = Math.floor(totalImages / 4)

      _forEach(response, (item) => {
        itemList.add(new Image({
          title: item.title,
          image: item.images[Math.floor(Math.random() * item.images.length)]
        }))
      })

      $('#carousel-items').width(totalImages * this.blockSize)
      $('#next').off().on('click', () => {
        this.goTo('next')
      })
      $('#prev').off().on('click', () => {
        this.goTo('prev')
      })

      const imageList = new ImageList()
      imageList.collection = itemList
      this.showChildView('items', imageList)
      this.updateButtons()
    })
  },
  goTo (type) {
    const carousel = $('#carousel-items')
    const leftMargin = parseInt(carousel.css('left'))
    type === 'next'
    ? this.actualPage++ && carousel.css({left: leftMargin - this.pageSize})
    : this.actualPage-- && carousel.css({left: leftMargin + this.pageSize})
    this.updateButtons()
  },
  updateButtons () {
    const btNext = $('#next')
    const btPrev = $('#prev')
    this.actualPage >= this.numPages
    ? btNext.prop('disabled', true)
    : btNext.prop('disabled', false)
    this.actualPage <= 1
    ? btPrev.prop('disabled', true)
    : btPrev.prop('disabled', false)
  }
})
