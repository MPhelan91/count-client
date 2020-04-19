import React, { Component } from 'react';
import Food from '../Food/Food';
import Meal from '../Meal/Meal';
import {DictionaryServiceInstance} from '../../Services/DictionaryService';

import './Dictionary.css';
import FoodEntry from '../FoodEntry/FoodEntry';
import { FaPlus } from 'react-icons/fa';

class Dictionary extends Component {
  state = {
    foods: [],
    selectedFood: undefined,
    meals: [],
    showMealModal: false,
    selectedMeal: undefined,
    selectedTab: 'Foods',
    errorMessage: undefined
  }

  mealsToMealComponents() {
    return this.state.meals.map(meal => {
      return <Meal
        mealName={meal.mealName}
        calories={meal.calories}
        protien={meal.protien} 
        onEditClick={() => this.setState({showMealModal: true})}/>;
    });
  }

  foodsToFoodComponents() {
    return this.state.foods.map(food => {
      return <Food
        foodName={food.foodName}
        servingSize={food.servingSize}
        servingUnit={food.servingUnit}
        calories={food.calories}
        protien={food.protien} 
        onDeleteClick={() => DictionaryServiceInstance.deleteFood(food.id, this.handleResponse)} 
        onEditClick={() => this.setState({selectedFood:food})} />;
    });
  }

  newFood(){
    return {
      id: 0,
      foodName: "",
      calories: 0,
      protien: 0,
      servingSize: 0,
      servingUnit: 1
    };
  }

  setFoodState = (response) => {
    this.setState({foods: response.data});
  }

  setMealState = (response) => {
    this.setState({meals: response.data});
  }

  componentDidMount() {
    DictionaryServiceInstance.getFoodsServiceCall(this.setFoodState);
    DictionaryServiceInstance.getMealsServiceCall(this.setMealState);
  }

  handleResponse = (response) => {
    if(response.data.status !== undefined && response.data.status === 'failure'){
      this.setState({errorMessage: response.data.failureMessage})
    }
    else{
      this.closeFoodForm(false);
    }
  }

  closeFoodForm = (cancel) =>{
    this.setState({selectedFood: undefined});
    this.setState({errorMessage: undefined})
    if(!cancel){
      DictionaryServiceInstance.getFoodsServiceCall(this.setFoodState);
    }
  }

  buildDictionary(){
    let tab = <></>;

    switch (this.state.selectedTab) {
      case 'Meals': tab =
        (<div className="tab-content">
          {this.mealsToMealComponents()}
        </div>);
        break;
      default: tab = (
        <div className="tab-content">
          {this.foodsToFoodComponents()}
        </div>);
    }

    return (
      <div>
        <div className='tabs'>
          <button className='tab-header' onClick={_ => this.setState({ selectedTab: 'Foods' })}>Food Library</button>
          <button className='tab-header' onClick={_ => this.setState({ selectedTab: 'Meals' })}>Meal Library</button>
          <button className='add-button' onClick={_ => this.setState({ selectedFood: this.newFood()})}><FaPlus size='20'/></button>
        </div>
        {tab}
      </div>
    );
  }

  render() {
    
    let pageContent = this.state.selectedFood !== undefined && this.state.selectedFood.id > 0
    ? <FoodEntry
        food = {this.state.selectedFood}
        onSaveClick = {DictionaryServiceInstance.editFood}
        onServiceResponse = {this.handleResponse}
        closeFoodForm={this.closeFoodForm}/>

    : this.state.selectedFood !== undefined && this.state.selectedFood.id === 0
    ? <FoodEntry
        food = {this.state.selectedFood}
        onSaveClick = {DictionaryServiceInstance.addFood}
        onServiceResponse = {this.handleResponse}
        closeFoodForm={this.closeFoodForm}/>

    : this.buildDictionary(); 

    return (
      <div>
        {pageContent}
        {this.state.errorMessage && <p className='error-text'>{this.state.errorMessage}</p>}
      </div>
    );
  }
}

export default Dictionary;