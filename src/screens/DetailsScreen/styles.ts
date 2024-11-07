import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f6f8',
  },
  nameText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  linkText: {
    fontSize: 16,
    color: '#1e90ff',
    textDecorationLine: 'underline',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});
