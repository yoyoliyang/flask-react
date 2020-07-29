import React, { useState } from "react"

const AddUser = (props) => {

	const apiUrl = '/api/add_user';


	// 添加用户表单数据state
	const [addUser, setAddUser] = useState({
		user: '',
		id: '',
		type: '保三',
		// 到期日期
		expire: '',
		// 合同期限（月）
		conrtract_period: 6,
		data: {
			[props.getMonth]: {
				transfer_in: '',
				transfer_out: ''
			}
		},
		create_date: props.getMonth
	})

	const [responseInfo, setResponseInfo] = useState('')

	const [addUserFail, setAddUserFail] = useState(false)
	const handleAddUserFail = (x) => {
		setAddUserFail(x)
	}

	const handleAddUserForm = (e) => {
		const target = e.target;
		const value = target.value
		const name = target.name
		// 注意此处的...addUser解构语法，添加之前的对象属性到当前的state
		setAddUser({ ...addUser, [name]: value })
	}

	const handleSubmitAddUser = (e) => {
		// post添加后的数据
		fetch(apiUrl,
			{
				method: 'POST',
				body: JSON.stringify(addUser),
				headers: new Headers({
					'Content-Type': 'application/json'
				})
			}).then(res => res.json())
			.catch(error => console.error('Error:', error))
			.then(response => {
				if ('success' in response) {
					props.handleAddUser()
					props.addUserSucc(response.success)
				} else if ('error' in response) {
					setAddUserFail(true)
					setResponseInfo(response.error)
				}
			})
		e.preventDefault()
	}


	// 定义一个月份数组
	const month = [6, 12, 24]

	return (
		<div className="col mt-3">
			{addUserFail ?
				<div className="alert alert-danger">
					<button type="button" className="close" onClick={() => handleAddUserFail(false)}>&times;</button>
					<strong>添加用户失败({responseInfo})</strong>
				</div> :
				''
			}
			<button type="button" className="close" onClick={props.closeModal}>
				<span aria-hidden="true">x</span>
			</button>
			<form className="form-signin" >
				<div className="mb-3">
					<label>用户姓名：</label>
					<input className="form-control" name='user' onChange={(e) => handleAddUserForm(e)} placeholder='用户姓名' value={addUser.name} required></input>
				</div>
				<div className="mb-3">
					<label>ID:</label>
					<input type="number" className="form-control" name='id' onChange={(e) => handleAddUserForm(e)} placeholder='用户ID' value={addUser.id} required></input>
				</div>
				<div className="mb-3">
					<label>账户类型：</label>
					<select className="custom-select d-block w-100" name='type' onChange={(e) => handleAddUserForm(e)} value={addUser.type} >
						<option value="保三">保三</option>
						<option value="五五">五五</option>
					</select>
				</div>
				<div className="mb-3">
					<label>到期日期：</label>
					<input className="form-control" name="expire" type="date" onChange={(e) => handleAddUserForm(e)} value={addUser.expire} required></input>
				</div>
				<div className="mb-3">
					<label>合同期限：</label>
					<select className="form-control" name="conrtract_period" onChange={(e) => handleAddUserForm(e)} value={addUser.conrtract_period}>
						{month.map((v) => {
							return <option key={v} >{v}</option>
						})}
					</select>
				</div>
				<button type="button" className="btn btn-primary" onClick={handleSubmitAddUser}>保存</button>
			</form>
		</div>
	)

}

export default AddUser
