import supabase from "../config/SupabaseClient";
import { useEffect, useState } from "react";

import MealCard from "../components/MealCard";

const Home = () => {
  const [error, setError] = useState(null);
  const [meals, setMeals] = useState(null);
  const [orderBy, setOrderBy] = useState("created_at");

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("meals")
        .select()
        .order(orderBy, { ascending: false });

      if (error) {
        console.log(error);
        setError("No data fetched or could not fetch data");
        setMeals(null);
      }
      if (data) {
        console.log(data);
        console.log("gumana");
        setMeals(data);
        setError(null);
      }
    };

    fetchData();
  }, [orderBy]);

  // the prevMeals variable uses the current meals stored
  // the filter function return true or false
  // this filter out the deleted meal by the user and preserved the ones that is not deleted
  const handleDelete = (id) => {
    setMeals((prevMeals) => {
      return prevMeals.filter((meal) => meal.id !== id);
    });
  };

  return (
    <div className="page home">
      {error && <p>{error}</p>}

      {meals && (
        <div className="meals">
          <div className="order-by">
            <p>Order by:</p>
            <div className="button-group">
              <button
                className="button-group-item button-group-item-primary"
                onClick={() => setOrderBy("created_at")}
              >
                Time Created
              </button>
              <button
                className="button-group-item button-group-item-primary"
                onClick={() => setOrderBy("name")}
              >
                Name
              </button>
              <button
                className="button-group-item button-group-item-primary"
                onClick={() => setOrderBy("calorie")}
              >
                Calories
              </button>
            </div>
          </div>
          <div className="meal-grid">
            {meals.map((meal) => (
              <MealCard
                key={meal.id}
                meal={meal}
                onDelete={handleDelete}
              ></MealCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
