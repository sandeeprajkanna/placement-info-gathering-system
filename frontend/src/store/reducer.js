import * as actionTypes from "./actions/actionTypes";

const initialState = {
    userId: null,
    username: null,
    userEmail: null,
    userType: null,
    userProfile: {},

    authSuccess: null,
    authError: null,
    errorMsg: null,
    successMsg: null,

    searchedNames: [],
    searchError: null,

    searchedProfile: null,
    profileError: null,

    messages: {},
    notices: {},
    positions: {},
    unread_positions: {},
    unreleasedpositions:{},
    applications: {},
    notifications: {},

    currentPosApplications: [],
    currentPosFeedbacks: [],
    current_application: null,

    notificationsInterval: null,
    lastDataFetchStamp: 0,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                userId: null,
                username: null,
                email: null,
                userType: null,
                authError: null,
                authSuccess: null,
            };

        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                authError:
                    action.payload.message === undefined
                        ? "Try Again ! Not Connected to Internet."
                        : action.payload.message,
            };

        case actionTypes.NORMAL_FAIL:
            return {
                ...state,
                errorMsg:
                    action.payload.message === undefined
                        ? "Try Again ! Not Connected to Internet."
                        : action.payload.message,
            };

        case actionTypes.CLEAR_ERROR:
            return {
                ...state,
                errorMsg: null,
            };

        case actionTypes.AUTH_REGISTER:
            return {
                ...state,
                authSuccess: action.payload.message,
            };

        case actionTypes.AUTH_LOGIN:
            localStorage.setItem(
                "authToken",
                JSON.stringify(action.payload.authToken)
            );
            return {
                ...state,
                username: action.payload.username,
                userEmail: action.payload.userEmail,
                userId: action.payload.userId,
                userProfile: {...action.payload.profile},
                userType: action.payload.userType,
                authSuccess: action.payload.message,
            };

        case actionTypes.UPDATE_PROFILE:
            return {
                ...state,
                userProfile: {...action.payload.profile},
            };

        case actionTypes.AUTH_LOGOUT:
            localStorage.removeItem("authToken");
            return {
                ...state,
                username: null,
                userEmail: null,
                userId: null,
                userType: null,
                authSuccess: action.payload.message,
                messages: {},
                notices: {},
                positions: {},
                applications: {},
                notifications: {},
            };

        case actionTypes.LOAD_INFORMATION:
            return {
                ...state,
                messages: { ...action.payload.messages },
                notices: { ...action.payload.notices },
                positions: { ...action.payload.positions },
                unreleasedpositions: { ...action.payload.unreleasedpositions },
                applications: { ...action.payload.applications },
                notifications: { ...action.payload.notifications },
            };

        case actionTypes.REMOVE_NOTIFICATION:
            delete state.notifications[
                `notify${action.payload.entityType}${action.payload.entityId}`
            ];
            return state;

        case actionTypes.FETCH_USER_NAMES:
            return { ...state, searchedNames: action.payload.usernames };

        case actionTypes.FETCH_USER_NAMES_ERROR:
            return { ...state, searchError: action.payload.errorMsg };

        case actionTypes.GET_USER_PROFILE:
            return { ...state, searchedProfile: action.payload.profile };

        case actionTypes.GET_USER_PROFILE_ERROR:
            return { ...state, profileError: action.payload.errorMsg };

        case actionTypes.REMOVE_NOTIFICATION:
            return {
                ...state,
                notifications: {
                    ...state.notifications,
                    [`notify${action.payload.entityType}${action.payload.entityId}`]: undefined,
                },
            };

        case actionTypes.APPLY_TO_POSITION:
            return {
                ...state,
                applications: {
                    ...state.applications,
                    [`${action.payload.application.id}`]: action.payload
                        .application,
                },
                successMsg: action.payload.message,
            };

        case actionTypes.CREATE_FEEDBACK:
            return {
                ...state,
                successMsg: action.payload.message,
            };

        case actionTypes.LOAD_POSITION:
            return {
                ...state,
                currentPosApplications: action.payload.currentPosApplications,
                currentPosFeedbacks: action.payload.currentPosFeedbacks,
            };

        case actionTypes.RELEASE_POSITION:
            return {
                ...state,
                positions: {
                    ...state.positions,
                    [`${action.payload.position.id}`]: action.payload.position,
                },
                successMsg: action.payload.message,
            };

        case actionTypes.LOAD_APPLICATION:
            return {
                ...state,
                current_application: action.payload.application,
                successMsg: action.payload.message,
            };

        case actionTypes.SELECT_APPLICATION:
            return {
                ...state,
                successMsg: action.payload.message,
            };

        case actionTypes.CREATE_MESSAGE:
            return state;

        default:
            return state;
    }
};

export default reducer;
