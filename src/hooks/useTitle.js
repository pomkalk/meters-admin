import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setTitle } from '../store/page/actions'

const useTitle = (newTitle) => {
    const title = useSelector(state=>state.page.title)
    const dispatch = useDispatch()

    useEffect(() => {
        if (newTitle) {
            if (newTitle !== title) {
                updateTitle(newTitle)
            }
        }
    }, [])

    const updateTitle = (title) => {
        dispatch(setTitle(title))
    }
    

    return [title, updateTitle]
}

export default useTitle
