import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../config/SupabaseClient";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  // const [meals, setMeals] = useState(null);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [calorie, setCalorie] = useState("");

  useEffect(() => {
    const fetchMeal = async () => {
      const { data, error } = await supabase
        .from("meals")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        navigate("/", { replace: true });
      }
      if (data) {
        console.log(data);
        setName(data.name);
        setDesc(data.desc);
        setCalorie(data.calorie);
      }
    };

    fetchMeal();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !desc || !calorie) {
      setError("Please fill in all the fields correctly.");
      return;
    }

    const { data, error } = await supabase
      .from("meals")
      .update({ name, desc, calorie })
      .eq("id", id)
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
    <div className="page update">
      <form className="form" onSubmit={handleSubmit}>
        <h3>Update meal no. {id}</h3>

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

        <button className="button button-primary">Update</button>
      </form>

      {error && <p className="error error-primary">{error}</p>}
    </div>
  );
};

export default Update;
