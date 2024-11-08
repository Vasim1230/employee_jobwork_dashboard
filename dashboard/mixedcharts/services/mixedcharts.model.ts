export interface ColumnChart {
    start: string;
    xaxis:string;   
    xaxis1: string;    
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
    start: string;  
    category: string; 
    end: string;   
    timeSpend: string;
    notes: string;
    createdOn: string;  
    createdBy: string;
    cid: string;
    commitId: string;
    }
  
  export interface WidgetResponse {
    mixedcharts: RawWidgetData[]; 
  }
  