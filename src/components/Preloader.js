import React, { Suspense } from 'react'
import { Spin } from 'antd'

const Preloader = ({children}) => {
    const loader = <div className="preloader"><Spin /></div>
    return <Suspense fallback={loader}>{children}</Suspense>
}

export default Preloader
