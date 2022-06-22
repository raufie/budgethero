import {createNativeStackNavigator} from '@react-navigation/native-stack'

import AddItem from '../AddItem/AddItem'
const Stack = createNativeStackNavigator()

const AddAssetStack = ()=>{
    return (
        <Stack.Navigator>
            <Stack.Screen name="Add Asset" children={(props)=><AddItem title="Add Asset" navigation={props.navigation} />}/>
        </Stack.Navigator>
    ) 
}
export default AddAssetStack