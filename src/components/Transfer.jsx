import React, { useState } from "react"

const Transfer = (props) => {
    const apiUrl = '/api';

    // 初入金操作的state
    const [transfer, setTransfer] = useState({
        transferDate: '',
        transferIn: '',
        transferOut: '',
        note: ''
    })



    const addTransferForm = () => {
        return (
            <form>
                <button type="button" className="close" onClick={props.closeModal}>
                    <span aria-hidden="true">x</span>
                </button>
                <div className="mb-3">
                    <label>日期：</label>
                    <input type="date" className="form-control" name="transferDate" onChange={(e) => { handleAddTransfer(e) }} required></input>
                </div>
                <div className="mb-3">
                    <label>入金：</label>
                    <input type="number" className="form-control" name="transferIn" value={transfer.transferIn} onChange={(e) => { handleAddTransfer(e) }} placeholder='入金金额' required></input>
                </div>
                <div className="mb-3">
                    <label>出金：</label>
                    <input type="number" className="form-control" name="transferOut" value={transfer.transferOut} onChange={(e) => { handleAddTransfer(e) }} placeholder="出金金额" required></input>
                </div>
                <div className="mb-3">
                    <label>备注：</label>
                    <textarea className="form-control" type="text" name="note" value={transfer.note} onChange={(e) => { handleAddTransfer(e) }} placeholder="备注"></textarea>
                </div>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>保存</button>
            </form>
        )
    }

    // state
    const handleAddTransfer = (e) => {
        const target = e.target;
        const name = target.name;
        let value = target.value;
        // date state格式化时间
        if (name === 'transferDate') {
            let date = value.split('-');
            value = date[0] + date[1];
        }
        setTransfer({ ...transfer, [name]: value })
    }

    //POST
    const handleSubmit = (e) => {
        // 定义json POST数据
        const data = {
            id: props.id,
            data: {
                [transfer.transferDate]: {
                    transfer_in: transfer.transferIn,
                    transfer_out: transfer.transferOut,
                    note: transfer.note
                }
            },
            transfer_date: transfer.transferDate
        }
        // post添加后的数据
        fetch(apiUrl,
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                if ('success' in response) {
                    props.transferSucc(true)
                    // 父组件传递来的回调函数
                    props.onChangeStates()
                }
                // console.log('Success:', response)
            })
        e.preventDefault()
    }

    return (

        <div>
            {addTransferForm()}
        </div>
    )

}

export default Transfer
