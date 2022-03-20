export const CASE_LIST_UPDATED = 'CASE_LIST_UPDATED';
export const CONFIGURATIONS_LOADED = 'CONFIGURATIONS_LOADED';

export const setCaseList = (caseList: any) => {
    return {
        type: CASE_LIST_UPDATED,
        payload: caseList
    };
}

export const setConfigurations = (configurations: any) => {
    return {
        type: CONFIGURATIONS_LOADED,
        payload: configurations
    };
}