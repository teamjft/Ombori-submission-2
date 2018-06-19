import { StyleSheet, View, Animated, FlatList, Text } from 'react-native';
import React, { Component } from 'react';
import axios from 'axios';
import PulseLoader from '../pulseloader/pulseloader';
import ListItem from '../../node_modules/react-native-elements/src/list/ListItem';
import Header from '../../node_modules/react-native-elements/src/header/Header';

const styles = StyleSheet.create({
  listcontainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
});

export default class MainScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pulsecircles: [],
      userslist: [],
      loader: true,
    };

    this.counter = 1;
    this.pageCount = 1;
    this.setInterval = null;
    this.anim = new Animated.Value(1);
    this.maxPageCount = null;
  }

  componentDidMount() {
    this.setCircleInterval();
    this.fetchData();
    setTimeout(() => {
      this.setState({
        loader: false,
      });
      clearInterval(this.setInterval);
    }, 3000);
  }

  setCircleInterval() {
    this.setInterval = setInterval(this.addCircle.bind(this), 2000);
    this.addCircle();
  }

  addCircle() {
    this.setState({ pulsecircles: [...this.state.pulsecircles, this.counter] });
    this.counter = this.counter + 1;
  }

  async fetchData() {
    const url = `https://reqres.in/api/users?page=`;
    try {
      const response = await axios.get(url + this.pageCount);
      if (response) {
        this.maxPageCount = response.data.total_pages;
        this.setState({
          userslist: this.state.userslist.concat(response.data.data),
        });
      }
    } catch (error) {
      console.error(error);
    }
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
        <View style={styles.container}>
          <Header
            outerContainerStyles={{ backgroundColor: '#F1F1F1' }}
            centerComponent={{ text: 'Users', style: { color: '#000', fontSize: 18 } }}
          />
          {
                    this.state.loader ?
                      <View style={styles.listcontainer}>
                        {this.state.pulsecircles.map(circle => (
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
                      <View style={styles.container}>
                        <FlatList
                          data={this.state.userslist}
                          showsVerticalScrollIndicator={false}
                          renderItem={this.renderItem}
                          keyExtractor={this.keyExtractor}
                          onEndReached={() => {
                                    if (this.pageCount < this.maxPageCount) {
                                        this.pageCount = this.pageCount + 1;
                                        this.fetchData();
                                    }
                                }
                                }
                          onEndReachedThreshold={0.5}
                        />
                        {
                                this.pageCount === this.maxPageCount ?
                                  <Text style={{ textAlign: 'center', fontSize: 20, backgroundColor: '#F1F1F1' }}>No more users to load</Text> : null
                            }
                      </View>
                }
        </View>
      );
    }
}
