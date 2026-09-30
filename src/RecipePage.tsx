import { useEffect, useState } from "react";
import ListViewComponent from "./components/ListViewComponent";
import { searchMealByName, searchMealDetailbyId } from "./api";
import './App.css'
import './normalize.css'
import { useParams, Link } from "react-router-dom";


function RecipePage() {
    const { id } = useParams();
    const [mealName, setMealName] = useState("");
    const [mealCategory, setMealCategory] = useState("");
    const [mealArea, setMealArea] = useState("");
    const [mealCountry, setMealCountry] = useState("");
    const [mealInstructions, setMealInstructions] = useState("");
    const [mealThumbnail, setMealThumbNail] = useState("");
    const [mealYoutube, setMealYoutube] = useState("");
    const [ingredients, setIngredients] = useState<string[]>();
    const [measurements, setMeasurements] = useState<string[]>();

    useEffect(() => {
        if (!id) { return; }
        const getMealDetail = async () => {
            // get full meal details 
            const result = await searchMealDetailbyId(id?.toString());

            if (result != null) {
                const meal = result.meals[0];
                // get results 
                setMealName(meal.strMeal);
                setMealCategory(meal.strCategory);
                setMealArea(meal.strArea);
                setMealCountry(meal.strCountry);
                setMealInstructions(meal.strInstructions);
                setMealThumbNail(meal.strMealThumb);
                setMealYoutube(meal.strYoutube ?? "");

                setIngredients([
                    meal.strIngredient1,
                    meal.strIngredient2,
                    meal.strIngredient3,
                    meal.strIngredient4,
                    meal.strIngredient5,
                    meal.strIngredient6,
                    meal.strIngredient7,
                    meal.strIngredient8,
                    meal.strIngredient9,
                ].filter(Boolean));

                setMeasurements([
                    meal.strMeasure1,
                    meal.strMeasure2,
                    meal.strMeasure3,
                    meal.strMeasure4,
                    meal.strMeasure5,
                    meal.strMeasure6,
                    meal.strMeasure7,
                    meal.strMeasure8,
                    meal.strMeasure9,
                ].filter(Boolean));
            }
        }

        // validate meal id
        if (id != null && id != "") {
            getMealDetail();
        }
    }, [id])

    return (
        <>
            <div>
                <div>
                    <Link to="/">Previous Recipe</Link>
                    <Link to="/">Next Recipe</Link>
                </div>
                <h1>{mealName}</h1>
                <h2><i>{mealArea} | {mealCategory} | {mealCountry}</i></h2>
                {
                    mealThumbnail !== "" && (
                        <img src={mealThumbnail} />
                    )
                }
                <hr></hr>
                <h3>Ingredients</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Ingredients</th>
                            <th>Measurement</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ingredients?.map((ingredient, index) => (
                            <tr key={index}>
                                <td>{ingredient}</td>
                                <td>{measurements?.[index]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <hr></hr>
                <h3>Instructions</h3>
                <p>Or watch Recipe on Youtube: </p>
                <a href={mealYoutube}>Watch Here</a>
                <ol>
                    {
                        mealInstructions.split("\r\n").filter(Boolean).map((instruction, index) => (
                            <li key={index}>
                                <h4>Step {index}</h4>
                                <p>{instruction}</p>
                            </li>
                        ))
                    }
                </ol>
            </div>
        </>
    )
}

export default RecipePage;