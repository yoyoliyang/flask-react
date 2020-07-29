import React, { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import AddUser from "./components/AddUser"
import List from "./components/List"
import Modal from "react-modal"

const Main = () => {

	// 添加用户按钮的state
	const [addState, setAddState] = useState(false)
	const [addUserSucc, setAddUserSucc] = useState('')
	const handleAddUserSucc = (x) => {
		setAddUserSucc(x)
	}


	const handleAddUser = () => {
		setAddState(!addState)
	}

	const closeModal = () => {
		setAddState(false)
	}

	// 定义当前月份
	const getMonth = () => {
		let currentDate = new Date();
		let currentYear = currentDate.getFullYear();
		// getMonth是基于0开始的值0-11,故要+1
		let currentMonth = currentDate.getMonth() + 1;
		if (currentMonth < 10) {
			currentMonth = 0 + `${currentMonth}`;
		}
		return `${currentYear}${currentMonth}`;

	}

	return (
		<div className="container mt-3">
			<h1>出入金记录表</h1>
			<div style={{marginBottom:"0.5rem"}}>
				<button className="btn btn-primary" onClick={handleAddUser}>添加用户</button>
			</div>
			{ addUserSucc ? 
			<div className="alert alert-success">
				<button type="button" className="close" onClick={() => handleAddUserSucc(false)}>&times;</button>
				<strong>添加用户（{addUserSucc}）成功</strong>
			</div>:
			''
			}

			{/* {addState ? <AddUser getMonth={getMonth()} handleAddUser={handleAddUser} /> : ''} */}
			<Modal isOpen={addState} ariaHideApp={false}>
				<AddUser getMonth={getMonth()} handleAddUser={handleAddUser} closeModal={closeModal} addUserSucc={handleAddUserSucc}/>
			</Modal>
			{/* 添加一个随机数让子组件跟随父组件更新 */}
			{/* <List key={Math.random()} /> */}
			{!addState ?
				<List /> : ''
			}
		</div>
	)
}


export default Main 
