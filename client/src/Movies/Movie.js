import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie ({addToSavedList, getMovieList}) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();

  const routeToForm = e => {
    e.preventDefault();
    push(`/update-movie/${params.id}`)
  }


  const handleDelete = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then(res => {
        getMovieList();
        push(`/`);
      })
      .catch(err =>
        console.error(err.message, err.response)
      );
  };

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button onClick ={routeToForm}>Update Movie</button>
      <button onClick={handleDelete}>Delete Movie</button>
    </div>
  );
}

export default Movie;
