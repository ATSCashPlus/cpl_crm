export interface IUserInfo {
    token: string;
    refreshToken: string;
    userId: string;
    username: string;
    fullName: string;
    avatar: string;
    isAdmin: boolean;
    isSysadmin: boolean;
    userPermissions: IUserPermission[];
    groupId: string;
    allpermissions: string;
}

export interface IUserPermission {
    id: string;
    functionCode: string;
    functionName: string;
    path: string;
    actions: IAction[];
}

export interface IAction {
    actionId: string;
    actionCode: string;
    actionName: string;
    actionType: number;
    path: string;
}
