import { connect } from 'react-redux';
import { addGame, deleteGame, resetGames } from '../../actions/index';
import './maintenance.css';

function Maintenance(props) {
  function handleAddClick() {
    let newId = 1;
    if (props.games.length > 0) {
      newId = props.games[props.games.length - 1].id + 1;
    }
    props.addGame([{ id: newId, title: newGame.value }]);
    newGame.value = '';
  }

  function handleDeleteClick(id) {
    props.deleteGame(id);
  }

  function handleResetClick() {
    props.resetGames();
  }

  let newGame = null;

  return (
    <div>
      <div className="maintenance-games-wrapper">
        Games
        {props.games.map((game) => {
          return (
            <div className="game-row" key={game.id}>
              <div className="game-title">{game.title}</div>
              <div>
                <button className="delete" onClick={() => handleDeleteClick(game.id)}></button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="maintenance-add-wrapper">
        Add a new game
        <div className="add-game-row">
          <div className="add-input">
            <input type="text" id="new-game" ref={(el) => (newGame = el)} />
          </div>
          <div>
            <button className="add" onClick={handleAddClick} />
          </div>
        </div>
        <div>
          <button className="reset" onClick={handleResetClick}>
            Reset games
          </button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    games: state.games,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addGame: (game) => dispatch(addGame(game)),
    deleteGame: (id) => dispatch(deleteGame(id)),
    resetGames: (id) => dispatch(resetGames()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Maintenance);
