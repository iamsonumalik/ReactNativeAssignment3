import {Dimensions, StyleSheet} from 'react-native';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    headerBackground: {
        backgroundColor: '#1d2548',
        borderColor: '#1d2548'
    },
    header: {
        padding: 20,
        color: '#ffffff',
        fontSize: 20
    },
    tabTitle: {
        padding: 20,
        color: '#ffffff',
        fontSize: 14
    },
    image: {
        height: window.height / 3
    },
    imageTitle: {
        padding: 15,
        fontSize: 15,
        backgroundColor: 'rgb(255,255,255)'
    },
    headerTitle: {
        color: '#fff'
    }
});

export default styles;
