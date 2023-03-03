import App from 'next/app'
import Head from 'next/head'
import React from 'react'
import i18n from '../helpers/i18n'
import { I18nextProvider } from 'react-i18next'



import '../styles/GridLayoutStyles.css'
import 'react-resizable/css/styles.css'
import '@fortawesome/fontawesome-svg-core/styles.css'

export default class NextApp extends App {
  /** 
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }
  */

  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
        </Head>
        <I18nextProvider i18n={i18n}>
          <Component {...pageProps} />
        </I18nextProvider>
      </>
    )
  }
}
