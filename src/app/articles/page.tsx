"use client"

import { getNews } from '@/lib/api'
import { Article } from '@/lib/type'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'


export default function ArticlesPage() {
    const base_url = `https://newsapi.org/v2/everything?q=keyword&`
    const special_url = `https://newsapi.org//v2/top-headlines?country=us&`
    const [news, setNews] = useState({articles: []})
    const [tops, setTops] = useState({articles: []})
    useEffect(() => {
        getNews(base_url).then((data) => setNews(data))
        getNews(special_url).then((data) => setTops(data))
    }, [])

    console.log(news)
  return (
    <div>
        <h1>Dashboard</h1>
        <h2>Top News</h2>
            {tops.articles.map((article: Article, index) => (
                <Link href={'/articles/' + index} key={index}>
                    <h1>{article.title}</h1>
                </Link>
            ))}
        <h2>News</h2>
            {news.articles.map((article: Article, index) => (
                <Link href={"/articles/" + index}key={index}>
                    <h1>{article.title}</h1>
                </Link>
            ))}
    </div>
  )
}
