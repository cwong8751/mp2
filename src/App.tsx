import './normalize.css'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import SearchPage from './SearchPage'
import GalleryPage from './GalleryPage'
import RecipePage from './RecipePage'


// router documentation citation: 
// https://v5.reactrouter.com/web/api/Switch

function App() {

  return (
    <>
      <BrowserRouter basename="/mp2">
        <header>
          <h1>Meal DB browser</h1>
          <p>View recipies and meals from mealdb.</p>

          <div className="nav-container">
            <Link to="/">Search (List)</Link>
            <Link to="/galleryview">Gallery</Link>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<SearchPage/>}/>
            <Route path="/galleryview" element={<GalleryPage/>}/>
            <Route path="/recipeview/:id" element={<RecipePage/>}/>
          </Routes>
        </main>
        <footer>
          MealDB Browser. CS409 MP2 Homework Made by Carl.
        </footer>
      </BrowserRouter>
    </>
  )
}

export default App
