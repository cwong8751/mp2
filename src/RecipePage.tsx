import { useEffect, useState } from "react";
import './RecipePage.css';
import { searchMealDetailbyId } from "./api";
import './App.css'
import './normalize.css'
import { useParams, Link } from "react-router-dom";


function RecipePage() {
    const { id } = useParams();
    const [mealName, setMealName] = useState("");
    const [mealCategory, setMealCategory] = useState("");
    const [mealArea, setMealArea] = useState("");
    const [mealCountry, setMealCountry] = useState("");
    const [mealInstructions, setMealInstructions] = useState<string[]>();
    const [mealThumbnail, setMealThumbNail] = useState("");
    const [mealYoutube, setMealYoutube] = useState("");
    const [ingredients, setIngredients] = useState<string[]>();
    const [measurements, setMeasurements] = useState<string[]>();
    const [source, setSource] = useState("");

    useEffect(() => {
        if (!id) { return; }
        const getMealDetail = async () => {
            // get full meal details 
            const result = await searchMealDetailbyId(id?.toString());
            console.log("meal result: ");
            console.log(result);
            if (result != null) {
                const meal = result.meals[0];
                // get results 
                setMealName(meal.strMeal);
                setMealCategory(meal.strCategory);
                setMealArea(meal.strArea);
                setMealCountry(meal.strCountry);
                setMealThumbNail(meal.strMealThumb);
                setMealYoutube(meal.strYoutube ?? "");
                setSource(meal.strSource ?? "");

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
                    meal.strIngredient10,
                    meal.strIngredient11,
                    meal.strIngredient12,
                    meal.strIngredient13,
                    meal.strIngredient14,
                    meal.strIngredient15,
                    meal.strIngredient16,
                    meal.strIngredient17,
                    meal.strIngredient18,
                    meal.strIngredient19,
                    meal.strIngredient20,
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
                    meal.strMeasure10,
                    meal.strMeasure11,
                    meal.strMeasure12,
                    meal.strMeasure13,
                    meal.strMeasure14,
                    meal.strMeasure15,
                    meal.strMeasure16,
                    meal.strMeasure17,
                    meal.strMeasure18,
                    meal.strMeasure19,
                    meal.strMeasure20,
                ].filter(Boolean));

               // some recipes have a dedicated "step x" text
               //citation: https://claude.ai/share/966ce5f5-55e2-4241-a537-bcebb92c25a5 

                setMealInstructions(
                    meal.strInstructions
                        .split("\r\n")
                        .filter((line: string) => line.trim() !== "" && !/^step\s+\d+$/i.test(line.trim()))
                );

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
                <div className="recipe-controller-div">
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
                <section id="ingredients">
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
                </section>
                <hr></hr>
                <section id="instructions">
                    <h3>Instructions</h3>
                    {
                        (mealYoutube !== null && mealYoutube !== "") && (
                            <>
                                <p>Or watch Recipe on Youtube: </p>
                                <a href={mealYoutube} target="_blank">Watch Here</a>
                            </>
                        )
                    }
                    {
                        (source !== null && source !== "") && (
                            <>
                                <p>Source recipe: </p>
                                <a href={source} target="_blank">Click here</a>
                            </>
                        )
                    }
                    <ol>
                        {
                            mealInstructions && mealInstructions?.length > 0 ?
                                mealInstructions?.map((instruction, index) => (
                                    <li key={index}>
                                        <h4>Step {index + 1}</h4>
                                        <p>{instruction}</p>
                                    </li>
                                )) : (
                                    <>
                                        <p>Did not find any instructions</p>
                                    </>
                                )
                        }
                    </ol>
                </section>
            </div>
        </>
    )
}

export default RecipePage;