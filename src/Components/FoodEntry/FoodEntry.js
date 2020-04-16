import React, { Component } from 'react';
import './FoodEntry.scss'

class FoodEntry extends Component{
  constructor(props){
    super(props);
    this.state = {
      id: props.food.id,
      foodName: props.food.foodName,
      servingSize: props.food.servingSize,
      servingUnit: props.food.servingUnit,
      calories: props.food.calories,
      protien: props.food.protien,
    }
  }

  handleChange(event, parser = (x) => {return x})  {
    this.setState({
      ...this.state,
      [event.target.name]: parser(event.target.value)});
  }

  getFoodFromForm = () => {
    return {
      id: this.state.id,
      foodName: this.state.foodName,
      servingSize: this.state.servingSize,
      servingUnit: this.state.servingUnit,
      calories: this.state.calories,
      protien: this.state.protien,
    };
  }

  render() {
    return (
    <div>
      <div className='food-entry'>
        <div>
          <label>Food Name:</label>
          <input
            type="text"
            name='foodName'
            value={this.state.foodName}
            onChange={_ => this.handleChange(_)}/>
        </div>
        <div>
          <label>Serving:</label>
          <input
            type="number"
            name='servingSize'
            value={this.state.servingSize}
            onChange={_ => this.handleChange(_, parseInt)}/>
          <select 
            name='servingUnit'
            value={this.state.servingUnit}
            onChange={_ => this.handleChange(_, parseInt)}>
              <option value={0}>g</option>
              <option value={1}>oz</option>
              <option value={2}>lb</option>
              <option value={3}>L</option>
              <option value={4}>mL</option>
              <option value={5}>c</option>
          </select>
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
      <button className='sbutton' onClick={_=>this.props.onSaveClick(this.getFoodFromForm())}>Save</button>
      <button className='sbutton' onClick={_=>this.props.closeFoodForm(true)}>Cancel</button>
    </div>);
  }
}

export default FoodEntry;