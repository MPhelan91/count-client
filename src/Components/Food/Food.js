import React from 'react';
import Units from '../../Types/Enums';
import {FaEdit, FaTrashAlt} from 'react-icons/fa'

import './Food.scss';

const food = (props) => (
    <div className='food'>
        <p>
          <font size='5'><u><b>{props.foodName}</b></u> -- </font>
          &nbsp;
          <b>Serving:</b> {props.servingSize}{Units[props.servingUnit]}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <b>Calories:</b> {props.calories}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <b>Protien:</b> {props.protien}
          <button onClick={props.onEditClick}><FaEdit size='20'/></button>
          <button onClick={props.onDeleteClick}><FaTrashAlt size='20'/></button>
        </p>
    </div>
);

export default food;