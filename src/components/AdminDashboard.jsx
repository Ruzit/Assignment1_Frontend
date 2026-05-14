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

  useEffect(() => {
    fetchAdminData();
  }, []);

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

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user? Their cart will also be removed.",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/admin/users/${userId}`);

      showToast("User deleted successfully", "success");
      fetchAdminData();
    } catch (error) {
      showToast(
        error.response?.data?.message || "Failed to delete user",
        "error",
      );
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
    const confirmClear = window.confirm(
      "Are you sure you want to clear this user's cart?",
    );

    if (!confirmClear) return;

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

  const totalCartItems = carts.reduce(
    (sum, cart) =>
      sum + cart.products.reduce((pSum, item) => pSum + item.quantity, 0),
    0,
  );

  const totalCartValue = carts.reduce(
    (sum, cart) =>
      sum +
      cart.products.reduce(
        (pSum, item) => pSum + item.quantity * item.productId.price,
        0,
      ),
    0,
  );

  return (
    <section className="admin-dashboard">
      <div className="admin-top">
        <div>
          <p className="admin-label">Admin Panel</p>
          <h2>Dashboard</h2>
          <p className="admin-subtitle">
            Manage users, roles, and customer shopping carts.
          </p>
        </div>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <span>Total Users</span>
          <strong>{users.length}</strong>
        </div>

        <div className="stat-card">
          <span>Active Carts</span>
          <strong>{carts.length}</strong>
        </div>

        <div className="stat-card">
          <span>Cart Items</span>
          <strong>{totalCartItems}</strong>
        </div>

        <div className="stat-card">
          <span>Total Cart Value</span>
          <strong>${totalCartValue}</strong>
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
        <div className="admin-panel-card">
          <p>Loading admin data...</p>
        </div>
      ) : (
        <>
          {activeTab === "users" && (
            <div className="admin-panel-card">
              <div className="panel-header">
                <h3>User Management</h3>
                <p>View users, update roles, or remove accounts.</p>
              </div>

              <div className="user-card-grid">
                {users.map((user) => {
                  const isCurrentUser = currentUser?.email === user.email;

                  return (
                    <div key={user._id} className="user-management-card">
                      <div>
                        <h4>{user.name}</h4>
                        <p>{user.email}</p>
                      </div>

                      <div className="user-actions">
                        {isCurrentUser ? (
                          <span className={`role-badge ${user.role}`}>
                            {user.role} - You
                          </span>
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

                        <button
                          className="danger-btn"
                          onClick={() => handleDeleteUser(user._id)}
                          disabled={isCurrentUser}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "carts" && (
            <div className="admin-panel-card">
              <div className="panel-header">
                <h3>User Cart Management</h3>
                <p>Review and edit customer cart items.</p>
              </div>

              {carts.length === 0 ? (
                <p>No user carts found.</p>
              ) : (
                <div className="cart-admin-list">
                  {carts.map((cart) => {
                    const cartTotal = cart.products.reduce(
                      (sum, item) => sum + item.quantity * item.productId.price,
                      0,
                    );

                    return (
                      <div key={cart._id} className="cart-admin-card">
                        <div className="cart-admin-header">
                          <div>
                            <h4>{cart.userId?.name}</h4>
                            <p>{cart.userId?.email}</p>
                          </div>

                          <div className="cart-admin-summary">
                            <strong>${cartTotal}</strong>
                            <button
                              className="danger-outline-btn"
                              onClick={() =>
                                handleClearUserCart(cart.userId._id)
                              }
                            >
                              Clear Cart
                            </button>
                          </div>
                        </div>

                        {cart.products.length === 0 ? (
                          <p className="empty-cart-text">Cart is empty.</p>
                        ) : (
                          <div className="cart-product-list">
                            {cart.products.map((item) => (
                              <div
                                key={item.productId._id}
                                className="cart-product-row"
                              >
                                <div>
                                  <strong>{item.productId?.name}</strong>
                                  <p>${item.productId?.price}</p>
                                </div>

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

                                <p>${item.productId?.price * item.quantity}</p>

                                <button
                                  className="danger-btn"
                                  onClick={() =>
                                    handleRemoveFromUserCart(
                                      cart.userId._id,
                                      item.productId._id,
                                    )
                                  }
                                >
                                  Remove
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default AdminDashboard;
