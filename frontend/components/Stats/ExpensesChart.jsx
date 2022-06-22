import {useEffect, useState} from 'react'
import {View, SafeAreaView, Dimensions, ActivityIndicator, Button, Text} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const ExpensesChart = (props)=>{
    
    
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const getRandomColor = ()=>{
        let r = Math.random()*0.75*255 + 255*0.2
        let g = Math.random()*0.75*255 + 255 *0.23
        let b = Math.random()*0.75*255 + 254*0.5
        return `rgb(${parseInt(r)}, ${parseInt(g)}, ${parseInt(b)})`
    }

    useEffect(()=>{
        setData( [
           {name:"food", amount:400,color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15},
           {name:"travel", amount:40,color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
           {name:"education", amount:34,color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 15 }
        ])

        axiosInstance.get("/stats/spent").then(res=>{
            let filteredData = {
                categories: {  },
                
            }
            res.data.map(item=>{
                if(filteredData.categories.hasOwnProperty(item.category)){
                    filteredData.categories[item.category] += item.amount
                }else{
                    filteredData.categories[item.category] = item.amount
                }

            })
            let finalData = []
            Object.keys(filteredData.categories).map(key=>{
                console.log(getRandomColor())
                finalData.push({
                    name:key,
                    amount: filteredData.categories[key],
                    legendFontColor: '#7F7F7F', legendFontSize: 15,
                    color:getRandomColor()
                })
            })
            setData(finalData)
            setLoading(false)

            // setLabels(Object.keys(filteredData.dates))
            // setData(Object.values(filteredData.dates))
            // setLoading(false)
            
        }).catch(e=>{
            console.log(e)
        })
    },[])
    const logOut = ()=>{
        const f = ()=>{
            AsyncStorage.setItem("x-auth-token","").then(()=>{
              props.reloadApp()
            }).catch(e=>{
                console.log(e)
            })
        }
        f()
            
    }
    const dataExists =()=>{
        return JSON.stringify(data) != JSON.stringify([])
    }
    return (
        <SafeAreaView style={[styles.card, {backgroundColor:"white"}]}> 
                { loading ?<ActivityIndicator />: dataExists()? <PieChart
                data={data}
                width={Dimensions.get("window").width*0.8} // from react-native
                height={220}
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
                accessor="amount"
               
              />:<Text>No data to display</Text>}
              <Button title="Log Out" onPress={logOut}/>
        </SafeAreaView>        

    )
}
export default ExpensesChart