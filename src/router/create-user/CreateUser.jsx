import React, { useState } from "react";
import "./CreateUser.css";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../context/action";

const initialState = {
  id: 0,
  name: "",
  profession: "",
  username: "",
  age: "",
  gender: "",
};

function CreateUser() {
  const [formData, setFormData] = useState(initialState);
  const user = useSelector((state) => state.user);
  console.log(user);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const dispatch = useDispatch();
  const handleCreateUser = (e) => {
    e.preventDefault();
    const existingUser = user.users.find(
      (user) => user?.username.toLowerCase() === formData.username.toLowerCase()
    );
    if (existingUser) {
      alert("Bu username ishlatilgan. Iltimos boshqasini tanlang :)");
      return;
    }
    formData.id = new Date().getTime();
    dispatch(addUser(formData));
    setFormData(initialState);
  };
  return (
    <div className="create__user">
      <h2>Create User</h2>
      <form onSubmit={handleCreateUser} className="create__user-form" action="">
        <input
          required
          name="name"
          value={formData.name}
          onChange={handleChange}
          type="text"
          placeholder="name"
        />
        <input
          required
          name="profession"
          value={formData.profession}
          onChange={handleChange}
          type="text"
          placeholder="profession"
        />
        <input
          required
          name="username"
          value={formData.username}
          onChange={handleChange}
          type="text"
          placeholder="username"
        />
        <input
          required
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          placeholder="age"
        />
        <select
          required
          name="gender"
          onChange={handleChange}
          value={formData.gender}
          id=""
        >
          <option value="">gender</option>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateUser;
