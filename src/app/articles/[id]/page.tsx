"use client"

import React, { useState, useEffect} from 'react'
import { getNews } from '@/lib/api'
import { useParams } from 'next/navigation'
import { Params } from '@/lib/type'

export default function ArticlePage({params}: {params: Params}) {
    const base_url = `https://newsapi.org/v2/everything?q=keyword&`
    params = useParams()
    const articleId = params.id
    const [news, setNews] = useState({articles: []})
    useEffect(() => {
        getNews(base_url).then((data) => setNews(data))
    }, [])
    const article = news.articles[articleId]
    console.log(article)
  return (
    <div>
        
    </div>
  )
}
