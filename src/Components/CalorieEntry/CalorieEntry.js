
import React from 'react';
import {FaTrashAlt} from 'react-icons/fa'

import '../Food/Food.scss';

const calorieEntry = (props) => (
    <div className='food'>
        <p>
          <font size='5'><u><b>{props.name}</b></u> -- </font>
          &nbsp;
          <b>Calories:</b> {props.calories}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <b>Protien:</b> {props.protien}
          <button onClick={props.onDeleteClick}><FaTrashAlt size='20'/></button>
        </p>
    </div>
);

export default calorieEntry;