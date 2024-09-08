import { fetchFromTMDB } from "../services/tmdb.service.js"

export const getTrendingMovie =async (req,res) => {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US")
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)]
        
        res.json({success:true,content:randomMovie});
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Internal Server Error!"});   
    }
}

export const getMovieTrailers = async (req,res) => {
    try {
        const movieId = req.params.id;
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`);
        
        res.status(200).json({
            success:true,
            trailers:response.results
        })

    } catch(error){
        console.log(error);
        res.json({success:false,message:"Internal Server Error!"});
    }
}

export const getMovieDetail = async (req,res) => {
    const {id} = req.params
    try{
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`)
        res.json({success:true,content:data})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Internal Server Error!"});
    }
}

export const similarMovie  = async (req,res) => {
    const {id} = req.params
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`)
        res.json({success:true,similar:data.results})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Internal Server Error!"})
    }
}

export const movieCategory = async (req,res) => {
    const {category} = req.params
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`)
        res.json({success:true,content:data.results})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Internal Server Error!"});
    }
}