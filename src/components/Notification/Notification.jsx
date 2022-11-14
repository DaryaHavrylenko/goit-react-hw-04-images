import PropTypes from 'prop-types';
import styled from 'styled-components';

const Message = styled.p`
  margin: 20px auto;
  font-size: 24px;
`;
const Query = styled.i`
  color: red;
  font-size: 26px;
`;

export const Idle = () => <Message>Please, enter your request.</Message>;

export const Rejected = ({ error }) => {
  <Message>
    Sorry something went wrong, reload the page and try again...
  </Message>;
  console.error(error);
};

export const ResolvedNoData = ({ query }) => (
  <Message>
    Sorry, nothing found for your request "<Query>{query}</Query>"
  </Message>
);

Rejected.propTypes = {
  error: PropTypes.string,
};

ResolvedNoData.propTypes = {
  query: PropTypes.string,
};
