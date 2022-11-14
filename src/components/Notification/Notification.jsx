import PropTypes from 'prop-types';
import { Message, Query } from './Notification.styled';

export const Idle = () => <Message>Enter data to request... </Message>;

export const Rejected = ({ error }) => {
  <Message>
    Sorry something went wrong, reload the page and try again...
  </Message>;
  console.error(error);
};

export const ResolvedNoData = ({ query }) => (
  <Message>
    Sorry, no data was found for your request git"<Query>{query}</Query>"
  </Message>
);

Rejected.propTypes = {
  error: PropTypes.string,
};

ResolvedNoData.propTypes = {
  query: PropTypes.string,
};
