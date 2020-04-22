import React from 'react';
import '../Food/Food.scss'
import {FaEdit, FaTrashAlt} from 'react-icons/fa'

const meal = (props) => (
  <div className='food'>
      <p>
        <font size='5'><u><b>{props.mealName}</b></u> -- </font>
        &nbsp;
        <b>Calories:</b> {props.calories}
        &nbsp;&nbsp;&nbsp;&nbsp;
        <b>Protien:</b> {props.protien}
        <button onClick={props.onEditClick}><FaEdit size='20'/></button>
        <button onClick={props.onDeleteClick}><FaTrashAlt size='20'/></button>
      </p>
  </div>
);

export default meal;