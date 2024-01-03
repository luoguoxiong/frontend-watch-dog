interface LoginRegsiterIn{
  account: string;
  password: string;
}

interface UserInfo{
  /** 用户ID */
  id?: number;
  /** 登录账号 */
  account: string;
  /** 加密登录密码 */
  encPassword: string;
  /** 账号状态 */
  status: 0 | 1;
  createdAt?: string;
  updatedAt?: string;
}

interface CreateAppIn{
  appType: number;
  appName: string;
}

