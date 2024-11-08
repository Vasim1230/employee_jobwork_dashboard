export interface ColumnCharts {
  start: string;
     
  Id: string;   
  role: string;
  name: string;
}
export interface title{
  title:string;
}
export interface ColumnChart {
  start: string;
  xaxis:string;   
  yaxis: string;    
  Id: string;   
  
}
export interface Areacharts{
  data: string;
  Id: string;   
 xaxis: string;
 
}

export interface Piecharts{
  data: string;
 
  xaxis: string;
 
}
export interface Barcharts{
  data: string;
  
  xaxis: string;
}

export interface RawWidgetData {
  _id: string;
  _rev: string;
  docId: string;
  docType: string;
  userName: string;
  email: string;
  userImage: string;
  userRole: string;
  contactNo: number;
  userId: string;
  jobWorkId: string;
  projectName: string;
  actualTime: string;
  start: string;  // ISO 8601 date string
  category: string; 
  end: string;    // ISO 8601 date string
  timeSpend: string;
  notes: string;
  createdOn: string;  // ISO 8601 date string
  createdBy: string;
  cid: string;
  commitId: string;
  }

export interface WidgetsResponse {
  dashboard: RawWidgetData[]; 
}