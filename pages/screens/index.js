import React from 'react'

import { view } from '@risingstack/react-easy-state'

// i18next
import { withTranslation } from 'react-i18next'

import Frame from '../../components/Admin/Frame.js'
import ScreenList from '../../components/Admin/ScreenList.js'
import Dialog from '../../components/Dialog.js'
import { Button } from '../../components/Form'

import { addDisplay } from '../../actions/display'

import { display } from '../../stores'

import { authenticate } from 'passport'
import { withSession } from '../../lib/auth/auth.js'


class Screens extends React.Component {
  constructor(props) {
    super(props)
    this.screenList = React.createRef()
  }

  add = () => {
    return addDisplay().then(() => {
      this.screenList && this.screenList.current && this.screenList.current.refresh()
    })
  }

  componentDidMount() {
    const { displayId } = this.props
    display.setId(displayId)
  }

  render() {
    const { t, session } = this.props
    const loggedIn = session.status ==='authenticated'
    console.log('LoggedIn Screens : ', loggedIn)
    return (
      <Frame loggedIn={loggedIn}>
        <h1>{t('screen.title')}</h1>
        <div className='wrapper'>
          <ScreenList ref={this.screenList} />
          <Dialog />
          <Button
            text={t('screen.button')}
            color={'#8bc34a'}
            onClick={this.add}
            style={{ marginLeft: 0, width: '100%' }}
          />
        </div>
        <style jsx>
          {`
            h1 {
              font-family: 'Open Sans', sans-serif;
              font-size: 24px;
              color: #4f4f4f;
              margin: 0px;
            }
            .wrapper {
              margin: 40px auto;
              max-width: 640px;
            }
          `}
        </style>
      </Frame>
    )
  }
}
//withSession(Screens)
export default withTranslation()(withSession(view(Screens)))