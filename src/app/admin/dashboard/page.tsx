'use client';

import { Card, Row, Col, Statistic, Typography, Progress, Table, Tag } from 'antd';
import { 
  ProjectOutlined, 
  ContactsOutlined, 
  DesktopOutlined,
  TrophyOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';

const { Title } = Typography;

// Mock data for statistics
const statsData = [
  {
    title: 'Tổng số dự án',
    value: 156,
    prefix: <ProjectOutlined />,
    suffix: 'dự án',
    precision: 0,
    valueStyle: { color: '#3f8600' },
  },
  {
    title: 'Dự án hoàn thành',
    value: 128,
    prefix: <TrophyOutlined />,
    suffix: 'dự án',
    precision: 0,
    valueStyle: { color: '#1677ff' },
  },
  {
    title: 'Mẫu thiết kế',
    value: 89,
    prefix: <DesktopOutlined />,
    suffix: 'mẫu',
    precision: 0,
    valueStyle: { color: '#cf1322' },
  },
  {
    title: 'Liên hệ mới',
    value: 45,
    prefix: <ContactsOutlined />,
    suffix: 'liên hệ',
    precision: 0,
    valueStyle: { color: '#722ed1' },
  },
];

// Mock data for recent projects
interface RecentProject {
  key: string;
  name: string;
  status: string;
  client: string;
  progress: number;
  createDate: string;
}

const recentProjects: RecentProject[] = [
  {
    key: '1',
    name: 'Nhà phố 3 tầng tại Quận 7',
    status: 'active',
    client: 'Nguyễn Văn A',
    progress: 75,
    createDate: '2024-10-01',
  },
  {
    key: '2',
    name: 'Biệt thự hiện đại tại Thủ Đức',
    status: 'completed',
    client: 'Trần Thị B',
    progress: 100,
    createDate: '2024-09-15',
  },
  {
    key: '3',
    name: 'Căn hộ chung cư Landmark 81',
    status: 'pending',
    client: 'Lê Văn C',
    progress: 30,
    createDate: '2024-10-05',
  },
  {
    key: '4',
    name: 'Nhà cấp 4 tại Bình Dương',
    status: 'active',
    client: 'Phạm Thị D',
    progress: 60,
    createDate: '2024-09-28',
  },
];

const columns: ColumnsType<RecentProject> = [
  {
    title: 'Tên dự án',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Khách hàng',
    dataIndex: 'client',
    key: 'client',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => {
      let color = 'geekblue';
      let text = 'Đang thực hiện';
      
      if (status === 'completed') {
        color = 'green';
        text = 'Hoàn thành';
      } else if (status === 'pending') {
        color = 'volcano';
        text = 'Chờ xử lý';
      }
      
      return <Tag color={color}>{text}</Tag>;
    },
  },
  {
    title: 'Tiến độ',
    dataIndex: 'progress',
    key: 'progress',
    render: (progress: number) => (
      <Progress percent={progress} size="small" />
    ),
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createDate',
    key: 'createDate',
  },
];

export default function DashboardPage() {
  return (
    <div>
      <Title level={2}>Dashboard</Title>
      
      {/* Statistics Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        {statsData.map((stat, index) => (
          <Col span={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                precision={stat.precision}
                valueStyle={stat.valueStyle}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Progress Overview */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card title="Tỷ lệ hoàn thành dự án" bordered={false}>
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span>Dự án hoàn thành</span>
                <span>82%</span>
              </div>
              <Progress percent={82} strokeColor="#52c41a" />
            </div>
            
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span>Dự án đang thực hiện</span>
                <span>15%</span>
              </div>
              <Progress percent={15} strokeColor="#1677ff" />
            </div>
            
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span>Dự án chờ xử lý</span>
                <span>3%</span>
              </div>
              <Progress percent={3} strokeColor="#ff4d4f" />
            </div>
          </Card>
        </Col>
        
        <Col span={12}>
          <Card title="Thống kê theo tháng" bordered={false}>
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="Dự án mới"
                  value={12}
                  precision={0}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<ArrowUpOutlined />}
                  suffix="dự án"
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Hoàn thành"
                  value={8}
                  precision={0}
                  valueStyle={{ color: '#cf1322' }}
                  prefix={<ArrowDownOutlined />}
                  suffix="dự án"
                />
              </Col>
            </Row>
            
            <div style={{ marginTop: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span>Tiến độ tháng này</span>
                <span>67%</span>
              </div>
              <Progress percent={67} strokeColor="#722ed1" />
            </div>
          </Card>
        </Col>
      </Row>

      {/* Recent Projects Table */}
      <Card title="Dự án gần đây" bordered={false}>
        <Table 
          columns={columns} 
          dataSource={recentProjects} 
          pagination={{ pageSize: 5 }}
          scroll={{ x: true }}
        />
      </Card>
    </div>
  );
}