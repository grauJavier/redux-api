import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUsers } from '../features/users/usersSlice';

const Users = () => {
  const { users, isLoading, error } = useSelector((store) => store.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return (
      <>
        <h2>Oops!</h2>
        <p>{error}</p>
      </>
    );
  }

  return (
    <ul>
      {users.map((user, index) => (
        <li key={index}>{`${user.name.title} ${user.name.first} ${user.name.last}`}</li>
      ))}
    </ul>
  );
};

export default Users;
