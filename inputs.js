import React from 'react'
import { Text, Button } from 'react-native-elements'
import { CircularSlider } from 'react-native-elements-universe'
import { WEIGHTS, HEIGHTS, BSLS, STYPES} from './data'

export const SAge = (props) => {
  return(
    <>
      <CircularSlider/>
      <Button
        title= "Cancel"
        onPress= {props.closeOverlay}
      />
    </>
  );
};

export const SWeight = (props) => {
  return(
    <>
      <Text>Weight: {props.weight}</Text>
      <Button
        title= "Cancel"
        onPress= {props.closeOverlay}
      />
    </>
  );
};

export const SHeight = (props) => {
  return(
    <>
      <Text>Height</Text>
      <Button
        title= "Cancel"
        onPress= {props.closeOverlay}
      />
    </>
  );
};

export const BSL = (props) => {
  return(
    <>
      <Text>BSL</Text>
      <Button
        title= "Cancel"
        onPress= {props.closeOverlay}
      />
    </>
  );
};

export const SType = (props) => {
  return(
    <>
      <Text>Type</Text>
      <Button
        title= "Cancel"
        onPress= {props.closeOverlay}
      />
    </>
  );
};
