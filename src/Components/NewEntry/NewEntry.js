import React, { Component } from "react";
import Select from 'react-select';
import {DictionaryServiceInstance} from "../../Services/DictionaryService";
import { CalorieLogServiceInstance } from "../../Services/CalorieLogService";

class NewEntry extends Component{
  state ={
    foods: [],
    meals:[],
    selectedFood:null,
    selectedMeal:null,
    protien: 0,
    calories: 0,
    servingSize: 0,
    servingUnit: 0,
  }

  setFoodState = (response) =>{
    this.setState({foods: response.data});
  }

  setMealState = (response) =>{
    this.setState({meals: response.data});
  }

  componentDidMount(){
    DictionaryServiceInstance.getFoodsServiceCall(this.setFoodState);
    DictionaryServiceInstance.getMealsServiceCall(this.setMealState);
  }

  handleChange(event, parser = (x) => {return x})  {
    this.setState({
      ...this.state,
      [event.target.name]: parser(event.target.value)});
  }

  getCaloriesFromMeal(id, meals){
    return meals.find(meal => meal.id === id).calories;
  }

  getProtienFromMeal(id, meals){
    return meals.find(meal => meal.id === id).protien;
  }

  calcNutritionalInfo(food, servingSize, servingUnit){
    if(food === null || isNaN(servingSize) || servingSize === 0) {
      this.setState({calories: 0, protien:0});
    } else{
      CalorieLogServiceInstance.calcNutrition(
        {foodId: food.value, serving: {serving: servingSize, servingUnit: servingUnit}},
        (_)=> {this.setState({calories: _.data.calories, protien: _.data.protien})})
    }
  }

  saveEntry(){
    let {selectedFood, selectedMeal, calories, protien} = this.state;
    let {onServiceResponse} = this.props;

    if(selectedMeal !== null){
      CalorieLogServiceInstance.addMealEntry(selectedMeal.value, onServiceResponse);
    }
    else if(selectedFood !== null){
      CalorieLogServiceInstance.addFoodEntry({foodId: selectedFood.value, info:{calories: calories, protien:protien}}, onServiceResponse);
    }
    else{
      CalorieLogServiceInstance.addManualEntry({calories: calories, protien:protien}, onServiceResponse);
    }
  }

  render(){
    var foodOptions = this.state.foods.map(o => ({label: o.foodName, value: o.id}));
    var mealOptions = this.state.meals.map(o => ({label: o.mealName, value: o.id}));

    let disableSave = isNaN(this.state.calories) || this.state.calories === 0;
    let disableManualEntry = this.state.selectedFood !== null || this.state.selectedMeal !== null;
    let disableServingEntry = this.state.selectedMeal !== null;


    return <div>
      <div>
        <Select label="Saved Foods" isClearable={true} options={foodOptions} value={this.state.selectedFood} onChange={_ => {
            this.calcNutritionalInfo(_, this.state.servingSize, this.state.servingUnit);
            this.setState({ selectedFood: _, selectedMeal:null});
          }}/>
        <Select label="Saved Meals" isClearable={true} options={mealOptions} value={this.state.selectedMeal}  onChange={_ =>
           this.setState({
             selectedMeal: _, 
             selectedFood: null, 
             servingSize: 0,
             calories: _ !== null ? this.getCaloriesFromMeal(_.value, this.state.meals) : 0, 
             protien: _ !== null ? this.getProtienFromMeal(_.value, this.state.meals): 0})}/>
      </div>
      <div style={{display:'flex'}}>
        <input disabled={disableServingEntry} value={this.state.servingSize} name="servingSize" label="Serving" type='number' onChange={_ => {
          this.calcNutritionalInfo(this.state.selectedFood, parseInt(_.target.value), this.state.servingUnit);
          this.handleChange(_, parseInt)}}
         />
        <select 
          disabled={disableServingEntry}
          name='servingUnit'
          value={this.state.servingUnit}
          onChange={_ => {
            this.calcNutritionalInfo(this.state.selectedFood, this.state.servingSize, parseInt(_.target.value));
            this.handleChange(_, parseInt);
            }}>
            <option value={0}>g</option>
            <option value={1}>oz</option>
            <option value={2}>lb</option>
            <option value={3}>L</option>
            <option value={4}>mL</option>
            <option value={5}>c</option>
        </select>
      </div>
      <div style={{display:'flex'}}>
        <input disabled={disableManualEntry} value={this.state.calories} name="calories" label="Calories"  type='number'onChange={_ => this.handleChange(_, parseInt)}/>
        <input disabled={disableManualEntry} value={this.state.protien} name="protien" label="Protien" type='number'onChange={_ => this.handleChange(_, parseInt)}/>
      </div>
      <button onClick={()=> this.props.closeForm()}>Cancel</button>
      <button disabled={disableSave} onClick={()=> this.saveEntry()}>Save</button>
    </div>;
  }
}


export default NewEntry;