import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import './App.css';


class BarChart extends Component {

    render() {
        
        return (
            <div>
                <Bar 
                   data={this.props.chartData}
                    height={450}
                    width={800}
                    options={{
                        maintainAspectRatio: false, 
                        responsive: true,
                        title: {
                            display: true,
                            text: 'COVID-19 CASES STATS',
                            fontSize: '15'
                        },
                        legend: {
                            display: true,
                            position: 'top',
                        },
                        plugins: {
                            datalabels: {
                                display: true,
                                color: 'black',
                                anchor: "end",
                                align: 'top',
                                offset: '2'
                             }
                        }
                        
                    }}/>
            </div>
        );
    }
}

export default BarChart;