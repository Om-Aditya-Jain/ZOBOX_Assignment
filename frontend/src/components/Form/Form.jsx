import * as React from "react";
import "./Form.scss";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const Form = ({ value, date, setItem, createTodo, setDate }) => {
	return (
		<div className="Form">
			<div className="Form__inputDiv">
				{/* input element for todo task */}
				<input
					type="text"
					name="item"
					value={value}
					placeholder="Add Todos"
					onChange={(e) => setItem(e.target.value)}
					className="Form__inputDiv__text"
				/>
				{/* input element for todo date */}
				<input
					type="date"
					className="Form__inputDiv__date"
					name="date"
					value={date}
					onChange={(e) => setDate(e.target.value)}
				/>
			</div>
			{/* Add todo icon */}
			<AddRoundedIcon
				className="Form__add"
				onClick={createTodo}
				sx={{ fontSize: "40px" }}
			/>
		</div>
	);
};

export default Form;
