"use client"

import { Card } from '@/components/ui/card'
import { getData, getNews } from '@/lib/api'
import { User, Params, Article } from '@/lib/type'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function UserPage({ params }: { params: Params }) {
    params = useParams();
    const userId = params.id;
    const base_url = "/api/users/";
    const special_url = "https://newsapi.org/v2/top-headlines?country=";

    const [user, setUser] = useState<User | null>(null);
    const [news, setNews] = useState<Array<Article>>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getData(base_url + userId);
                if (userData.length > 0) {
                    setUser(userData[0]);

                    const newsData = await getNews(special_url + userData[0]?.country + "&");
                    setNews(newsData?.articles || []);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [userId]); 

    return (
        <div>
            {user && (
                <div>
                    <h1>Special page for {user.name}</h1>
                    <h2>Based on location from {user.country}</h2>
                    <h2>Based on job {user.job}</h2>
                    <h3>Based on user {user.year}</h3>
                    <h3>Top News</h3>
                    <Card>
                        {news.map((article: Article, index) => (
                            <Link href={"/articles/" + index} key={index}>
                                <h1>{article.title}</h1>
                                <p>{article.description}</p>
                                <p>{article.content}</p>
                                <Link href={article.url} target="_blank" rel="noopener noreferrer">
                                    Read more
                                </Link>
                            </Link>
                        ))}
                    </Card>
                </div>
            )}
        </div>
    );
}
