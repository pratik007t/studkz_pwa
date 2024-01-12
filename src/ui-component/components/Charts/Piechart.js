import React from "react";
import Chart from "react-apexcharts";

export default function PieChart(props) {
  let options = {
    chart: {
      width: 380,
      type: 'pie',
    },
    tooltip: {
      show: true,

      formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
        return `$${value}.00`
      }

    },
    dataLabels: {
      position: 'top',
      enabled: true,
      formatter: function (val, opts) {
        return `${val}%`
      },
    },


    title: {
      text: props.title,
      align: 'left',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        fontFamily: undefined,
        color: '#263238'
      },
    },
    colors: ['#5b35f9', "#ef6900"],
    labels: ["Donors", "Hows"],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 300
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };
  let series = [660, 440];
  return (
    <>
      <Chart
        options={options}
        series={series}
        type="pie"
        width="400"
      />
    </>
  );
}

