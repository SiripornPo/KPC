import React, { useState, useEffect } from 'react'
import './MyTable.css'

const pageSize = 5

export default function MyTable({ table, onDelete, setEditIdx }) {

    useEffect(() => {
        setSelected(table.map(() => (false)))
        setPagination(Math.ceil(table.length / pageSize))
    }, [table])

    // pagination
    const [pagination, setPagination] = useState(Math.ceil(table.length / 2))
    const [currentPage, setCurrentPage] = useState(1)
    const onNext = () => setCurrentPage(prev => prev < pagination ? prev + 1 : prev)
    const onPrev = () => setCurrentPage(prev => prev > 1 ? prev - 1 : prev)

    const [selectAll, setSelectedAll] = useState(false)
    const onSelectAll = () => {
        setSelected(!selectAll ? table.map((el, i) => true) : table.map(() => (false)))
        setSelectedAll(prev => !prev)
    }

    const [selected, setSelected] = useState(table.map(() => (false)))
    const onSelect = idx => {
        setSelected(prev => [...prev.slice(0, idx), !prev[idx], ...prev.slice(idx + 1)])
        if (selectAll) {
            setSelectedAll(false)
        }
    }

    useEffect(() => {
        console.log(selected)
        if (!selectAll && selected.every(el => el == true) && selected.length > 0) {
            setSelectedAll(true)
        }
    }, [selected])

    const onDeleteAll = () => {
        onDelete(selected.reduce((acc, e, i) => e ? [...acc, i] : acc, []))
        setSelectedAll(false)
    }

    return (
        <div className='TablePanel'>
            {/* head table */}
            <div className='top-Table' >
                <div className='selectData' >
                    <input type='checkbox' value='all' id='select-all' checked={selectAll} onChange={e => onSelectAll(e.target.value)} />
                    <label htmlFor='select-all' >Select All</label>
                    <button onClick={onDeleteAll} className='btn btn-danger' >DELETE</button>
                </div>
                <div className='pagina' >
                    <p onClick={onPrev} >prev</p>
                    {
                        genPage(pagination).map(el => <p key={el} onClick={() => setCurrentPage(el)} className={currentPage == el ? 'current' : ''} >{el}</p>)
                    }
                    <p onClick={onNext} >next</p>
                </div>
            </div>
            <table className='TableInfo' >
                <tr>
                    <th></th>
                    <th>NAME</th>
                    <th>GENDER</th>
                    <th>MOBILE_PHONE</th>
                    <th>NATIONALITY</th>
                    <th></th>
                </tr>
                <tbody>
                    {
                        table.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((el, i) => <tr key={i} >
                            <td style={{ width: 15 }}><input type='checkbox' checked={selected[i]} onChange={() => onSelect(i)} /></td>
                            <td style={{ width: 150 }}>{`${el.Fullname} ${el.Lastname}`}</td>
                            <td style={{ width: 50 }}>{el.Gender}</td>
                            <td style={{ width: 100 }}>{el.MobilePhone}</td>
                            <td style={{ width: 150 }}>{el.Nationality}</td>
                            <td style={{ width: 100 }} className='btn-table' ><button onClick={() => setEditIdx((currentPage - 1) * pageSize + i)} >EDIT</button> /
                            <button onClick={() => onDelete([(currentPage - 1) * pageSize + i])} >DELETE</button></td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}

const genPage = (max, arr = []) => arr.length < max ? genPage(max, [...arr, arr.length + 1]) : arr