import { API_USER_VERIFY_OTP, USER_LOGIN_URL } from '@/src/services/api/endpoints'
import axios from 'axios'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials: any) {
                let user = null
                if (credentials?.otpVerfication) {
                    const { email, otp } = credentials
                    console.log(email, otp)
                    const response = await axios
                        .post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/${API_USER_VERIFY_OTP}`, {
                            email, otp: Number(otp)
                        })
                        .then(({ data }) => {
                            return data?.data;
                        })
                        .catch((error) => {
                            throw new Error(error?.response?.data?.message);
                        });
                    user = response
                }
                else {
                    const { email, password }: any = credentials

                    const response = await axios
                        .post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/${USER_LOGIN_URL}`, {
                            email, password
                        })
                        .then(({ data }) => {
                            return data?.data;
                        })
                        .catch((error) => {
                            throw new Error(error?.response?.data?.message);
                        });
                    user = response
                }
                return user
            }
        })
    ],
    pages: {
        signIn: "/login",
        signOut: '/signout'
    },
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token = { ...token, ...user }
                token.sub = user.id
            }
            return token
        },
        async session({ session, token }: any) {
            if (session?.user) session.user = { ...session.user, ...token }
            return session
        },
    }

}