import React, { useState, createContext } from 'react';

export const MovieContext = createContext();

export const MovieContextProvider = props => {
    const [movies, setMovies] = useState([])
    const [selectMovie, setSelectMovie] = useState()

    const addMovies = (movie) => {
        setMovies([...movies, movie])
    }

    return (
        <MovieContext.Provider value={{movies, setMovies, addMovies, selectMovie, setSelectMovie}}>
            {props.children}
        </MovieContext.Provider>
    )
}