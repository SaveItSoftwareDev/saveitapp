import styled from "styled-components";

export const PageContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  .sidebar {
    background-color: #3b3b3b;
    height: 100%;
  }
  .flex-center-center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .avatar {
    width: 150px;
    height: 150px;
    border-radius: 50% !important;
  }
  .branco {
    color: #fff;
  }
  .fundo-cizento {
    background-color: #3b3b3b;
    border-color: #3b3b3b;
  }
  .negrito {
    font-weight: 600;
  }
  .italico {
    font-style: italic;
  }
  .branco {
    color: white;
  }
`;

export const FormContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.1), 0 10px 30px 0 rgba(0, 0, 0, 0.2);
`;

export const WelcomeTitle = styled.h1`
  color: #fff;
  font-size: 75px;
`;
