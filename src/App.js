import { ApolloProvider } from "react-apollo";
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import React, { Component } from 'react';
import { RoutePage } from './breadcrumb/RoutePage';
import { Sidebar } from './breadcrumb/Sidebar';
import { AvatarPage } from './breadcrumb/AvatarPage';
import { BreadcrumbPage } from './breadcrumb/BreadcrumbPage';
import { Layout } from 'antd';
import './App.css';

const { Header, Sider, Content } = Layout;

const token = '9edc9546a263e4238d24d5d29a266f09';

const client = new ApolloClient({
  link: new createHttpLink({
    uri: `http://192.168.1.64:3000/graphql`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }),
  cache: new InMemoryCache()
});

class App extends Component {
  render() {
    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <AvatarPage />
            <Sidebar />
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <div class="row">
              <BreadcrumbPage />
            </div>
            <Content style={{ background: '#fff', padding: 24, margin: 0 }}>
              <ApolloProvider client={client}>
                <RoutePage />
              </ApolloProvider>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default App;
