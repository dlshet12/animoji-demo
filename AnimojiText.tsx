import React from 'react';
import FastImage from 'react-native-fast-image';
import {Text, View} from 'react-native';
import constants from './constants';

interface PropsInterface {
  text: string;
}

const AnimojiText: React.FC<PropsInterface> = props => {
  const {text} = props;

  const delimiter = ':[a-z]+:';

  /**
   *
   * @param text Raw text eg: "Stars :star: are countless :sky:"
   * @param delimiter Regex pattern to find animoji codes in raw text, eg: :[a-z]+: This pattern will find any characters between colons
   * @returns {Array<String>} ["Stars ", ":star:", " are countless ", ":sky:"]
   */
  function splitStringWithDelimiter(text: string, delimiter: string): string[] {
    const regex = new RegExp(`(?<=${delimiter})|(?=${delimiter})`);
    return text.split(regex);
  }

  return (
    <View style={{display: 'flex', flexDirection: 'row'}}>
      {splitStringWithDelimiter(text, delimiter).map(
        (ele: string, index: number) => {
          const animojiMap = constants.ANIMOJI;
          if (animojiMap[ele]) {
            return (
              <FastImage
                source={animojiMap[ele]}
                style={{width: 24, height: 24}}
              />
            );
          } else {
            console.log('HERE2');
            return <Text key={index}>{ele}</Text>;
          }
        },
      )}
    </View>
  );
};

export default AnimojiText;
