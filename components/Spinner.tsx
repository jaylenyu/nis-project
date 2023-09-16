import styled, { keyframes } from "styled-components";

export default function SpinnerComponent() {
  return (
    <div className="static w-screen h-screen flex justify-center items-center">
      <Spinner />
    </div>
  );
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  animation: ${spin} 0.5s linear infinite;
  margin: 0 auto;
  width: 50px;
  height: 50px;
  border: 5px solid rgb(50, 71, 128, 0.2);
  border-top: 5px solid rgb(50, 71, 128, 1);
  border-radius: 50%;
`;
