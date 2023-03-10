import BaseWidget from '../base_widget'
import WebContent from './src/WebContent'
import WebOptions from './src/WebOptions'

export default class Web extends BaseWidget {
  constructor(props) {
    super(props)
      this.name= 'Web',
      this.version= '0.1',
      this.icon= 'globe',
      this.defaultData= {
        title: null,
        url: 'https://compsci.lafayette.edu/',
        color: '#34495e'
      
    }
  }

  get Widget() {
    return WebContent
  }

  get Options() {
    return WebOptions
  }
}