export interface Widget {
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
    type: string;
    end: string;    // ISO 8601 date string
    timeSpend: string;
    notes: string;
    createdOn: string;  // ISO 8601 date string
    createdBy: string;
    cid: string;
    commitId:string;
    category: string; 
    }
    
    
    export interface WidgetsResponse {
     basictimesheet: Widget[]; 
    }