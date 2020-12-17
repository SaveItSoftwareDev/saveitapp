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

  .botao-entrar {
    font-weight: 600;
  }

  .botao-registo {
    font-size: 14px;
    text-decoration: underline;
  }

  .italico {
    font-style: italic;
  }
`;

export const FormContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  height: 300px;
  width: 100%;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.1), 0 10px 30px 0 rgba(0, 0, 0, 0.2);
`;

export const WelcomeTitle = styled.h1`
  color: #fff;
  font-size: 75px;
`;
