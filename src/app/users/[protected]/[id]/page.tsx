"use client"

import { getData } from '@/lib/api'
import { User } from '@/lib/type'
import { Params } from '@/lib/type'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function UserPage({params}: {params: Params}) {
    params = useParams()
    const userId = params.id
    const base_url = "/api/users/"
    const [user, setUser] = useState<User>()

    useEffect(() => {
        getData(base_url + userId).then((data) => (setUser(data[0])))
    }, [])
  return (
    <div>
        { user && (
            <div>
        <h1>
            {user?.name}
        </h1>
        <h2>
            {user?.job}
        </h2>
        <h3>
            {user?.year}
        </h3>
        </div>
    )
}
    </div>
  )
}
