import styled from "styled-components";

export const PageContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;

  .sidebar {
    background-color: #3b3b3b;
    height: 100%;
  }

  .avatar {
    width: 150px;
    height: 150px;
    border-radius: 50% !important;
  }

  .branco {
    color: #fff;
  }

  .card {
    border: none;
    border-radius: 8px;
    text-align: center;
  }

  .saldo-total {
    background-color: #2f18ad;
    color: #fff;
  }

  .saldo-conta {
    background-color: #f35810;
    color: #fff;
  }

  .saldo-despesa {
    background-color: #f3a908;
    color: #fff;
  }

  .saldo-receita {
    background-color: #148805;
    color: #fff;
  }
`;
