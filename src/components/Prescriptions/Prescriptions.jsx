import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import SearchBar from "../SearchBar/Searchbar";
import AdminTable from "../Table/Table";
import "./prescriptions.scss";
import { Link } from "react-router-dom";
import authService from "../../Services/auth.service";
import { useState, useEffect } from "react";
import PrescriptionDetail from "./PrescriptionDetail";
import { createSearchParams, useNavigate } from "react-router-dom";

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const id = 1;

  let navigate = useNavigate();
  const data = [
    {
      name: "Amanuel Zewdu",
      orderId: "001",
      phone: "0956878995",
      location: "Addis Ababa",
      date: "17/12/2022",
      status: "Active",
    },
  ];
  const fetchPrescriptions = async (e) => {
    const response = await authService.getPrescriptions();
    setPrescriptions(response);
    console.log("**Prescriptions**", response);
  };
  const detailView = (data) => {
    console.log("DATA", data);
    //navigate("/prescriptionDetail");
    navigate({
      pathname: "/prescriptionDetail",
      search: createSearchParams({
        id: data,
      }).toString(),
    });
  };

  const columns = [
    { title: "Prescription ID", dataIndex: "prescriptionUniqueId" },
    { title: "Phone Number", dataIndex: "phoneNo" },

    { title: "Ordered data", dataIndex: "createdon" },
    { title: "Order Status", dataIndex: "status" },
    {
      title: "Action",
      render: (record) => {
        return (
          <div>
            {/* <Link
              to="/prescriptionDetail"
              state={{ state: record.id }}
              style={{ textDecoration: "none" }}
            >
              <li>
                <span>View More</span>
              </li>
            </Link> */}

            <button onClick={() => detailView(record.id)}>
              View Details {record.id}
            </button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    fetchPrescriptions();
  }, []);
  return (
    <div className="prescriptions">
      <Sidebar></Sidebar>
      <div className="prescriptionsContainer">
        <Navbar />
        <h6 class="font-medium text-center mt-4 leading-tight text-base  text-blue-600">
          Prescriptions
        </h6>
        <div className="flex">
          <div className="m-auto ml-4">
            <SearchBar />
          </div>
        </div>

        <div className="prescriptionsTable">
          <AdminTable data={prescriptions} columns={columns}></AdminTable>
        </div>
      </div>
    </div>
  );
};
export default Prescriptions;
