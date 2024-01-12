import React from "react";
import Chart from "react-apexcharts";
export default function LineChart(props) {


  let options = {
    noData: {
      text: "Loading...."
    },
    tooltip: {

      y: {
        show: true,

        formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
          return `$${value}.00`
        }
      }

    },


    stroke: {
      width: 1
    },

    chart: {

      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      },
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true | '<img src="/static/icons/reset.png" width="20">',
          customIcons: []
        },
        export: {
          csv: {
            filename: `HollyPennies-report-${new Date().getTime()}`,
            columnDelimiter: ',',
            headerCategory: 'category',
            headerValue: 'value',
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString()
            }
          },
          svg: {
            filename: `HolyPennies-report-${new Date().getTime()}`,
          },
          png: {
            filename: `HolyPennies-report-${new Date().getTime()}`,
          }
        },
        autoSelected: `HollyPennies-report-${new Date().getTime()}`
      },
    },
    xaxis: {

      categories: props.xcat

    },
    colors: ['#5b35f9', '#00FF00'],
    title: {
      text: "",
      align: 'center',
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
    subtitle: {
      text: "Date (DD-MM-YYYY)",
      align: 'left',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: '12px',
        fontWeight: 'normal',
        fontFamily: undefined,
        color: '#9699a2'
      },
    }
  }
  let series = props.data;

  return (
    <>
      <Chart
        options={options}
        series={series}
        type="line"
        width={props.width}
        height={props.height}
      />
    </>
  );
}

