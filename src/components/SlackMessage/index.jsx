import React from 'react';
import PropTypes from 'prop-types';
import './SlackMessage.css';

function SlackMessage({message}) {
  return (
    <div className="slack-message-container">
      <div className="slack-message-user">{message.body.user_id}</div>
      <div className="slack-message-content">{message.body.message}</div>
    </div>
  );
};

SlackMessage.propTypes = {
  message: PropTypes.object.isRequired
};

export default SlackMessage;