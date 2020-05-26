
import axios from 'axios';
import { CountUri } from './Common';

const foodDictionaryUri = CountUri + 'fooddictionary';
const mealDictionaryUri = CountUri + 'mealdictionary';
const foodDictionaryUriFn = (id) => CountUri + `fooddictionary/${id}`;
const mealDictionaryUriFn = (id) => CountUri + `mealdictionary/${id}`;

export class DictionaryService {
  getMealsServiceCall = (onResponse) => {
    axios.get(mealDictionaryUri)
      .then(response => onResponse(response));
  }

  getFoodsServiceCall = (onResponse) => {
    axios.get(foodDictionaryUri)
      .then(response => onResponse(response));
  }

  editMeal = (meal, onResponse) => {
    axios.put(mealDictionaryUriFn(meal.id),meal)
    .then(response => onResponse(response));
  }

  editFood = (food, onResponse) => {
    axios.put(foodDictionaryUriFn(food.id),food)
    .then(response => onResponse(response));
  }

  addMeal = (meal, onResponse) => {
    axios.post(mealDictionaryUri,meal)
    .then(response => onResponse(response));
  }

  addFood = (food, onResponse) => {
    axios.post(foodDictionaryUri,food)
    .then(response => onResponse(response));
  }

  deleteMeal = (mealId, onResponse) => {
    axios.delete(mealDictionaryUriFn(mealId))
    .then(response => onResponse(response));
  }

  deleteFood = (foodId, onResponse) => {
    axios.delete(foodDictionaryUriFn(foodId))
    .then(response => onResponse(response));
  }
}

export const DictionaryServiceInstance = new DictionaryService();
