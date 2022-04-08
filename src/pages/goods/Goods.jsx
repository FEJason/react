import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Table } from "antd";
import { getCategory, getGoodsList } from "../../api/goods"

const { Option } = Select;


function Goods() {
  const [form] = Form.useForm();
  const [category, setCategory] = useState([])
  const [goodsList, setGoodsList] = useState([])
  const [tableLoading, setTableLoading] = useState(false)
  
  const [total, setTotal] = useState(0)
  const [pages, setPages] = useState({
    pageIndex: 1, 
    pageSize: 10
  })

  const columns = [
    {
      title: '商品编号',
      dataIndex: 'productSno',
      render: text => <a>{text}</a>,
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      render: (text, row) => (
        <>
          <img src={row.primaryCommodityUrl} alt="img" style={{width: '50px', borderRadius: '5px'}} />
          <span className="u-m-l-10">{row.name}</span>
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
          <Button>编辑</Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    getCategoryFn()
    getGoodsListFn()
  }, []);

  useEffect(() => {
    getGoodsListFn()
  }, [pages])

  const getCategoryFn = () => {
    getCategory().then(res => {
      setCategory(res)
    })
  }
  const getGoodsListFn = () => {
    setTableLoading(true)
    getGoodsList(pages)
      .then(res => {
        setGoodsList(res.records)
        setTotal(res.total)
      })
      .finally(() => {
        setTableLoading(false)
      })
  }

  const onFinish = (values) => {
    console.log("Finish:", values);
  };

  const handleReset = () => {
    console.log('重置')
    form.resetFields()
  }

  const onCodeChange = (value) => {
    console.log(value)
  }

  const onStatusChange = (value) => {
    console.log(value)
  }

  return (
    <div>
      <div className="page-top">
        <Form
          form={form}
          name="horizontal_login"
          onFinish={onFinish}
          labelWrap
          labelCol={{span: 14, offset: 0}}
          wrapperCol={{span: 10, offset: 0}}
        >
          <div className="u-flex">
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
            <Form.Item name="shelfStatus" label="商品状态">
              <Select
                style={{width: '150px'}}
                placeholder="商品状态"
                onChange={onStatusChange}
                allowClear
              >
                <Option value="1">上架</Option>
                <Option value="0">下架</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="u-flex">
            <Form.Item shouldUpdate>
              {() => (
                <Button type="primary" htmlType="submit">
                  查询搜索
                </Button>
              )}
            </Form.Item>
            <Form.Item shouldUpdate className="u-m-l-10">
              {() => (
                <Button onClick={handleReset}>
                  重置搜索哈
                </Button>
              )}
            </Form.Item>
          </div>
        </Form>
      </div>
      <div className="page-con">
        <Table columns={columns} dataSource={goodsList} rowKey="productSno" loading={tableLoading}
          pagination={{total, onChange: (page, pagesize) => {
            console.log(page)
            setPages(() => {
              return {
                ...pages,
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
