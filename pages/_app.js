import App from 'next/app'
import Head from 'next/head'
import React from 'react'
import i18n from '../helpers/i18n'
import { I18nextProvider } from 'react-i18next'
import { SessionProvider } from "next-auth/react"




import '../styles/GridLayoutStyles.css'
import 'react-resizable/css/styles.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { display } from '../stores'

export default class NextApp extends App {

  render() {
    const { Component, pageProps: {session, ...pageProps}} = this.props
    return (
      <>
        <SessionProvider session={session}>
          <I18nextProvider i18n={i18n}>
            <Component {...pageProps} />
          </I18nextProvider>
        </SessionProvider>
      </>
    )
  }
}
