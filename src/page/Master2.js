import React from 'react';
import { Form, Input, Icon, Button } from 'antd';

const FormItem = Form.Item;

let uuid = 0;
let uuidSE = 0;

class DynamicFieldSet extends React.Component {
  remove = (k, value) => {
    const { form } = this.props;
    let keys = "";
    if (value === 'CPE') {
      // can use data-binding to get
      keys = form.getFieldValue('keys');
    } else {
      // can use data-binding to get
      keys = form.getFieldValue('keysSE');
    }

    if (value === 'CPE') {
      // can use data-binding to set
      form.setFieldsValue({
        keys: keys.filter(key => key !== k),
      });
    } else {
      // can use data-binding to set
      form.setFieldsValue({
        keysSE: keys.filter(key => key !== k),
      });
    }

  }

  add = (value) => {
    const { form } = this.props;
    if (value === "CPE") {
      // can use data-binding to get
      const keys = form.getFieldValue('keys');
      const nextKeys = keys.concat(uuid);
      uuid++;
      // can use data-binding to set
      // important! notify form to detect changes
      form.setFieldsValue({
        keys: nextKeys,
      });
    } else {
      // can use data-binding to get
      const keysSE = form.getFieldValue('keysSE');
      const nextKeysSE = keysSE.concat(uuidSE);
      uuidSE++;
      // can use data-binding to set
      // important! notify form to detect changes
      form.setFieldsValue({
        keysSE: nextKeysSE,
      });
    }

  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 14, offset: 6 },
      },
    };

    getFieldDecorator('keys', { initialValue: [] });
    getFieldDecorator('keysSE', { initialValue: [] });
    const keys = getFieldValue('keys');
    const keysSE = getFieldValue('keysSE');
    const formItems = keys.map((k, index) => {
      return (
        <FormItem
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? 'Detail CPE' : ''}
          required={false}
          key={k}
        >
          {getFieldDecorator(`names[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: "Please input passenger's name or delete this field.",
            }],
          })(
            <Input placeholder="Input CPE's name details" style={{ width: '60%', marginRight: 8 }} />
          )}
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => this.remove(k, "CPE")}
          />
        </FormItem>
      );
    });

    const formItemsSE = keysSE.map((k, index) => {
      return (
        <FormItem
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? 'Detail Supporting Equip' : ''}
          required={false}
          key={k}
        >
          {getFieldDecorator(`namesSE[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: "Please input passenger's name or delete this field.",
            }],
          })(
            <Input placeholder="Input supporting equip's name details" style={{ width: '60%', marginRight: 8 }} />
          )}
          {keysSE.length > 0 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={keysSE.length === 1}
              onClick={() => this.remove(k, "SE")}
            />
          ) : null}
        </FormItem>
      );
    });

    return (
      <Form onSubmit={this.handleSubmit}>
        {formItems}
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={() => this.add("CPE")} style={{ width: '60%' }} >
            <Icon type="plus" /> Add field CPE
          </Button>
        </FormItem>
        {formItemsSE}
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={() => this.add("SE")} style={{ width: '60%' }} >
            <Icon type="plus" /> Add field Supporting Equip
          </Button>
        </FormItem>
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedDynamicFieldSet = Form.create()(DynamicFieldSet);
export class Master2 extends React.Component {
  render(){
    return(
      <WrappedDynamicFieldSet />
    );
  }
}
