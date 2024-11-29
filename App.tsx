import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Data  from './src/Data';
import Rawjson from './src/Rawjson';

const Stack = createNativeStackNavigator();
const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name='Home' component={Data}  />
                <Stack.Screen name='Rawjson' component={Rawjson} options={{title:"Raw JSON"}}/>
            </Stack.Navigator>
        
           
        </NavigationContainer>
    );
}

export default App;