"use client"

import { getNews } from '@/lib/api'
import { Article } from '@/lib/type'
import { Params } from '@/lib/type'
import { useParams} from 'next/navigation'
import React, { useEffect, useState } from 'react'


export default function ArticlePage({params}: {params: Params}) {
    params = useParams();
    const articleId = params.id;
    const base_url = `https://newsapi.org/v2/everything?q=keyword&`;
    const special_url = `https://newsapi.org/v2/top-headlines?country=us&`;
  
    const [news, setNews] = useState({ articles: [] });
    const [tops, setTops] = useState({ articles: [] });
  
    useEffect(() => {
      async function fetchNews() {
        try {
          const newsData = await getNews(base_url);
          setNews(newsData);
  
          const topsData = await getNews(special_url);
          setTops(topsData);
        } catch (error) {
          console.error('Error fetching news:', error);
        }
      }
  
      fetchNews();
    }, []);
  
    const article: Article = news.articles[articleId];
    if (!article) {
      return <div>Article not found</div>;
    }

    return (
      <div>
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <p>{article.content}</p>
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          Read more
        </a>
      </div>
    );
  }