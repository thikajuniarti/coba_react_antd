import React from 'react';
import { Breadcrumb } from 'antd';

export class BreadcrumbPage extends React.Component {
  render(){
    return (
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item><a href="/">Home</a></Breadcrumb.Item>
        <Breadcrumb.Item><a href="/">Project</a></Breadcrumb.Item>
        <Breadcrumb.Item><a href="/">List Barang</a></Breadcrumb.Item>
      </Breadcrumb>
    );
  }
}
