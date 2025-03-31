"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { postData } from '@/lib/api'
import React, { useState } from 'react'

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const base_url = "/api/auth/login"
    
    const handleButton = async () => {
        postData(base_url, {email, password})
    }  

    function handleChange(set: any, e: any) {
           set(e.target.value)
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to Your Account</h2>
            
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600">Email</label>
                    <Input 
                        type="email" 
                        value={email} 
                        onChange={(e) => handleChange(setEmail, e)} 
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600">Password</label>
                    <Input 
                        type="password" 
                        value={password} 
                        onChange={(e) => handleChange(setPassword, e)} 
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <Button 
                    onClick={handleButton} 
                    className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Login
                </Button>
            </form>

            <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">Don't have an account? 
                    <a href="/register" className="text-blue-600 hover:text-blue-700"> Register</a>
                </p>
            </div>
        </div>
    </div>
  )
}