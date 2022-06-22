import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Stats from '../Stats/Stats'

const Stack = createNativeStackNavigator()

const StatsStack = (props)=>{
    return (
        <Stack.Navigator>
            <Stack.Screen name="Stats" children={()=><Stats reloadApp={props.reloadApp}/>}/>
        </Stack.Navigator>
    ) 
}
export default StatsStack