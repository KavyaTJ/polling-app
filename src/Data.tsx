import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity,Image } from 'react-native';
import { ActivityIndicator } from 'react-native';

interface data{
  objectID:string,
  url:string,
  created_at:string,
  author:string,
  title:string

}
export default function Data({navigation}:any) {
    const[rowdata,setrowdata]=useState<Array<data>>([])
    const [render, setRender] = useState(false);
    const [page, setPage] = useState(1);
    const[Error,SetError]=useState<boolean>(false)
    const[loading,SetLoading]=useState<boolean>(false)
  
   

    const Polling = useCallback(async () => {
      try {
        const response = await axios.get(
          ` https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`
        );
        console.log(response.data.hits)
        setrowdata(response.data.hits);

        SetLoading(false)
      } catch (error) {
        console.log(error);
        SetError(true)
      }
    }, []);

      useEffect(() => {
        Polling();
        setTimeout(() => {
          setRender(!render);
       }, 10000);
      },[render]);

    
  return (
    <SafeAreaView style={{marginTop:15,marginLeft:5,marginRight:5}}>
      {rowdata ? (
        <FlatList
          keyExtractor={(item) => item.objectID}
          data={rowdata}
          showsVerticalScrollIndicator={false}
          initialNumToRender={5}
          onEndReached={()=>{ 
            //  console.log("scroll")
          setPage(page + 1);}}
         onEndReachedThreshold={0.5}
          ListHeaderComponent={() => {
            return (
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{ width: 100, borderColor: "gray", borderWidth: 1,fontSize:22,fontWeight:"600"}}
                >
                 Url
                </Text>
                <Text
                  style={{ width: 100, borderColor: "gray", borderWidth: 1,fontSize:22,fontWeight:"600" }}
                >
                  Title
                </Text>
                <Text
                  style={{ width: 100, height:60,borderColor: "gray", borderWidth: 1 ,fontSize:22,fontWeight:"600"}}
                >
                  Created at
                </Text>
                <Text
                  style={{ width: 100, borderColor: "gray", borderWidth: 1,fontSize:22,fontWeight:"600" }}
                >
                 Author
                </Text>
              </View>
            );
          }}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => {navigation.navigate("Rawjson",{item});}} style={{ flexDirection: "row" }}>
              
              <Text
                style={{ width: 100, borderColor: "gray", borderWidth: 1 }}
              >
                {item.url}
              </Text>
              <Text
                style={{ width: 100, borderColor: "gray", borderWidth: 1 }}
              >
                {item.title}
              </Text>
              <Text
                style={{ width: 100, borderColor: "gray", borderWidth: 1 }}
              >
                {item.created_at}
              </Text>
              <Text
                style={{ width: 100, borderColor: "gray", borderWidth: 1 }}
              >
                {item.author}
              </Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View>
          {Error ? (
            <>
              <View>
                <Text>Info not found</Text>
              </View>
            </>
          ) : (
            <View>
              {loading ? (
                  <ActivityIndicator animating={true} color="blue" size='large'/>
              ) : (
                <ActivityIndicator animating={true} color="blue" size='large'/>
              )}
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}


