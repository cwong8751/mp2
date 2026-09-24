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
    try{
        const url = api_url + api_url_key + '/lookup.php?i=' + mealId;
        const response = await axios.get(url);

        return response.data;
    }
    catch (error) {
        console.error('Error searching meal detail by ID:', error);
        throw error;
    }
}

export { searchMealByName, searchMealDetailbyId };