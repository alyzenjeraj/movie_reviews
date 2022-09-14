import React, { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import MovieList from '../api/Movies'

const AddReview = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [reviewData, setReviewData] = useState({
        name: '',
        rating: 'Rating',
        review: ''
    })


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await MovieList.post(`/${id}/addReview`, reviewData)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
        window.location.reload()
        
    }
  return (
    <div>
        <form>
            <div className='row'>
                <div className='form-group col-8'>
                    <label htmlFor='name'>Name</label>
                    <input value={reviewData.name} onChange={(e) => setReviewData({...reviewData, name: e.target.value})} className='form-control' id='name' placeholder='Name' type='text' />
                </div>
                <div className='form-group col-4 mt-4'>
                    <label htmlFor='rating' className='m-2'>Rating</label>
                    <select value={reviewData.rating} onChange={(e) => setReviewData({...reviewData, rating: e.target.value})} id='rating' className='custom-select'>
                        <option disabled>Rating</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                    </select>
                </div>
                
            </div>
            <div className='form-group'>
                    <label htmlFor='genre'>Genre</label>
                    <textarea value={reviewData.review} onChange={(e) => setReviewData({...reviewData, review: e.target.value})} className='form-control' id='review' placeholder='Review' />
                </div>
            <button onClick={handleSubmit} className='btn btn-primary'>
                Submit
            </button>
        </form>
    </div>
  )
}

export default AddReview