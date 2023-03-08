import widgetList from './widget_list'

const widgets = {}
for (const widget of widgetList) {
  //const WidgetClass = require('./' + widget).default
  widgets[widget] = new WidgetClass(widget)
}


function WidgetClass(widget){
  this.widget = widget
  return require('./' + this.widget).default
}

module.exports = widgets
