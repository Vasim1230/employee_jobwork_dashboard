export interface Gauge {
    id: string;
    _rev: string;
    docType: string;
    docId: string;
    jobWorkId: number; // Assuming you'll filter out the string part to keep only the numeric ID
    projectGroup: string;
    projectName: string;
    projectType: string;
    skillsRequired: string[];
    jobworkType: string;
    jobworkStatus: string;
    jobworkDescription: string;
    publishedOn: string;
    status: string;
    end: string;
    cost: number;
    timeline: string;
    assignedTo: string[];
    actualTime: string;
    assignedIssueData: any[]; // Replace 'any' with a specific type if known
    createdBy: string;
    createdOn: string;
    modifiedBy: string;
    modifiedOn: string;
    type: string;
    userId: string;
    isAssigned: boolean;
    jobworkHolder: string;
    updatedOn: string;
    takenTime: string;
  }
  
  
  export interface GaugeResponse {
   gauge : Gauge[]; 
  }