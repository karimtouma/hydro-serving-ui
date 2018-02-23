import { ModelVersion } from '@shared/models/_index';
import * as ModelVersionsActions from '@shared/actions/_index';



const initialState: ModelVersion[] = [];

export function ModelVersionsReducer (state = initialState, action: ModelVersionsActions.ModelVersionsActions) {
    switch (action.type) {
        case ModelVersionsActions.GET_ALL_VERSIONS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}