import React, { Component } from "react";
import { CalorieLogServiceInstance } from "../../Services/CalorieLogService";
import CalorieEntry from "../CalorieEntry/CalorieEntry";
import NewEntry from "../NewEntry/NewEntry";
import { FaPlus } from 'react-icons/fa';
import '../Dictionary/Dictionary.css';
import { EntryType } from "../../Types/Enums";

class CalorieLog extends Component{
  state = {
    entries: [],
    counts:{
      calories: 0,
      protien: 0
    },
    addEntryMode:false,
    errorMessage: undefined
  }

  setEntryState = (response) =>{
    this.setState({entries: response.data});
  }

  setCountState = (response) =>{
    this.setState({counts: response.data});
  }

  entriesToEntryComponent(){
    return this.state.entries.map(entry => {
      return <CalorieEntry
        name = {entry.name}
        calories = {entry.calories}
        protien = {entry.protien}
        onDeleteClick={() => entry.type === EntryType.Meal ?
          CalorieLogServiceInstance.deleteMealEntry(entry.id , this.handleResponse) : 
          CalorieLogServiceInstance.deleteFoodOrManualEntry(entry.id, this.handleResponse)} 
      />
      })
  }

  componentDidMount(){
    CalorieLogServiceInstance.getCalorieLog(this.setEntryState);
    CalorieLogServiceInstance.getCalorieCounts(this.setCountState);
  }

  closeEntryForm = () => {
    this.setState({addEntryMode:false})
  }

  handleResponse = (response) => {
    if(response.data.status !== undefined && response.data.status === 'failure'){
      this.setState({errorMessage: response.data.failureMessage})
    }
    else{
      CalorieLogServiceInstance.getCalorieLog(this.setEntryState);
      CalorieLogServiceInstance.getCalorieCounts(this.setCountState);
      this.closeEntryForm();
    }
  }

  render(){

    let {counts, addEntryMode, errorMessage} = this.state;

    let totals = <div>
      <p>Total Calories: {counts.calories} || Total Protien: {counts.protien}</p>
    </div>
    let pageContent = addEntryMode ?
      <NewEntry
        onServiceResponse={this.handleResponse}
        closeForm={this.closeEntryForm}/> :
      <div className='tabs'>
        <button onClick={()=> this.setState({addEntryMode:true})}><FaPlus size='20'/></button>
        {this.entriesToEntryComponent()}
      </div>

    return <div>
      {totals}
      {pageContent}
      {errorMessage && <p className='error-text'>{errorMessage}</p>}
    </div>;
  }
}

export default CalorieLog;