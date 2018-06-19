import { StyleSheet, View, Animated, FlatList, Text } from 'react-native';
import React, { Component } from 'react';
import PulseLoader from '../pulseloader/pulseloader';
import fetchUserList from '../../utility/networking';
import ListItem from '../../node_modules/react-native-elements/src/list/ListItem';
import Header from '../../node_modules/react-native-elements/src/header/Header';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
  },
});

export default class SplashScreen extends Component<{}> {
  constructor(props) {
    super(props);

    this.state = {
      circles: [],
      users: [],
      hideLoader: false,
    };

    this.counter = 1;
    this.pageCount = 1;
    this.setInterval = null;
    this.anim = new Animated.Value(1);
    this.maxPageCount = null;
  }

  componentDidMount() {
    this.setCircleInterval();
    this.fetchUserList();
    setTimeout(() => {
      this.setState({
        hideLoader: true,
      });
      clearInterval(this.setInterval);
    }, 3000);
  }

  setCircleInterval() {
    this.setInterval = setInterval(this.addCircle.bind(this), 2000);
    this.addCircle();
  }

  addCircle() {
    this.setState({ circles: [...this.state.circles, this.counter] });
    this.counter = this.counter + 1;
  }

  fetchUserList() {
    fetchUserList(this.pageCount).then((data) => {
      if (data) {
        this.maxPageCount = data.total_pages;
        this.setState({
          users: this.state.users.concat(data.data),
        });
      }
    });
  }

    keyExtractor = (item, index) => index.toString();

    renderItem = ({ item }) => (
      <ListItem
        title={item.first_name}
        roundAvatar
        avatar={{ uri: item.avatar }}
      />
    )

    render() {
      return (
        <View style={styles.mainContainer}>
          <Header
            outerContainerStyles={{ backgroundColor: 'white' }}
            centerComponent={{ text: 'Users', style: { color: '#000' } }}
          />
          {
                    !this.state.hideLoader ?
                      <View style={styles.container}>
                        {this.state.circles.map(circle => (
                          <PulseLoader
                            key={circle}
                          />
                            ))}
                        <View
                          style={{
                                    width: 25,
                                    height: 25,
                                    borderRadius: 25 / 2,
                                    backgroundColor: '#61C900',
                                }}
                        />
                      </View> :
                      <View style={styles.mainContainer}>
                        <FlatList
                          data={this.state.users}
                          showsVerticalScrollIndicator={false}
                          renderItem={this.renderItem}
                          keyExtractor={this.keyExtractor}
                          onEndReached={() => {
                                    if (this.pageCount < this.maxPageCount) {
                                        this.pageCount = this.pageCount + 1;
                                        this.fetchUserList();
                                    }
                                }
                                }
                          onEndReachedThreshold={0.5}
                        />
                        {
                                this.pageCount === this.maxPageCount ?
                                  <Text style={{ textAlign: 'center', fontSize: 20 }}>No more user to load</Text> : null
                            }
                      </View>
                }
        </View>
      );
    }
}
