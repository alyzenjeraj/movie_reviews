import React, { useContext, useEffect } from 'react'

import { useParams } from 'react-router'
import { MovieContext } from '../context/MovieContext';
import MovieList from '../api/Movies'
import Movies from '../api/Movies';
import StarRating from '../components/StarRating';
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';

const DetailPage = () => {
  const { id } = useParams();
  const { selectMovie, setSelectMovie } = useContext(MovieContext)

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const response = await MovieList.get(`/${id}`);
        setSelectMovie(response.data.data)
        console.log(selectMovie)
        console.log(selectMovie.movie[0])
      } catch (error) {
        console.log(error)
      }
    }

    fetchData();
  }, [])

  return (
    <div>{selectMovie && selectMovie.movie[0].name && (
      <>
      <h1 className='text-center display-1' >{selectMovie.movie[0].name}</h1>
      <div className='text-center'>
        <StarRating rating={selectMovie.movie[0].average_rating} />
        <span className='text-warning ml-1'>
            {selectMovie.movie[0].count ? `(${selectMovie.movie[0].count})` : '(0)'}
          </span>
      </div>
        <div className='mt-3'>
          <Reviews reviews={selectMovie.reviews} />
          
          <AddReview />
        </div>
      </>
    )}</div>
  )
}

export default DetailPage

