import { Breadcrumb, Layout, Menu, Table, Form, Input, Button, Checkbox, notification, Modal } from 'antd'
import { Footer } from 'antd/lib/layout/layout'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
// import Sider from 'antd/lib/layout/Sider'
// import SubMenu from 'antd/lib/menu/SubMenu'
import React from 'react'
import { fetchStudentsList } from './Modules/actions';
import { columns } from './Modules/constants'
import Avatar from 'antd/lib/avatar/avatar';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class StudentsListView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            mode: '',
            currentRecord: null,
            isLoadingForm: false,
            isLoadingData: false,
        }
    }
    componentDidMount() {
        // make api call
        this.getData()
    }
    getData = async () => {
        this.setState({ isLoadingData: true })
        const { data } = await fetchStudentsList()
        this.setState({ list: data, isLoadingData: false })
    }
    showMoreInfo = (id) => {
        this.setState({ isLoadingForm: true })
        setTimeout(() => {
            const f = this.state.list.find(x => x.id === id);
            if (f) {
                this.setState({ currentRecord: JSON.parse(JSON.stringify(f)), mode: 'Edit' })
            } else {
                this.setState({ currentRecord: null, mode: 'Edit' })
            }
            this.setState({ isLoadingForm: false })
        }, 200);
    }
    onAddButtonClick = () => {
        this.setState({ isLoadingForm: true })
        setTimeout(() => {
            const newobj = {
                firstname: '',
                lastname: '',
                course: '',
                address: ''
            }
            this.setState({ currentRecord: JSON.parse(JSON.stringify(newobj)), mode: 'Add', isLoadingForm: false })
        }, 200);
    }
    handleCancelClick = () => {
        this.setState({ currentRecord: null, mode: '' })
    }
    handleFormFieldChange = (fieldname, fieldvalue) => {
        console.log('handle form field change called')
        const { currentRecord } = this.state;
        const f = Object.keys(currentRecord).find(x => x === fieldname);
        if (f) {
            currentRecord[fieldname] = fieldvalue;
            this.setState({ currentRecord: JSON.parse(JSON.stringify(currentRecord)) })
        }
    }
    handleFormSubmit = (values) => {
        const { mode, list, currentRecord } = this.state;
        if (mode === "Edit") {
            list.forEach((l) => {
                if (l.id === currentRecord.id) {
                    l.firstname = values.firstname
                    l.lastname = values.lastname
                    l.address = values.address
                    l.course = values.course
                }
            })
        } else if (mode === "Add") {
            const id = list.map((l) => l.id).sort((a, b) => b - a)[0];
            list.push({
                id: id + 1,
                ...values
            });
        }
        this.setState({ list: JSON.parse(JSON.stringify(list)), currentRecord: null, mode: '' })
        notification.open({
            message: 'Notification',
            description:
                'Data has been saved successfully.',
        });
    }
    construcVanillaTable = () => {
        if (this.state.list && this.state.list.length > 0) {
            return (
                <table>
                    <thead>
                        <tr>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Course</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.constructTableBody()}
                    </tbody>
                </table>
            )
        }
    }
    constructTableBody = () => {
        if (this.state.list && this.state.list.length > 0) {
            return this.state.list.map((item, index) => {
                const firstname_display = <a href="#"
                    onClick={(e) => this.showMoreInfo(item.id)}>
                    {item.firstname}</a>
                return (
                    <tr key={index}>
                        <td>{firstname_display}</td>
                        <td>{item.lastname}</td>
                        <td>{item.course}</td>
                        <td>{item.address}</td>
                    </tr>
                )
            })
        }
        return (
            (
                <tr>
                    <td colSpan="4">No data available</td>
                </tr>
            )
        )
    }
    constructAntDTable = () => {
        if (this.state.list && this.state.list.length > 0) {
            const temp = JSON.parse(JSON.stringify(this.state.list));
            const data = temp.map((item) => ({
                ...item,
                firstname_display: <a href="#"
                    onClick={(e) => this.showMoreInfo(item.id)}>
                    {item.firstname}</a>
            }))
            return (
                <Table dataSource={data} columns={columns} />
            )
        }
        (
            <table>
                <tr>
                    <td colSpan="4">No data available</td>
                </tr>
            </table>
        )
    }
    renderVanillaFormControl = () => {
        if (this.state.mode && this.state.currentRecord) {
            return (
                <>
                    <div className="form">
                        <div className="marginLeft">
                            <div className="displayFlex">
                                <label>First name: </label>
                                <input type="text" className="form-control"
                                    value={this.state.currentRecord.firstname}
                                    onChange={(e) => this.handleFormFieldChange('firstname', e.currentTarget.value)} />
                            </div>
                            <div className="displayFlex">
                                <label>Last name: </label>
                                <input type="text" className="form-control"
                                    value={this.state.currentRecord.lastname}
                                    onChange={(e) => this.handleFormFieldChange('lastname', e.currentTarget.value)} />
                            </div>
                            <div className="displayFlex">
                                <label>Course: </label>
                                <input type="text" className="form-control"
                                    value={this.state.currentRecord.course}
                                    onChange={(e) => this.handleFormFieldChange('course', e.currentTarget.value)} />
                            </div>
                            <div className="displayFlex">
                                <label>Address: </label>
                                <input type="text" className="form-control"
                                    value={this.state.currentRecord.address}
                                    onChange={(e) => this.handleFormFieldChange('address', e.currentTarget.value)} />
                            </div>
                        </div>
                        <button type="button" className="btnSubmit" onClick={this.handleFormSubmit}>Submit</button>
                        <button type="button" className="btnSubmit" onClick={this.handleCancelClick}>Cancel</button>
                    </div>
                </>
            )
        }
        return null;
    }
    renderAntdFormControl = () => {
        if (this.state.mode && this.state.currentRecord) {
            return (
                <Modal
                    title={this.state.mode}
                    visible={this.state.mode && this.state.currentRecord}
                    confirmLoading={this.state.isLoadingForm}
                    // onOk={handleOk}
                    onCancel={this.handleCancelClick}
                    footer={[
                        <>
                        </>
                    ]}
                >
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={this.state.currentRecord}
                        onFinish={this.handleFormSubmit}
                        onFinishFailed={() => false}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="First Name"
                            name="firstname"
                            rules={[{ required: true, message: 'Please input your firstname!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Last Name"
                            name="lastname"
                            rules={[{ required: true, message: 'Please input your lastname!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[{ required: true, message: 'Please input your address!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Course"
                            name="course"
                            rules={[{ required: true, message: 'Please input your course!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                </Button>
                            <Button type="primary" htmlType="button" style={{ marginLeft: '10px' }} onClick={this.handleCancelClick}>
                                Cancel
                </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            )
        }
        return null;
    }
    render() {
        return (
            <div>
                <Button type="primary" htmlType="button" style={{ marginLeft: '10px', display: 'flex' }}
                    onClick={this.onAddButtonClick}>
                    Add
                                </Button>

                {!this.state.isLoadingData ? (
                    <>
                        {this.constructAntDTable()}
                    </>
                ) : null}

                {!this.state.isLoadingForm ? (
                    <>
                        {this.renderAntdFormControl()}
                    </>
                ) : null}
            </div>
        )
    }
}