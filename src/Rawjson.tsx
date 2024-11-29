import React from 'react'
import { View ,Text, SafeAreaView} from 'react-native'

export default function Rawjson({ route }: any) {
  return (
    <SafeAreaView>
      <View>
        <Text style={{ fontSize: 26, fontWeight: "600", textAlign: "center" }}>
          Raw Json
        </Text>
        <Text style={{ fontSize: 14 }}>
          {JSON.stringify(route.params.item, null, 4)}
        </Text>
      </View>
    </SafeAreaView>
  );
}
