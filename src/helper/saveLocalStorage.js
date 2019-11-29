

export const saveState = state => {
    try {
        const saveStr = JSON.stringify(state)
        localStorage.setItem('table', saveStr)
    } catch (error) {

    }
}

export const loadState = () => {
    try {
        const saveStr = localStorage.getItem('table')
        if (saveStr) {
            const state = JSON.parse(saveStr)
            return state
        }
        return []
    } catch (error) {
        return []
    }
}