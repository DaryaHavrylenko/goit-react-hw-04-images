import { Circles } from 'react-loader-spinner';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

export const Loader = () => {
  return (
    <Wrapper>
      <Circles
        height="60"
        width="60"
        color="#076bf7"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </Wrapper>
  );
};
