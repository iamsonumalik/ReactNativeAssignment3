import {Dimensions, StyleSheet} from 'react-native';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    headerBackground: {
        backgroundColor: '#1d2548'
    },
    header: {
        padding: 20,
        color: '#ffffff',
        fontSize: 20
    },
    image: {
        width: window.width,
        height: window.height / 3
    },
    imageTitle: {
        padding: 15
    }
});

export default styles;
