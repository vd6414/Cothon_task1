import React, { useState, useEffect } from 'react';
import superagent from 'superagent';
import app from '../../base';

// View Components
import TextInput from '../presentation/TextInput';
import TopicList from '../presentation/TopicList';
import { Carousel } from 'react-bootstrap';

function Dashboard(props) {

  /*** State Variables ***/
  const [currentTopic, setTopic] = useState('');
  const [topics, addTopic] = useState([]);

  /*** Lifecycle Actions ***/
    // componentDidMount //
  useEffect(getTopics, []);


  /*** Helper Functions ***/
  function getTopics() {
	console.log('getting topics');
	superagent
	  .get(`http://localhost:5000/api/topics/${props.user.uid}`)
	  .then(res => {
		addTopic(res.body.topics);
	  });

  }

  function updateTopic(e) {
	const newTopic = e.target.value;
	setTopic(newTopic)
  }

  function onSubmit(e) {
	e.preventDefault();
	const topicList = [...topics, currentTopic];
	addTopic(topicList);
	superagent
	  .post(`http://localhost:5000/api/topics/${props.user.uid}`)
	  .send(currentTopic)
	  .then(res => console.log(JSON.stringify(res.body)))
	  .catch(err => console.log('Error saving topic: ', err));
  }

  const newsArr = [
	{ articleUrl: '',
	  title: 'Fake News',
	  abstract: 'First Slide',
	  imgUrl: 'https://picsum.photos/800/400'
	},
	{ articleUrl: '',
	  title: 'Florida man strikes back',
	  abstract: 'Second Slide',
	  imgUrl: 'https://media2.fdncms.com/orlando/imager/u/blog/26153482/asa.5da8af649db7b.jpg?cb=1571337540'
	},
	{ articleUrl: '',
	  title: 'Old man yells at cloud',
	  abstract: 'Third Slide',
	  imgUrl: 'https://i0.kym-cdn.com/entries/icons/facebook/000/019/304/old.jpg'
	}
  ]

  const newsreel = newsArr.map( (article, i) => (
	<Carousel.Item key={i}>
	  <img
		className='d-block w-100 carousel-img'
		src={article.imgUrl}
		alt={article.alt}
	  />
	  <Carousel.Caption>
		<h3 className='caption-title'>{article.title}</h3>
		<p className='caption-abstract'>{article.abstract}</p>
	  </Carousel.Caption>
	</Carousel.Item>
  ));

  return (
	<div id='dashboard-container'>

	  <div className='dashboard-header'>
		<Carousel>
		  {newsreel}
		</Carousel>
	  </div>

	  <div id='main-interface'>
		<h1 id='topic-input-header'>Dashboard</h1>
		<div id='topic-input-container'>
		  <TextInput name='topic' value={currentTopic} type='text' onChange={updateTopic} placeholder='Add a new topic' />
		  <input type='submit' value='Add Topic' className='btn btn-info btn-block mt-4' onClick={onSubmit} />
		</div>

		<TopicList topics={topics} />

		<button className='btn btn-danger signout' onClick={() => app.auth().signOut()}>Sign Out</button>
	  </div>

	</div>
  )
}

export default Dashboard;

