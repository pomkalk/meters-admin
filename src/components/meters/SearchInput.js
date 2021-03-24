import React, { useState } from 'react'
import { AutoComplete, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { find, setSearchRequest, setSearchValue, loadMeters } from '../../store/meters/actions'
import Editor from './Editor'

const SearchInput = () => {
    const dispatch = useDispatch()
    const { value, options, loading, data } = useSelector(state => ({
        data: state.meters.data,
        value: state.meters.value,
        options: state.meters.options,
        loading: state.meters.loading
    }))

    const onSearch = (search) => {
        console.log('1', search)
    }

    const onChange = (data) => {
        dispatch(find(data))
    }

    const onSelect = (value, option) => {
        dispatch(setSearchValue(option.label))
        dispatch(loadMeters(value))
        // if (/^\d{6}$/.test(value)) {
        //     dispatch(loadMeters(value))
        // } else {
        //     dispatch(find(value))
        // }
        
        console.log(value, option, typeof(value))
    }

    return (
        <Space direction="vertical" style={{width: '100%'}}>
            <AutoComplete allowClear loading={loading} style={{ width: '100%'}} value={value} options={options} placeholder="Введите адрес или лицевой счет" onSelect={onSelect} onChange={onSearch} onChange={onChange} />
            <Editor data={data} />
        </Space>
    )
}

export default SearchInput
