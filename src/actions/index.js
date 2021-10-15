import axios from 'axios';
import store from '../index';
import {
  getSelectedGames,
  getGamesAfterDelete,
  getGamesAfterAdd,
  getResetGames,
} from '../reducers/rootReducer';

export const LOADING = 'LOADING';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';
export const UPDATE = 'UPDATE';
export const SUCCESSFUL_UPDATE = 'SUCCESSFUL_UPDATE';
export const SUCCESSFUL_DELETE = 'SUCCESSFUL_DELETE';
export const SUCCESSFUL_SELELCTION = 'SUCCESSFUL_SELELCTION';
export const RESET_CARDS = 'RESET_CARDS';

const url = 'https://api.jsonbin.io/v3/b/614d80faaa02be1d444dac42';
const headers = {
  'X-Master-Key':
    '$2b$10$bv0Gp1bg.HnTGYhqzwfzZ.svwdw0N1TZBukon7rIHC.CwgCkqjLgy',
  'Content-Type': 'application/json',
};

export const getGames = () => (dispatch) => {
  function shuffleGames(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  try {
    const games = localStorage.getItem('gameNight');
    if (games) {
      dispatch({ type: SUCCESS, payload: shuffleGames(JSON.parse(games)) });
    }
  } catch (err) {
    dispatch({ type: FAILURE, payload: err });
  }
};

export const addGame = (game) => (dispatch) => {
  // this would not normally be done here but due to the nature of JSONbin it is required that the all records are updated at once
  const games = getGamesAfterAdd(store.getState().games, game);
  try {
    localStorage.setItem('gameNight', JSON.stringify(games));
    dispatch({ type: SUCCESSFUL_UPDATE, payload: game });
  } catch (err) {
    dispatch({ type: FAILURE, payload: err });
  }
};

export const deleteGame = (id) => (dispatch) => {
  // this would not normally be done here but due to the nature of JSONbin it is required that the all records are updated at once
  const games = getGamesAfterDelete(store.getState().games, id);

  try {
    localStorage.setItem('gameNight', JSON.stringify(games));
    if (games) {
      dispatch({ type: SUCCESSFUL_DELETE, payload: id });
    }
  } catch (err) {
    dispatch({ type: FAILURE, payload: err });
  }
};

export const selectGame = (id) => (dispatch) => {
  // this would not normally be done here but due to the nature of JSONbin it is required that the all records are updated at once
  const games = getSelectedGames(store.getState().games, id);
  try {
    localStorage.setItem('gameNight', JSON.stringify(games));
    if (games) {
      dispatch({ type: SUCCESSFUL_SELELCTION, payload: id });
    }
  } catch (err) {
    dispatch({ type: FAILURE, payload: err });
  }
};

export const resetGames = () => (dispatch) => {
  // this would not normally be done here but due to the nature of JSONbin it is required that the all records are updated at once
  const games = getResetGames(store.getState().games);

  try {
    localStorage.setItem('gameNight', JSON.stringify(games));
    if (games) {
      dispatch({ type: RESET_CARDS, payload: games });
    }
  } catch (err) {
    dispatch({ type: FAILURE, payload: err });
  }
};
