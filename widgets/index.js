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

for (const widget of widgetList) {
  
  switch (widget) {
    case 'slideshow':
      widgets[widget] = Slideshow
      break;

    case 'weather':
      widgets[widget] = Weather
      break;
    case 'congrats':
      widgets[widget] = Congrats
      break;
    case 'youtube':
      widgets[widget] = YouTube
      break;
    case 'web':
      widgets[widget] = Web
      break;
    case 'image':
      widgets[widget] = Image
      break;
    case 'list':
      widgets[widget] = List
      break;
    case 'announcement':
      widgets[widget] = Announcement
      break;
      
  }
}

module.exports = widgets
