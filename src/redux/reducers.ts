import { CASE_LIST_UPDATED } from "./actions";

const initialState = {
    list: []
};

export const caseReducer = (state: any = initialState, action: any) => {
    switch(action.type) {
        case CASE_LIST_UPDATED: {
            return {...state, list: action.payload};
        }
        default: return state;
    }
}