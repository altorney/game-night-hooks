import { LOADING, SUCCESS, FAILURE, SUCCESSFUL_UPDATE, SUCCESSFUL_DELETE, SUCCESSFUL_SELELCTION, RESET_CARDS } from '../actions/index';
const initState = {
  games: [
    { id: 1, title: 'monopoly', selected: false },
    { id: 2, title: 'Hand and foot', selected: false },
  ],
  loading: false,
  error: '',
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        games: [],
        loading: true,
      };

    case SUCCESS:
      return {
        ...state,
        games: action.payload,
        loading: false,
        error: '',
      };

    case FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SUCCESSFUL_UPDATE:
      return {
        ...state,
        games: getGamesAfterAdd(state.games, action.payload),
        loading: false,
        err: '',
      };

    case SUCCESSFUL_DELETE:
      const games = getGamesAfterDelete(state.games, action.payload);
      return {
        ...state,
        games: games,
        loading: false,

        err: '',
      };
    case SUCCESSFUL_SELELCTION:
      const selectedGames = getSelectedGames(state.games, action.payload);
      return {
        ...state,
        games: selectedGames,
        loading: false,
        err: '',
      };
    case RESET_CARDS:
      const resetGames = getResetGames(state.games);
      return {
        ...state,
        games: resetGames,
        loading: false,
        err: '',
      };
    default:
      return state;
  }
};

export function getGamesAfterAdd(games, newGame) {
  return [...games, ...newGame];
}

export function getGamesAfterDelete(games, id) {
  return games.filter((game) => game.id !== id);
}

export function getSelectedGames(games, id) {
  return games.map((game) => {
    if (game.id === id) {
      game.selected = true;
    }
    return game;
  });
}

export function getResetGames(games) {
  games.forEach((game) => (game.selected = false));
  return games;
}

export default rootReducer;
