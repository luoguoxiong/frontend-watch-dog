interface UaMsg{
  /** 浏览器名称 */
  browserName?: string;
  /** 浏览器版本号 */
  browserVersion?: string;
  /** 浏览器主版本 */
  browserMajors?: string;
  /** 系统名称 */
  osName?: string;
  /** 系统版本号 */
  osVersion?: string;
  /** 设备名称 */
  deviceVendor?: string;
  /** 设备模型 */
  deviceModel?: string;
  ua?: string;
}
interface IpMsg{
  ip?: string;
  province?: string;
  city?: string;
  country?: string;
}
interface UserMsg{
  userTimeStamp: number;
  markUserId: string;
  userId: string;
}
type PublicMsg = PageMsg & UserMsg & UaMsg & IpMsg

