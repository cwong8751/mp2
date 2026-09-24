import { useEffect, useState } from 'react';
import '../normalize.css'
import './ListView.css'

function ListViewComponent({ mealList }: { mealList: any[] }) {
    const [sortedMealList, setSortedMealList] = useState<any[]>(mealList);
    const [sortBy, setSortBy] = useState<string>('alphabetic');
    const [sortOrder, setSortOrder] = useState<string>('ascending');

    useEffect(() => {
        setSortedMealList(mealList);
    }, [mealList]);

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // check if selected is alphabetic or recipe id 

        if (event.target.value === "alphabetic") {
            setSortBy("alphabetic");
            setSortedMealList([...mealList].sort((a, b) => a.strMeal.localeCompare(b.strMeal)));
        } else if (event.target.value === "recipeid") {
            setSortBy("recipeid");
            setSortedMealList([...mealList].sort((a, b) => a.idMeal - b.idMeal));
        }
    }

    const handleOrderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === "ascending") {
            if (sortBy === "alphabetic") {
                setSortedMealList([...sortedMealList].sort((a, b) => a.strMeal.localeCompare(b.strMeal)));
            }
            else if (sortBy === "recipeid") {
                setSortedMealList([...sortedMealList].sort((a, b) => a.idMeal - b.idMeal));
            }
        } else if (event.target.value === "descending") {
            if (sortBy === "alphabetic") {
                setSortedMealList([...sortedMealList].sort((a, b) => b.strMeal.localeCompare(a.strMeal)));
            }
            else if (sortBy === "recipeid") {
                setSortedMealList([...sortedMealList].sort((a, b) => b.idMeal - a.idMeal));
            }
        }
    }

    return (
        <>
            <label htmlFor="sort">Sort by:</label>
            <select onChange={handleSortChange}>
                <option value="alphabetic">Alphabetic</option>
                <option value="recipeid">Recipe ID</option>
            </select>
            <div>
                <form>
                    <input onChange={handleOrderChange} type="radio" id="sort-ascending" name="sort" value="ascending" />
                    <label htmlFor="sort-ascending">Ascending</label>
                    <input onChange={handleOrderChange} type="radio" id="sort-descending" name="sort" value="descending" />
                    <label htmlFor="sort-descending">Descending</label>
                </form>
            </div>

            <div className="list-container">
                {
                    (sortedMealList == null || sortedMealList.length === 0) && (
                        <p>No meals found.</p>
                    )
                }
                {
                    sortedMealList != null && sortedMealList.length > 0 &&
                    sortedMealList.map((meal) => (
                        <div className="card" key={meal.idMeal}>
                            <div>
                                <h2>{meal.strMeal}</h2>
                                <h3>{meal.strCategory} | {meal.strArea ? meal.strArea : 'N/A'} | {meal.strCountry}</h3>
                                <i>{meal.idMeal}</i>
                                <p>See more</p>
                            </div>
                            <img src={meal.strMealThumb} alt={meal.strMeal} />

                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default ListViewComponent