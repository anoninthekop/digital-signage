import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from 'axios'
import { getUserByUsername } from "../../../actions/user"
import Router from 'next/router'
import { signIn } from "next-auth/react"

import { display } from '../../../stores/display'
import { getDisplays } from '../../../actions/display'


export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
        credentials: {
          username: {label:'Username', type:'text'},
          password: {label:'Password', type: 'password'}
        },
        async authorize(credentials) {
          const user = await axios.post('http://localhost:3001/api/v1/users/signin',{username: credentials.username, password: credentials.password})
          console.log('AUTHORIZE : ', user.data)
          if(user.data.error){
            throw new Error('No user found!')
          }
          return user.data
        }
    })
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.role = token.role
      console.log('Session: ', session, ' token : ', token)
      return session
    },
    async jwt({ token, user, profile, isNewUser }) {
      console.log('Token: ', token, 'user : ', user, 'Profile : ', profile, 'isNewUser : ', isNewUser)
      if(user){
        token.name = user.username
        token.role = user.role
      }
      return token
    }
  },

  pages: {
    signIn: '/login',
    signOut: '/'
  },
  debug: true,
  session : {
    strategy: 'jwt'
  }
}

export default NextAuth(authOptions)