import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import { Text, Button, ButtonGroup } from 'react-native-elements'
import { CircularSlider } from 'react-native-elements-universe'
import {AGES, WEIGHTS, HEIGHTS, BSLS, TYPES} from './data'

export const SAge = (props) => {
  const [index, setIndex] = useState(props.age ? props.age : 1)
  return(
    <>
      <ButtonGroup
         onPress={(index) => setIndex(index)}
         selectedIndex={index}
         buttons={AGES}
         containerStyle={{height: 100}}
      />
      <Button
        title= "OK"
        onPress= {() => {
          props.setAge(index)
          props.closeOverlay()
        }}
      />
    </>
  );
};

export const SWeight = (props) => {
  const [index, setIndex] = useState(props.weight ? props.weight : 1)
  return(
    <>
    <ScrollView>
      <ButtonGroup
         onPress={(index) => setIndex(index)}
         selectedIndex={index}
         buttons={WEIGHTS}
         vertical='True'
      />
    </ScrollView>
      <Button
        title= "OK"
        onPress= {() => {
          props.setWeight(index)
          props.closeOverlay()
        }}
      />
    </>
  );
};

export const SHeight = (props) => {
  const [index, setIndex] = useState(props.height ? props.height : 1)
  return(
    <>
    <ScrollView>
      <ButtonGroup
         onPress={(index) => setIndex(index)}
         selectedIndex={index}
         buttons={HEIGHTS}
         vertical='True'
      />
    </ScrollView>
      <Button
        title= "OK"
        onPress= {() => {
          props.setHeight(index)
          props.closeOverlay()
        }}
      />
    </>
  );
};

export const BSL = (props) => {
  const [index, setIndex] = useState(props.bsl ? props.bsl : 1)
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
        onPress= {() => {
          props.setBsl(index)
          props.closeOverlay()
        }}
      />
    </>
  );
};

export const SType = (props) => {
  const [index, setIndex] = useState(props.stype ? props.stype : 1)
  return(
    <>
    <ButtonGroup
       onPress={(index) => setIndex(index)}
       selectedIndex={index}
       buttons={TYPES}
    />
      <Button
        title= "OK"
        onPress= {() => {
          props.setType(index)
          props.closeOverlay()
        }}
      />
    </>
  );
};
