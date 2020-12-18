import React, { useState, useEffect } from 'react'
import { Modal } from 'antd'

const UsersModifyDialog = ({data, onCancel}) => {
    
    return <Modal title="Modal" visible={data.visible} onCancel={onCancel}>
        <pre>{ JSON.stringify(data, null, 2) }</pre>
    </Modal>
}

export default UsersModifyDialog
