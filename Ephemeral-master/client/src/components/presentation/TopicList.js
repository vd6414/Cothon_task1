import React from 'react';

function TopicList(props) {

  const topics = props.topics.map( (topic, i) => (
	<div key={i} className='topic'>{topic}</div>
  ));

  return (
	<>
	  <div id='topic-list-header'>
		Topic List
	  </div>
	  <div id='topic-list-container'>
		<div id='topic-list'>
		  {topics}
		</div>
	  </div>
	</>
  )
}

export default TopicList;
