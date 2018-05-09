import React from 'react'
import {View, Text, ListView, Image, Dimensions} from 'react-native'
import {Tabs, Tab, ScrollableTab, Header, Body, Title} from 'native-base'
import Lightbox from 'react-native-lightbox'
import Styles from './styles';

const window = Dimensions.get('window');
const imageHeight = window.height / 3 + 2 * 15 + 20;

const initialData = [{
    title: 'Main',
    image: 'https://pimg.fabhotels.com/propertyimages/665/main/main-photos-fabhotel-4-seasons-silk-board-bangalore-Hotels-20180201054506.jpg',
}, {
    title: 'Main',
    image: 'https://pimg.fabhotels.com/propertyimages/665/main/main-photos-fabhotel-4-seasons-silk-board-bangalore-Hotels-20180201054506.jpg',
}, {
    title: 'Room',
    image: 'https://pimg.fabhotels.com/propertyimages/665/medium/room-photos-fabhotel-4-seasons-silk-board-bangalore-Hotels-20171017031000.jpg',
}, {
    title: 'Room',
    image: 'https://pimg.fabhotels.com/propertyimages/665/medium/room-photos-fabhotel-4-seasons-silk-board-bangalore-Hotels-20171017031027.jpg'
}, {
    title: 'Room',
    image: 'https://pimg.fabhotels.com/propertyimages/665/medium/room-photos-fabhotel-4-seasons-silk-board-bangalore-Hotels-20171017031047.jpg'
}, {
    title: 'Bathroom',
    image: 'https://pimg.fabhotels.com/propertyimages/665/medium/bathroom-photos-fabhotel-4-seasons-silk-board-bangalore-Hotels-20171017031306.jpg'
}, {
    title: 'Bathroom',
    image: 'https://pimg.fabhotels.com/propertyimages/665/medium/bathroom-photos-fabhotel-4-seasons-silk-board-bangalore-Hotels-20171017031323.jpg'
}, {
    title: 'Other',
    image: 'https://pimg.fabhotels.com/propertyimages/665/medium/other-photos-fabhotel-4-seasons-silk-board-bangalore-Hotels-20171017031513.jpg',
}, {
    title: 'Other',
    image: 'https://pimg.fabhotels.com/propertyimages/665/medium/other-photos-fabhotel-4-seasons-silk-board-bangalore-Hotels-20171017031532.jpg'
}, {
    title: 'Other',
    image: 'https://pimg.fabhotels.com/propertyimages/665/medium/other-photos-fabhotel-4-seasons-silk-board-bangalore-Hotels-20171017031550.jpg'
}, {
    title: 'Deluxe Room',
    image: 'https://pimg.fabhotels.com/propertyimages/665/medium/-photos-fabhotel-4-seasons-silk-board-bangalore-Hotels-20171017032714.jpg',
}, {
    title: 'Deluxe Room',
    image: 'https://pimg.fabhotels.com/propertyimages/665/medium/-photos-fabhotel-4-seasons-silk-board-bangalore-Hotels-20180420034331.jpg'
}, {
    title: 'Deluxe Room',
    image: 'https://pimg.fabhotels.com/propertyimages/665/medium/-photos-fabhotel-4-seasons-silk-board-bangalore-Hotels-20180420034400.jpg'
}, {
    title: 'Executive',
    image: 'https://pimg.fabhotels.com/propertyimages/665/medium/-photos-fabhotel-4-seasons-silk-board-bangalore-Hotels-20171017032719.jpg'
}, {
    title: 'Executive',
    image: 'https://pimg.fabhotels.com/propertyimages/665/medium/-photos-fabhotel-4-seasons-silk-board-bangalore-Hotels-20180420034336.jpg'
}, {
    title: 'Executive',
    image: 'https://pimg.fabhotels.com/propertyimages/665/medium/-photos-fabhotel-4-seasons-silk-board-bangalore-Hotels-20180420034404.jpg'
}];


class galleryScreen extends React.Component {
    static navigationOptions = {
        header: null,
        tabBarLabel: 'Home'
    };

    constructor() {
        super();

        let tabs = [];
        initialData.map((data) => {
            if (tabs.indexOf(data.title) === -1) {
                tabs.push(data.title);
            }
        });

        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            data: initialData,
            dataSource: this.ds.cloneWithRows(initialData),
            activeTab: 0,
            activeTabName: undefined,
            tabs: tabs,
            topCardIndex: 0,
            scrollToHeight: 0,
            scrolling: false
        };
    }

    _renderRow(itemData, section, index) {
        return (
            <View>
                <Lightbox>
                    <Image
                        style={Styles.image}
                        source={{uri: itemData.image}}
                    />
                </Lightbox>
                <Text style={Styles.imageTitle}>{itemData.title}</Text>
                {
                    index === (this.state.length - 1) ? <View style={{flex: 1, height: 2 * imageHeight}}/> : <View/>
                }
            </View>
        )
    }

    _onEndReached() {
        let _self = this;
        setTimeout(() => {
            _self.updateData();
        }, 500)
    }

    _onScroll(event) {
        if (this.state.scrolling && Math.floor(event.nativeEvent.contentOffset.y) === Math.floor(this.state.scrollToHeight)) {
            this.setState({
                scrolling: false
            });
        } else if (event.nativeEvent.contentOffset.y > 0) {
            let index = Math.floor(event.nativeEvent.contentOffset.y / imageHeight);
            if (index !== this.state.topCardIndex) {
                this.setState({
                    topCardIndex: index
                });

                let currentImage = this.state.data[index];

                if (currentImage.title !== this.state.activeTagName) {
                    this.setState({
                        activeTab: this.state.tabs.indexOf(currentImage.title),
                        activeTabName: currentImage.title
                    })
                }
            }
        }
    }

    _onChangeTab(i) {
        let title = this.state.tabs[i.i];
        let imageIndex = 0;
        for (; imageIndex < this.state.data.length; imageIndex++) {
            if (title === this.state.data[imageIndex].title) {
                break;
            }
        }
        if (this.listView) {
            this.setState({
                scrolling: true,
                scrollToHeight: imageIndex * imageHeight,
                activeTab: i.i
            });
            this.listView.scrollTo({y: imageIndex * imageHeight, animated: false});
        }
    }

    updateData() {
        let data = initialData.concat(this.state.data);
        if (data.length < 50) {
            this.setState({
                data: data,
                dataSource: this.ds.cloneWithRows(data)
            });
        }
    }

    render() {
        return (
            <View>
                <Header style={Styles.headerBackground}>
                    <Body>
                    <Title>Photo Gallery</Title>
                    </Body>
                </Header>
                <Tabs
                    renderTabBar={() => <ScrollableTab/>}
                    locked={true}
                    initialPage={0}
                    page={this.state.activeTab}
                    onChangeTab={this._onChangeTab.bind(this)}
                    style={{flex: 0}}>
                    {
                        this.state.tabs.map((tab) => {
                            return (
                                <Tab
                                    tabStyle={Styles.headerBackground}
                                    activeTabStyle={Styles.headerBackground}
                                    heading={tab}
                                    key={tab}
                                />
                            )
                        })
                    }
                </Tabs>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow.bind(this)}
                    onEndReached={this._onEndReached.bind(this)}
                    onScroll={this._onScroll.bind(this)}
                    ref={ref => this.listView = ref}
                />
            </View>
        )
    }
}

export default galleryScreen;
