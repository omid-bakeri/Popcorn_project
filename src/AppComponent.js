import { useEffect, useState } from "react";
import "./index.css";
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

const key = "1a34f71f";
export default function AppComponent() {
  // const [movies, setMovies] = useState([]);
  // useEffect(()=>{
  //   fetch(`https://www.omdbapi.com/?apikey=${key}&s=interstellar`)
  //       .then((res)=>res.json()).then((data)=>{
  //     console.log(data.Search);
  //     setMovies(data.Search)
  //   })
  // } , [])

  //async await
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMovieID, setSelectedMovieID] = useState();

  // let rand = Math.floor(Math.random() * 5) + 1;

  // console.log(rand);
  function handleMovieSelectedDetails(id) {
    setSelectedMovieID(id);
    // console.log("id : " , movie);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
    console.log(watched);
    // console.log(watched[0].Title);
  }

  useEffect(() => {
    // setLoading(false)
    async function Movie() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${key}&s=${query}`
        );
        if (!res.ok) throw new Error("something went wrong");
        const data = await res.json();
        // console.log(data)
        if (data.Response === "False") throw new Error("Movie not found!");

        // console.log(data.Search);
        setMovies(data.Search);
      } catch (err) {
        // setError(err.message);
      } finally {
        setLoading(false);
      }
      // console.log(query);
    }
    Movie();
  }, [query]);

  // close tab
  function handleCloseTab() {
    setSelectedMovieID(false);
  }
  return (
    <>
      <NavBar movies={movies} query={query} setQuery={setQuery}>
        <Results movies={movies} />
      </NavBar>
      <Main
        handleMovieSelectedDetails={handleMovieSelectedDetails}
        handleAddWatched={handleAddWatched}
      >
        <MovieSearchResults>
          {error && <ErrorNet error={error} />}
          {!loading && !error && (
            <MovieList
              movies={movies}
              handleMovieSelectedDetails={handleMovieSelectedDetails}
            />
          )}
          {loading && <Loader />}
        </MovieSearchResults>
        {selectedMovieID ? (
          <MovieSelected
            handleAddWatched={handleAddWatched}
            selectedMovieID={selectedMovieID}
            handleCloseTab={handleCloseTab}
            handleMovieSelectedDetails={handleMovieSelectedDetails}
          />
        ) : (
          <MovieYourWatchedInformation handleAddWatched={watched} />
        )}
      </Main>
    </>
  );
}

//loading
function Loader() {
  return (
    <div className="flex justify-center items-center gap-4 h-full">
      <p className="text-4xl">Loading</p>
      <i className="fa text-4xl fa-spinner fa-spin"></i>
    </div>
  );
}
// error network
function ErrorNet({ error }) {
  return (
    <div className="flex justify-center items-center">
      <div className="text-4xl text-red-400 mt-4">Please Check Network 😢</div>
    </div>
  );
}
// navigator
function NavBar({ children, query, setQuery }) {
  return (
    <nav className="nav-bar">
      <Logo />
      <SearchBar query={query} setQuery={setQuery} />
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
function SearchBar({ query, setQuery }) {
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
function Main({ children, handleMovieSelectedDetails, OnFavoriteMovie }) {
  return (
    <>
      <main className="main">{children}</main>
      <div>{handleMovieSelectedDetails.Title}</div>
    </>
  );
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
function MovieList({ movies, handleMovieSelectedDetails, handleAddWatched }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <li
          onClick={() => handleMovieSelectedDetails(movie.imdbID)}
          className="list-element"
          key={movie.imdbID}
        >
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>🗓</span>
              <span>{movie.Year}</span>
              {/*{console.log(movies.length)}*/}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

// movie you watched information
function MovieYourWatchedInformation(handleAddWatched) {
  const [isOpen2, setIsOpen2] = useState(true);
  return (
    <div className="box overflow-x-hidden">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && <MovieWatchedList handleAddWatched={handleAddWatched} />}
    </div>
  );
}

function MovieSelected({
  selectedMovieID,
  handleCloseTab,
  handleMovieSelectedDetails,
  handleAddWatched,
}) {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            width: "300px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div
            onClick={() => handleCloseTab()}
            style={{
              cursor: "pointer",
              width: "25px",
              height: "25px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "15px",
              fontSize: "1.5rem",
              borderRadius: "50%",
              marginTop: "10px",
              marginLeft: "10px",
              backgroundColor: "gray",
              userSelect: "none",
              position: "absolute",
              zIndex: "10",
            }}
          >
            x
          </div>
        </div>
        <div
          style={{
            paddingTop: "30px",
            fontSize: "1.5rem",
            backgroundColor: "black",
            // marginTop: "30px",
            position: "relative",
            padding: "35px",
            borderRadius: "7px",
            overflow: "scroll",
            overflowX: "hidden",
            maxWidth: "500px",
          }}
        >
          <MovieDetails
            selectedMovieID={selectedMovieID}
            handleMovieSelectedDetails={handleMovieSelectedDetails}
            // eslint-disable-next-line no-undef
            handleAddWatched={handleAddWatched}
          />
        </div>
      </div>
    </>
  );
}
//movieDetails
function MovieDetails({
  selectedMovieID,
  handleMovieSelectedDetails,
  handleAddWatched,
}) {
  // {console.log("id=" , selectedMovieID)}
  // console.log(selectedMovieID);
  const [movieDetails, setMovieDetails] = useState({});

  const {
    Title: Title,
    Actors: Actors,
    Awards: Awards,
    BoxOffice: BoxOffice,
    Country: Country,
    DVD: DVD,
    Director: Director,
    Genre: Genre,
    Language: Language,
    Plot: Plot,
    Poster: Poster,
    Released: Released,
    Runtime: Runtime,
    Year: Year,
    imdbRating: imdbRating,
  } = movieDetails;

  // console.log(movieDetails);

  // console.log(Title , Year);
  function handleAdd() {
    const new_watched_movie = {
      imdbID: selectedMovieID,
      Title,
      Year,
      Poster,
      imdbRating: Number(imdbRating),
      Runtime: Number(Runtime.split(" ").at(0)),
    };
    handleAddWatched(new_watched_movie);
  }
  useEffect(
    function ApiDetails() {
      async function ApiDetailsFunction() {
        const fetchDetails = await fetch(
          `https://www.omdbapi.com/?apikey=${key}&i=${selectedMovieID}`
        );

        // console.log("------------------------------------");
        const res = await fetchDetails.json();
        // console.log(res);
        setMovieDetails(res);
      }
      ApiDetailsFunction();
    },
    [selectedMovieID]
  );

  return (
    <>
      <img
        style={{ objectFit: "cover", margin: "0 auto" }}
        src={Poster}
        alt={Title}
      />
      <div className="movieTitle">{Title}</div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{ color: "yellow", fontWeight: "medium", fontSize: "2.1rem" }}
        >
          {Year}
        </div>
        <div
          style={{
            display: "flex",
            userSelect: "none",
            padding: "5px",
            borderRadius: "10px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button style={{ fontWeight: "medium", fontSize: "1.8rem" }}>
            {imdbRating}
          </button>
          <span style={{ fontSize: "1.8rem" }}>⭐</span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          //   alignItems: "center",
          paddingTop: "7px",
        }}
      >
        {/*<div className="fa fa-man"></div>*/}
        <div className="movieDetailsClass">Actors</div>
        <div className="movieDetailsClassData">: {Actors}</div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          //   alignItems: "center",
          paddingTop: "7px",
        }}
      >
        {/*<i className="fa fa-time"></i>*/}
        <div className="movieDetailsClass">Time</div>
        <div className="movieDetailsClassData">: {Runtime}</div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          //   alignItems: "center",
          paddingTop: "7px",
        }}
      >
        <div className="movieDetailsClass">Genre</div>
        <div className="movieDetailsClassData">: {Genre}</div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          //   alignItems: "center",
          paddingTop: "7px",
        }}
      >
        <div className="movieDetailsClass">Director</div>
        <div className="movieDetailsClassData">: {Director}</div>
      </div>
      {/* <div
        style={{
          display: "flex",
          justifyContent: "start",
          //   alignItems: "center",
          paddingTop: "7px",
        }}
      >
        <div className="movieDetailsClass">Language</div>
        <div className="movieDetailsClassData">: {Language}</div>
      </div> */}

      <div
        style={{
          display: "flex",
          justifyContent: "start",
          //   alignItems: "center",
          paddingTop: "7px",
        }}
      >
        <div className="movieDetailsClass">Released</div>
        <div className="movieDetailsClassData">: {Released}</div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          //   alignItems: "center",
          paddingTop: "7px",
        }}
      >
        <div className="movieDetailsClass">Country</div>
        <div className="movieDetailsClassData">: {Country}</div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          //   alignItems: "center",
          paddingTop: "7px",
        }}
      >
        <div
          style={{ maxWidth: "400px", paddingTop: "30px" }}
          className="movieDetailsClassData"
        >
          {Plot}
        </div>
      </div>
      <button onClick={handleAdd} className="btn-favorite">
        Add to Favorite
      </button>
    </>
  );
}
// movieWatchedList
function MovieWatchedList({ handleAddWatched }) {
  // console.log("*/*/*/*/*/*/*/*/*/*/*/*/*/*");
  // console.log(handleAddWatched.handleAddWatched.at(0).Title);
  // console.log("*/*/*/*/*/*/*/*/*/*/*/*/*/*");
  let Favorite_label = [];
  Favorite_label = handleAddWatched.handleAddWatched;

  // const [fav, setFav] = useState([]);
  // setFav(handleAddWatched);

  // const {
  //   Title: Title,
  //   Actors: Actors,
  //   Awards: Awards,
  //   BoxOffice: BoxOffice,
  //   Country: Country,
  //   DVD: DVD,
  //   Director: Director,
  //   Genre: Genre,
  //   Language: Language,
  //   Plot: Plot,
  //   Poster: Poster,
  //   Released: Released,
  //   Runtime: Runtime,
  //   Year: Year,
  //   imdbRating: imdbRating,
  // } = watched;

  // console.log("-*-*-*-*-*-*-*-*-*-*-*-");
  // console.log(OnFavoriteMovie.Title);
  // function handleDataFavoriteMovie() {
  //   setWatched(OnFavoriteMovie);
  //  }

  // const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  // const avgUserRating = average(watched.map((movie) => movie.userRating));
  // const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <>
      <ul className="list">
        <div className="favorite-title-movie">Your Favorite Movies</div>
        {Favorite_label.map((movie) => (
          <div className="img-close-btn" style={{ padding: "4px" }}>
            <div>
              <div
                className="root-movie-favorite"
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: "10px",
                }}
              >
                <img src={movie.Poster} alt={movie.Title} />
                <div
                  style={{
                    display: "flex",
                    // gap : "2",
                    flexDirection: "column",
                    maxWidth: "310px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p className="title_movie_favorite">{movie.Title}</p>
                  <div className="" style={{ width: "100%" }}>
                    <p style={{ display: "flex", gap: "2px" }}>
                      <span style={{ fontSize: "1.6rem" }}>📅</span>
                      <span style={{ fontSize: "1.6rem" }}>{movie.Year}</span>
                    </p>
                    <p style={{ display: "flex", gap: "2px" }}>
                      <span style={{ fontSize: "1.6rem" }}>⌚</span>
                      <span style={{ fontSize: "1.6rem" }}>
                        {movie.Runtime} min
                      </span>
                    </p>
                    <p style={{ display: "flex", gap: "2px" }}>
                      <span style={{ fontSize: "1.6rem" }}>⭐</span>
                      <span style={{ fontSize: "1.6rem" }}>
                        {movie.imdbRating}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p class="closeMovie">x</p>
          </div>
        ))}
      </ul>
    </>
  );
}
