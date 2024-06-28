import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { List as AntdList, Avatar } from "antd";

interface UserAttributes {
  username: string;
}

interface User {
  id: number;
  attributes: UserAttributes;
}

interface ListProps {
  users: User[];
  username: string;
  onUserClick: (username: string) => void;
  curr_recipient: {
    username: string | null;
    id: number | null;
  } | null;
}

const List: React.FC<ListProps> = ({ users, username, onUserClick, curr_recipient }) => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleClick = (userId: number, username: string) => {
    setSelectedUserId(userId);
    onUserClick(username);
  };

  //TODO: Fix the highlighting of the selected user in the params
  // useEffect(() => {
  //   if (curr_recipient != null) {
  //   setSelectedUserId(curr_recipient.id)
  //   onUserClick(curr_recipient.username);
  //   }
  // },[])

  return (
    <StyledContainer>
      <ListHeading>Users</ListHeading>
      <ScrollContainer>
        <AntdList
          itemLayout="horizontal"
          dataSource={users}
          renderItem={(user) => (
            <CardWrapper
              onClick={() => handleClick(user.id, user.attributes.username)}
              isSelected={user.id === selectedUserId ||curr_recipient?.id === user.id}
            >
              <AntdList.Item>
                <AntdList.Item.Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={<Title>{user.attributes.username}</Title>} // Displaying the username
                />
                <StyledButton
                  style={
                    user.attributes.username === "Admin" || username !== "Admin"
                      ? { display: "none" }
                      : undefined
                  } // Verifying that the user is an Admin
                >
                  Delete
                </StyledButton>
              </AntdList.Item>
            </CardWrapper>
          )}
        />
      </ScrollContainer>
    </StyledContainer>
  );
};

export default List;

const StyledContainer = styled.div`
  margin-right: 10px;
  flex: 0 0 35%;
  padding: 20px;
  background: #1e1e1e; /* Background color to match the dark theme */
  color: #ffffff; /* Text color to match the light text on dark background */
  h4 {
    font-size: 25px;
  }
  a {
    color: #097ef0;
  }
`;

const ListHeading = styled.div`
  color: #757591;
  font-size: 20px;
  font-style: oblique;
  border-bottom: 1px solid #757591;
  margin-bottom: 10px;
`;

const ScrollContainer = styled.div`
  max-height: 500px; /* Adjust based on your layout */
  overflow-y: auto;
  padding-right: 10px;
`;

interface CardWrapperProps {
  isSelected: boolean;
}

const CardWrapper = styled.div<CardWrapperProps>`
  margin-bottom: 10px;
  cursor: pointer;
  background: ${(props) => (props.isSelected ? '#1890ff' : 'inherit')}; /* Highlight when selected */
  padding: 10px;
  border-radius: 5px;
  transition: background 0.3s;
`;

const Title = styled.div`
  font-size: 16px;
  color: #ffffff; /* Title text color */
  white-space: nowrap; /* Prevent text wrapping */
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledButton = styled.button`
  background: none;
  border: none;
  color: #f5222d; /* Button text color */
  cursor: pointer;
  &:hover {
    color: #ff4d4f;
  }
`;


// import React, { useState } from "react";
// import styled from "styled-components";
// import { List as AntdList, Avatar, Card } from "antd";

// interface UserAttributes {
//   username: string;
// }

// interface User {
//   id: number;
//   attributes: UserAttributes;
// }

// interface ListProps {
//   users: User[];
//   username: string;
// }

// const List: React.FC<ListProps> = ({ users, username }) => {
//   const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

//   const handleClick = (userId: number) => {
//     setSelectedUserId(userId);
//   };

//   return (
//     <StyledList>
//       <ListHeading>Users</ListHeading>
//       <ScrollContainer>
//         <AntdList
//           itemLayout="horizontal"
//           dataSource={users}
//           renderItem={(user) => (
//             <CardWrapper
//               onClick={() => handleClick(user.id)}
//               isSelected={user.id === selectedUserId}
//             >
//               <StyledCard>
//                 <AntdList.Item>
//                   <AntdList.Item.Meta
//                     avatar={
//                       <StyledAvatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
//                     }
//                     title={<Title>{user.attributes.username}</Title>} // Displaying the username
//                   />
//                   <StyledButton
//                     style={
//                       user.attributes.username === "Admin" || username !== "Admin"
//                         ? { display: "none" }
//                         : undefined
//                     } // Verifying that the user is an Admin
//                   >
//                     Delete
//                   </StyledButton>
//                 </AntdList.Item>
//               </StyledCard>
//             </CardWrapper>
//           )}
//         />
//       </ScrollContainer>
//     </StyledList>
//   );
// };

// export default List;

// const StyledList = styled.div`
//   margin-right: 10px;
//   flex: 0 0 35%;
//   padding: 20px;
//   background: #1e1e1e; /* Background color to match the dark theme */
//   color: #ffffff; /* Text color to match the light text on dark background */
//   h4 {
//     font-size: 25px;
//   }
//   a {
//     color: #097ef0;
//   }
// `;

// const ListHeading = styled.div`
//   color: #757591;
//   font-size: 20px;
//   font-style: oblique;
//   border-bottom: 1px solid #757591;
//   margin-bottom: 10px;
// `;

// const ScrollContainer = styled.div`
//   max-height: 500px; /* Adjust based on your layout */
//   overflow-y: auto;
//   padding-right: 10px;
// `;

// interface CardWrapperProps {
//   isSelected: boolean;
// }

// const CardWrapper = styled.div<CardWrapperProps>`
//   margin-bottom: 10px;
//   cursor: pointer;
//   border: ${(props) => (props.isSelected ? '2px solid #1890ff' : 'none')}; /* Highlight when selected */
// `;

// const StyledCard = styled(Card)`
//   border-radius: 10px;
//   background: #2c2c2c; /* Card background color to match the dark theme */
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
//   .ant-card-body {
//     padding: 10px;
//   }
// `;

// const StyledAvatar = styled(Avatar)`
//   background-color: #ffffff; /* Background color for avatar */
// `;

// const Title = styled.div`
//   font-size: 16px;
//   color: #ffffff; /* Title text color */
//   white-space: nowrap; /* Prevent text wrapping */
//   overflow: hidden;
//   text-overflow: ellipsis;
// `;

// const StyledButton = styled.button`
//   background: none;
//   border: none;
//   color: #f5222d; /* Button text color */
//   cursor: pointer;
//   &:hover {
//     color: #ff4d4f;
//   }
// `;
