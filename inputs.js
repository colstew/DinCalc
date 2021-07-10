import React, { useState, useContext } from 'react'
import { ScrollView } from 'react-native'
import { Text, Button, ButtonGroup } from 'react-native-elements'
import {AGES, BSLS, TYPES} from './dinData'
import Context from './context'

export const SAge = (props) => {
  const {skier, setSkier} = useContext(Context)
  const [index, setIndex] = useState(skier.age == null ? 1 : skier.age)
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
          setSkier(skier => { return { ...skier, age: index }})
          props.closeOverlay()
        }}
      />
    </>
  );
};

export const SWeight = (props) => {
  const {skier, setSkier, whSettings} = useContext(Context)
  const [index, setIndex] = useState(skier.weight == null ? 0 : skier.weight)
  return(
    <>
    <ScrollView>
      <ButtonGroup
         onPress={(index) => setIndex(index)}
         selectedIndex={index}
         buttons={whSettings.weightsList}
         vertical='True'
      />
    </ScrollView>
      <Button
        title= "OK"
        onPress= {() => {
          setSkier(skier => { return { ...skier, weight: index }})
          props.closeOverlay()
        }}
      />
    </>
  );
};

export const SHeight = (props) => {
  const {skier, setSkier, whSettings} = useContext(Context)
  const [index, setIndex] = useState(skier.height == null ? 0 : skier.height)
  return(
    <>
    <ScrollView>
      <ButtonGroup
         onPress={(index) => setIndex(index)}
         selectedIndex={index}
         buttons={whSettings.heightsList}
         vertical='True'
      />
    </ScrollView>
      <Button
        title= "OK"
        onPress= {() => {
          setSkier(skier => { return { ...skier, height: index }})
          props.closeOverlay()
        }}
      />
    </>
  );
};

export const BSL = (props) => {
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
        onPress= {() => {
          setSkier(skier => { return { ...skier, bsl: index }})
          props.closeOverlay()
        }}
      />
    </>
  );
};

export const SType = (props) => {
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
        onPress= {() => {
          setSkier(skier => { return { ...skier, type: index }})
          props.closeOverlay()
        }}
      />
    </>
  );
};
