export const CASE_LIST_UPDATED = 'CASE_LIST_UPDATED';

export const setCaseList = (caseList: any) => {
    return {
        type: CASE_LIST_UPDATED,
        payload: caseList
    };
}