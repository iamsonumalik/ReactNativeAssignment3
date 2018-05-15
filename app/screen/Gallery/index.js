import React from 'react'
import {View, TouchableHighlight, Text, ListView, Image, Dimensions} from 'react-native'
import {Tabs, Tab, TabHeading , ScrollableTab, Header, Body, Title} from 'native-base'
import Lightbox from 'react-native-lightbox'
import Styles from './styles';
import {parsedData} from '../../helper/sample'

const window = Dimensions.get('window');
const imageHeight = window.height / 3 + 2 * 15 + 20;
const initialData = parsedData()

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
                <Lightbox
                    springConfig={{
                        tension: 900000, friction: 900000
                    }}>
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
        // let _self = this;
        // setTimeout(() => {
        //     _self.updateData();
        // }, 500)
    }

    _setTab(index){
        if (index !== this.state.topCardIndex) {
            let currentImage = this.state.data[index];
            if (currentImage.title !== this.state.activeTagName) {
                this.setState({
                    activeTab: this.state.tabs.indexOf(currentImage.title),
                    activeTabName: currentImage.title,
                    scrollToHeight: 0,
                    topCardIndex: index
                })
            }
        }
    }
    _onScroll(event) {
        if (this.state.scrollToHeight === 0) {
            if (this.state.scrolling && Math.floor(event.nativeEvent.contentOffset.y) === Math.floor(this.state.scrollToHeight)) {
                this.setState({
                    scrolling: false
                });
            } else if (event.nativeEvent.contentOffset.y > 0) {
                let index = Math.floor(event.nativeEvent.contentOffset.y / imageHeight);
                this._setTab(index)
            }
        }
    }

    _onTabPressed(title){
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
                activeTab: this.state.tabs.indexOf(title),
                topCardIndex : this.state.tabs.indexOf(title)
            });
            this.listView.scrollTo({y: imageIndex * imageHeight, animated: true});
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
                    <Title style={Styles.header}>Photo Gallery</Title>
                    </Body>
                </Header>
                <Tabs
                    renderTabBar={() => <ScrollableTab
                        style={[Styles.headerBackground, {marginTop: 0}]}
                    />}
                    locked={true}
                    initialPage={0}
                    page={this.state.activeTab}
                    style={{flex: 0}}>
                    {
                        this.state.tabs.map((tab) => {
                            return (
                                <Tab
                                    tabStyle={Styles.headerBackground}
                                    activeTabStyle={Styles.headerBackground}
                                    topTabBarTextColor="#f00"
                                    topTabBarActiveTextColor="#f00"
                                    heading={
                                        <TabHeading style={Styles.headerBackground}>
                                            <TouchableHighlight onPress={() => this._onTabPressed(tab)}>
                                            <Text style = {Styles.tabTitle}>{tab}</Text>
                                            </TouchableHighlight>
                                        </TabHeading>
                                    }
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
