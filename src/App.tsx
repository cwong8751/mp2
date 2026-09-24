import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import './normalize.css'
import ListViewComponent from './components/ListViewComponent'
import {searchMealByName, searchMealDetailbyId} from './api'

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showNoDataFoundText, setShowNoDataFoundText] = useState<boolean>(false);
  const [mealList, setMealList] = useState<any[]>([]);

  const handleSearch = async () => {
    event?.preventDefault();

    if(searchTerm.trim() !== '') {
      const result = await searchMealByName(searchTerm);

      if(result != null) {
        setMealList(result.meals);
        console.log('Search result:', result);
      } 

      if(result.meals == "no data found") {
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
            <input type="text" placeholder="search for a meal..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            <input type="submit" value="Search" onClick={handleSearch}/>
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
