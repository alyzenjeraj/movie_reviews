import React, { useContext, useState } from 'react'
import MovieList from '../api/Movies'
import { MovieContext } from '../context/MovieContext'


const AddMov = () => {

    const {addMovies} = useContext(MovieContext)

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await MovieList.post('/', movieData)
            // console.log(response.data.data.movie[0])
            addMovies(response.data.data.movie[0])
        } catch (error) {
            
        }
    }

    const [movieData, setMovieData] = useState({
        name: '',
        genre: '',
        director: ''
    })
    return (
        <div className='mb-4'>
            <form action=''>
                <div className='row'>
                    <div className='col'>
                        <input value={movieData.name} onChange={(e) => setMovieData({...movieData, name: e.target.value})} type='text' className='form-control' placeholder='Name' />
                    </div>
                    <div className='col'>
                        <input value={movieData.genre} onChange={(e) => setMovieData({...movieData, genre: e.target.value})} type='text' className='form-control' placeholder='Genre' />
                    </div>
                    <div className='col'>
                        <input value={movieData.director} onChange={(e) => setMovieData({...movieData, director: e.target.value})} type='text' className='form-control' placeholder='Director' />
                    </div>  
                    <button tyoe='submit' onClick={handleSubmit} className='mt-2 btn btn-primary'>Add</button>      
                </div>
            </form>
        </div>
    )
}

export default AddMov