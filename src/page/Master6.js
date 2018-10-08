import React from 'react';
import { Table } from 'antd';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import moment from 'moment';

const coloumns = [{
  title: 'Project ID',
  dataIndex: 'node.id',
  key: 'id',
  defaultSortOrder: 'descend',
  sorter: true,
  render: text => <a href="/">{text}</a>
}, {
  title: 'Customer',
  dataIndex: 'node.customer.name',
  key: 'customer.name',
  sorter: true
}, {
  title: 'Billing ID',
  dataIndex: 'node.billing',
  render: billing => `${billing.name} - ${billing.billingDtrixId}`
}, {
  title: 'Project Type',
  dataIndex: 'node.projectName',
  defaultSortOrder: 'descend',
  key: 'master_project_id',
  sorter: true
}, {
  title: 'Created At',
  dataIndex: 'node.createdAt',
  render: text => <p>{moment(text).format("L")}<br /><small>{moment(text).fromNow()}</small></p>
}];

const Data = () => (
  <Query
    query={gql`
      query user($offset: Int, $orderBy: String, $orderType: String){
        user(id: 91){
      		projects(first: 5, offset: $offset, orderBy: $orderBy, orderType: $orderType){
      			edges{
      				node{
                id
      					projectName
                createdAt
      					customer{
      						name
      					}
      					billing{
                  billingDtrixId
      						name
      					}
      				}
      			}
      			totalCount
      			currentPagesDataCount
      		}
      	}
      }
    `}
  >
    {({ loading, error, data: { user: user }, fetchMore }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>`${error}`</p>;

      const Change = (pagination, filter, sorter) => {
        const order = sorter.order === 'ascend' ? 'asc' : 'desc'

        fetchMore({
          variables: {
            orderType: order,
            orderBy: sorter.coloumnKey,
            offset: (pagination.current - 1) * 5
          },
          updateQuery: (previous, { fetchMoreResult }) => {
            const newEdges = fetchMoreResult.user[0].projects.edges;
            const totalCount = previous.user[0].projects.totalCount;
            const currentPagesDataCount = fetchMoreResult.user[0].projects.currentPagesDataCount;

            return {
              user: [{
                projects: {
                  __typename: previous.user[0].projects.__typename,
                  edges: newEdges,
                  totalCount,
                  currentPagesDataCount
                }
              }]
            }
          }
        })
      }

      return(
        <Table
          columns={coloumns}
          dataSource={user[0].projects.edges}
          onChange={Change}
          pagination={{
            pageSize: user[0].projects.currentPagesDataCount,
            total: user[0].projects.totalCount
          }}
        />
      )
    }}
  </Query>
);

export class Master6 extends React.Component {
  render(){
    return(
      <Data />
    );
  }
}
