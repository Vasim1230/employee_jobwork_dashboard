export interface Usertimesheet {
    id: string;
    _rev: string;
    docId: string;
    docType: string;
    userName: string;
    email: string;
    userImage: string;
    userRole: string;
    category: string;
    contactNo: number;
    userId: string;
    jobWorkId: string;
    projectName: string;
    actualTime: number;
    start: string;   // Assuming ISO date string
    type: string;
    end: string;     // Assuming ISO date string
    timeSpend: number;
    notes: string;
    createdOn: string;   // Assuming ISO date string
    createdBy: string;
    cid: string;
}
export interface UsertimesheetResponse {
    usertimesheet: Usertimesheet[]; 
  }
