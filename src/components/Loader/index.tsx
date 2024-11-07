import { ActivityIndicator } from 'react-native';
import { LOADER_COLOR } from '../../utils/constants';

interface LoaderProps {
  size: 'small' | 'large' | number; // Explicitly define the acceptable types for size
}

export const Loader = ({ size }: LoaderProps) => {
  return <ActivityIndicator size={size} color={LOADER_COLOR} />;
};
