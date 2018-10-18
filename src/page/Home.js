import React from 'react';
import { List, Icon } from 'antd';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import './Home.css'

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

const DataList = () => (
  <Query
    query={gql`
      query users($offset: Int){
        users(first: 5, params: { offset: $offset }) {
          edges{
            node {
							id
              fullName
            }
          }
          totalCount
          currentPagesDataCount
        }
      }
    `}
  >
    {({ loading, error, data: { users: users }, fetchMore}) => {
      if (loading) return <p>Loading...</p>;
      if (error) return `${error}`;

      return(
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              fetchMore({
                variables: {
                  offset: (page - 1) * 5
                },
                updateQuery: (previous, { fetchMoreResult }) => {
                  const newEdges = fetchMoreResult.users.edges;
                  const totalCount = previous.users.totalCount;
                  const currentPagesDataCount = fetchMoreResult.users.currentPagesDataCount;

                  return {
                    users: {
                      __typename: previous.users.__typename,
                      edges: newEdges,
                      totalCount,
                      currentPagesDataCount
                    }
                  }
                }
              })
            },
            pageSize: users.currentPagesDataCount,
            total: users.totalCount,
          }}
          dataSource={users.edges}
          footer={<div><b>ant design</b> footer part</div>}
          renderItem={item => (
            <List.Item
              key={item.node.fullName}
              actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
              extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
            >
              <List.Item.Meta
                title={<a href={item.node.fullName}>{item.node.fullName}</a>}
                description={item.node.fullName}
              />
              {item.node.fullName}
            </List.Item>
          )}
        />
      );
    }}
  </Query>
);

export class Home extends React.Component {
  render(){
    return(
      <DataList />
    );
  }
}
