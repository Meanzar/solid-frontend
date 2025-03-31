"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { checkSession, postData } from '@/lib/api'
import React, { useState } from 'react'
import { useRouter} from 'next/navigation'

export default function RegisterPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const base_url = "/api/auth/login"
    const router = useRouter()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try { 
          const login = await postData(base_url, { email, password,})
          console.log(login.token)
          if ( login.length === 0) {
            throw new Error('Failed to fetch')
          }
          sessionStorage.setItem('token', login.token)

          const session = await checkSession()
          console.log(session)
          if (session) {
            router.push('/menu')
          } else {
            console.log('No session')
          }
          console.log('session:',session)
        } catch (error) {
          console.error('Error in POST /login:', error)
    }
  }
    function handleChange(set: any, e: any) {
           set(e.target.value)
    }
  return (
    <div>
        <div>
            <label>Email</label>
            <Input type="email" value={email} onChange={(e) => handleChange(setEmail, e)} />
            <label>Password</label>
            <Input type="password" value={password} onChange={(e) => handleChange(setPassword, e)}/>
            <Button onClick={handleSubmit}>Click mEI jdioej </Button>
        </div>
    </div>
  )
}
