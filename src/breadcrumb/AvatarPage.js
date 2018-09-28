import React from 'react';
import { Avatar } from 'antd';

export class AvatarPage extends React.Component {
  render(){
    return (
      <div style={{ marginLeft: 20, marginTop: 20 }}>
        <Avatar shape="square" size={64} icon="user" style={{ backgroundColor: '#87d068' }} />
        <div class="row" style={{ marginTop: 10, marginBottom: 20 }}>
          <h4 style={{ margin: 0 }}><strong>Ni Nyoman Swastika</strong></h4>
          <h6>nyoman.swastika@dwp.co.id</h6>
        </div>
      </div>
    );
  }
}
