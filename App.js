import React, { useState, useContext } from 'react'
import { StyleSheet, View, Platform} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AdMobBanner } from 'expo-ads-admob'
import {SAge, SWeight, SHeight, BSL, SType} from './inputs'
import Context from './context'
import {
  Text,
  Overlay,
  ListItem,
  Badge,
  Button,
  ButtonGroup,
  Icon
} from 'react-native-elements'
import {
  DIN,
  AGES,
  WEIGHTS_M,
  HEIGHTS_M,
  WEIGHTS_US,
  HEIGHTS_US,
  BSLS,
  TYPES
} from './dinData'


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  inputs: {
    //flex:1,
  },
  settings: {
    //flex: 1,
    paddingTop: 20,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  settingsOverlay: {
    padding: 25,
    justifyContent: 'space-around',
  },
  din: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})

const Inputs = () => {

  const {skier, whSettings} = useContext(Context)
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
      badge: whSettings.weightsList[skier.weight]
    },
    {
      title: 'Skier Height',
      content: <SHeight closeOverlay={closeOverlay} />,
      badge: whSettings.heightsList[skier.height]
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
          <ListItem
            style = {{  }}
            key={i}
            bottomDivider
            onPress={() => {
              toggleOverlay()
              setContent(l.content)
            }}
          >
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
        fullScreen
        animationType={'slide'}
      >
        {content}
      </Overlay>
    </View>
  )
}

const Settings = () => {

  //data state
  const {whSettings, setWHSettings} = useContext(Context)
  const [weightUnit, setWeightUnit] = useState(0)
  const [heightUnit, setHeightUnit] = useState(0)
  function changeWeightUnit(unit) {
    whSettings.weightsList = unit ? WEIGHTS_US : WEIGHTS_M
    setWHSettings(whSettings => { return {...whSettings}})
    setWeightUnit(unit)
  }
  function changeHeightUnit(unit) {
    whSettings.heightsList = unit ? HEIGHTS_US : HEIGHTS_M
    setWHSettings(whSettings => { return {...whSettings}})
    setHeightUnit(unit)
  }

  //overlay state
  const [visible, setVisible] = useState(false)
  const toggleOverlay = () => {
    setVisible(!visible)
  }
  const closeOverlay = () => {
    setVisible(false)
  }

  return(
    <View style={styles.settings}>
      <Icon
        raised
        reverse
        name='settings'
        type='material-icons'
        onPress={toggleOverlay}
      />
      <Overlay
        overlayStyle= {styles.settingsOverlay}
        visible= {visible}
        onBackdropPress={toggleOverlay}
        animationType={'slide'}
      >
        <View style={{flexDirection: 'row', marginBottom: 25}}>
          <ButtonGroup
             onPress={unit => changeWeightUnit(unit)}
             selectedIndex={weightUnit}
             buttons={['kg', 'lbs']}
             containerStyle={{width: 135, marginLeft: 0}}
          />
          <ButtonGroup
             onPress={unit => changeHeightUnit(unit)}
             selectedIndex={heightUnit}
             buttons={['cm', 'f\' in\"']}
             containerStyle={{width: 135, marginRight: 0}}
          />
        </View>
        <Button
          title= "OK"
          onPress= {closeOverlay}
        />
      </Overlay>
    </View>
  )
}

const Din = () => {
  const {skier} = useContext(Context)
  return(
    <View style = {styles.din}>
     <Text h1>{calcDIN(skier)}</Text>
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

  let i = Math.min(weight, height+7) + type
  if (age != 1) --i
  i = Math.max(0, i)

  return DIN[i][bsl]
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

  const initalWHSettings = {
    weightsList: WEIGHTS_M,
    heightsList: HEIGHTS_M,
  }
  const [whSettings, setWHSettings] = useState(initalWHSettings)

  const contextValues = {skier, setSkier, whSettings, setWHSettings}

  return (
    <SafeAreaView style = {{ flex: 1 }}>
      <Context.Provider value={contextValues}>
        <View style = {styles.container}>
          <Inputs/>
          <Settings/>
          <Din/>
          <AdMobBanner
            bannerSize="smartBannerPortrait"
            adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
            servePersonalizedAds // true or false
          />
        </View>
      </Context.Provider>
    </SafeAreaView>
  )
}
