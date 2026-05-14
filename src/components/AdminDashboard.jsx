import { useEffect, useState } from "react";
import api from "../services/api";

function AdminDashboard({ showToast, currentUser }) {
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

  const handleAdminCartQuantityChange = async (userId, productId, quantity) => {
    if (quantity < 1) return;

    try {
      await api.put(`/admin/users/${userId}/cart/${productId}`, {
        quantity,
      });

      showToast("User cart updated successfully", "success");
      fetchAdminData();
    } catch (error) {
      showToast(
        error.response?.data?.message || "Failed to update user cart",
        "error",
      );
    }
  };

  const handleRemoveFromUserCart = async (userId, productId) => {
    try {
      await api.delete(`/admin/users/${userId}/cart/${productId}`);

      showToast("Product removed from user cart", "success");
      fetchAdminData();
    } catch (error) {
      showToast(
        error.response?.data?.message || "Failed to remove product",
        "error",
      );
    }
  };

  const handleClearUserCart = async (userId) => {
    try {
      await api.delete(`/admin/users/${userId}/cart`);

      showToast("User cart cleared successfully", "success");
      fetchAdminData();
    } catch (error) {
      showToast(
        error.response?.data?.message || "Failed to clear user cart",
        "error",
      );
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await api.put(`/admin/users/${userId}/role`, {
        role: newRole,
      });

      showToast("User role updated successfully", "success");

      fetchAdminData();
    } catch (error) {
      showToast(
        error.response?.data?.message || "Failed to update role",
        "error",
      );
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
                        {user.email === currentUser.email ? (
                          <span className="self-role-label">{user.role}</span>
                        ) : (
                          <select
                            value={user.role}
                            onChange={(e) =>
                              handleRoleChange(user._id, e.target.value)
                            }
                            className="role-select"
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        )}
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
                    {carts.map((cart) =>
                      cart.products.map((item) => (
                        <tr key={`${cart._id}-${item.productId._id}`}>
                          <td>{cart.userId?.name}</td>
                          <td>{cart.userId?.email}</td>
                          <td>{item.productId?.name}</td>
                          <td>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) =>
                                handleAdminCartQuantityChange(
                                  cart.userId._id,
                                  item.productId._id,
                                  Number(e.target.value),
                                )
                              }
                            />
                          </td>
                          <td>${item.productId?.price * item.quantity}</td>
                          <td>
                            <button
                              onClick={() =>
                                handleRemoveFromUserCart(
                                  cart.userId._id,
                                  item.productId._id,
                                )
                              }
                            >
                              Remove
                            </button>
                          </td>
                          <button
                            className="admin-danger-btn"
                            onClick={() => handleClearUserCart(cart.userId._id)}
                          >
                            Clear This User Cart
                          </button>
                        </tr>
                      )),
                    )}
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
