import React from 'react';
import { Carousel } from 'react-bootstrap';

function Newsreel(props) {
  return (
	<>
	  <Carousel.Item>
		<img
		  className="d-block w-100"
		  src={props.src}
		  alt={props.alt}
		/>
		<Carousel.Caption>
		  <h3>{props.title}</h3>
		  <p>{props.abstract}</p>
		</Carousel.Caption>
	  </Carousel.Item>
	</>
  )
}

export default Newsreel;
