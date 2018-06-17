import React, { Component } from 'react';
import {connect} from "react-redux";
import {Bar} from 'react-chartjs-2';



class TotalWinsChart extends Component {



  render() {
    return (
      <div>
        <Bar
          data={this.props.data}
          width={100}
          height={50}
          options={{
            maintainAspectRatio: false
          }}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ cards }) => {
  const selected = cards.cards;

  const labels = selected.map(user => user.nickname)
  const values = selected.map(user => user.total_wins)
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: values
      }
    ]
  };
  return {
    data
  }
}


export default connect(mapStateToProps, null)(TotalWinsChart)