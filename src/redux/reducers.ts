import { CASE_LIST_UPDATED, CONFIGURATIONS_LOADED } from "./actions";

const initialCaseState = {
    list: []
};

export const caseReducer = (state: any = initialCaseState, action: any) => {
    switch(action.type) {
        case CASE_LIST_UPDATED: {
            return {...state, list: action.payload};
        }
        default: return state;
    }
}

const initialConfigurationsState = {
    staticConfigurations: {
        inquiry_id: [],
        assign_to: [],
        sending_inst_id: [],
        receiving_inst_type: [],
        priority: [],
        branch: [],
        sending_inst_type: [],
        eq_currency: [],
        bank: [],
        sending_inst_address: [],
        currency: [],
        investigation_type: [],
        receiving_inst_id: [],
        default_currency: [],
        instructed_currency: [],
        status:[]
    }
}

export const configurationsReducer = (state = initialConfigurationsState, action: any) => {
    switch(action.type) {
        case CONFIGURATIONS_LOADED : {
            return {...state, staticConfigurations: action.payload}
        }
        default: return state;
    }
}