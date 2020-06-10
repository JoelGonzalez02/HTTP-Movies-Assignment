import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';


const initialForm = {
    id: Date.now(),
    title: '',
    director: '',
    metascore: '',
    stars: [],
}

const UpdateForm = props => {
    const [updateMovie, setUpdateMovie] = useState(initialForm);
 
    const  { id } = useParams();
    const { push } = useHistory();

    console.log('Hello from update form')

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                setUpdateMovie(res.data)
            })
            .catch(err => {
                console.error('There was an error', err.message, err.response)
            })
    }, [id])

  
    const handleChange = e => {
        setUpdateMovie({
            ...updateMovie, [e.target.name] : e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios
          .put(`http://localhost:5000/api/movies/${id}`, updateMovie)
          .then(res => {
            const newMovieList = props.movies.map(movie => {
              if (movie.id === updateMovie.id) {
                return updateMovie;
              }
              return movie;
            });
            props.setMovies(newMovieList);
            setUpdateMovie(initialForm);
            push(`/`);
          })
          .catch(err =>
            console.error(
              err.message,
              err.response
            )
          );
      };

            return (
                <div className='updateForm'>
                    <h2 class='update'>Update Movie</h2>
                    <form onSubmit={handleSubmit}>
                        <input  
                            type='text'
                            name='title'
                            placeholder='Movie Title'
                            onChange={handleChange}
                            value={updateMovie.title}
                            />
                        <input
                            type='text'
                            name='director'
                            placeholder='Director'
                            onChange={handleChange}
                            value={updateMovie.director}
                            />
                        <input
                            type='number'
                            name='metascore'
                            placeholder='Metascore'
                            onChange={handleChange}
                            value={updateMovie.metascore}
                            />
                        <input  
                            type='text'
                            name='stars'
                            placeholder='Stars'
                            onChange={handleChange}
                            value={updateMovie.stars}
                            />
                            
                    <button>Update Movie</button>
                    </form>
                </div>
            )

}


export default UpdateForm;