import React from 'react';
import { List, Avatar, Button, Icon, Checkbox } from 'antd';

const listData = [];
const array = [];
const checkedbox = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    id: `${i}`,
    href: 'http://ant.design',
    title: `ant design part ${i}`,
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

const IconText = ({ type, text, click, icon }) => (
  <span>
    <Button type={type} onClick={click} style={{ marginRight: 8 }}>
      <Icon type={icon}/> {text}
    </Button>
  </span>
);

export class Master5 extends React.Component {
  addList = (value, e) => {
    checkedbox.push({id: value.id, checkedlist: true});
    array.push(value);
    this.setState({
      listSelectedData: [],
      checked:checkedbox,
    });
  }

  handleTransfer = (e) => {
    // listSelectedData.push(value);
    this.setState({ listSelectedData: array, checked:[] });
    checkedbox = [];
  }

  handleDelete = (value) => {
    const index = array.findIndex(item => item.id === value.id)
    if(index !== -1) {
      array.splice(index, 1);
    }
    this.setState({ listSelectedData: array });
  }

  state = {
    checked: [],
    listSelectedData: [],
  };

  render(){
    return(
      <div class="row">
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 3,
          }}
          dataSource={listData}
          footer={<div><b>ant design</b> footer part</div>}
          renderItem={item => (
            <List.Item
              key={item.title}
              actions={[<IconText type="primary" text="Selected" click={() => this.handleTransfer(item)}/>, <Checkbox onChange={(e) => this.addList(item, e)} checked={this.state.checked.find(state => state.id === item.id)}></Checkbox>]}
              extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
            >
              <List.Item.Meta
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />
        <IconText type="primary" text="send" click={(e) => this.handleTransfer(e)} />

        <List
          itemLayout="horizontal"
          dataSource={this.state.listSelectedData}
          renderItem={item => (
            <List.Item
              actions={[<IconText type="danger" icon="delete" text="delete" click={() => this.handleDelete(item)}/>]}
            >
              <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={<a href="https://ant.design">{item.title}</a>}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}
