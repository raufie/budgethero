import {useEffect, useState} from 'react'
import {View, SafeAreaView, Dimensions, ActivityIndicator, Text} from 'react-native'
import PureChart from 'react-native-pure-chart';
import styles from '../../styles/styles'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import axiosInstance from '../../services/AxiosInstance'
const CashEarnedChart = ()=>{
    const [data, setData] = useState([])
    const [labels, setLabels] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
       
        axiosInstance.get("/stats/earned").then(res=>{
            let filteredData = {
                dates: {
             },
                
            }
            res.data.map(item=>{
                const jsDateString= new Date(item.date).toLocaleDateString("en-us")

                if(filteredData.dates.hasOwnProperty(jsDateString)){
                    filteredData.dates[jsDateString] += item.amount
                }else{
                    filteredData.dates[jsDateString] = item.amount
                }

            })

            setLabels(Object.keys(filteredData.dates))
            setData(Object.values(filteredData.dates))
            setLoading(false)
            
        }).catch(e=>{
            console.log(e)
        })
    },[])
    const dataExists = ()=>{
        return JSON.stringify(data) != JSON.stringify([]) && JSON.stringify(labels)!=JSON.stringify([]) 
    }
    return (
       <SafeAreaView style={[styles.card, {backgroundColor:"darkgrey"}]}> 
        {loading ? <ActivityIndicator />: dataExists() ? <LineChart
                style={{width:"90%", }}
                data={{
                labels: labels,
                datasets: [
                    {
                    data:data
                    }
                ]
                }} 
                
                width={Dimensions.get("window").width*0.8} // from react-native
                height={220}
                yAxisLabel=""
                yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                    borderRadius: 16
                },
                propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726"
                }
                }}
                    bezier
                    style={{
                    marginVertical: 8,
                    borderRadius: 16
                    }}
            /> : <Text>No data to display</Text>} 
            
        </SafeAreaView>        

    )
}
export default CashEarnedChart