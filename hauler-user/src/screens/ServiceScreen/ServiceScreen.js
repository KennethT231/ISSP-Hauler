import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

export default function ServiceScreen({ navigation }) {

    return(
        <View style = {styles.root}>
            <View style={styles.header}>
              <Text style={styles.headerText}>OPTIONS</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('AddJunkNavigator',{ screen: 'AddItemScreen',  params: { operation: "create", postId: ""}})} style={styles.button}>
                <Text style={styles.btnText}>JUNK REMOVAL</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ErrandNavigator', { screen: 'ErrandPost1', params: { service: "Moving", operation: "create", postId: "" } })} style={styles.button}>
                <Text style={styles.btnText}>MOVING</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ErrandNavigator', { screen: 'ErrandPost1', params: { service: "Errand", operation: "create", postId: "" } })} style={styles.button}>
                <Text style={styles.btnText}>ERRAND</Text>
            </TouchableOpacity>
        </View>
    )
}