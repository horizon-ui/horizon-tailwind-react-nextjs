interface User {
  userName: string;
  phoneNumber: string;
  role: string;
}

interface Activity {
  _id: string;
  title: string;
  description: string;
  user: User;
  action: string;
  timeStamp: string;
  __v: number;
}

interface MonthCount {
  month: string;
  count: number;
}

interface UserCounts {
  dcUsers: MonthCount[];
  omeraldUsers: MonthCount[];
}

interface DcAssetCount {
  dcReports: any[]; // Specify type if known
  dcTests: any[]; // Specify type if known
}

interface LineCharts {
  userCounts: UserCounts;
  dcAssetCount: DcAssetCount;
}

interface UsersDonutChart {
  omeraldUsers: number;
  adminUsers: number;
  diagUsers: number;
}

interface DcDocs {
  totalDcReport: number;
  totalDcTests: number;
}

interface AdminData {
  vaccineCount: number;
  doseCount: number;
  doseDurationCount: number;
  reportCount: number;
  parameterCount: number;
  sampleCount: number;
  diagnosedConditionCount: number;
}

interface DonutChart {
  users: UsersDonutChart;
  dcDocs: DcDocs;
  adminData: AdminData;
}

interface CardData {
  dcUsers: number;
  userCount: number;
  vaccineCount: number;
  reportCount: number;
  diagnosedConditionCount: number;
}

export interface DashboardResponse {
  cardData: CardData;
  activities: Activity[];
  lineCharts: LineCharts;
  donutChart: DonutChart;
}

export interface OmeraldUser {
  month: string;
  count: number;
}

export interface UserData {
  role: string;
  userName: string;
  phoneNumber: string;
}

export interface CustomError {
  reasonCode: string;
  message: string;
  statusCode: number;
}

export interface DCDataType {
  key: string;
  name: string;
  aliases: string;
  status: string;
}

export interface DCDataInterface {
  key?: string;
  _id?: string;
  name: string;
  description: string;
  aliases: [];
  status: boolean;
}
