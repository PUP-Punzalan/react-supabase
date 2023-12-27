import supabase from "../config/SupabaseClient";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const [name, setName] = useState(null);
  const [desc, setDesc] = useState(null);
  const [calorie, setCalorie] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !desc || !calorie) {
      setError("Please fill in all the fields correctly.");
      return;
    }

    const { data, error } = await supabase
      .from("meals")
      .insert([{ name, desc, calorie }])
      .select();

    if (error) {
      console.log(error);
      setError("Unexpected error occurred. Please try again.");
    }
    if (data) {
      console.log(data);
      setError(null);
      navigate("/");
    }
  };

  return (
    <div className="page create">
      <form className="form" onSubmit={handleSubmit}>
        <h3>Create new meal</h3>

        <div className="input-field">
          <label htmlFor="name">Meal name</label>
          <input
            type="text"
            id="name"
            placeholder="e.g. Adobong Manok"
            className="input"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
        </div>

        <div className="input-field">
          <label htmlFor="desc">Description</label>
          <textarea
            id="desc"
            placeholder="e.g. Ingredients"
            className="input"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          ></textarea>
        </div>

        <div className="input-field">
          <label htmlFor="calorie">Calorie</label>
          <input
            type="number"
            id="calorie"
            placeholder="e.g. 50"
            className="input"
            value={calorie}
            onChange={(e) => {
              setCalorie(e.target.value);
            }}
          ></input>
        </div>

        <button className="button button-primary">Create</button>
      </form>

      {error && <p className="error error-primary">{error}</p>}
    </div>
  );
};

export default Create;
