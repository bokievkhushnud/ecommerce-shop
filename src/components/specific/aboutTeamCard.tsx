import React from 'react';
import { TeammateData } from '../../types/types';

const Card = (props: TeammateData) => {
  return (
    <div className="card-part">
      <div className="about-data card-block">
        <h4 className="card-name">{props.name}</h4>
        <p className="card-role">{props.role}</p>
        <p className="card-github">{props.github}</p>
        <ul className="card-contributions">
          {props.contributions.map((contribution, index) => (
            <li key={index} className={contribution}>
              {contribution}
            </li>
          ))}
        </ul>
      </div>
      <div className="about-info">{props.intro}</div>
    </div>
  );
};

export default Card;
