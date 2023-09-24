import React from 'react';
import { TeammateData } from '../../types/types';

const Card = (props: TeammateData) => {
  return (
    <div className="card-part" style={{ paddingLeft: '10px' }}>
      <h4 className="card-name">{props.name}</h4>
      <p className="card-role">{props.role}</p>
      <a href={props.github} className="card-github">
        Look at my Github
      </a>
      <ul className="card-contributions">
        {props.contributions.map((contribution, index) => (
          <li key={index}>{contribution}</li>
        ))}
      </ul>
    </div>
  );
};

export default Card;
