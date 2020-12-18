import React from 'react'
import { useTitle, useAccess, useSubscribe } from '../hooks'
import PeriodsTable from '../components/database/PeriodsTable'
import { useSelector } from 'react-redux'

const ImportStatus = ({status}) => {
    return <pre>IMPORTING {JSON.stringify(status, null, 2)}</pre>
}

const DatabasePage = () => {
    const [title] = useTitle('База данных')
    // const status = useSelector(state => state.database.status)
    useAccess('import')
    // const socket = useSubscribe('event.database-importing', (socket) => {
    //     console.log('++++++importing')
    // })

    // if (status) {
    //     return <ImportStatus status={status} />
    // }

    return <PeriodsTable />
}

export default DatabasePage
