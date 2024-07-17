import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const widthRatio = width / 430;
const heightRatio = height / 932;

const getSize = (size: number) => {
  return Math.round(size * Math.min(widthRatio, heightRatio));
};

export default getSize;
