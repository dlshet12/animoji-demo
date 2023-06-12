/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useRef, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AnimojiText from './AnimojiText';
import FastImage from 'react-native-fast-image';
import constants from './constants';

function App(): JSX.Element {
  const bottomSheetRef = useRef<RBSheet>(null);
  const isDarkMode = useColorScheme() === 'dark';
  const [text, setText] = useState('');
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const openAnimojiDialogue = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.open();
    }
  };
  const onAnimojiSelect = (animoji: string) => {
    setText(text + animoji);
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <AnimojiText text={text}></AnimojiText>
      <TextInput onChangeText={text => setText(text)} value={text}></TextInput>

      <Button title="Animoji" onPress={openAnimojiDialogue} />
      <RBSheet
        ref={bottomSheetRef}
        height={300}
        openDuration={250}
        customStyles={{
          container: {
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}>
        {Object.keys(constants.ANIMOJI).map((key: string) => {
          return (
            <TouchableOpacity onPress={() => onAnimojiSelect(key)}>
              <FastImage
                source={constants.ANIMOJI[key]}
                style={{width: 200, height: 200}}
              />
            </TouchableOpacity>
          );
        })}
      </RBSheet>
    </SafeAreaView>
  );
}

export default App;
