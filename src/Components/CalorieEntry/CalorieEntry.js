
import React from 'react';
import {FaTrashAlt, FaRegCopy} from 'react-icons/fa'

import '../Food/Food.scss';

const calorieEntry = (props) => (
    <div className='food'>
      <div style={{display:"flex", justifyContent:"flex-start", alignContent:"baseline"}}>
        <font size='5'><u><b>{props.name}</b></u> -- </font>
        &nbsp;
        <b>Calories:</b> {props.calories.toFixed()}
        &nbsp;&nbsp;&nbsp;&nbsp;
        <b>Protien:</b> {props.protien.toFixed()}
      </div>
      <div style={{display:"flex", justifyContent:"flex-end", alignContent:"baseline"}}>
          <input type="checkbox" onChange={props.onChecked}/>
          <button onClick={props.onCopyClick}><FaRegCopy size='20'/></button>
          <button onClick={props.onDeleteClick}><FaTrashAlt size='20'/></button>
      </div>
    </div>
);

export default calorieEntry;