import React, { useState } from "react";
import { Modal, Input, Form, Button, message, Tooltip, Upload } from "antd";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import { postCategory } from "../../API";

const EditCategory = ({ category }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    cat_id: "",
    image: null,
  });
  const [picLoading, setPicLoading] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);

    setFormData({
      title: "",
      cat_id: "",
      image: null,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (file) => {
    setFormData({
      ...formData,
      image: file,
    });
  };

  const beforeUpload = (file) => {
    
    handleImageUpload(file);
    return false;
  };

  const handleRemove = () => {
    setFormData({
      ...formData,
      image: null,
    });
  };

  const handleSubmit = async () => {
    try {
      const dataToSend = new FormData();
      dataToSend.append("title", formData.title);
      dataToSend.append("cat_id", formData.cat_id);
      if (formData.image) {
        dataToSend.append("image", formData.image);
      }

      const response = await postCategory(dataToSend);
      console.log(response);
      if (response) {
        setIsModalVisible(false);
      } else {
        console.error("Error occurred:", response.statusText);
        message.error("Error Occurred!");
        setPicLoading(false);
      }
    } catch (error) {
      console.error("Error occurred:", error);
      message.error("Error Occurred!");
      setPicLoading(false);
    }
  };

  return (
    <>
      {category.id ? (
        <span onClick={showModal}>{category.title}</span>
      ) : (
        <>
          <Tooltip title="Create Category">
            <EditOutlined onClick={showModal} />
          </Tooltip>
        </>
      )}
      <Modal
        title="Add Category"
        visible={isModalVisible} // Change "open" to "visible" to control modal visibility
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleSubmit}
            loading={picLoading}
          >
            Submit
          </Button>,
        ]}
      >
        <Form>
          <Form.Item label="Category Title : ">
            <Input
              name="title"
              placeholder={`Category Title`}
              value={formData.title}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Category ID : ">
            <Input
              name="cat_id"
              placeholder={`Category ID`}
              value={formData.cat_id}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Choose Picture:">
            <Upload
              beforeUpload={beforeUpload}
              showUploadList={{
                showRemoveIcon: true,
              }}
              fileList={formData.image ? [formData.image] : []}
              onRemove={handleRemove}
            >
              {formData.image ? (
                <Button icon={<UploadOutlined />}>Change Image</Button>
              ) : (
                <Button icon={<UploadOutlined />}>Upload</Button>
              )}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditCategory;
