import React from 'react';
import { Table, Icon, Button, Input, Menu, Dropdown, Row, Col } from 'antd';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import moment from 'moment';
import './Master6.css';

const Search = Input.Search;

class SeachData extends React.Component {
  render(){
    return (
      <div>
        <Search
          placeholder="input search text"
          onSearch={value => console.log(value)}
          style={{ width: 400 }}
        />
        <br /><br />
      </div>
    )
  }
}

const Data = () => (
  <Query
    query={gql`
      query user($offset: Int, $orderBy: String, $orderType: String, $search: String){
        user(id: 91){
      		projects(first: 5,
          params: {orderBy: $orderBy, orderType: $orderType, offset: $offset, search: $search}){
            nodes{
    					id
    					projectName
    					createdAt
    					customer{
    						name
    					}
    					main{
    						name
    					}
    					billing{
    						billingDtrixId
    						billingName
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

      const Change = (pagination, filter, sorter, e) => {
        var order = null
        var orderbykey = null
        var offsetkey = null
        var searchkey = null

        if (pagination.key) {
          searchkey = pagination.key
        } else {
          order = sorter.order === 'ascend' ? 'asc' : 'desc'
          orderbykey = sorter.columnKey
          offsetkey = (pagination.current - 1) * pagination.pageSize
        }

        fetchMore({
          variables: {
            search: searchkey,
            orderType: order,
            orderBy: orderbykey,
            offset: offsetkey
          },
          updateQuery: (previous, { fetchMoreResult }) => {
            const newEdges = fetchMoreResult.user[0].projects.nodes;
            const totalCount = pagination.key ? fetchMoreResult.user[0].projects.totalCount : previous.user[0].projects.totalCount;
            const currentPagesDataCount = fetchMoreResult.user[0].projects.currentPagesDataCount;

            return {
              user: [{
                projects: {
                  __typename: previous.user[0].projects.__typename,
                  nodes: newEdges,
                  totalCount,
                  currentPagesDataCount
                }
              }]
            }
          }
        })
      }

      const ProjectTypetext = (text) => {
        if (text) {
          console.log(text);
          return text;
        } else {
          return "Project Type";
        }
      }

      const coloumns = [{
        title: 'Project ID',
        dataIndex: 'id',
        key: 'sowo_projects.id',
        defaultSortOrder: 'descend',
        sorter: true,
        render: text => <a href="/">{text}</a>
      }, {
        title: 'Customer',
        dataIndex: 'customer.name',
        key: 'contacts.name',
        sorter: true
      }, {
        title: 'Billing Name',
        dataIndex: 'billing',
        key: 'contacts.billing_name',
        sorter: true,
        render: billing => `${billing.billingName} - ${billing.billingDtrixId}`
      }, {
        title: 'Project Type',
        dataIndex: 'projectName',
        key: 'sowo_master_projects.name',
        sorter: true
      }, {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'sowo_projects.created_at',
        sorter: true,
        render: text => <p>{moment(text).format("L")}<br /><small>{moment(text).fromNow()}</small></p>
      }];

      const menu = (
        <Menu onClick={Change}>
          <Menu.Item key="Installation"><Icon type="tag" />Installation</Menu.Item>
          <Menu.Item key="Modification"><Icon type="tag" />Modification</Menu.Item>
          <Menu.Item key="Additional Charge"><Icon type="tag" />Additional Charge</Menu.Item>
        </Menu>
      );

      return(
        <div>
          <Row gutter={24}>
            <Col span={12}>
              <Dropdown overlay={menu}>
                <Button style={{ marginLeft: 8 }}>
                  {ProjectTypetext()} <Icon type="down" />
                </Button>
              </Dropdown>
            </Col>
            <Col span={12}>
              <SeachData />
            </Col>
          </Row>
          <Table
            columns={coloumns}
            dataSource={user[0].projects.nodes}
            onChange={Change}
            pagination={{
              pageSize: user[0].projects.currentPagesDataCount,
              total: user[0].projects.totalCount
            }}
            onRow={(record) => {
              return {
                onClick: () => {
                  window.location.assign('/master1');
                }
              }
            }}
          />
        </div>
      )
    }}
  </Query>
);

export class Master6 extends React.Component {
  render(){
    return(
      <div>
        <Data />
      </div>
    );
  }
}
