import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import MovieList from '../api/Movies'


const UpdateMov = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [movieData, setMovieData] = useState({
        name: '',
        genre: '',
        director: ''
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await MovieList.get(`/${id}`)
                
                setMovieData(response.data.data.movie[0])
            } catch (error) {
                console.log(error)
            }
        }

        fetchData();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedMovie = await MovieList.put(`/${id}`, movieData)
        } catch (error) {
            console.log(error)
        }

        navigate('/')


    }


    return (
        <div>
            <form>
                <div className='form-group' >
                    <label htmlFor='name'>Name</label>
                    <input value={movieData.name} onChange={(e) => setMovieData({...movieData, name: e.target.value})} id='name' className='form-control' type='text' />
                </div>
                <div className='form-group' >
                    <label htmlFor='name'>Genre</label>
                    <input value={movieData.genre} onChange={(e) => setMovieData({...movieData, genre: e.target.value})} id='name' className='form-control' type='text' />
                </div>
                <div className='form-group' >
                    <label htmlFor='name'>Director</label>
                    <input value={movieData.director} onChange={(e) => setMovieData({...movieData, director: e.target.value})} id='name' className='form-control' type='text' />
                </div>
                <button onClick={handleSubmit} className='btn btn-primary mt-2' type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default UpdateMov