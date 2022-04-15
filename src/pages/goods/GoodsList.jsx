import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Table, Tabs } from "antd";
import { getCategory, getGoodsList } from "../../api/goods"
import { Link } from "react-router-dom"
import './Goods.scss'

const { Option } = Select;
const { TabPane } = Tabs;


function Goods() {
  const [form] = Form.useForm();
  const [category, setCategory] = useState([])
  const [goodsList, setGoodsList] = useState([])
  const [tableLoading, setTableLoading] = useState(false)
  const [formData, setFormData] = useState({})
  
  const [allNum, setAllNum] = useState(0)
  const [total, setTotal] = useState(0)
  const [pages, setPages] = useState({
    pageIndex: 1, 
    pageSize: 10
  })

  const columns = [
    {
      title: '商品编号',
      width: 200,
      dataIndex: 'productSno',
      render: text => <a>{text}</a>,
    },
    {
      title: '商品名称',
      width: 400,
      dataIndex: 'name',
      render: (text, row) => (
        <div className="u-flex">
          <img src={row.primaryCommodityUrl} alt="img" style={{width: '50px', height: '50px', borderRadius: '5px'}} />
          <span style={{width: '300px'}} className="u-m-l-10 u-line-1">{text}</span>
        </div>
      )
    },
    {
      title: '状态',
      dataIndex: 'shelfStatus',
      render: (text, row) => (
        <>
          <span>{text === 1 ? '上架销售中' : '已下架'}</span>
        </>
      )
    },
    {
      title: '商品分类',
      dataIndex: 'commodityCategoryName',
    },
    {
      title: '操作',
      render: (text, row) => (
        <>
          <Link to="/goods/add-goods">编辑</Link>
        </>
      ),
    },
  ];

  useEffect(() => {
    console.log('执行第1个useEffect')
    getCategoryFn()
  }, []);

  useEffect(() => {
    console.log('执行第2个useEffect')
    getGoodsListFn()
  }, [pages, formData]) // 在 pages 更改时更新

  const getCategoryFn = () => {
    getCategory().then(res => {
      setCategory(res)
    })
  }
  const getGoodsListFn = () => {
    console.log('formData', {
      ...pages,
      ...formData
    })
    setTableLoading(true)
    getGoodsList({
      ...pages,
      ...formData
    })
      .then(res => {
        setGoodsList(res.records)
        setTotal(res.total)
      })
      .finally(() => {
        setTableLoading(false)
      })
  }
  // 查询搜索
  const onFinish = (values) => {
    console.log("查询values:", values);
    console.log('查询formData', formData)
    setPages({
      pageIndex: 1, 
      pageSize: 10
    })
    setFormData({
      ...formData,
      ...values
    })
  };
  // 重置
  const handleReset = () => {
    form.resetFields()
    setPages({
      pageIndex: 1, 
      pageSize: 10
    })
    setFormData({
      shelfStatus: formData.shelfStatus
    })
  }

  const onCodeChange = (value) => {
    console.log(value)
  }

  const tabChange = (key) => {
    setFormData({
      ...formData,
      shelfStatus: key === '2' ? undefined : key
    })
  }

  return (
    <div>
      <Tabs defaultActiveKey="2" size="large" onChange={tabChange}>
        <TabPane tab={`全部`} key="2">
        </TabPane>
        <TabPane tab="上架销售中" key="1">
        </TabPane>
        <TabPane tab="已下架" key="0">
        </TabPane>
      </Tabs>
      <div className="page-top u-p-t-24 u-p-b-48">
        <Form
          form={form}
          name="horizontal_login"
          onFinish={onFinish}
          labelWrap
          labelAlign="left"
          layout="inline"
        >
          <Form.Item name="name" label="商品名称">
            <Input placeholder="商品名称" style={{width: '150px'}}/>
          </Form.Item>
          <Form.Item name="productSno" label="商品编码">
            <Input placeholder="商品编码" style={{width: '150px'}}/>
          </Form.Item>
          <Form.Item name="categoryCode" label="商品分类">
            <Select
              style={{width: '150px'}}
              placeholder="商品分类"
              onChange={onCodeChange}
              allowClear
            >
              {
                category.map(item => {
                  return <Option value={item.code} key={item.code}>{item.categoryName}</Option>
                })
              }
            </Select>
          </Form.Item>
          <Form.Item shouldUpdate className="u-m-l-40">
            {() => (
              <Button onClick={handleReset}>
                重置
              </Button>
            )}
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>
      <div className="page-con">
        <Table columns={columns} dataSource={goodsList} rowKey="code" loading={tableLoading}
          pagination={{total, current: pages.pageIndex, pageSize: pages.pageSize, onChange: (page, pagesize) => {
            console.log(page)
            setPages(() => {
              return {
                pageSize: pagesize,
                pageIndex: page
              }
            })
          }}}
        />
      </div>
    </div>
  );
}

export default Goods;
