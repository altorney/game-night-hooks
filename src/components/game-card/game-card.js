import './game-card.css';
import { connect } from 'react-redux';
import { selectGame } from 'actions';
import classnames from 'classnames';

function GameCard(props) {
  let gameCard = null;

  function handleClick(id) {
    gameCard.classList.add('game-card-click');
    props.selectGame(id);
  }

  const myComponentClasses = classnames({
    'game-card': true,
    'game-card-click': props.game.selected,
  });

  return (
    <div className="card-wrapper" onClick={() => handleClick(props.game.id)}>
      <div className={myComponentClasses} ref={(el) => (gameCard = el)}>
        <div className="game-card-inner">
          <div className="game-card-front">?</div>
          <div className="game-card-back">{props.game.title}</div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectGame: (id) => dispatch(selectGame(id)),
  };
};

export default connect(null, mapDispatchToProps)(GameCard);
