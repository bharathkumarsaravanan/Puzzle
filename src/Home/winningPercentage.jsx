import React from "react";
import Chart from "react-apexcharts";

function WinningPercentage(props){
    var options = {
        chart: {
          id: "basic-bar"
        },
        plotOptions: {
            bar: {
                horizontal: true
            }
        },
        xaxis: {
          categories: ['destination']
        }
      }
    var series =  [
        {
          name: "series-1",
          data: [props.value]
        }
      ]

    return(
        <Chart 
            className="chart"
            options = {options}
            series = {series}
            type = "bar"
            width = "500"
            height= "120"
        />
    )
}

export default WinningPercentage;