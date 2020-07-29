import React, { useState, useEffect } from "react"
import Transfer from "./Transfer"
import Modal from "react-modal"
import History from "./History"

const List = () => {
    // mongodb api
    const apiUrl = '/api';

    // 获取api数据state
    const [data, setData] = useState([])

    // transfer子组件通知state
    const [transferSucc, setTransferSucc] = useState(false)
    const handleTransferSucc = (x) => {
        setTransferSucc(x)
    }

    const onChangeStates = () => {
        setTransButton(!transButton)
        fetchUsersData()
    }

    // 新增出入金操作的按钮state
    const [transButton, setTransButton] = useState(false)
    const [historyButton, setHistoryButton] = useState(false)
    const closeHistoryModal = () => {
        setHistoryButton(false)
    }

    const [counter, setCounter] = useState(undefined)

    const closeModal = () => {
        setTransButton(false)

    }
    useEffect(() => {
        fetchUsersData();
    }, [])


    const fetchUsersData = async () => {
        const data = await fetch(apiUrl);
        const dataJson = await data.json();
        setData(dataJson)
    }

    const handleTransForm = (i) => {
        setCounter(i)
        setTransButton(!transButton)
    }

    const handleShowHistory = (i) => {
        setCounter(i)
        setHistoryButton(!historyButton)
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
        <React.Fragment>
            {transferSucc ?
                <div className="alert alert-info">
                    <button type="button" className="close" onClick={() => handleTransferSucc(false)}>&times;</button>
                    <strong>添加出入金成功</strong>
                </div> :
                ''
            }
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th >#</th>
                        <th >用户</th>
                        <th >帐号</th>
                        <th >类型</th>
                        <th >月份({getMonth().slice(4, 6)})入金</th>
                        <th >出金</th>
                        <th >备注</th>
                        <th >操作</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.user}</td>
                                <td>{item.id}</td>
                                <td>{item.type}</td>
                                <td onClick={() => { handleShowHistory(index) }}>{item.data[getMonth()].transfer_in}</td>
                                <Modal isOpen={historyButton && counter === index} ariaHideApp={false}>
                                    <History id={item.id} month={getMonth()} closeHistoryModal={closeHistoryModal} />
                                </Modal>
                                <td>{item.data[getMonth()].transfer_out}</td>
                                <td>{item.data[getMonth()].note}</td>
                                <td><button className="btn" style={{ color: "blue" }} onClick={() => handleTransForm(index)} >=</button></td>
                                <Modal isOpen={transButton && counter === index} ariaHideApp={false}>
                                    {/* modal打开条件符合点击状态为ture和索引数=当前表格 */}
                                    <Transfer getMonth={getMonth()} id={item.id} onChangeStates={onChangeStates} closeModal={closeModal} transferSucc={handleTransferSucc} />
                                </Modal>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </React.Fragment>
    )


}

export default List
