import React from 'react';
import { List, Icon } from 'antd';
import { Query, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

const DataList = () => (
  <Query
    query={gql`
      query users($cursor: String){
        users(first: 20, after: $cursor) {
          edges{
            node {
              fullName
            }
          }
          pageInfo{
						endCursor
					}
        }
      }
    `}
  >
    {({ loading, error, data: { users: users }, fetchMore}) => {
      if (loading) return <p>Loading...</p>;
      if (error) return `${error}`;
      console.log(users);
      return(
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              fetchMore({
                variables: {
                  cursor: users.pageInfo.endCursor
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                  const newEdges = fetchMoreResult.users.edges;
                  const pageInfo = fetchMoreResult.users.pageInfo;

                  return newEdges.length ?
                    {
                      users: {
                        __typename: previousResult.users.__typename,
                        edges: [...previousResult.users.edges, ...newEdges],
                        pageInfo
                      }
                    } : previousResult
                  console.log(newEdges);
                }
              })
            },
            pageSize: 10,
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

const DataList2 = (data) => {
  console.log(data.data);
  return <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 3,
    }}
    dataSource={data.data.users.edges}
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
}

export class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      datauser: []
    }
  }

  state = {
    datalist: []
  }

  async componentDidMount(){
    const data = await this.aclient.query({
      query: gql`
        query users($cursor: String){
          users(first: 20, after: $cursor) {
            edges{
              node {
                fullName
              }
            }
            pageInfo{
              endCursor
            }
          }
        }
      `
    })
    this.setState({
      datauser: data
    })
  }

  render(){
    // const datalist2 = ()
    return(
      <DataList />
      // <div>
      //   <ApolloConsumer>
      //     {client => {
      //       this.aclient = client;
      //       return null;
      //     }/* do stuff here */}
      //   </ApolloConsumer>
      //   <DataList2 data={this.state.datauser}/>
      // </div>
    );
  }
}
