import axios from 'axios';

const api_url = 'https://www.themealdb.com/api/json/v1/';
const api_url_key = '1';

const searchMealByName = async (mealName: string) => {
  try {
    const url = api_url + api_url_key + '/search.php?s=' + mealName;
    const response = await axios.get(url);

    return response.data;
  }
  catch (error) {
    console.error('Error searching meal by name:', error);
    throw error;
  }
}

const searchMealDetailbyId = async (mealId: string) => {
  try {
    const url = api_url + api_url_key + '/lookup.php?i=' + mealId;
    const response = await axios.get(url);

    return response.data;
  }
  catch (error) {
    console.error('Error searching meal detail by ID:', error);
    throw error;
  }
}

// get a list of categories 
// citation: https://claude.ai/share/9d2edf8b-bfc2-4ba3-91d6-1abd757e74c0
interface MealCategory {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

interface FoodCategoriesResponse {
  categories: MealCategory[];
}

const getFoodCategories = async (): Promise<FoodCategoriesResponse> => {
  try {
    const url = api_url + api_url_key + '/categories.php';
    const response = await axios.get(url);

    return response.data;
  }
  catch (error) {
    console.error('Error getting all meal categories', error);
    throw error;
  }
}

const getAllFoodsInCategory = async (category: string) => {
  try {
    const url = api_url + api_url_key + '/filter.php?c=' + category;
    const response = await axios.get(url);

    return response.data;
  }
  catch (error) {
    console.error('Error getting meals for category', error);
  }
}

export { searchMealByName, searchMealDetailbyId, getAllFoodsInCategory, getFoodCategories };