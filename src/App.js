
import React, { useReducer, useState, useEffect } from 'react'
import './App.css';
import { Form, setForm, resetForm, setFormEdit, initialForm } from './reducer/form.reducer'
import { Table, addData, removeData, editData, initialTable } from './reducer/table.reducer'
import MyTable from './components/MyTable'
import { National } from './components/National';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Label, Span, ContanierRadio, LabelLight, } from './components/styled';
import PhoneInput from 'react-phone-number-input'
import ID from './components/ID/Input'
export default function App() {

  // form
  const [form, dispatch_form] = useReducer(Form, initialForm)

  const onChangeID = e => setForm(dispatch_form)({ key: 'CitizenID', value: e.target.value })
  const onChangePhone = mobile => setForm(dispatch_form)({ key: 'MobilePhone', value: mobile })
  const onChange = e => setForm(dispatch_form)({ key: e.target.name, value: e.target.value })
  const onChangeBD = date => setForm(dispatch_form)({ key: 'Birthday', value: date })
  const reset = () => resetForm(dispatch_form)
  const setEdit = data => setFormEdit(dispatch_form)(data)

  const switchComponent = el => {
    switch (el) {
      case "Title": return <div key={el} className='LabelInput-panel'>
        <Label>Title</Label>
        <Span>*</Span>
        <select name={el} onChange={onChange} value={form[el]} className='form-control form-group' >
          <option value="0" disabled selected>Select</option>
          <option value="Mr">Mr</option>
          <option value="Miss">Miss</option>
          <option value="Mrs">Mrs</option>
        </select>
      </div>
      // ====================================================================
      case "Birthday":
        return <div key={el} className='LabelInput-panel'>
          <Label>Birthday:</Label>
          <Span>*</Span>
          <DatePicker selected={form[el]} onChange={onChangeBD} className='form-control form-group' />
        </div>
      case "Nationality": return <National key={el} onChange={onChange} value={form[el]} name={el} />
      case "Gender": return <ContanierRadio key={el}>
        <Label>Gender:</Label>
        <input type='radio' value='Male' name={el} id='Male' onChange={onChange} checked={form[el] === 'Male'} className='-comp-form-input' />
        <LabelLight for='Male'>Male</LabelLight>
        <input type='radio' value='Female' name={el} id='Female' onChange={onChange} checked={form[el] === 'Female'} className='-comp-form-input' />
        <LabelLight for='Female'>Female</LabelLight>
        <input type='radio' value='Unisex' name={el} id='Unisex' onChange={onChange} checked={form[el] === 'Unisex'} className='-comp-form-input' />
        <LabelLight for='Unisex'>Unisex</LabelLight>
      </ContanierRadio>
      case "MobilePhone": return <div key={el} className='LabelInput-panel'>
        <Label>Mobile Phone</Label>
        <Span>*</Span>
        <PhoneInput name={el} onChange={onChangePhone} value={form[el]} />
      </div>
      case "CitizenID": return <div key={el} className='LabelInput-panel'>
        <Label>Citizen ID:</Label>
        <ID blockClass='blockClassID' containerClass='containerClass' onChange={onChangeID} />
      </div>
      default:
        return <div key={el} className='LabelInput-panel'>
          <Label>{el}:</Label>
          {el !== "PassportNo" ? <Span>*</Span> : null}
          <input key={el} onChange={onChange} value={form[el]} name={el} placeholder={el} className='form-control form-group' />
          {el == "ExpectedSalary" ? <Label>THB</Label> : null}
        </div>
    }
  }

  // table
  const [table, dispatch_table] = useReducer(Table, initialTable)
  const addPersonData = () => {
    if (edit_idx == -1) {
      if (form.Fullname === '' || form.Lastname === '' || form.Birthday === '' || form.MobilePhone === '' || form.ExpectedSalary === '') {
        alert('กรุณากรอกข้อมูลที่มีเครื่องหมาย * ให้ครบ')
      } else {
        console.log('add', form)
        addData(dispatch_table)(form)
        reset()
      }
    } else {
      if (form.Fullname === '' || form.Lastname === '' || form.Birthday === '' || form.MobilePhone === '' || form.ExpectedSalary === '') {
        alert('กรุณากรอกข้อมูลที่มีเครื่องหมาย * ให้ครบ')
      } else {
        console.log('update')
        editeDataTable(edit_idx)
        setEditIdx(-1)
        reset()
      }
    }

  }

  const deleteTableData = arr_idx => removeData(dispatch_table)(arr_idx)
  const editeDataTable = idx => editData(dispatch_table)(form)(idx)

  // edit idx
  const [edit_idx, setEditIdx] = useState(-1)

  useEffect(() => {
    if (edit_idx > -1) {
      setEdit(table[edit_idx])
    }
  }, [edit_idx])

  return (
    <div className="App">
      <header className="App-header">
        <div className='addInfo' >
          <div className='gridForm-3' >
            {
              getArrForm(form).slice(0, 3).map(switchComponent)
            }
          </div>
          <div className='gridForm-2' >
            {
              getArrForm(form).slice(3, 5).map(switchComponent)
            }
          </div>
          {
            getArrForm(form).slice(5).map(switchComponent)
          }
          <div className='submit' >
            <button onClick={addPersonData} className='btn btn-info'> Submit </button>
          </div>
        </div>
        <MyTable
          table={table}
          onDelete={deleteTableData}
          setEditIdx={setEditIdx}
        />
      </header>
    </div>
    // ===============================
  )


}

const getArrForm = form => Object.keys(form)