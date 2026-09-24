import '../normalize.css'

function ListViewComponent({mealList}: {mealList: any[]}) {

    return (
        <>
        <label htmlFor="sort">Sort by:</label>
        <select>
            <option value="option1">Alphabetic</option>
            <option value="option3">Recipe ID</option>
        </select>
        <div>
            <input type="radio" id="sort-ascending" name="sort" value="ascending" checked />
            <label htmlFor="sort-ascending">Ascending</label>
            <input type="radio" id="sort-descending" name="sort" value="descending" />
            <label htmlFor="sort-descending">Descending</label>
        </div>

        {
            mealList.map((meal) => (
                <div>
                    <h2>{meal.strMeal}</h2>
                    <h3>{meal.strCategory} | {meal.strArea} | {meal.strCountry}</h3>
                    <img src={meal.strMealThumb} alt={meal.strMeal} />

                    <p>See more</p>
                </div>
            ))
        }
        </>
    )
}

export default ListViewComponent