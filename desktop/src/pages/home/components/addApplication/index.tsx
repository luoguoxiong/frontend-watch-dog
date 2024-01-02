import React from 'react';
import { Modal, Form, Radio, Input } from 'antd';
import { AppTypes, AppType } from '@/src/constants';
export const AddApplication = () => {
  const [form] = Form.useForm();

  return (
    <Modal
      open
      destroyOnClose
      onOk={async() => {
        await form.validateFields();
      }}
      title="创建应用">

      <Form
        form={form}
      >
        <Form.Item
          name="name"
          label="应用名称"
          rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="type"
          label="应用类型"
          initialValue={AppType.WEB}
          rules={[{ required: true }]}>
          <Radio.Group>
            {AppTypes.map(((item) =>
              <Radio
                value={item.value}
                disabled={item.value !== AppType.WEB}
                key={item.value}>
                {item.label}
              </Radio>))}
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};
