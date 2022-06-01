import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import GitHubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"

export default NextAuth({
  secret: process.env.SECRET,
  providers: [
    // OAuth authentication providers
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID||'',
      clientSecret: process.env.FACEBOOK_SECRET||'',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID||'',
      clientSecret: process.env.GOOGLE_SECRET||'',
    }),
    GitHubProvider({
        clientId: process.env.GITHUB_ID||'',
        clientSecret: process.env.GITHUB_SECRET||'',
    }),
    // Sign in with passwordless email link
    /*EmailProvider({
      server: process.env.MAIL_SERVER,
      from: "<no-reply@example.com>",
    }),*/
    Credentials({
        name:'Custom Login',
        credentials: {
            matricula: {label: 'Correo ó matrícula', type: 'text',placeholder:'08083206'},
            password: {label: 'Contraseña', type: 'text',placeholder:'Contraseña'}
        },
        async authorize(credentials){            
            const {matricula, password}:any = credentials
            const user = {matricula,password}
            return user;
        }
    })
  ],
  callbacks: {

      async jwt({token,account,user}){
        if(account){
            token.accessToken = account.access_token
            
            switch(account?.type){
                case 'oauth': 
                    user!.tipoCuenta=account?.type
                    token.user=user
                    
                break;
                
                case 'credentials':
                    token.user=user;
                    break
            }
        }
          return token
      },

      async session({session,token,user}){
        session.accessToken=token.accessToken
        session.user=token.user as any;
        if (typeof token !== typeof undefined)
        {
          session.token = token;
        }
        return session;
      }
  }
})