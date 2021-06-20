//import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffec} from 'react'
import { StyleSheet, View, Platform } from 'react-native'
import { Text, Overlay, ListItem, Badge} from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import {SAge, SWeight, SHeight, BSL, SType} from './inputs'
import { DIN_M, WEIGHTS, HEIGHTS, BSLS, STYPES} from './data'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  inputs: {
    flex: 1,
  },
  din: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

const Inputs = (props) => {

  const [visible, setVisible] = useState(false)
  const [content, setContent] = useState()

  const toggleOverlay = () => {
    setVisible(!visible)
  }

  const closeOverlay = () => {
    setVisible(false)
  }

  const components = [
    {
      title: 'Skier Age',
      content: <SAge
        closeOverlay={closeOverlay}
        age={props.age}
        setAge={props.setAge}
      />,
      badge: props.age
    },
    {
      title: 'Skier Weight',
      content: <SWeight
        closeOverlay={closeOverlay}
        weight={props.weight}
        setWeight={props.setWeight}
      />,
      badge: props.weight
    },
    {
      title: 'Skier Height',
      content: <SHeight
        closeOverlay={closeOverlay}
        height={props.height}
        setHeight={props.setHeight}
      />,
      badge: props.height
    },
    {
      title: 'Boot Sole Length',
      content: <BSL
        closeOverlay={closeOverlay}
        bsl={props.bsl}
        setWeight={props.setBsl}
      />,
      badge: props.bsl
    },
    {
      title: 'Skier Type',
      content: <SType
        closeOverlay={closeOverlay}
        type={props.type}
        setType={props.setType}
      />,
      badge: props.stype
    },
  ]

  return(
    <View style = {styles.inputs}>
      {
        components.map((l, i) => (
          <ListItem key={i} bottomDivider onPress={() => {
            toggleOverlay()
            setContent(l.content)
          }}>
            <ListItem.Content>
              <ListItem.Title>{l.title}</ListItem.Title>
            </ListItem.Content>
            {l.badge && (<Badge value={l.badge} status="primary" />)}
            <ListItem.Chevron />
          </ListItem>
        ))
      }
      <Overlay
        visible= {visible}
        onBackdropPress={toggleOverlay}
        fullScreen={true}
        animationType={'slide'}>
        {content}
      </Overlay>
    </View>
  );
};

const Din = (props) => {
  return(
    <View style = {styles.din} >
     <Text h1>{props.din}</Text>
    </View>
  );
};

export default function App() {

  const [age, setAge] = useState(null)
  const [weight, setWeight] = useState(null)
  const [height, setHeight] = useState(null)
  const [bsl, setBsl] = useState(null)
  const [stype, setStype] = useState(null)

  const setDIN = (a, w, h, b, s) => {
    return "test"
  }

  return (
    <SafeAreaView style = {{ flex: 1 }}>
      <View style = {styles.container}>
        <Inputs
          age={age} weight={weight} height={height} bsl={bsl} stype={stype}
          setAge={setAge} setWeight={setWeight} setHeight={setHeight}
          setBsl={setBsl} setStype={setStype}
        />
        <Din din={setDIN(age, weight, height, bsl, stype)}/>
      </View>
    </SafeAreaView>
  )
};
