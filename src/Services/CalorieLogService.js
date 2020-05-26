
import axios from 'axios';
import { CountUri } from './Common';

const calorieLogUri = CountUri + 'calorielog/getEntries';
const calorieCountUri = CountUri + 'calorielog/getCounts';
const calcNutritionUri = CountUri + 'calorielog/calcNutritionalInfo';
const addFoodUri = CountUri + 'calorielog/addFoodEntry';
const addManualUri = CountUri + 'calorielog/addManualEntry';
const addMealUri = CountUri + 'calorielog/addMealEntry';
const deleteFoodOrManualUri = (id) => CountUri + `calorielog/deleteFoodOrManualEntry/${id}`;
const deleteMealUri = (id) => CountUri + `calorielog/deleteMealEntry/${id}`;

export class CalorieLogService {
  getCalorieLog = (onResponse) => {
    axios.get(calorieLogUri)
      .then(response => onResponse(response));
  }

  getCalorieCounts = (onResponse) => {
    axios.get(calorieCountUri)
      .then(response => onResponse(response));
  }

  calcNutrition = (message, onResponse) => {
    axios.put(calcNutritionUri, message)
      .then(response => onResponse(response));
  }

  addFoodEntry = (entry, onResponse) => {
    axios.post(addFoodUri,entry)
    .then(response => onResponse(response));
  }

  addManualEntry = (nutritionalInfo, onResponse) => {
    axios.post(addManualUri,nutritionalInfo)
    .then(response => onResponse(response));
  }
  
  addMealEntry = (mealId, onResponse) => {
    axios.post(addMealUri,{mealId: mealId})
    .then(response => onResponse(response));
  }

  deleteFoodOrManualEntry = (foodEntryId, onResponse) => {
    axios.delete(deleteFoodOrManualUri(foodEntryId))
    .then(response => onResponse(response));
  }

  deleteMealEntry = (mealEntryId, onResponse) => {
    axios.delete(deleteMealUri(mealEntryId))
    .then(response => onResponse(response));
  }
}

export const CalorieLogServiceInstance = new CalorieLogService();