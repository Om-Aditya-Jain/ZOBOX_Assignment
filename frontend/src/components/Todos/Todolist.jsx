import React, { useState } from "react";
import "./todolist.scss";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

// function for generating string that shows no. of days remaining or late from todo date.
const getDayString = (date) => {
	const currentDate = new Date();
	const todoDate = new Date(date);
	let diff, diff_days, dayString;

	if (currentDate < todoDate) {
		diff = todoDate.getTime() - currentDate.getTime();
		diff_days = Math.ceil(diff / (1000 * 3600 * 24));
		if (diff_days === 1) {
			dayString = diff_days + " day remaining";
		} else {
			dayString = diff_days + " days remaining";
		}
	} else {
		diff = currentDate.getTime() - todoDate.getTime();
		diff_days = Math.ceil(diff / (1000 * 3600 * 24));
		if (diff_days === 1) {
			dayString = "Today";
		} else if (diff_days === 2) {
			dayString = "1 day late";
		} else {
			dayString = diff_days - 1 + " days late";
		}
	}

	return dayString;
};

function Todolist({
	id,
	value,
	date,
	status,
	deleteItem,
	edit,
	setEdit,
	handleEdit,
	handleCopy,
}) {
	const [newValue, setNewValue] = useState(value); // state for storing edited todo task
	const [newDate, setNewDate] = useState(date); // state for storing edited todo date

	const diff_days_string = getDayString(date);

	if (edit === id) {
		// Edit Todo Section -
		return (
			<div className="edit_list">
				<div className="edit_list__input_div">
					{/* input element for editing todo task */}
					<input
						type="text"
						name="item"
						className="edit_list__input_div__input"
						value={newValue}
						placeholder="Add Items"
						onChange={(e) => setNewValue(e.target.value)}
					/>
					{/* input element for editing todo date */}
					<input
						type="date"
						className="edit_list__input_div__date"
						name="date"
						value={newDate}
						onChange={(e) => setNewDate(e.target.value)}
					/>
				</div>

				<div className="list__icons">
					{/* delete button */}
					<DeleteRoundedIcon
						className="list__icons__delete"
						onClick={() => {
							deleteItem(id);
						}}
					/>
					{/* save button for saving changes */}
					<CheckRoundedIcon
						className="list__icons__save"
						onClick={() => {
							handleEdit({
								id: id,
								task: newValue,
								date: newDate,
								isCompleted: status,
							});
						}}
						sx={{ fontWeight: "bold", fontSize: "29px" }}
					/>
				</div>
			</div>
		);
	} else {
		// Display Todo Section -
		return (
			<div className="list">
				{/* checkbox for marking a todo as completed */}
				<input
					type="checkbox"
					className="list__checkbox"
					defaultChecked={status}
					onChange={() => {
						handleEdit({
							id: id,
							task: value,
							date: date,
							isCompleted: !status,
						});
					}}
				/>
				{/* Todo */}
				<li className="list__text">
					<p
						className={`list__text__para ${
							status === true ? "list__text__complete" : ""
						}`}
					>
						{value}
					</p>
					{status === false && (
						<p className={"list__text__date"}>{diff_days_string}</p>
					)}
				</li>
				<div className="list__icons">
					{/* delete button */}
					<DeleteRoundedIcon
						className="list__icons__delete"
						onClick={() => {
							deleteItem(id);
						}}
					/>
					{/* edit button for enabling todo editing */}
					<EditRoundedIcon
						className="list__icons__edit"
						onClick={() => setEdit(id)}
					/>
					{/* copy button for copying a todo */}
					<ContentCopyIcon
						className="list__icons__copy"
						onClick={() =>
							handleCopy({
								id: id,
								task: value,
								date: date,
								isCompleted: status,
							})
						}
					/>
				</div>
			</div>
		);
	}
}

export default Todolist;
