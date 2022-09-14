const express = require('express');
const db = require('./db')
const cors = require('cors')
require('dotenv').config();
const morgan = require('morgan');


const PORT = process.env.PORT || 5000

const app = express();


app.use(cors())
app.use(express.json())

app.get('/movies', async (req, res ) => {

    try {
        // const results = await db.query('select * from movies');
        const movieRatingData = await db.query('select * from movies left join (select movie_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by movie_id) reviews on movies.id = reviews.movie_id;')
        
        res.json({
            status: 'success',
            results: movieRatingData.rows.length,
            data: {
                movies: movieRatingData.rows
            }
        })
    } catch (error) {
        
    }

    
})

app.get('/movies/:id', async (req, res) => {
    console.log(req.params)

    try {
        const movies = await db.query('select * from movies left join (select movie_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by movie_id) reviews on movies.id = reviews.movie_id where id = $1;', [req.params.id])
        const reviews = await db.query('select * from reviews where movie_id = $1', [req.params.id])
        console.log(movies.rows)
        res.json({
            status: 'success',
            data: {
                movie: movies.rows,
                reviews: reviews.rows
            }
        })
    } catch (error) {
        
    }
    
})

app.post('/movies', async (req, res) => {
    console.log(req.body)

    try {
        const results = await db.query('INSERT INTO movies (name, genre, director) values ($1, $2, $3) returning *', [req.body.name, req.body.genre, req.body.director])

        res.status(201).json({
            status: 'success',
            data: {
                movie: results.rows
            }
        })
    } catch (error) {
        console.log(error)
    }
})

app.put('/movies/:id', async (req, res) => {
    console.log(req.params.id)
    console.log(req.body)

    try {
        const results = await db.query('UPDATE movies SET name = $1, genre = $2, director = $3 where id = $4 returning *', [req.body.name, req.body.genre, req.body.director, req.params.id])
        console.log(results.rows)
        res.status(200).json({
            status: 'success',
            data: {
                movie: results.rows
            }
        })
    } catch (error) {
        console.log(error)
    }
})

app.delete('/movies/:id', async ( req, res ) => {
    try {
        const results = await db.query('DELETE from movies where id = $1', [req.params.id])
        res.status(204).json({
            status: 'success'
        })
    } catch (error) {
        console.log(error)
    }
})

app.post('/movies/:id/addReview', async (req, res) => {
    try {
        const newReview = await db.query('INSERT INTO reviews (movie_id, name, review, rating) VALUES ($1, $2, $3, $4) returning *', [req.params.id, req.body.name, req.body.review, req.body.rating]);
        res.status(201).json({
            status: 'success',
            data: {
                review: newReview.rows[0]
            }
        })
    } catch (error) {
        
    }
})

app.listen(PORT, () => {
    console.log(`Server is listening on Port ${PORT}`)
})