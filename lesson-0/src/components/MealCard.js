import { Link } from "react-router-dom";
import supabase from "../config/SupabaseClient";

const MealCard = ({ meal, onDelete }) => {
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("meals")
      .delete()
      .eq("id", meal.id)
      .select();

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
      onDelete(meal.id);
    }
  };

  return (
    <div className="meal-card">
      <div className="info">
        <h3>{meal.name}</h3>
        <p>{meal.desc}</p>
      </div>
      <div className="buttons">
        <Link to={"/" + meal.id}>
          <i className="material-icons icon-button icon-button-primary">edit</i>
        </Link>
        <i
          className="material-icons icon-button icon-button-primary"
          onClick={handleDelete}
        >
          delete
        </i>
      </div>
      <div className="add-info">
        <span>{meal.calorie} cal</span>
      </div>
    </div>
  );
};

export default MealCard;
