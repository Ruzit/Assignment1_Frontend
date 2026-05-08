import { useEffect, useState } from "react";
import api from "../services/api";

function AdminDashboard({ showToast }) {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAdminData = async () => {
    try {
      setLoading(true);

      const usersResponse = await api.get("/admin/users");
      const cartsResponse = await api.get("/admin/carts");

      setUsers(usersResponse.data.data);
      setCarts(cartsResponse.data.data);
    } catch (error) {
      showToast(
        error.response?.data?.message || "Failed to load admin data",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  return (
    <section className="admin-dashboard">
      <div className="admin-header">
        <div>
          <h2>Admin Dashboard</h2>
          <p>Manage users and monitor customer shopping carts.</p>
        </div>
      </div>

      <div className="admin-tabs">
        <button
          className={activeTab === "users" ? "active-tab" : ""}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>

        <button
          className={activeTab === "carts" ? "active-tab" : ""}
          onClick={() => setActiveTab("carts")}
        >
          User Carts
        </button>
      </div>

      {loading ? (
        <p>Loading admin data...</p>
      ) : (
        <div className="admin-content">
          {activeTab === "users" && (
            <div className="admin-table-card">
              <h3>All Users</h3>

              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`role-badge ${user.role}`}>
                          {user.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "carts" && (
            <div className="admin-table-card">
              <h3>All User Carts</h3>

              {carts.length === 0 ? (
                <p>No cart items found.</p>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Email</th>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>

                  <tbody>
                    {carts.map((item) => (
                      <tr key={item._id}>
                        <td>{item.userId?.name}</td>
                        <td>{item.userId?.email}</td>
                        <td>{item.productId?.name}</td>
                        <td>{item.quantity}</td>
                        <td>${item.productId?.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default AdminDashboard;
