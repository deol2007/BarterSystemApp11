import { Component } from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import {SwipeListView} from "react-native-swipe-list-view"
import db from "../config"

export default class SwipeableFlatlist extends Component(){

    updateMarkAsread =(notification)=>{
        db.collection("all_notifications").doc(notification.doc_id).update({
            "notification_status" : "read"
        })
    }

    renderItem = data => (

        <ListItem
        title={data.item.item_name}
        titleStyle={{ color: 'black', fontWeight: 'bold'}}
        subltitle={data.iten.message}
        bottomDivider
        />
    );

    renderHiddenItem = () => (
        <View style={styles.rowback}>
            <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
                <Text style={stlyes.backTextWhite}></Text>
            </View>
        </View>
    )

    onSwipeValueChange = swipeData => { 
        var allNotifications = this.state.allNotifications 
        const {key,value} = swipeData; 
        if(value < -Dimensions.get('window').width)
        { const newData = [...allNotifications];
            const prevIndex = allNotifications.findIndex(
                item => item.key === key
                );
            this.updateMarkAsread(allNotifications[prevIndex]);
            newData.splice(prevIndex, 1);
            this.setState({allNotifications : newData}) 
        }; 
    };
    render(){
        return(
            <View style={StyleSheet.container}>
                <SwipeListView
                    disableRightSwipe
                    data={this.state.allNotifications}
                    renderItem={this.renderHiddenItem}
                    rightOpenValue={-Dimensions.get('window').width}
                    previewRowKey={'0'}
                    previewOpenValue={-40}
                    previewOpenDelay={3000}
                    onSwipeValueChange={this.onSwipeValueChange}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({ 
    container: { 
        backgroundColor: 'white', 
        flex: 1, 
    }, 
    backTextWhite: { 
        color: '#FFF', 
        fontWeight:'bold', 
        fontSize:15 
    }, 
        rowBack: { 
            alignItems: 'center', 
            backgroundColor: '#29b6f6', 
            flex: 1, 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            paddingLeft: 15, 
        }, 
        backRightBtn: { 
            alignItems: 'center', 
            bottom: 0, 
            justifyContent: 'center', 
            position: 'absolute', 
            top: 0, 
            width: 100, 
        }, 
        backRightBtnRight: { 
            backgroundColor: '#29b6f6', 
            right: 0, 
        }, 
});