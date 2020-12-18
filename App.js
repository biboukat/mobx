import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {observable, computed, action, configure, makeObservable} from 'mobx';
import {observer} from 'mobx-react';

configure({enforceActions: 'observed'});

class Store {
  constructor() {
    makeObservable(this);
  }

  @observable devsList = [
    {name: 'Max', sp: 10, id: '2'},
    {name: 'Jack', sp: 12, id: '1'},
    {name: 'Leo', sp: 8, id: '3'},
  ];

  @computed get totalSum() {
    // return 0;
    return this.devsList.reduce((acc, {sp}) => acc + sp, 0);
  }

  @computed get topPerformer() {
    return this.devsList.sort((a, b) => b.sp - a.sp)[0].name;
  }

  @action clearList() {}

  @action addDeveloper(dev) {}
}

const appStore = new Store();

@observer
class Counter extends Component {
  handleIncrement = () => {
    this.props.store.increment();
  };
  handleDecrement = () => {
    this.props.store.decrement();
  };

  renderItem = ({item}) => {
    return (
      <View style={styles.row}>
        <Text>{item.name}</Text>
        <Text>{item.sp}</Text>
      </View>
    );
  };

  renderFooter = () => {
    return (
      <View>
        <Text>{`total sum ->> ${this.props.store.totalSum}`}</Text>

        <Text>{`Top perfermer -->> ${this.props.store.topPerformer}`}</Text>
      </View>
    );
  };

  render() {
    const {store} = this.props;
    return (
      <SafeAreaView style={styles.engine}>
        <FlatList
          data={store.devsList}
          data={store.devsList}
          renderItem={this.renderItem}
          ListFooterComponent={this.renderFooter}
        />
      </SafeAreaView>
    );
  }
}

const App = () => {
  return <Counter store={appStore} />;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'blue',
    marginBottom: 8,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
});

export default App;
