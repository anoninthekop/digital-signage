import React from 'react'

// i18next
import { withTranslation } from 'react-i18next'

class EmptyWidgetOptions extends React.Component {
  render() {
    const {t} = this.props
    return (
      <div className={'widget'}>
        {t('widgets.emptywidget')}
        <style jsx>
          {`
            .widget {
              display: flex;
              flex-direction: column;
              justify-content: center;
              text-align: center;
              padding: 20px;
              font-family: 'Open Sans', sans-serif;
            }
          `}
        </style>
      </div>
    )
  }
}

export default withTranslation()(EmptyWidgetOptions)
