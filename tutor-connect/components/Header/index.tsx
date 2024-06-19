import React from "react";
import styled from "styled-components";

interface HeaderProps {
  room: string;
}

const Header: React.FC<HeaderProps> = ({ room }) => {
  return (
    <HeaderContainer>
      <RoomInfo>
        <StatusIcon>
          <i className="fa fa-circle" aria-hidden="true"></i>
        </StatusIcon>
        <RoomName>{room}</RoomName>
      </RoomInfo>
      <CloseButton href="/">
        <i className="fa fa-times-circle" aria-hidden="true"></i>
      </CloseButton>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #2979ff;
  border-radius: 4px 4px 0 0;
  height: 60px;
  width: 100%;
  padding: 0 20px;
`;

const RoomInfo = styled.div`
  display: flex;
  align-items: center;
  color: white;
`;

const StatusIcon = styled.div`
  color: #11ec11;
  margin-right: 10px;
`;

const RoomName = styled.div`
  font-size: 20px;
`;

const CloseButton = styled.a`
  color: white;
  font-size: 20px;
`;
