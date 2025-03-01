import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <span className="loader-text">Hello!!</span>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .loader {
  position: relative;
  overflow: hidden;
  border-right: 3px solid rgb(0, 0, 0) ;
  width: 0px;
  animation: typewriter 1.5s steps(10)  infinite alternate , blink 0.5s steps(10) infinite;
  
}

.loader-text {
  font-size: 20px;
  font-weight: 700;
  /* background: linear-gradient(to right,#159957, #155799); */
  background: #000000;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@keyframes typewriter {
  0% {
    width: 0px;
  }

  100% {
    width: 70px;
  }
}

@keyframes blink {
  0% {
    border-right-color: rgba(0, 0, 0, 0.75);
    ;
  }

  100% {
    border-right-color: transparent;
  }
}`;

export default Loader;
