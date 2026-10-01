import { useState } from "react";
import ListViewComponent from "./components/ListViewComponent";
import { searchMealByName } from "./api";
import './App.css'
import './normalize.css'
import GalleryViewComponent from "./components/GalleryViewComponent";


function GalleryPage() {
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
            <div className="search-container">
                <input type="text" placeholder="search for a meal..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <input type="submit" value="Search" onClick={handleSearch} />
            </div>
            {
                showNoDataFoundText && (
                    <p>No data found for the search term.</p>
                )
            }
            <GalleryViewComponent mealList={mealList} />
        </>
    )
}

export default GalleryPage;