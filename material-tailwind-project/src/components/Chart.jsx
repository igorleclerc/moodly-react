import React, { PureComponent } from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';



class RenderLineChart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            chartData: []
        };
    }

    componentDidMount() {
        this.fetchMoodData();
    }

    fetchMoodData = async () => {
        try {
            const user = firebase.auth().currentUser;
            const managerIud = user.uid;

            const thirtyDaysAgoTimestamp = Math.floor((Date.now() - 30 * 24 * 60 * 60 * 1000) / 1000);

            const querySnapshot = await firebase.firestore()
                .collection('moods')
                .where('managerIud', '==', managerIud)
                .where('date', '>=', firebase.firestore.Timestamp.fromMillis(thirtyDaysAgoTimestamp * 1000))
                .get();

            if (!querySnapshot.empty) {
                const satisfactionData = this.prepareSatisfactionData(querySnapshot);
                const stressData = this.prepareStressData(querySnapshot);
                const groupedSatisfaction = this.groupSatisfactionByDate(satisfactionData);
                const groupedStress = this.groupStressByDate(stressData);
                const calculatedAverageSatisfaction = this.calculateAverageSatisfaction(groupedSatisfaction);
                const calculatedAverageStress = this.calculateAverageStress(groupedStress);
                const chartData = this.prepareChartData(calculatedAverageSatisfaction, calculatedAverageStress);

                this.setState({ chartData });
            } else {
                console.log('No moods found');
            }
        } catch (error) {
            console.error("Error getting moods: ", error);
        }
    };

    prepareSatisfactionData = (querySnapshot) => {
        const satisfactionData = [];
        querySnapshot.forEach((doc) => {
            const satisfaction = doc.data();
            const satisfactionDate = satisfaction.date.toDate();
            const formattedDate = satisfactionDate.toISOString().split('T')[0];

            satisfactionData.push({ date: formattedDate, satisfaction: satisfaction.satisfaction });
        });
        console.log(satisfactionData);
        return satisfactionData;
    };

    prepareStressData = (querySnapshot) => {
        const stressData = [];
        querySnapshot.forEach((doc) => {
            const stress = doc.data();
            const stressDate = stress.date.toDate();
            const formattedDate = stressDate.toISOString().split('T')[0];

            stressData.push({ date: formattedDate, stress: stress.stress });
        });
        console.log(stressData);
        return stressData;
    }

    groupSatisfactionByDate = (satisfactionData) => {
        return satisfactionData.reduce((acc, curr) => {
            const date = curr.date;
            if (!acc[date]) {
                acc[date] = { sum: curr.satisfaction, count: 1 };
            } else {
                acc[date].sum += curr.satisfaction;
                acc[date].count++;
            }
            return acc;
        }, {});
    };

    groupStressByDate = (stressData) => {
        return stressData.reduce((acc, curr) => {
            const date = curr.date;
            if (!acc[date]) {
                acc[date] = { sum: curr.stress, count: 1 };
            } else {
                acc[date].sum += curr.stress;
                acc[date].count++;
            }
            return acc;
        }, {});
    };

    calculateAverageSatisfaction = (groupedSatisfaction) => {
        return Object.keys(groupedSatisfaction).map(date => {
            const average = groupedSatisfaction[date].sum / groupedSatisfaction[date].count;
            console.log("Average satisfaction", groupedSatisfaction);
            return { date, satisfaction: average };
        });
    };

    calculateAverageStress = (groupedStress) => {
        return Object.keys(groupedStress).map(date => {
            const average = groupedStress[date].sum / groupedStress[date].count;
            console.log("Average stress", groupedStress);
            return { date, stress: average };
        });
    }

    calculateAverageSatisfactionAndStress = (groupedSatisfaction, groupedStress) => {
        return Object.keys(groupedSatisfaction).map(date => {
            const averageSatisfaction = groupedSatisfaction[date].sum / groupedSatisfaction[date].count;
            const averageStress = groupedStress[date].sum / groupedStress[date].count;
            console.log("Average all", groupedSatisfaction);
            return { date, satisfaction: averageSatisfaction, stress: averageStress };
        });
    }
    
    
    prepareChartData = (calculatedAverageSatisfaction, calculatedAverageStress) => {
        return calculatedAverageSatisfaction.map(satisfaction => {
            const stress = calculatedAverageStress.find(stress => stress.date === satisfaction.date);
            return { name: satisfaction.date, satisfaction: satisfaction.satisfaction, stress: stress.stress };
        });
    }
    

    render () {
        const { chartData } = this.state;

        return (
            <ResponsiveContainer width="100%" height={300}>
                <LineChart width={600} height={300} data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="satisfaction" stroke="#1CE873" />
                    <Line type="monotone" dataKey="stress" stroke="#1CD4E8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        );
    }
}


export default RenderLineChart;