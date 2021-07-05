import React, { Component } from 'react';
import axios from 'axios';
import BarChart from './BarChart';
import './App.css';

//https://api.covid19api.com/summary

class ApiCall extends Component {

    componentWillMount() {
        this.getApiData();
    }

    getApiData() {
        axios.get(`https://api.covid19api.com/summary`)
        .then(res => {
            const countries = res.data.Countries;
            const global = res.data.Global;
            this.setState( {countries, global, chartData: {
                labels: ['New Confirmed','Total Confirmed','New Deaths','Total Deaths','New Recovered','Total Recovered'],
                datasets: [
                    {
                        label: 'Global',
                        data: [
                            global.NewConfirmed,
                            global.TotalConfirmed,
                            global.NewDeaths,
                            global.TotalDeaths,
                            global.NewRecovered,
                            global.TotalRecovered
                        ],
    
                        backgroundColor: [
                            'rgba(2, 117, 216,0.7)',
                            'rgba(92, 184, 92,0.7)',
                            'rgba(91, 192, 222,0.7)',
                            'rgba(240, 173, 78,0.7)',
                            'rgba(217, 83, 79,0.7)',
                            'rgba(41, 43, 44,0.7)'
                        ],
                    }
                ]
            }} );
        });
    }
    
    getCountry(event){

        var selected_country = event.target.value;

        if(selected_country === 'Global') 
            {
                this.setState( { chartData: {
                    labels: ['NewConfirmed','TotalConfirmed','NewDeaths','TotalDeaths','NewRecovered','TotalRecovered'],
                    datasets: [
                        {
                            label: 'Global',
                            data: [
                                this.state.global.NewConfirmed,
                                this.state.global.TotalConfirmed,
                                this.state.global.NewDeaths,
                                this.state.global.TotalDeaths,
                                this.state.global.NewRecovered,
                                this.state.global.TotalRecovered
                            ],

                            backgroundColor: [
                                'rgba(2, 117, 216,0.7)',
                                'rgba(92, 184, 92,0.7)',
                                'rgba(91, 192, 222,0.7)',
                                'rgba(240, 173, 78,0.7)',
                                'rgba(217, 83, 79,0.7)',
                                'rgba(41, 43, 44,0.7)'
                            ],
                        }
                    ]
                }
            } );
            }

        this.state.countries.map(Country => {
            if(selected_country === Country.Country) 
            {
                this.setState( { chartData: {
                    labels: ['New Confirmed','Total Confirmed','New Deaths','Total Deaths','New Recovered','Total Recovered'],
                    datasets: [
                        {
                            label: Country.Country,
                            data: [
                                Country.NewConfirmed,
                                Country.TotalConfirmed,
                                Country.NewDeaths,
                                Country.TotalDeaths,
                                Country.NewRecovered,
                                Country.TotalRecovered
                            ],

                            backgroundColor: [
                                'rgba(2, 117, 216,0.7)',
                                'rgba(92, 184, 92,0.7)',
                                'rgba(91, 192, 222,0.7)',
                                'rgba(240, 173, 78,0.7)',
                                'rgba(217, 83, 79,0.7)',
                                'rgba(41, 43, 44,0.7)'
                            ],
                        }
                    ]
                }
            } );
            }
			return null;
        });
    }

    constructor() {
        super();

        this.state = {
            countries: [],
            global: global,
            chartData: {}
        };

        this.getApiData = this.getApiData.bind(this);
        this.getCountry = this.getCountry.bind(this);
    }
    render() {
        return (
                <div>
                    <div className='form-group sel-dropdown'>
                        <select className='form-control' onChange={this.getCountry}>
                            <option>Global</option>
                        {this.state.countries.map(Country => 
                            <option key={Country.CountryCode}>{Country.Country}</option>
                            )}
                        </select>
                    </div>
                    <BarChart chartData={this.state.chartData} />
                </div>
        );
    }
}


export default ApiCall;
