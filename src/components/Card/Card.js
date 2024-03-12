import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import './Card.css';

function Card({ pokemon }) {
  return (
    <div className="card">
      <div className="cartImg">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      </div>
      <h3 className="cardName">{pokemon.name}</h3>
      <div className="cartTypes">
        <div>タイプ</div>
        {pokemon.types.map((type) => (
          <div>
            <span className="TypeName">{type.type.name}</span>
          </div>
        ))}
      </div>
      <div className="cardInfo">
        <div className="cardData">
          <p className="title">
            重さ:
            {pokemon.weight}
          </p>
        </div>
        <div className="cardData">
          <p className="title">
            高さ:
            {pokemon.height}
          </p>
        </div>
        <div className="cardData">
          <p className="title">
            アビリティ:
            {pokemon.abilities[0].ability.name}
          </p>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  pokemon: PropTypes.shape({
    sprites: PropTypes.shape({
      front_default: PropTypes.string,
    }),
    types: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.shape({
          name: PropTypes.string,
        }),
      }),
    ),
    name: PropTypes.string,
    weight: PropTypes.number,
    height: PropTypes.number,
    abilities: PropTypes.arrayOf(
      PropTypes.shape({
        ability: PropTypes.shape({
          name: PropTypes.string,
        }),
      }),
    ),
  }).isRequired,
};

export default Card;
