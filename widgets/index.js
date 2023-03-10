import widgetList from './widget_list'
import Slideshow from './slideshow'
import List from './list'
import Image from './image'
import Congrats from './congrats'
import Weather from './weather'
import YouTube from './youtube'
import Announcement from './announcement'
import Web from './web'

const widgets = {}

const list = new Web()

for (const widget of widgetList) {
  /**
  switch (widget) {
    case 'slideshow':
      widgets[widget] = new slideshow()
      break;

    case 'weather':
      widgets[widget] = new Weather()
      break;
    case 'congrats':
      widgets[widget] = new Congrats()
      break;
    case 'youtube':
      widgets[widget] = new YouTube()
      break;
    case 'web':
      widgets[widget] = new Web()
      break;
    case 'image':
      widgets[widget] = new Image()
      break;
    case 'list':
      widgets[widget] = new List()
      break;
    case 'announcement':
      widgets[widget] = new Announcement()
      break;
      
  }*/
}


console.debug('Widgets List : ', widgets)

module.exports = widgets
