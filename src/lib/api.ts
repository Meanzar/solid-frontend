export async function getNews(url: string) { 
    const apikey = process.env.NEXT_PUBLIC_NEWS_API_KEY
    const response = await fetch(url + 'apiKey=' + apikey)

    return response.json()
}

export async function postData(url: string, data: any) {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
    })
    return response.json()
}