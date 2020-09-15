//chart-data.js
export const planetChartData = {
  type: 'line',
  data: {
    labels: [
      'Mercury',
      'Venus',
      'Earth',
      'Mars',
      'Jupiter',
      'Saturn',
      'Uranus',
      'Neptune',
    ],
    datasets: [
      {
        label: '평균가',
        data: [4.8, 12.1, 12.7, 6.7, 139.8, 116.4, 50.7, 49.2],
        backgroundColor: ['rgba(71, 183, 132, .5)'],
        borderColor: ['#47b784'],
        borderWidth: 3,
      },
    ],
  },
  options: {
    responsive: true,
    lineTension: 1,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            padding: 25,
          },
        },
      ],
    },
  },
};

export default planetChartData;
