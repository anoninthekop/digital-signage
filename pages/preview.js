import React from 'react'

import { view } from '@risingstack/react-easy-state'

// i18next
import { withTranslation } from 'react-i18next'

import Frame from '../components/Admin/Frame.js'
import Display from '../components/Display/Display.js'
import { display } from '../stores'
import { withRouter } from 'next/router.js'
import { withSession } from '../lib/auth/auth.js'

class Preview extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    //const { displayId } = this.props
    const displayId = this.props.router.query.display
    console.log('displayId : ', displayId)
    display.setId(displayId)
  }

  render() {
    const { t, host, session} = this.props
    const loggedIn = session.status ==='authenticated'
    const displayId = this.props.router.query.display
    return (
      <Frame loggedIn={loggedIn}>
        <h1>{t('preview.title')}</h1>
        <p>{t('preview.comment')}</p>
        <div className='preview'>
          <div className='content'>
            <Display host={host} display={displayId} />
          </div>
        </div>
        <style jsx>
          {`
            h1 {
              font-family: 'Open Sans', sans-serif;
              font-size: 24px;
              color: #4f4f4f;
              margin: 0px;
            }
            p {
              font-family: 'Open Sans', sans-serif;
            }
            .preview {
              margin-top: 20px;
              border-radius: 4px;
              overflow: hidden;
              padding-top: 56.25%;
              position: relative;
            }
            .preview .content {
              position: absolute;
              top: 0;
              width: 100%;
              height: 100%;
            }
          `}
        </style>
      </Frame>
    )
  }
}

export default withRouter(withTranslation() (withSession(view(Preview))))
