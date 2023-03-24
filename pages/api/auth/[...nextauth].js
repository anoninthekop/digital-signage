import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from 'axios'
import { getUserByUsername } from "../../../actions/user"
import Router from 'next/router'


export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
        credentials: {
          username: {label:'Username', type:'text'},
          password: {label:'Password', type: 'password'}
        },
        async authorize(credentials, host='') {
          try{
          const resp = await axios.post('http://localhost:3001/api/v1/users/signin',{username: credentials.username, password: credentials.password})
          if(!resp) return null
          const user = {name: resp.data.username , email: resp.data.email}
          return user
          }catch(error){
            return {succes: false}
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
    async session({ session, token }) {
      console.log('Session: ', session, ' Token : ', token)
      return session
    },
    async jwt({ token }) {
      console.log('Jwt: ', token)
      //token.user = user
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