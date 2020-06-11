
import axios from 'axios';
import { CountUri } from './Common';
var moment = require('moment');

const calorieLogUri = (date) => CountUri + `calorielog/getEntries/${date}`;
const calorieCountUri = (date) => CountUri + `calorielog/getCounts/${date}`;
const calcNutritionUri = CountUri + 'calorielog/calcNutritionalInfo';
const addFoodUri = CountUri + 'calorielog/addFoodEntry';
const addManualUri = CountUri + 'calorielog/addManualEntry';
const addMealUri = CountUri + 'calorielog/addMealEntry';
const deleteCalorieEntryUri = (id) => CountUri + `calorielog/deleteCalorieEntry/${id}`;
const copyCalorieEntryUri = (id) => CountUri + `calorielog/copyCalorieEntry/${id}`;

export class CalorieLogService {
  getCalorieLog = (onResponse, date) => {
    axios.get(calorieLogUri(moment(date).format("YYYY-MM-DD")))
      .then(response => onResponse(response));
  }

  getCalorieCounts = (onResponse, date) => {
    axios.get(calorieCountUri(moment(date).format("YYYY-MM-DD")))
      .then(response => onResponse(response));
  }

  calcNutrition = (message, onResponse) => {
    axios.put(calcNutritionUri, message)
      .then(response => onResponse(response));
  }

  copyCalorieEntry = (id, onResponse) => {
    axios.post(copyCalorieEntryUri(id))
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

  deleteCalorieEntry = (entryId, onResponse) => {
    axios.delete(deleteCalorieEntryUri(entryId))
    .then(response => onResponse(response));
  }
}

export const CalorieLogServiceInstance = new CalorieLogService();