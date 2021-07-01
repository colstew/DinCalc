//import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffec} from 'react'
import { StyleSheet, View, Platform} from 'react-native'
import { Text, Overlay, ListItem, Badge, Switch } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import {SAge, SWeight, SHeight, BSL, SType} from './inputs'
import { DIN_M, AGES, WEIGHTS, HEIGHTS, BSLS, TYPES} from './data'

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
      badge: AGES[props.age]
    },
    {
      title: 'Skier Weight',
      content: <SWeight
        closeOverlay={closeOverlay}
        weight={props.weight}
        setWeight={props.setWeight}
      />,
      badge: WEIGHTS[props.weight]
    },
    {
      title: 'Skier Height',
      content: <SHeight
        closeOverlay={closeOverlay}
        height={props.height}
        setHeight={props.setHeight}
      />,
      badge: HEIGHTS[props.height]
    },
    {
      title: 'Boot Sole Length',
      content: <BSL
        closeOverlay={closeOverlay}
        bsl={props.bsl}
        setBsl={props.setBsl}
      />,
      badge: BSLS[props.bsl]
    },
    {
      title: 'Skier Type',
      content: <SType
        closeOverlay={closeOverlay}
        type={props.type}
        setType={props.setType}
      />,
      badge: TYPES[props.type]
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
     <Text h1>DIN = {props.din}</Text>
    </View>
  );
};

export default function App() {

  const [age, setAge] = useState(null)
  const [weight, setWeight] = useState(null)
  const [height, setHeight] = useState(null)
  const [bsl, setBsl] = useState(null)
  const [type, setType] = useState(null)

  const setDIN = (age, weight, height, bsl, type) => {
  /*
  1. Weight and Height, if not the same, choose the one closer to the top of the chart.
  2. Skier Type, move down chart acording to skier type.
  3. Age, if under 10 or 50 and over move up chart
  4. Select column based on BSL
  */

  if (age == null) return 'Set Age'
  if (weight == null) return 'Set Weight'
  if (height == null) return 'Set Height'
  if (bsl == null) return 'Set BSL'
  if (type == null) return 'Set Type'

  var i = Math.min(weight, height+7) + type
  if (age != 1) --i
  i = Math.max(0, i)

  var j = bsl

  return DIN_M[i][j]
  }

  return (
    <SafeAreaView style = {{ flex: 1 }}>
      <View style = {styles.container}>
        <Switch value={true}/>
        <Inputs
          age={age} weight={weight} height={height} bsl={bsl} type={type}
          setAge={setAge} setWeight={setWeight} setHeight={setHeight}
          setBsl={setBsl} setType={setType}
        />
        <Din din={setDIN(age, weight, height, bsl, type)}/>
      </View>
    </SafeAreaView>
  )
};
