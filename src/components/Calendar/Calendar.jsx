
import React, {Component} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { addDays, subDays } from 'date-fns';

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

    exluir = [
      {
        desde: '25-11-19',
        dias: 12
      },
      {
        desde: '25-11-19',
        hasta: '30-11-19'
      },
      {

      }
    ]

    render() {
      var CurrentDate = new Date();
      console.log("Current date:", CurrentDate);

          const exclude =  [
            subDays(new Date(), 4),
            subDays(new Date(), 3),
            subDays(new Date(), 2),
            addDays(new Date(), 10),
            addDays(new Date(), 11),
            addDays(new Date(), 12),
          ]

          console.log(exclude);

      return (
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
          excludeDates={exclude}
        />
      );
    }
  }

export default Calendar