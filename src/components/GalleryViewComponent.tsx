import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../normalize.css'
import './GalleryView.css'
import { getAllFoodsInCategory, getFoodCategories } from '../api';

function GalleryViewComponent() {
    const [mealList, setmealList] = useState<any[]>();
    const [mealCategoryList, setMealCategoryList] = useState<string[]>([]);
    const [selectedMealCategory, setselectedMealCategory] = useState("");

    useEffect(() => {

        const getAllCategories = async () => {
            const result = await getFoodCategories();

            setMealCategoryList(result.categories.map(category => category.strCategory));
            setselectedMealCategory(result.categories[0].strCategory);
        }


        getAllCategories();

    }, []);

    useEffect(() => {
        const getMealsInCategory = async () => {
            const result = await getAllFoodsInCategory(selectedMealCategory);
            console.log(`got meals in category ` + selectedMealCategory, result);
            setmealList(result.meals);
        }
        getMealsInCategory();
    }, [selectedMealCategory]);

    const handleMealCategoryChange = (category: string) => {
        setselectedMealCategory(category);
    }

    return (
        <>
            <div className='category-controller'>
                {
                    (mealCategoryList && mealCategoryList.length > 0) && mealCategoryList.map(category => (
                        <button onClick={() => handleMealCategoryChange(category)}>{category}</button>
                    ))
                }
            </div>
            <div className="grid-container">
                {
                    (mealList == null || mealList.length === 0) && (
                        <p>No meals found.</p>
                    )
                }
                {
                    mealList != null && mealList.length > 0 &&
                    mealList.map((meal) => (
                        <div className="grid-item">
                            <div>
                                <h2>{meal.strMeal}</h2>
                                <h3>{meal.strCategory ?? "N/A"} | {meal.strArea ? meal.strArea : 'N/A'} | {meal.strCountry}</h3>
                                <i>{meal.idMeal}</i>
                                <Link to={`/recipeview/${meal.idMeal}`} key={meal.idMeal}>See More</Link>
                            </div>
                            <img src={meal.strMealThumb} alt={meal.strMeal} />

                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default GalleryViewComponent;