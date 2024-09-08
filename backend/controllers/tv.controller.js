import { fetchFromTMDB } from "../services/tmdb.service.js"

export const gettvMovie =async (req,res) => {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US")
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)]
        
        res.json({success:true,content:randomMovie});
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Internal Server Error!"});   
    }
}
export const gettvTrailers = async (req,res) => {
    try {
        const movieId = req.params.id;
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${movieId}/videos?language=en-US`);
        
        res.status(200).json({
            success:true,
            trailers:response.results
        })
    } catch(error){
        console.log(error);
        res.json({success:false,message:"Internal Server Error!"});
    }
}

export const gettvDetail = async (req,res) => {
    const {id} = req.params
    try{
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`)
        res.json({success:true,content:data})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Internal Server Error!"});
    }
}

export const similartv  = async (req,res) => {
    const {id} = req.params
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`)
        res.json({success:true,similar:data.results})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Internal Server Error!"})
    }
}

export const tvCategory = async (req,res) => {
    const {category} = req.params
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`)
        res.json({success:true,content:data.results})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Internal Server Error!"})
    }
}