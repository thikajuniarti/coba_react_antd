import React from 'react';
import { Redirect } from 'react-router';
import { Table, Icon, Button, Input, Menu, Dropdown, Row, Col } from 'antd';
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import moment from 'moment';
import './Master6.css';

const QUERY = gql`
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
`

const Search = Input.Search;

export class ShowProject extends React.Component {
  state = {
    datauser: [],
    ProjectTypetext: "Project Type",
    searchkey: "",
    current: 1,
    move: false,
    current_id: ""
  }

  async componentDidMount(){
    const data = await this.aclient.query({
      query: QUERY
    })
    this.setState({
      datauser: data.data.user[0].projects,
      totalcount: data.data.user[0].projects.totalCount
    })
  }

  render(){
    if (this.state.move) {
      return <Redirect to={"/detailproject/" + this.state.current_id }/>
    }

    const Change = async (pagination, filter, sorter) => {
      let order = sorter.order === 'ascend' ? 'asc' : 'desc'

      const data = await this.aclient.query({
        query: QUERY,
        variables: {
          search: this.state.searchkey,
          orderType: order,
          orderBy: sorter.columnKey,
          offset: (pagination.current - 1) * pagination.pageSize
        }
      })
      this.setState({
        datauser: data.data.user[0].projects,
        current: pagination.current
      })
    }

    const Filter = async (pagination) => {
      const data = await this.aclient.query({
        query: QUERY,
        variables: {
          search: pagination.key
        }
      })
      this.setState({
        datauser: data.data.user[0].projects,
        totalcount: data.data.user[0].projects.totalCount,
        searchkey: pagination.key,
        ProjectTypetext: pagination.key
      })
    }

    const SearchText = async (pagination) => {
      pagination.persist();
      const data = await this.aclient.query({
        query: QUERY,
        variables: {
          search: pagination.target.value
        }
      })
      this.setState({
        datauser: data.data.user[0].projects,
        totalcount: data.data.user[0].projects.totalCount,
        searchkey: pagination.target.value,
        current: 1
      })
    }

    return (
      <ApolloConsumer>
        {client => {
          this.aclient = client;

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
            <Menu onClick={Filter}>
              <Menu.Item key="Installation"><Icon type="tag" />Installation</Menu.Item>
              <Menu.Item key="Modification"><Icon type="tag" />Modification</Menu.Item>
              <Menu.Item key="Additional Charge"><Icon type="tag" />Additional Charge</Menu.Item>
            </Menu>
          );

          return <div>
            <Row gutter={24}>
              <Col span={12}>
                <Dropdown overlay={menu}>
                  <Button>
                    {this.state.ProjectTypetext} <Icon type="down" />
                  </Button>
                </Dropdown>
              </Col>
              <Col span={12}>
                <Search
                  placeholder="input search text"
                  onKeyUp={SearchText}
                  style={{ width: 400 }}
                />
              </Col>
            </Row><br/>
            <Table
              columns={coloumns}
              dataSource={this.state.datauser.nodes}
              onChange={Change}
              pagination={{
                pageSize: this.state.datauser.currentPagesDataCount,
                total: this.state.totalcount,
                current: this.state.current
              }}
              onRow={(record) => {
                return {
                  onClick: () => {
                    this.setState({
                      current_id: record.id,
                      move: true
                    })
                  }
                }
              }}
            />
          </div>
        }}
      </ApolloConsumer>
    )
  }
}
