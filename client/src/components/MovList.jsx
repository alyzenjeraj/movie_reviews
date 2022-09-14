import React, { useContext, useEffect } from 'react'
import MovieList from '../api/Movies'
import { MovieContext } from '../context/MovieContext'
import { useNavigate } from 'react-router-dom'
import StarRating from './StarRating'

const MovList = () => {
    const navigate = useNavigate();

    const {movies, setMovies} = useContext(MovieContext)

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        try {
            const response = await MovieList.delete(`/${id}`)
            setMovies(movies.filter((movie) => {
                return movie.id !== id
            }))
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdate = (e, id) => {
        e.stopPropagation();
        navigate(`/movies/${id}/update`)
    }

    const handleSelect = (id) => {
        navigate(`/movies/${id}`)
    }

    const renderRating = (movie) => {

        if (!movie.count) {
            return <span className='text-warning'>0 Reviews</span>
        }
        return <>
        <StarRating rating={movie.average_rating} />
        <span className='text-warning ml-1'>({movie.count})</span>
        </>
    }

    useEffect(() => {

        const fetchData = async () => {
           
            try {
                const response = await MovieList.get('/')
                setMovies(response.data.data.movies)
            } catch (error) {
                console.log(error)
            }
          }

          fetchData();
        
        
    }, [])

  return (
    <div className='list-group'>
        <table className='table table-hover ' >
            <thead>
                <tr className='bg-primary'>
                    <th scope='col'>Movie</th>
                    <th scope='col'>Genre</th>
                    <th scope='col'>Director</th>
                    <th scope='col'>Rating</th>
                    <th scope='col'>Edit</th>
                    <th scope='col'>Delete</th>
                </tr>
            </thead>
            <tbody>
                
                {movies && movies?.map((movie) => (
                    <tr onClick={() => handleSelect(movie.id)} key={movie.id}>
                    <td>{movie.name}</td>
                    <td>{movie.genre}</td>
                    <td>{movie.director}</td>
                    <td>{renderRating(movie)}</td>
                    <td>
                        <button onClick={(e) => handleUpdate(e, movie.id)} className='btn btn-warning'>Update</button>
                    </td>
                    <td>
                        <button onClick={(e) => handleDelete(e, movie.id)} className='btn btn-danger'>Delete</button>
                    </td>
                </tr>
                ))}
                {/* <tr>
                    <td>Thor</td>
                    <td>Action</td>
                    <td>James Gunn</td>
                    <td>Rating</td>
                    <td>
                        <button className='btn btn-warning'>Update</button>
                    </td>
                    <td>
                        <button className='btn btn-danger'>Delete</button>
                    </td>
                </tr> */}
                
            </tbody>
        </table>
    </div>
  )
}

export default MovList