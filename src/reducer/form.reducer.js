// type
const SET_FORM = 'SET_FORM'
const RESET_FORM = 'RESET_FORM'
const SET_FORM_EDIT = 'SET_FORM_EDIT'

// action
export const setForm = dispatch => ({ key, value }) => dispatch({ type: SET_FORM, payload: { key, value } })
export const resetForm = dispatch => dispatch({ type: RESET_FORM })
export const setFormEdit = dispatch => payload => dispatch({ type: SET_FORM_EDIT, payload })

// initial
export const initialForm = {
    Title: 'MR',
    Fullname: '',
    Lastname: '',
    Birthday: new Date(),
    Nationality: '',
    CitizenID: '',
    Gender: 'Male',
    MobilePhone: '',
    PassportNo: '',
    ExpectedSalary: '',
}

// reducer
export const Form = (state = initialForm, action) => {
    const { type, payload } = action
    switch (type) {
        case SET_FORM:
            return { ...state, [payload.key]: payload.value }
        case RESET_FORM:
            return initialForm
        case SET_FORM_EDIT:
            return payload
        default:
            return state
    }
}