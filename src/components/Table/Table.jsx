import { Table } from 'antd';
import './table.scss';

const AdminTable = ({ columns, data, loading = false, ...params }) => {
  return (
    <Table
      className="admin-table"
      loading={loading}
      pagination={false}
  
      
      style={{
        borderRadius: 8,
        boxShadow: '0px 1px 2px rgba(18, 62, 119, 0.05)',
        border: '1px solid #E5E7EB',
        padding: 1.5,
        backgroundColor: '#F9FAFB',
        
      
      }}
      columns={columns}
      dataSource={data}
     
     
    />
  );
};

export default AdminTable;