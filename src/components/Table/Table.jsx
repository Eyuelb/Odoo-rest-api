import { Table, Spin } from "antd";
import "./table.scss";

const AdminTable = ({ columns, data }) => {
  return (
    <Table
      className="admin-table"
      style={{
        borderRadius: 8,
        boxShadow: "0px 1px 2px rgba(18, 62, 119, 0.05)",
        border: "1px solid #E5E7EB",
        padding: 1.5,
        backgroundColor: "#F9FAFB",
        width: "100%",
      }}
      columns={columns}
      dataSource={data}
      pagination={true}
      loading={{
        indicator: <Spin />,

        spinning: !data,
      }}
    />
  );
};

export default AdminTable;
