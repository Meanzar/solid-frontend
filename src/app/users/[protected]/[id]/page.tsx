"use client"

import { getData } from '@/lib/api'
import { User } from '@/lib/type'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function UserPage() {
    const params = useParams()
    const userId = params.id
    const base_url = "/api/users/"
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!userId) return
        getData(base_url + userId)
            .then((data) => setUser(data[0]))
            .finally(() => setLoading(false))
    }, [userId])

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="w-96 p-6 shadow-lg">
                <CardHeader>
                    <CardTitle>Informations de l'utilisateur</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-5 w-1/2" />
                            <Skeleton className="h-5 w-1/3" />
                        </div>
                    ) : user ? (
                        <div>
                            <h1 className="text-xl font-bold">{user.name}</h1>
                            <h2 className="text-lg text-gray-600">{user.job}</h2>
                            <h3 className="text-gray-500">{user.year}</h3>
                        </div>
                    ) : (
                        <p className="text-red-500">Utilisateur introuvable</p>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
