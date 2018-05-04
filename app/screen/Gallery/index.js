import React from 'react'
import {View, Text, ListView, Image, Dimensions} from 'react-native'
import Lightbox from 'react-native-lightbox'
import Styles from './styles';

const initialData = [{
    title: 'Title',
    image: 'https://pimg.fabhotels.com/propertyimages/665/main/main-photos-fabhotel-4-seasons-silk-board-bangalore-Hotels-20180201054506.jpg'
}, {
    title: 'Title',
    image: 'https://pimg.fabhotels.com/propertyimages/665/main/main-photos-fabhotel-4-seasons-silk-board-bangalore-Hotels-20180201054506.jpg'
}, {
    title: 'Title',
    image: 'https://pimg.fabhotels.com/propertyimages/665/main/main-photos-fabhotel-4-seasons-silk-board-bangalore-Hotels-20180201054506.jpg'
}, {
    title: 'Title',
    image: 'https://pimg.fabhotels.com/propertyimages/665/main/main-photos-fabhotel-4-seasons-silk-board-bangalore-Hotels-20180201054506.jpg'
}, {
    title: 'Title',
    image: 'https://pimg.fabhotels.com/propertyimages/665/main/main-photos-fabhotel-4-seasons-silk-board-bangalore-Hotels-20180201054506.jpg'
}, {
    title: 'Title',
    image: 'https://pimg.fabhotels.com/propertyimages/665/main/main-photos-fabhotel-4-seasons-silk-board-bangalore-Hotels-20180201054506.jpg'
}, {
    title: 'Title',
    image: 'https://pimg.fabhotels.com/propertyimages/665/main/main-photos-fabhotel-4-seasons-silk-board-bangalore-Hotels-20180201054506.jpg'
}, {
    title: 'Title',
    image: 'https://pimg.fabhotels.com/propertyimages/665/main/main-photos-fabhotel-4-seasons-silk-board-bangalore-Hotels-20180201054506.jpg'
}, {
    title: 'Title',
    image: 'https://pimg.fabhotels.com/propertyimages/665/main/main-photos-fabhotel-4-seasons-silk-board-bangalore-Hotels-20180201054506.jpg'
}, {
    title: 'Title',
    image: 'https://pimg.fabhotels.com/propertyimages/665/main/main-photos-fabhotel-4-seasons-silk-board-bangalore-Hotels-20180201054506.jpg'
},]


class galleryScreen extends React.Component {
    static navigationOptions = {
        header: null,
        tabBarLabel: 'Home'
    }

    constructor() {
        super();
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            data: initialData,
            dataSource: this.ds.cloneWithRows(initialData),
        };

    }

    componentWillReceiveProps(nextProps) {
        const {navigate} = this.props.navigation
        if (nextProps.authToken && navigate)
            navigate('Home')
    }

    _renderHeader() {
        return (
            <View style={Styles.headerBackground}>
                <Text style={Styles.header}>Photo Gallery</Text>
            </View>
        )
    }


    _renderRow(rowData) {
        return (
            <View>
                <Lightbox>
                    <Image
                        style={Styles.image}
                        source={{uri: rowData.image}}
                    />
                </Lightbox>
                <Text style={Styles.imageTitle}>{rowData.title}</Text>
            </View>
        )
    }


    _onEndReached() {
        let _self = this;
        setTimeout(() => {
            this.updateData();
        }, 500)
    }

    updateData() {
        let data = initialData.concat(this.state.data)

        if (data.length < 50) {
            this.setState({
                data: data,
                dataSource: this.ds.cloneWithRows(data)
            });
        }
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow.bind(this)}
                renderHeader={this._renderHeader.bind(this)}
                onEndReached={this._onEndReached.bind(this)}
                stickySectionHeadersEnabled={true}
                stickyHeaderIndices={[0]}
            />
        )
    }
}

export default galleryScreen
