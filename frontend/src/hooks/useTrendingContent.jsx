import React, { useEffect, useState } from 'react'
import { useContextStore } from '../store/context';
import axios from 'axios';

const useTrendingContent = () => {
    const [trendingContent,setTrendingContent] = useState(null);
    const {contentType} = useContextStore();

    useEffect(() => {
    const getTrendingContent = async () => {
        const response = await axios.get(`/api/v1/${contentType}/trending`)
        setTrendingContent(response.data.content)
    }
    getTrendingContent();
    },[contentType])
  
    return { trendingContent }
}

export default useTrendingContent
