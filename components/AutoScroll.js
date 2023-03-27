import React, {createRef} from 'react'
import ReactDom from 'react-dom'
import animateScrollTo from 'animated-scroll-to'

class AutoScroll extends React.Component {
  constructor(props) {
    super(props)
    this.container = React.createRef()
  }

  inputRef = createRef(null);

  componentDidMount() {
    if (!this.container || !this.container.current) return
    const containerNode = this.inputRef.current
    if (!containerNode) return

    const { duration = 3000 } = this.props
    this.intervalHandle = setInterval(() => {
      animateScrollTo(9999999, {
        minDuration: duration,
        element: containerNode
      })
      this.timeoutHandle = setTimeout(() => {
        animateScrollTo(0, {
          minDuration: duration,
          element: containerNode
        })
      }, duration)
    }, duration)
  }

  componentWillUnmount() {
    if(this.intervalHandle){
      clearInterval(this.intervalHandle)
      this.intervalHandle = null
    }

    if(this.timeoutHandle){
      clearTimeout(this.timeoutHandle)
      this.timeoutHandle = null
    }
  }

  render() {
    const { children, style = {} } = this.props
    return (
      <div className='container' ref={this.container} style={style}>
        {children}
        <style jsx>{`
          .container {
            display: flex;
            width: 100%;
            height: 100%;
            overflow: auto;
          }
        `}</style>
      </div>
    )
  }
}

export default AutoScroll
