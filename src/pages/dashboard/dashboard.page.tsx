import * as React from "react";
import * as S from "./dashboard.styled";

import * as BS from "react-bootstrap";

interface IDashboarPageProps {}

export const DashboarPage: React.FC<IDashboarPageProps> = (props) => {
  return (
    <S.PageContainer>
      <BS.Container fluid className="h-100">
        <BS.Row className="h-100">
          <BS.Col lg={2} className="sidebar">
            SideBar
          </BS.Col>
          <BS.Col lg={10}>Content dashboard</BS.Col>
          <div></div>
        </BS.Row>
      </BS.Container>
    </S.PageContainer>
  );
};
