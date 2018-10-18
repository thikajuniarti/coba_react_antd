import React from 'react';
import { Card, Row, Col } from 'antd';
import moment from 'moment';
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";

const QUERY = gql`
  query project($id: [Int!]){
  	project(id: $id){
  		customer{
  			name
  			npwp
  		}
  		billing{
  			billingName
  		}
  		main {
  			name
  		}
  		projectName
  		branch
  		createdAt
      currentActiveMou {
  			bundling
  		}
  	}
  }`

export class DetailProject extends React.Component {
  state = {
    datauser: []
  }

  async componentDidMount(){
    const data = await this.aclient.query({
      query: QUERY,
      variables: {
        id: parseInt(this.props.id)
      }
    })
    this.setState({
      billingName: data.data.project[0].billing.billingName,
      projectName: data.data.project[0].projectName,
      bundlingState: data.data.project[0].currentActiveMou.bundling,
      branch: data.data.project[0].branch,
      createdAt: data.data.project[0].createdAt
    })
  }

  render(){
    return(
      <ApolloConsumer>
        {client => {
          this.aclient = client;

          return <Card
              title="Detail Project"
              extra={<a href="/">Back</a>}
            >
              <p>{this.state.billingName}</p><br/>
              <Row gutter={24}>
                <Col span={6}>
                  <p><strong>Project Type</strong></p>
                  <p>{this.state.projectName}</p>
                </Col>
                <Col span={6}>
                  <p><strong>Latest Active SF Type</strong></p>
                  <p>{this.state.bundlingState}</p>
                </Col>
                <Col span={6}>
                  <p><strong>D~Net Branch</strong></p>
                  <p>{this.state.branch}</p>
                </Col>
                <Col span={6}>
                  <p><strong>Created At</strong></p>
                  <p>{moment(this.state.createdAt).format("L")}</p>
                </Col>
              </Row><br/>
            </Card>
        }}
      </ApolloConsumer>
    )
  }
}
