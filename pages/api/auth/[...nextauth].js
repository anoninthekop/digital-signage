import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from 'axios'
import Router from 'next/router'


export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
        credentials: {
          username: {label:'Username', type:'text'},
          password: {label:'Password', type: 'password'}
        },
        async authorize(credentials, host='',req) {
          console.log('Autorize : ', credentials)
          //const user = await axios.post(host + '/api/v1/user/login', { username: credentials.username, password: credentials.password })
          const user = {name: 'demo', password:'demo'}
          if (user) {
            console.log('User Axios : ', user)
            return user
          }else{
            return null
          }
        }
    })
    // ...add more providers here
  ],
  callbacks: {
    /**
    async redirect({ url, baseUrl }) {
      console.log('Redirect: ', baseUrl, 'Url : ', url)
      return baseUrl 
    },*/
    async session({ session, token, user }) {
      console.log('Session: ', session, ' User : ', user, ' Token : ', token)
      session.user = token.user
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log('Jwt: ', token, ' User : ', user, ' Account : ', account, 'Profile : ', profile, 'IsNewUser : ', isNewUser)
      token.user = user
      return token
    }
  },

  pages: {
    signIn: '/login',
    signOut: '/'
  },
  debug: true,
}

export default NextAuth(authOptions)