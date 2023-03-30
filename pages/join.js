import { Component } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTv, faCheck, faTimes, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import Router from 'next/router'
// i18next
import { withTranslation } from 'react-i18next'

import { display } from '../stores'
import { addUser } from '../actions/user.js'


class Join extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      email: '',
      alert: null,
      message:''
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

  navigateToHome = () => {
    Router.push('/')
  }

  performJoin() {
    const { username, password, email } = this.state
    const user = {
      username: username,
      email: email,
      password: password
    }
    addUser({user})
    .then(resp => {
      console.log('ADDUSER : ', resp.data)
      if (resp.data.error) {
        console.log('ERROR : ', resp.data.error)
        this.setState({ message: resp.data.error.message})
        throw new Error()
      } else {
      this.setState({ alert: 'success' })
      Router.push('/')
      }
    })
    .catch(() => {
      this.setState({ alert: 'error'})
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

  emailChangeHandler = event => {
    this.setState({
      email: event.target.value
    })
  }

  render() {
    const { t } = this.props
    const { alert, message } = this.state

    return (
        <div className='formContainer'>
          <div className='logo'>
            <div className='icon'>
              <FontAwesomeIcon icon={faTv} fixedWidth size='lg' color='#7bc043' />
              
            </div>
          </div>
          <div className='title'>
              <h1>{t('join.title')}</h1>
          </div>
          <form
            className='form'
            onSubmit={event => {
              event.preventDefault()
              this.performJoin()
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
                    ? t('join.alert.success')
                    : t('join.alert.error')}
                </span>
              </div>
            )}
            {message && (
              <div className={`message-${message}`}>
                <p>{message}</p>
              </div>
            )}
            <label htmlFor='username'>{t('join.username.name')}</label>
            <input
              type='text'
              className='username'
              id='username'
              placeholder= {t('join.username.placeholder')}
              onChange={this.usernameChangeHandler}
            />
            <label htmlFor='email'>{t('join.email.name')}</label>
            <input
              type='email'
              className='email'
              id='email'
              placeholder= {t('join.email.placeholder')}
              onChange={this.emailChangeHandler}
            />
            <label htmlFor='password'>{t('join.password.name')}</label>
            <input
              type='password'
              className='password'
              id='password'
              placeholder= {t('join.password.placeholder')}
              onChange={this.passwordChangeHandler}
            />
            <button>{t('join.submit')}</button>
          </form>
          <Link href='/'>
            <span className='back'>
              <FontAwesomeIcon icon={faAngleLeft} fixedWidth /> {t('join.back')}
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
              text-align: center;
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
            .form input[type='email'],
            .form input[type='password'] {
              outline: solid;
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

export default withTranslation() (Join)
