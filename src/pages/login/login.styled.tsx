import styled from "styled-components";

export const PageContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #3b3b3b;

  .flex-center-center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const FormContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  height: 300px;
  width: 100%;
`;

export const WelcomeTitle = styled.h1`
  color: #fff;
  font-size: 75px;
`;
