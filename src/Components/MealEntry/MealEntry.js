import React, { Component } from 'react';
import '../FoodEntry/FoodEntry.scss'

class MealEntry extends Component{
  constructor(props){
    super(props);
    this.state = {
      id: props.meal.id,
      mealName: props.meal.mealName,
      calories: props.meal.calories,
      protien: props.meal.protien,
    }
  }

  handleChange(event, parser = (x) => {return x})  {
    this.setState({
      ...this.state,
      [event.target.name]: parser(event.target.value)});
  }

  getMealFromForm = () => {
    return {
      id: this.state.id,
      mealName: this.state.mealName,
      calories: this.state.calories,
      protien: this.state.protien,
    };
  }

  render() {
    return (
    <div>
      <div className='food-entry'>
        <div>
          <label>Meal Name:</label>
          <input
            type="text"
            name='mealName'
            value={this.state.mealName}
            onChange={_ => this.handleChange(_)}/>
        </div>
        <div>
          <label>Calories:</label>
          <input
            type="number"
            name='calories'
            value={this.state.calories}
            onChange={_ => this.handleChange(_, parseInt)}/>
        </div>
        <div>
          <label>Protien:</label>
          <input
            type="number"
            name='protien'
            value={this.state.protien}
            onChange={_ => this.handleChange(_, parseInt)}/>
        </div>
      </div>
      <button className='sbutton' onClick={_=>this.props.onSaveClick(this.getMealFromForm(), this.props.onServiceResponse)}>Save</button>
      <button className='sbutton' onClick={_=>this.props.closeForm(true)}>Cancel</button>
    </div>);
  }
}

export default MealEntry;