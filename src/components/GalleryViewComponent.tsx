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

            // mapping error fix: 
            // citation: https://claude.ai/share/9d2edf8b-bfc2-4ba3-91d6-1abd757e74c0
            setMealCategoryList(result.categories.map(category => category.strCategory));
            setselectedMealCategory(result.categories[0].strCategory);
        }
        getAllCategories();
    }, []);

    useEffect(() => {
        if (!selectedMealCategory) return;
        const getMealsInCategory = async () => {
            const result = await getAllFoodsInCategory(selectedMealCategory);
            console.log(`got meals in category ` + selectedMealCategory, result);
            setmealList(result.meals);

            // put the meal list into sessionstorage so that the recipeview can view the entire list
            // sessionstorage citation: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
            sessionStorage.setItem('meallist', JSON.stringify(result.meals));
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
            <span>
                {
                    selectedMealCategory !== "" && (
                        <p>Current category: {selectedMealCategory}</p>
                    )
                }
            </span>
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
                            </div>
                            <img src={meal.strMealThumb} alt={meal.strMeal} />
                            <Link to={`/recipeview/${meal.idMeal}`} key={meal.idMeal}>See More</Link>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default GalleryViewComponent;