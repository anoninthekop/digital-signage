/**
 * @fileoverview Preview page (shows the display frame and renders all the
 * widgets inside of it)
 */

import React from 'react'
import { view } from '@risingstack/react-easy-state'

import Display from '../../../components/Display/Display'
import { display } from '../../../stores'

export async function getServerSideProps({query,req}){
  const displayId = query && query.display
  const host =
    req && req.headers && req.headers.host ? 'http://' + req.headers.host : window.location.origin
  return { props: {displayId: displayId || null, host: host || null }}
}


class DisplayPage extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { displayId } = this.props
    display.setId(displayId)
  }

  render() {
    const { host } = this.props
    return (
      <div className={'container'}>
        <Display host={host} display={display.id} />
        <style jsx>
          {`
            .container {
              display: flex;
              width: 100vw;
              height: 100vh;
            }
          `}
        </style>
        <style>
          {`
            * {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            *::-webkit-scrollbar {
                display: none;  // Safari and Chrome
            }
          `}
        </style>
      </div>
    )
  }
}

export default view(DisplayPage)
