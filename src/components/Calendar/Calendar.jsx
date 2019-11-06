
import React, {Component} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

// Documentacion del datepicker
// https://reactdatepicker.com/#example-no-anchor-arrow

class Calendar extends Component {
    state = {
      startDate: new Date()
    };
  
    handleChange = date => {
      this.setState({
        startDate: date
      });
    };
  
    render() {
      var CurrentDate = new Date();
      console.log("Current date:", CurrentDate);
      CurrentDate.setMonth(CurrentDate.getMonth() + 1);
      console.log('current ahora', CurrentDate);
      return (
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
          minDate={new Date()}
          maxDate={CurrentDate}
          excludeDates={[new Date()]}
        />
      );
    }
  }

export default Calendar