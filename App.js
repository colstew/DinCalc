import React, { useState, createContext, useContext } from 'react'
import { StyleSheet, View, ScrollView, Platform, ImageBackground} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AdMobBanner } from 'expo-ads-admob'
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
  WEIGHTS,
  HEIGHTS,
  BSLS,
  TYPES
} from './dinData'

const Context = createContext()

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  list: {
    backgroundColor: '#6494aaaf',
  },
  listText: {
    color: '#1a281f',
    fontSize: 18,
    fontWeight: 'bold',
  },
  chevron: {
    color: '#1a281f',
  },
  badge: {
    backgroundColor: '#f58f29',
    padding: 11,
    borderWidth: 0,
  },
  badgeText: {
    color: '#1a281f',
    fontSize: 16,
  },
  okButton: {
    marginHorizontal: 10,
  },
  din: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dinBadge: {
    backgroundColor: '#f58f29',
    padding: 28,
    borderWidth: 0,
  },
  dinBadgeText: {
    color: '#1a281f',
    fontSize: 46,
    fontWeight: 'bold',
  },
})

const SAge = (props) => {
  const {skier, setSkier} = useContext(Context)
  const [index, setIndex] = useState(skier.age == null ? 1 : skier.age)
  return(
    <>
      <ButtonGroup
         onPress={(index) => setIndex(index)}
         selectedIndex={index}
         buttons={AGES}
         containerStyle={{}}
      />
      <Button
        title= "OK"
        buttonStyle={styles.okButton}
        onPress= {() => {
          setSkier(skier => { return { ...skier, age: index }})
          props.closeOverlay()
        }}
      />
    </>
  );
};

const SWeight = (props) => {
  const {skier, setSkier} = useContext(Context)
  const [index, setIndex] = useState(skier.weight == null ? 0 : skier.weight)
  return(
    <>
      <ScrollView>
        <ButtonGroup
          vertical
          containerStyle={styles.whButtons}
          onPress={(index) => setIndex(index)}
          selectedIndex={index}
          buttons={WEIGHTS}
        />
      </ScrollView>
      <Button
        title= "OK"
        buttonStyle={styles.okButton}
        onPress= {() => {
          setSkier(skier => { return { ...skier, weight: index }})
          props.closeOverlay()
        }}
      />
    </>
  );
};

const SHeight = (props) => {
  const {skier, setSkier} = useContext(Context)
  const [index, setIndex] = useState(skier.height == null ? 0 : skier.height)
  return(
    <>
      <ScrollView>
        <ButtonGroup
          vertical
          onPress={(index) => setIndex(index)}
          selectedIndex={index}
          buttons={HEIGHTS}
          vertical
        />
      </ScrollView>
      <Button
        title= "OK"
        buttonStyle={styles.okButton}
        onPress= {() => {
          setSkier(skier => { return { ...skier, height: index }})
          props.closeOverlay()
        }}
      />
    </>
  );
};

const BSL = (props) => {
  const {skier, setSkier} = useContext(Context)
  const [index, setIndex] = useState(skier.bsl == null ? 0 : skier.bsl)
  return(
    <>
      <ScrollView>
        <ButtonGroup
           onPress={(index) => setIndex(index)}
           selectedIndex={index}
           buttons={BSLS}
           vertical='True'
        />
      </ScrollView>
      <Button
        title= "OK"
        buttonStyle={styles.okButton}
        onPress= {() => {
          setSkier(skier => { return { ...skier, bsl: index }})
          props.closeOverlay()
        }}
      />
    </>
  );
};

const SType = (props) => {
  const {skier, setSkier} = useContext(Context)
  const [index, setIndex] = useState(skier.type == null ? 1 : skier.type)
  return(
    <>
      <ButtonGroup
         onPress={(index) => setIndex(index)}
         selectedIndex={index}
         buttons={TYPES}
      />
      <Button
        title= "OK"
        buttonStyle={styles.okButton}
        onPress= {() => {
          setSkier(skier => { return { ...skier, type: index }})
          props.closeOverlay()
        }}
      />
    </>
  );
};

const Inputs = () => {

  const {skier} = useContext(Context)
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
      badge: WEIGHTS[skier.weight]
    },
    {
      title: 'Skier Height',
      content: <SHeight closeOverlay={closeOverlay} />,
      badge: HEIGHTS[skier.height]
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
            containerStyle={styles.list}
            key={i}
            onPress={() => {
              toggleOverlay()
              setContent(l.content)
            }}
          >
            <ListItem.Content>
              <ListItem.Title style={styles.listText}>{l.title}</ListItem.Title>
            </ListItem.Content>
            {l.badge && (<Badge value={l.badge} badgeStyle={styles.badge} textStyle={styles.badgeText} />)}
            <ListItem.Chevron iconStyle={styles.chevron}/>
          </ListItem>
        ))
      }
      <Overlay
        visible= {visible}
        onBackdropPress={toggleOverlay}
        animationType={'fade'}
        overlayStyle={{width: '80%'}}
      >
        {content}
      </Overlay>
    </View>
  )
}

const Din = () => {
  const {skier} = useContext(Context)
  return(
    <View style = {styles.din}>
      <Badge
        value={calcDIN(skier)}
        badgeStyle={styles.dinBadge}
        textStyle={styles.dinBadgeText}
      />
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

  const contextValues = {skier, setSkier}

  return (
    <Context.Provider value={contextValues}>
      <ImageBackground
        source={require('./assets/eagal.jpg')}
        resizeMode='cover'
        style={styles.container}
      >
        <SafeAreaView style={styles.container}>
          <Inputs/>
          <Din/>
          <AdMobBanner
            bannerSize="smartBannerPortrait"
            adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
            servePersonalizedAds
          />
        </SafeAreaView>
      </ImageBackground>
    </Context.Provider>

  )
}
