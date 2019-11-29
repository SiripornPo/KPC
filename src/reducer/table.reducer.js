import { loadState, saveState } from '../helper/saveLocalStorage'
import _ from 'lodash'
const TSaveState = state => _.throttle(() => saveState(state), 1000)
// type
const ADD_DATA = 'ADD_DATA'
const REMOVE_DATA = 'REMOVE_DATA'
const EDIT_DATA = 'EDIT_DATA'

// action
export const addData = dispatch => payload => dispatch({ type: ADD_DATA, payload })
export const removeData = dispatch => arr_of_index => dispatch({ type: REMOVE_DATA, remove_data: arr_of_index })
export const editData = dispatch => payload => index => dispatch({ type: EDIT_DATA, payload, save_data: index })

export const initialTable = loadState()

export const Table = (state = initialTable, action) => {
    const { type, payload, save_data, remove_data } = action
    switch (type) {
        case ADD_DATA:
            const afterAdd = [...state, { ...payload }]
            saveState(afterAdd)
            return afterAdd
        case REMOVE_DATA:
            const afterRemove = state.filter((el, i) => remove_data.indexOf(i) == -1)
            saveState(afterRemove)
            return afterRemove
        case EDIT_DATA:
            const afterEdit = [...state.slice(0, save_data), payload, ...state.slice(save_data + 1)]
            saveState(afterEdit)
            return afterEdit
        default:
            return state
    }
}