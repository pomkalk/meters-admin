import React, { useState, useEffect } from 'react'
import { Popconfirm, Input, Button, Spin } from 'antd'
import { useDispatch } from 'react-redux'
import { saveData } from '../../store/meters/actions'

const Confirm = ({value, lastValue, id, loading}) => {
    const dispatch = useDispatch()
    let last_value = parseFloat(lastValue)

    const [v, setV] = useState(value)
    const text = value ? value : 'Передать'

    useEffect(()=>{
        setV(value)
    }, [value])

    const onConfirm = () => {
        dispatch(saveData(id, v===''?null:v))
        setV(value)
    }

    const onCancel = () => {
        setV(value)
    }

    let spent = null

    if (lastValue) {
        if (!isNaN(last_value)) {
            let x = parseFloat(v)
            if (!isNaN(x)) {
                spent = <span>{parseFloat(v)} - {last_value} = <span style={{fontWeight: 'bold'}}>{ Math.round(((parseFloat(v) - last_value) + Number.EPSILON) * 100) / 100}</span></span>
            }
        }
    }

    const onEdit = (e) => {
        let a = e.target.value.toString()
        a = a.replace(',','.')
        if (a==='.') {
            return setV(null)
        }
        if ((a.match(/\./g)||[]).length > 1) {
            return
        } 
        a = (a.match(/([\d\.])/g)||[]).join('')

        setV(a)
    }

    const frm = (
        <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
            <div>Расход: {spent}</div>
            <div>Введите показание в поле ниже:</div>
            <Input autoFocus={true} style={{width: '100%'}} defaultValue={v} value={v} onChange={onEdit} />
        </div>
    )

    if (loading) {
        return <Button type="default" block size="small"><Spin /></Button>
    }

    return (
        <Popconfirm icon={null} cancelText="Отмена" okText="Сохранить" onCancel={onCancel} onConfirm={onConfirm} title={frm}>
            <Button type="default" block size="small">{text}</Button>
            
        </Popconfirm>
    )
}

export default Confirm
