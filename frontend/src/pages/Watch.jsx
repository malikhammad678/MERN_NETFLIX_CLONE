import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useContextStore } from '../store/context';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ReactPlayer from 'react-player'
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from '../utils/constant';
import PageSkeleton from '../components/PageSkeleton';

const Watch = () => {
    const {id} = useParams();
    const [trailer,setrailers] = useState([])
    const [trailerIdx,setTrailerIdx] = useState(0)
    const [loading,setloading] = useState(true);
    const [content,setContent] = useState({});
    const [similarContent,setSimilarContent] = useState([])
    const {contentType} = useContextStore();
    const sliderRef = useRef(null);


   useEffect(() => {
       document.title = "Netflix | Watch"
   },[])

   const formatReleaseDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }

    useEffect(() => {
        const getTrailers = async () => {
            try {
                const response = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
              
                setrailers(response.data.trailers);      
            } catch (error) {
                console.error("Error fetching trailers:", error.response?.data || error.message);  // Log any errors
            } finally {
                setloading(false)
            }
        }
        getTrailers();
    }, [contentType, id]); 


    useEffect(() => {
        const getcontentDetail = async () => {
            try {
                const response = await axios.get(`/api/v1/${contentType}/${id}/details`);
                setContent(response.data.content);      
            } catch (error) {
                console.error("Error fetching trailers:", error.response?.data || error.message);  // Log any errors
            }finally {
                setloading(false)
            }
        }
        getcontentDetail();
    }, [contentType, id]); 
    console.log("details are", content);
    
    useEffect(() => {
        const getSimilarcontent = async () => {
            try {
                const response = await axios.get(`/api/v1/${contentType}/${id}/similar`);
              
                setSimilarContent(response.data.similar);      
            } catch (error) {
                console.error("Error fetching similar content:", error.response?.data || error.message);  // Log any errors
            } finally {
                setloading(false)
            }
        }
        getSimilarcontent();
    }, [contentType, id]);

    const handleNext = () => {
            setTrailerIdx(trailerIdx + 1)
     
    } 
    const handlePrev = () => {
            setTrailerIdx(trailerIdx - 1)
    }

    const scrollLeft = () => {
		if (sliderRef.current) sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
	};
	const scrollRight = () => {
		if (sliderRef.current) sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
	};

    if (loading)
		return (
			<div className='min-h-screen bg-black p-10'>
				<PageSkeleton />
			</div>
		);

        if (!content) {
            return (
                <div className='bg-black text-white h-screen'>
                    <div className='max-w-6xl mx-auto'>
                        <Navbar />
                        <div className='text-center mx-auto px-4 py-8 h-full mt-40'>
                            <h2 className='text-2xl sm:text-5xl font-bold text-balance'>Content not found!</h2>
                        </div>
                    </div>
                </div>
            );
        }


   
  return (
    <div className='bg-black min-h-screen text-white'>
        <div className='mx-auto container px-4 py-2 h-full'>
            <Navbar />

            {
                trailer.length > 0 && (
                    <div className='flex justify-between items-center mb-4 mt-10'>
                        <button className={`
                        bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${trailerIdx === 0 ? "cursor-not-allowed opacity-50" : ""}
                        `}
                        onClick={handlePrev}
                        disabled = {trailerIdx === 0}>
                         <ChevronLeft size={24} />
                        </button>

                        <button className={`
                        bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${trailerIdx === trailerIdx.length - 1 ? "cursor-not-allowed opacity-50" : ""}
                        `}
                        onClick={handleNext}
                        disabled = {trailerIdx === trailerIdx.length - 1}>
                         <ChevronRight size={24} />
                        </button>
                    </div>
                )
            }
            <div className='aspect-video mb-8 p-2 sm:px-10 md:px-32 '>
                {
                  trailer.length > 0 && (
                    <ReactPlayer
                    controls={true}
                    width='100%'
                    height={"70vh"}
                    className="mx-auto overflow-hidden rounded-lg"
                    url={`https://www.youtube.com/watch?v=${trailer[trailerIdx].keys}`}
                    />
                  )
                }
                {
                    trailer.length === 0 && (
                        <h2 className='text-xl text-center mt-5'>
                            No Trailers available for {" "}
                            <span className='font-bold text-red-600'>{content?.title || content?.name}</span>
                        </h2>
                    )
                }
            </div>


            <div className='flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto'>
                <div className='mb-4 md:mb-0'>
                <h2 className='text-5xl font-bold text-balance'>{content?.title || content?.name}</h2>
                <p className='mt-2 text-lg'>
							{formatReleaseDate(content?.release_date || content?.first_air_date)} |{" "}
							{content?.adult ? (
								<span className='text-red-600'>18+</span>
							) : (
								<span className='text-green-600'>PG-13</span>
							)}{" "}
						</p>
                        <p className='mt-4 text-lg'>{content?.overview}</p>
                </div>
                <img
						src={ORIGINAL_IMG_BASE_URL + content?.poster_path}
						alt='Poster image'
						className='max-h-[600px] rounded-md'
					/>
            </div>

            {
                similarContent?.length > 0 && (
                    <div className='mt-12 max-w-5xl mx-auto relative'>
                        <h3 className='text-3xl font-bold mb-4'>Similar Movies/Tv Show</h3>
                        <div className='flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group' ref={sliderRef}>
                        {similarContent.map((content) => {
								if (content.poster_path === null) return null;
								return (
									<Link key={content.id} to={`/watch/${content.id}`} className='w-52 flex-none'>
										<img
											src={SMALL_IMG_BASE_URL + content.poster_path}
											alt='Poster path'
											className='w-full h-auto rounded-md'
										/>
										<h4 className='mt-2 text-lg font-semibold'>{content.title || content.name}</h4>
									</Link>
								);
							})}

                            <ChevronRight
								className='absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8
										opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer
										 bg-black bg-opacity-50 text-white rounded-full'
								onClick={scrollRight}
							/>
							<ChevronLeft
								className='absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 
								group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-black bg-opacity-50
								text-white rounded-full'
								onClick={scrollLeft}
							/>
                        </div>
                    </div>
                )
            }
            
        </div>
      
    </div>
  )
}

export default Watch
