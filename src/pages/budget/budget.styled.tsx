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

  .negrito {
    font-weight: 600;
  }

  .italico {
    font-style: italic;
  }

  .branco {
    color: white;
  }

  
  .add-button {
    position: fixed;
    bottom: 25px;
    right: 25px;
    .btn {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      font-size: 36px;
      line-height: 0px;
      padding-top: 0px;
      &::after {
        display: none;
      }
    }
  }
`;