import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';


class TotalWinsChart extends Component {
  render() {
    return (
      <div>
        <Bar
          data={this.props.data}
          width={100}
          height={500}
          options={{
            maintainAspectRatio: false,
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ cards }) => {
  const selected = cards.cards;

  const neededStats = [
    'total_kills',
    'total_deaths',
    'total_time_played',
    'total_matches_played',
    'total_wins',
    'total_mvps',
  ];

  const datasets = neededStats.map(stat => ({
    label: stat,
    backgroundColor: 'rgba(255,99,132,0.2)',
    borderColor: 'rgba(255,99,132,1)',
    borderWidth: 1,
    hoverBackgroundColor: 'rgba(255,100,132,0.4)',
    hoverBorderColor: 'rgba(255,99,132,1)',
    data: selected.map(user => user[stat]),
  }));

  const data = {
    labels: selected.map(user => user.nickname),
    datasets,
  };
  return {
    data,
  };
};


export default connect(mapStateToProps, null)(TotalWinsChart);
