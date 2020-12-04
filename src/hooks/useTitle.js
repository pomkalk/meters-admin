import { useDispatch, useSelector } from "react-redux"
import {setTitle} from '../store/page/actions'

const useTitle = () => {
    const title = useSelector(state=>state.page.title)
    const dispatch = useDispatch()

    const updateTitle = (title) => {
        dispatch(setTitle(title))
    }
    
    return [title, updateTitle]
}

export default useTitle
