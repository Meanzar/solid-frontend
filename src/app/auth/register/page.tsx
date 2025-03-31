"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { postData } from '@/lib/api'
import React, { useState } from 'react'

export default function RegisterPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const base_url = "/api/auth/register"
    const handleButton = async () => {
        postData(base_url, {email, password})

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
            <Button onClick={handleButton}>Click mEI jdioej </Button>
        </div>
    </div>
  )
}
