import React, { useState } from "react";

function Login() {
  // const [movies, setMovies] = useState(["hey"]);

  // const movie = [{
  //   movieName: "krish",
  //   movieId: 102,
  // }];
  
  // async function fetchMoviesHandler() {
  //   const response = await fetch(
  //     "https://react-http-learn-56b47-default-rtdb.firebaseio.com/movies.json"
  //   );
  //   const data = await response.json();
  //   console.log(data.results);
  //   setMovies(data.results);
  // }

  // async function addMovieHandler(movie) {
  //   const response = await fetch(
  //     "https://react-http-learn-56b47-default-rtdb.firebaseio.com/movies.json",
  //     {
  //       method: 'POST',
  //       body: JSON.stringify(movie),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   const data = await response.json();
  //   console.log(data);
  // }

  return (
    <div>
      {/* <button onClick={addMovieHandler}>Click</button> */}
      <div>
        Login
      </div>
    </div>
  );
}

export default Login;
