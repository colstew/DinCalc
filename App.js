import React, { useState, useContext } from 'react'
import { StyleSheet, View, Platform} from 'react-native'
import { Text, Overlay, ListItem, Badge, Switch } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import {SAge, SWeight, SHeight, BSL, SType} from './inputs'
import { DIN, AGES, WEIGHTS_M, HEIGHTS_M, WEIGHTS_US, HEIGHTS_US,
  BSLS, TYPES} from './dinData'
  import Context from './context'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  inputs: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  din: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})

const Options = () => {
  return(
    <View style={styles.row}>
      <View style={styles.row}>
        <Text>lbs</Text>
        <Switch value={true}/>
        <Text>kg</Text>
      </View>
      <View style={styles.row}>
        <Text>ft'in"</Text>
        <Switch value={true}/>
        <Text>cm</Text>
      </View>
    </View>
  )
}

const Input = () => {

  const {skier, settings} = useContext(Context)
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
      content: <SAge closeOverlay={closeOverlay} />,
      badge: AGES[skier.age]
    },
    {
      title: 'Skier Weight',
      content: <SWeight closeOverlay={closeOverlay} />,
      badge: settings.weightsList[skier.weight]
    },
    {
      title: 'Skier Height',
      content: <SHeight closeOverlay={closeOverlay} />,
      badge: settings.heightsList[skier.height]
    },
    {
      title: 'Boot Sole Length',
      content: <BSL closeOverlay={closeOverlay} />,
      badge: BSLS[skier.bsl]
    },
    {
      title: 'Skier Type',
      content: <SType closeOverlay={closeOverlay} />,
      badge: TYPES[skier.type]
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
}

const Din = () => {
  const {skier} = useContext(Context)
  return(
    <View style = {styles.din} >
     <Text h1>DIN = {calcDIN(skier)}</Text>
    </View>
  );
}

/*
1. Weight and Height, if not the same, choose the one closer to the top of the chart.
2. Skier Type, move down chart acording to skier type.
3. Age, if under 10 or 50 and over move up chart
4. Select column based on BSL
*/
function calcDIN(skier) {

  const age = skier.age
  const weight = skier.weight
  const height = skier.height
  const bsl = skier.bsl
  const type = skier.type

  if (age == null) return 'Set Age'
  if (weight == null) return 'Set Weight'
  if (height == null) return 'Set Height'
  if (bsl == null) return 'Set BSL'
  if (type == null) return 'Set Type'

  var i = Math.min(weight, height+7) + type
  if (age != 1) --i
  i = Math.max(0, i)

  var j = bsl

  return DIN[i][j]
}

export default function App() {

  const initalSkier = {
    age: null,
    weight: null,
    height: null,
    bsl: null,
    type: null,
  }
  const [skier, setSkier] = useState(initalSkier)

  const initalSettings = {
    weightsList: WEIGHTS_M,
    heightsList: HEIGHTS_M,
  }
  const [settings, setSettings] = useState(initalSettings)

  const contextValues = {skier, setSkier, settings, setSettings}

  return (
    <SafeAreaView style = {{ flex: 1 }}>
      <Context.Provider value={contextValues}>
        <View style = {styles.container}>
          <Options/>
          <Input/>
          <Din/>
        </View>
      </Context.Provider>
    </SafeAreaView>
  )
}
