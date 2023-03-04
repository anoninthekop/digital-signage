import React from 'react'

// i18next
import { withTranslation } from 'react-i18next'

import Frame from '../components/Admin/Frame.js'
import Display from '../components/Display/Display.js'
import { protect } from '../helpers/auth.js'
import { display } from '../stores'

class Preview extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { displayId } = this.props
    display.setId(displayId)
  }

  render() {
    const { t, host, loggedIn, displayId } = this.props
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
export default protect(withTranslation()(Preview))
