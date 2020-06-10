import React, { Component } from "react";
import { CalorieLogServiceInstance } from "../../Services/CalorieLogService";
import CalorieEntry from "../CalorieEntry/CalorieEntry";
import NewEntry from "../NewEntry/NewEntry";
import { FaCaretLeft, FaCaretRight, FaPlus } from 'react-icons/fa';
import '../Dictionary/Dictionary.css';
import { EntryType } from "../../Types/Enums";
var moment = require('moment');

class CalorieLog extends Component{
  state = {
    entries: [],
    counts:{
      calories: 0,
      protien: 0
    },
    addEntryMode:false,
    errorMessage: undefined,
    logDate: new Date()
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
        onCopyClick={() => entry.type === EntryType.Meal ?
          CalorieLogServiceInstance.copyMealEntry(entry.id , this.handleResponse) : 
          CalorieLogServiceInstance.copyFoodEntry(entry.id, this.handleResponse)} 
        onDeleteClick={() => entry.type === EntryType.Meal ?
          CalorieLogServiceInstance.deleteMealEntry(entry.id , this.handleResponse) : 
          CalorieLogServiceInstance.deleteFoodOrManualEntry(entry.id, this.handleResponse)} 
      />
      })
  }

  componentDidMount(){
    this.loadCalorieLog(this.state.logDate);
  }

  closeEntryForm = () => {
    this.setState({addEntryMode:false})
  }

  handleResponse = (response) => {
    if(response.data.status !== undefined && response.data.status === 'failure'){
      this.setState({errorMessage: response.data.failureMessage})
    }
    else{
      CalorieLogServiceInstance.getCalorieLog(this.setEntryState, this.state.date);
      CalorieLogServiceInstance.getCalorieCounts(this.setCountState, this.state.date);
      this.closeEntryForm();
    }
  }

  loadCalorieLog(date){
    CalorieLogServiceInstance.getCalorieLog(this.setEntryState, date);
    CalorieLogServiceInstance.getCalorieCounts(this.setCountState, date);
  }

  render(){
    let {counts, addEntryMode, errorMessage, logDate} = this.state;
    let disableRightArrow = logDate.toDateString() === (new Date()).toDateString(); 

    let totals = <div>
      <p>Total Calories: {counts.calories.toFixed()} || Total Protien: {counts.protien.toFixed()}</p>
    </div>
    let pageContent = addEntryMode ?
      <NewEntry
        onServiceResponse={this.handleResponse}
        closeForm={this.closeEntryForm}/> :
      <div className='tabs'>
        <div>
          <button onClick={()=> {
            let dayBefore = moment(logDate).subtract(1, 'days').toDate();
            this.setState({logDate: dayBefore});
            this.loadCalorieLog(dayBefore);
            }}> <FaCaretLeft size='20'/></button>
          <input type="date" value={moment(logDate).format("YYYY-MM-DD")}/>
          <button disabled={disableRightArrow} onClick={()=> {
            let dayAfter = moment(logDate).add(1, 'days').toDate();
            this.setState({logDate: dayAfter});
            this.loadCalorieLog(dayAfter);
            }}><FaCaretRight size='20'/></button>
        </div>
        <button disabled={!disableRightArrow} onClick={()=> this.setState({addEntryMode:true})}><FaPlus size='20'/></button>
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