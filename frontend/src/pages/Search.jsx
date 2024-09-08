import React, { useState } from 'react'
import { useContextStore } from '../store/context';
import Navbar from '../components/Navbar';
import { SearchIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ORIGINAL_IMG_BASE_URL } from '../utils/constant';
import { Link } from 'react-router-dom';

const Search = () => {
    const [activeTab,setActiveTab] = useState("movie");
    const [searchContent,setSearchContent] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const { setContentType } = useContextStore();

    const handleClick = (link) => {
        setActiveTab(link);
        tab === "movie" ? setContentType("movie") : setContentType("tv")
        setSearchResult([]);
    }

    const handleSearch = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.get(`/api/v1/search/${activeTab}/${searchContent}`);
			setSearchResult(response.data.content);
		} catch (error) {
			toast.error("Not Found :(", error)
		}
	};
  return (
    <div className='bg-black min-h-screen text-white'>
        <Navbar />
      <div className='container mx-auto px-4 py-8'>
        <div className='flex justify-center mb-4 gap-3'>
            <button className={`px-4 py-2 rounded ${activeTab === "movie" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700 `}
            onClick={() => handleClick("movie")}
            >
                Movie
            </button>
            <button className={`px-4 py-2 rounded ${activeTab === "tv" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700 `}
            onClick={() => handleClick("tv")}
            
            >
                TV Shows
            </button>
            <button className={`px-4 py-2 rounded ${activeTab === "person" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700 `}
            onClick={() => handleClick("person")}
            >
                Person
            </button>
        </div>
        <form className='flex gap-2 items-stretch mb-8 max-w-2xl mx-auto' onSubmit={handleSearch}>
					<input
						type='text'
						value={searchContent}
						onChange={(e) => setSearchContent(e.target.value)}
						placeholder={"Search for a " + activeTab}
						className='w-full p-2 rounded bg-gray-800 text-white'
					/>
					<button className='bg-red-600 hover:bg-red-700 text-white p-2 rounded'>
						<SearchIcon className='size-6' />
					</button>
				</form>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
					{searchResult.map((result) => {
						if (!result.poster_path && !result.profile_path) return null;

						return (
							<div key={result.id} className='bg-gray-800 p-4 rounded'>
								{activeTab === "person" ? (
									<div className='flex flex-col items-center'>
										<img
											src={ORIGINAL_IMG_BASE_URL + result.profile_path}
											alt={result.name}
											className='max-h-96 rounded mx-auto'
										/>
										<h2 className='mt-2 text-xl font-bold'>{result.name}</h2>
									</div>
								) : (
									<Link
										to={"/watch/" + result.id}
										onClick={() => {
											setContentType(activeTab);
										}}
									>
										<img
											src={ORIGINAL_IMG_BASE_URL + result.poster_path}
											alt={result.title || result.name}
											className='w-full h-auto rounded'
										/>
										<h2 className='mt-2 text-xl font-bold'>{result.title || result.name}</h2>
									</Link>
								)}
							</div>
						);
					})}
				</div>
      </div>
    </div>
  )
}

export default Search
