import React, { useState, useEffect } from "react"

const History = (props) => {

    const apiUrl = '/api';

    const [data, setData] = useState({})
    const [items, setItems] = useState([])

    const fetchHistoryData = async () => {
        const pushData = {
            history: {
                id: props.id
            }
        }
        const res = await fetch(apiUrl,
            {
                method: 'POST',
                body: JSON.stringify(pushData),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
        const resJson = await res.json()
        setData(resJson)
        // 设置对象的keys到state，以便map遍历
        setItems(Object.keys(resJson))
    }


    useEffect(() => {
        fetchHistoryData()
    }, [])


    return (
        <React.Fragment>
            <button type="button" className="close" onClick={props.closeHistoryModal}>
                <span aria-hidden="true">x</span>
            </button>
            <div className="mb-3">
                <h3>历史出入金数据</h3>
            </div>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>日期</th>
                        <th>入金</th>
                        <th>出金</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((date, index) => {
                        return (
                                <tr key={index}>
                                    <td>{date}</td>
                                    <td>{data[date]['transfer_in']}</td>
                                    <td>{data[date]['transfer_out']}</td>
                                </tr>
                        )
                    })}
                </tbody>
            </table>
        </React.Fragment>
    )

}

export default History

