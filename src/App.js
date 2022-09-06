import React, {useState, useEffect} from 'react'
import Movie from './components/Movie'
import './components/Movie.css'

const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const SEARCHAPI ="https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const App = () => {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {

    getMovies(APIURL);
 
  }, [])

  const getMovies = (API) => {
    fetch(API).then((res) => res.json()).then((data) => {
      console.log(data)
      setMovies(data.results)
    })
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if(searchTerm){

      getMovies(SEARCHAPI + searchTerm)

      setSearchTerm("")
    }
  }

  const handleOnChange = ((e) => {
    setSearchTerm(e.target.value)
  })

  return (
    <>
      <header>
        <form onSubmit={handleOnSubmit}>
        <input 
        className='search' 
        type="search" 
        placeholder='Search...'
        value={searchTerm}
        onChange={handleOnChange} />
        </form>
      </header>
    <div className="movie-container">
      {movies.length > 0 && movies.map((movie) => (
        <Movie key={movie.id} {...movie}/>
      ))}
    </div>
    </>
  )
}

export default App

