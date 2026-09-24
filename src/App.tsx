import { useState } from 'react'
import './normalize.css'
import './App.css'
import ListViewComponent from './components/ListViewComponent'
import { searchMealByName } from './api'

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showNoDataFoundText, setShowNoDataFoundText] = useState<boolean>(false);
  const [mealList, setMealList] = useState<any[]>([]);

  const handleSearch = async () => {
    event?.preventDefault();

    if (searchTerm.trim() !== '') {
      const result = await searchMealByName(searchTerm);

      if (result != null) {
        setMealList(result.meals);
        console.log('Search result:', result);
      }

      if (result.meals == "no data found") {
        setShowNoDataFoundText(true);
        setMealList([]);
      }
    }
  }

  return (
    <>
      <header>
        <h1>Meal DB browser</h1>
        <p>View recipies and meals from mealdb.</p>

        <div className="nav-container">
          <button>Search</button>
          <button>Gallery</button>
        </div>

        <div className="search-container">
          <input type="text" placeholder="search for a meal..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <input type="submit" value="Search" onClick={handleSearch} />
        </div>
      </header>
      {
        showNoDataFoundText && (
          <p>No data found for the search term.</p>
        )
      }
      <ListViewComponent mealList={mealList} />
    </>
  )
}

export default App
