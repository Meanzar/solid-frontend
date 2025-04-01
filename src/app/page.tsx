"use client"

import { Button } from '@/components/ui/button'
import { Skeleton } from "@/components/ui/skeleton"
import { checkSession, getData, getNews, logout } from '@/lib/api'
import { Article, User } from '@/lib/type'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function ArticlesPage() {
    const user_url = "/api/users"
    const base_url = `https://newsapi.org/v2/everything?q=keyword&`
    const special_url = `https://newsapi.org/v2/top-headlines?country=us&`

    const [news, setNews] = useState<Article[]>([])
    const [tops, setTops] = useState<Article[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<boolean>(false);



    useEffect(() => {
        async function fetchUserData() {
            const isAuthenticated = await checkSession();
            setSession(isAuthenticated);
            if (!isAuthenticated) return;

            try {
                const data: User[] = await getData(user_url);
                if (data.length === 0) return;

                const userIds = [...new Set(data.map(user => user.id))];
                if (userIds.length > 0) {
                    const userData: User[] = await getData(`${user_url}/?ids=${userIds.join(",")}`);
                    setUser(userData[0] || null);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des utilisateurs :", error);
            }
        }

        fetchUserData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                const newsData = await getNews(base_url)
                const topsData = await getNews(special_url)

                setNews(newsData.articles.filter((article: Article) => article.title && article.description))
                setTops(topsData.articles.filter((article: Article) => article.title && article.description))
            } catch (error) {
                console.error("Erreur lors de la récupération des articles:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    async function handleLogout() {
        if (!session) return console.error("No session to log out of");
        await logout();
        setSession(false);
        setUser(null);
    }

    const filteredNews = news.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-gray-100 font-[family-name:var(--font-geist-sans)]">

            <header className="bg-blue-600 text-white py-8">
                <div className="max-w-screen-xl mx-auto px-8 flex justify-between items-center">
                    <h1 className="text-4xl font-semibold">Welcome to ArticleHub</h1>
                    {session ? (
                        <div>
                            <Link href={`/users/info/${user?.id}`} className="text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                {user?.name}
                            </Link>
                            <Button onClick={handleLogout} className="text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <Link href="/auth/login" className="text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                Login
                            </Link>
                            <Link href="/auth/register" className="ml-4 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </header>
            <div className="container mx-auto p-6 bg-gray-50">
                <div className="mb-8 flex justify-between  content-center items-center gap-4">
                    <h2 className="text-3xl font-semibold text-gray-800">🔥 Top News</h2>
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full max-w-lg p-3 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    />
                </div>


                <div className="mb-8">
                    {loading ? (
                        <Skeleton className="h-6 w-3/4 mb-4" />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {tops.map((article, index) => (
                                <ArticlePreview key={index} article={article} index={index} />
                            ))}
                        </div>
                    )}
                </div>
                <div>
                    <h2 className="text-3xl font-semibold mt-8 mb-4 text-gray-800">🗞 News</h2>
                    {loading ? (
                        <Skeleton className="h-6 w-3/4 mb-4" />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredNews.length > 0 ? (
                                filteredNews.map((article, index) => (
                                    <ArticlePreview key={index} article={article} index={index} />
                                ))
                            ) : (
                                <p className="text-center text-gray-500 col-span-full">No articles found</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

function ArticlePreview({ article, index }: { article: Article; index: number }) {
    const isValidUrl = (url: string) => {
        try {
            new URL(url)
            return true
        } catch (e) {
            return false
        }
    }

    return (
        <Link href={`/articles/${index}`} className="block border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
            {article.urlToImage && isValidUrl(article.urlToImage) && (
                <div className="relative w-full h-56 mb-4">
                    {article.urlToImage ?
                        <Image src={article.urlToImage} alt={article.title} layout="fill" objectFit="cover" className="rounded-md" /> :
                        <Skeleton className="h-6 w-3/4 mb-4" />
                    }
                </div>
            )}
            <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900">{article.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{new Date(article.publishedAt).toLocaleDateString()}</p>
            </div>
        </Link>
    )
}
