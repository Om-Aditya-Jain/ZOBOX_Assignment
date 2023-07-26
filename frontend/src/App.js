import React, { useState, useEffect } from "react";
import "./App.scss";
import Todolist from "./components/Todos/Todolist";
import Form from "./components/Form/Form";
import axios from "axios";

function App() {
	const [itemList, setItemList] = useState([]); // state for storing array of todos.
	const [item, setItem] = useState(""); // state for storing todo in input field of form.
	const [date, setDate] = useState(""); // state for storing date in input field of form.
	const [edit, setEdit] = useState(""); // state for storing id of todo for editing.

	const url = process.env.REACT_APP_API_URL; // api url

	// function to create todo -
	const createTodo = () => {
		if (item !== "") {
			let currentDate;
			if (date === "") {
				const getDate = new Date().toJSON();
				currentDate = getDate.split("T")[0];
			} else {
				currentDate = date;
			}
			const todo = {
				task: item,
				date: currentDate,
				isCompleted: false,
			};

			axios
				.post(url, todo)
				.then(function (response) {
					console.log(response);
				})
				.catch(function (error) {
					console.log(error);
				});
		}
		setItem("");
		setDate("");
	};

	// function to delete todo -
	const deleteItem = (id) => {
		axios
			.delete(url + id)
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	// function to delete all todos -
	const deleteAllItems = () => {
		axios
			.delete(url)
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	// function to edit todo -
	const handleEdit = (todo) => {
		axios
			.put(url + todo.id, todo)
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
		setEdit(0);
	};

	// function to copy a todo -
	const handleCopy = (todo) => {
		axios
			.post(url, todo)
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	// useEffect hook for fetching todos -
	useEffect(() => {
		axios.get(url).then((response) => {
			setItemList(response.data);
		});
	}, [itemList, url]);

	return (
		<>
			<div className="App">
				<br />
				<h1 className="App__heading">To Do List</h1>
				<br />
				{/* Form Component consists of input elements for creating new todo */}
				<Form
					value={item}
					date={date}
					setItem={setItem}
					createTodo={createTodo}
					setDate={setDate}
				/>
				<br />
				{/* List of all todos */}
				<ol className="App__list">
					{itemList.map((todo, index) => {
						return (
							// Todolist Component displays each todo.
							<Todolist
								key={index}
								id={todo.id}
								value={todo.task}
								date={todo.date}
								status={todo.isCompleted}
								deleteItem={deleteItem}
								edit={edit}
								setEdit={setEdit}
								handleEdit={handleEdit}
								handleCopy={handleCopy}
							/>
						);
					})}
				</ol>
				<br />
				{/* Button for deleting all todos */}
				<div className="App__deleteAll">
					<button className="App__deleteAll__btn" onClick={deleteAllItems}>
						Delete All Todos
					</button>
				</div>
			</div>
		</>
	);
}

export default App;
