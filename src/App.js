import {useEffect, useState} from "react";
import './index.css'
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const key = "1a34f71f"
export default function App() {
  // const [movies, setMovies] = useState([]);
  // useEffect(()=>{
  //   fetch(`https://www.omdbapi.com/?apikey=${key}&s=interstellar`)
  //       .then((res)=>res.json()).then((data)=>{
  //     console.log(data.Search);
  //     setMovies(data.Search)
  //   })
  // } , [])

  //async await
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  let movie = 'shutter';
  useEffect(()=>{
    // setLoading(false)
    async function Movie(){
      try{
        setLoading(true)
        const res = await fetch(`https://www.omdbapi.com/?apikey=${key}&s=${movie}`);
        if (!res.ok) throw new Error("something went wrong");
        const data = await res.json();
        setMovies(data.Search);
        console.log(data.Search)
        setLoading(false)
      }
      catch (err){
        setError(err.message)
      }
    }
    Movie();
  } , [])

  return (
    <>
      <NavBar movies={movies}>
        <Results movies={movies} />
      </NavBar>
      <Main>
        <MovieSearchResults>
          {error && <ErrorNet error={error}/> }
          {!loading && !error && <MovieList movies={movies}/> }
          {loading && <Loader/>}
        </MovieSearchResults>
        <MovieYourWatchedInformation />
      </Main>
    </>
  );
}

//loading
function Loader(){
  return <div className="flex justify-center items-center gap-4 h-full">
    <p className="text-4xl">Loading</p>
    <i className="fa text-4xl fa-spinner fa-spin"></i>
  </div>
}
// error network
function ErrorNet({error}){
  return <div className="flex justify-center items-center">
    <div className="text-4xl text-red-400 mt-4">Please Check Network 😢</div>
  </div>
}
// navigator
function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      <SearchBar />
      {children}
    </nav>
  );
}
// logo
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

// searchbar
function SearchBar() {
  const [query, setQuery] = useState("");
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

// results count
function Results({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
// main
function Main({ children }) {
  return <main className="main">{children}</main>;
}

// MovieSearchResults
function MovieSearchResults({ children }) {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box overflow-x-hidden">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && children}
    </div>
  );
}

// MovieList
function MovieList({ movies }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <li key={movie.imdbID}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>🗓</span>
              <span>{movie.Year}</span>
              {console.log(movies.length)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

// movie you watched information
function MovieYourWatchedInformation() {
  const [isOpen2, setIsOpen2] = useState(true);
  return (
    <div className="box overflow-x-hidden">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && <MovieWatchedList />}
    </div>
  );
}
// movieWatchedList
function MovieWatchedList() {
  const [watched, setWatched] = useState(tempWatchedData);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <>
      <div className="summary">
        <h2>Movies you watched</h2>
        <div>
          <p>
            <span>#️⃣</span>
            <span>{watched.length} movies</span>
          </p>
          <p>
            <span>⭐️</span>
            <span>{avgImdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{avgUserRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{avgRuntime} min</span>
          </p>
        </div>
      </div>

      <ul className="list">
        {watched.map((movie) => (
          <li key={movie.imdbID}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
              <p>
                <span>⭐️</span>
                <span>{movie.imdbRating}</span>
              </p>
              <p>
                <span>🌟</span>
                <span>{movie.userRating}</span>
              </p>
              <p>
                <span>⏳</span>
                <span>{movie.runtime} min</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
