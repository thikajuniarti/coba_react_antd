import React from 'react';
import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;

export class Sidebar extends React.Component {
  render() {
    return (
      <Menu
          mode="inline"
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="project"><a href="/"><Icon type="solution" />Project</a></Menu.Item>
          <SubMenu key="masterpage" title={<span><Icon type="bars" />Master</span>}>
            <Menu.Item key="master1"><a href="/master">Master 1</a></Menu.Item>
            <Menu.Item key="master2"><a href="/master2">Master 2</a></Menu.Item>
            <Menu.Item key="master3"><a href="/master3">Master 3</a></Menu.Item>
            <Menu.Item key="master4"><a href="/master4">Master 4</a></Menu.Item>
            <Menu.Item key="master5"><a href="/master5">Master 5</a></Menu.Item>
          </SubMenu>
          <Menu.Item key="/"><Icon type="logout" />Sign Out</Menu.Item>
        </Menu>
    );
  }
}
