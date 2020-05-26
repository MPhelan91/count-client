import React, { Component } from "react";
import Dictionary from "../Dictionary/Dictionary";
import CalorieLog from "../CalorieLog/CalorieLog";
import '../Dictionary/Dictionary.css';

class MainPage extends Component{
  state = {
    selectedTab: 'CalorieLog'
  }

  render(){
    let tab = <></>;

    switch (this.state.selectedTab) {
      case 'Dictionary': tab =
        (<div className="tab-content">
          <Dictionary/>
        </div>);
        break;
      default: tab = (
        <div className="tab-content">
          <CalorieLog/>
        </div>);
    }

    return(
      <div>
        <div className='tabs'>
          <button className='tab-header' onClick={_ => this.setState({ selectedTab: 'CalorieLog' })}>Calorie Log</button>
          <button className='tab-header' onClick={_ => this.setState({ selectedTab: 'Dictionary' })}>Dictionary</button>
        </div>
        {tab}
      </div>
    );
  }
}

export default MainPage;