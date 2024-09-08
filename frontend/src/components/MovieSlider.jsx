import React, { useEffect, useRef, useState } from 'react'
import { useContextStore } from '../store/context'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { SMALL_IMG_BASE_URL } from '../utils/constant'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const MovieSlider = ({category}) => {
    const [content, setContent] = useState([])
    const [showArrow, setShowArrow] = useState(false);
    const sliderRef = useRef(null);
    const { contentType } = useContextStore()
    const formatContent = contentType === "movie" ? "Movies" : "Tv-Shows"
    const formatCategory = category.replaceAll("_"," ").replace(/^\w/, c => c.toUpperCase());

    useEffect(() => {
        const fetchData = async () => {
            const data = await axios.get(`/api/v1/${contentType}/${category}`)
            setContent(data.data.content)
        }
        fetchData()
    }, [category, contentType])


    

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
        }
    };
    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
        }
    };

    return (
        <div className='relative px-5 md:px-20' 
             onMouseEnter={() => setShowArrow(true)}
             onMouseLeave={() => setShowArrow(false)}
        >
            <h2 className='mb-4 text-2xl font-bold text-white'>{formatCategory} {formatContent} </h2>
            
            <div className='flex space-x-4 overflow-x-scroll scrollbar-hide' ref={sliderRef}>
                {
                    content.map((item) => (
                        <Link to={`/watch/${item.id}`} className='min-w-[250px] relative group' key={item.id}>
                            <div className='rounded-lg overflow-hidden'>
                                <img src={SMALL_IMG_BASE_URL + item.backdrop_path} alt={item.title}
                                    className='transition-transform duration-300 ease-in-out group-hover:scale-125'
                              
                                />
                            </div>
                            <p className='mt-2 text-center text-white'>{item.title || item.name}</p>
                        </Link>
                    ))
                }
            </div>

            {showArrow && (
                <>
                    <button
                        className='absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center
                        w-12 h-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10'
                        onClick={scrollLeft}
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        className='absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center
                        w-12 h-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10'
                        onClick={scrollRight}
                    >
                        <ChevronRight size={24} />
                    </button>
                </>
            )}
        </div>
    )
}

export default MovieSlider
