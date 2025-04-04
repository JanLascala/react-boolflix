import { createContext, useContext, useState } from "react";
const MoviesContext = createContext()

function MoviesProvider({ children }) {
    const [movies, setMovies] = useState();

    useEffect(() => {
        const api_key = import.meta.env.VITE_MOVIE_DB_API_KEY;

        function fetchMovies() {
            fetch("https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchText}")
                .then((res) => {
                    if (!res.ok) throw new Error("Something went wrong");
                    return res.json();
                })
                .then((data) => setMovies(data))
                .catch((err) => setError(err.message));
        }

        fetchMovies();
    }, []);


    return (
        <MoviesContext.Provider value={{ movies, setMovies }}>
            {children}
        </MoviesContext.Provider>
    )
}

function useMovies() {
    const context = useContext(MoviesContext);
    return context
}

export { MoviesProvider, useMovies }
