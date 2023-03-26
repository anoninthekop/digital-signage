import { Component } from 'react'
import Link from 'next/link'
import Router from 'next/router.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTv, faCheck, faTimes, faAngleLeft, faUsers } from '@fortawesome/free-solid-svg-icons'

import { view } from '@risingstack/react-easy-state'

import { signIn } from "next-auth/react"

// i18next
import { withTranslation } from 'react-i18next'


import Frame from '../components/Admin/Frame.js'
import { display } from '../stores'
import { withSession } from '../lib/auth/auth.js'

class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      alert: null
    }
  }

  static async getInitialProps({ query }) {
    const displayId = query && query.display
    return { displayId }
  }

  componentDidMount() {
    const { displayId } = this.props
    display.setId(displayId)
  }

  performLogin = () => {
    const { username, password } = this.state
    //const { displayId } = this.props

    signIn("credentials", { redirect: false,username:username, password:password})
      .then(({ok,url, error, status }) => {
        console.log('Error : ',error, 'OK : ', ok, 'URL : ',url, ' Status : ', status)
      if(ok) {
        this.setState({alert:'success'})
        Router.push('/screens')
      }else{
        console.log(error)
        this.setState({ alert: 'error' })
        Router.push('/login')
    }
    })
  }

  usernameChangeHandler = event => {
    this.setState({
      username: event.target.value
    })
  }

  passwordChangeHandler = event => {
    this.setState({
      password: event.target.value
    })
  }

  render() {
    const { t } = this.props
    //const loggedIn = session.status ==='authenticated'
    const { alert } = this.state

    return (
      
  
        <div className='formContainer'>
          <div className='logo'>
            <div className='icon'>
              <FontAwesomeIcon icon={faTv} fixedWidth size='lg' color='#7bc043' />
            </div>
          </div>
          <div className='title'>
              <h1>{t('login.title')}</h1>
          </div>
          <form
            className='form'
            onSubmit={event => {
              event.preventDefault()
              this.performLogin()
              return false
            }}
          >
            {alert && (
              <div className={`alert-${alert}`}>
                <FontAwesomeIcon
                  icon={alert == 'success' ? faCheck : faTimes}
                  fixedWidth
                  size='sm'
                  color='white'
                />
                <span className={'alert-text'}>
                  {alert == 'success'
                    ? t('login.alert.success')
                    : t('login.alert.error')}
                </span>
              </div>
            )}
            <label htmlFor='username'>{t('login.username.name')}</label>
            <input
              type='text'
              className='username'
              id='username'
              placeholder= {t('login.username.placeholder')}
              onChange={this.usernameChangeHandler}
            />
            <label htmlFor='password'>{t('login.password.name')}</label>
            <input
              type='password'
              className='password'
              id='password'
              placeholder= {t('login.password.placeholder')}
              onChange={this.passwordChangeHandler}
            />
            <button>{t('login.submit')}</button>
          </form>
          <Link href='/join'>
            <span className='join'>
              <FontAwesomeIcon icon={faUsers} fixedWidth /> {t('login.join')}
            </span>
          </Link>
          <Link href='/'>
            <span className='back'>
              <FontAwesomeIcon icon={faAngleLeft} fixedWidth /> {t('login.back')}
            </span>
          </Link>

        <style jsx>
          {`
            h1 {
              font-family: 'Open Sans', sans-serif;
              font-size: 24px;
              color: #4f4f4f;
              margin: 0px;
            }
            .logo {
              display: flex;
              flex-direction: row;
              margin-top: 20px;
              margin-bottom: 20px;
              padding-right: 10px;
              padding-left: 10px;
              align-self: center;
            }
            .logo .icon {
              min-width: 3em;
              min-height: 3em;
              padding: 20px;
              display: flex;
              justify-content: center;
              align-items: center;
              transform: scale(2);
            }
            .title{
              color: white;
              margin-left: 8px;
              text-align: center
            }
            .form {
              background: white;
              border-radius: 8px;
              display: flex;
              flex-direction: column;
              padding: 24px;
              font-family: 'Open Sans', sans-serif;
            }
            .formContainer {
              max-width: 640px;
              margin: auto;
              display: flex;
              flex-direction: column;
            }
            .form input[type='text'],
            .form input[type='password'] {
              outline: none;
              background: #ededed;
              border-radius: 8px;
              font-family: 'Open Sans', sans-serif;
              font-weight: 400;
              font-size: 16px;
              color: #928f8f;
              border: none;
              padding: 8px;
              height: 32px;
              min-width: 256px;
              vertical-align: middle;
              -webkit-appearance: none;
              margin-bottom: 16px;
            }
            .form button {
              outline: none;
              background: #7bc043;
              border-radius: 8px;
              font-family: 'Open Sans', sans-serif;
              font-weight: 600;
              font-size: 18px;
              color: #ffffff;
              text-align: center;
              border: none;
              padding: 4px;
              height: 48px;
              vertical-align: middle;
              padding-left: 16px;
              padding-right: 16px;
              -webkit-appearance: none;
            }
            .form label {
              padding-bottom: 16px;
            }
            .back {
              display: inline-block;
              margin: 16px;
              font-family: 'Open Sans', sans-serif;
              color: #6f6e6e;
              font-size: 14;
              cursor: pointer;
            }
            .join {
              display: inline-block;
              margin: 16px;
              font-family: 'Open Sans', sans-serif;
              color: #6f6e6e;
              font-size: 14;
              cursor: pointer;
            }
            .alert-error {
              background: #e74c3c;
              border-radius: 6px;
              margin-bottom: 16px;
              padding: 16px;
            }
            .alert-info {
              background: #3ca9e7;
              border-radius: 6px;
              margin-bottom: 16px;
              padding: 16px;
            }
            .alert-success {
              background: #7bc043;
              border-radius: 6px;
              margin-bottom: 16px;
              padding: 16px;
            }
            .alert-text {
              color: white;
              margin-left: 8px;
            }
          `}
        </style>
      </div>
    )
  }
}

export default withTranslation() (withSession(view(Login)))
