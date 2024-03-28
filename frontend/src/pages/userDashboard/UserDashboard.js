import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../../redux/features/auth/userSlice';
import { SpinnerImg } from '../../components/loader/Loader'; // Assuming you have a similar spinner component
import './UserDashboard.scss';

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  if (loading) return <SpinnerImg />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="user-dashboard">
      <h2>All Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              {/* Add more headers if needed */}
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>

                {/* Render more user details if needed */}
                <td>
                  {/* Add action buttons or links here */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
