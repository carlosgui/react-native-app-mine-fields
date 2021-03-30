import React, { Component } from 'react';
import { StyleSheet, View, Alert, Button } from 'react-native';
import params from './src/params'
import MineField from './src/components/MineField';
import { 
  createMinedBoard,
  openField,
  hadExplosion,
  cloneBoard,
  showMines,
  wonGame,
 } from './src/functions'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = this.createState()
  }

  minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()

    return Math.ceil(cols * rows * params.difficultLevel)
  }

  createState = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return {
      /*** @todo */
      /// This should be      ////
      /// rows, cols          ////
      /// BUT IT WORKS        ////
      /// I NEED TO KNOW WHY  ////
      board: createMinedBoard(cols, rows, this.minesAmount()),
      won: false,
      lost: false
    }
  }

  restoreGame = () => {
    this.setState(this.createState())
  }

  onOpenField = (row, column) => {
    const board = cloneBoard(this.state.board)
    openField(board, row, column)
    const lost = hadExplosion(board)
    const won = wonGame(board)
    if(lost) {
      showMines(board)
      Alert.alert('SE LASCOU!', 'TODINHO')
    }

    if(won) {
      Alert.alert('Ai Disgrama', 'Ganhou um iFome')
    }

    this.setState({ board, lost, won})
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="Restart" onPress={this.restoreGame}/>
        <View style={styles.board}>
          <MineField board={this.state.board} onOpenField={this.onOpenField}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA'
  }
});
