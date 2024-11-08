export interface Widget {
    _id: string;
    _rev: string;
    visitId: string;
    visitCount: number; 
    docId: string;
    doctype: string;
    patientId: string;
    patientName: string;
    createdOn: string; // Consider using Date if you want to handle dates
    duration: string;
    caseNo: string;
  
    activity: Array<{
      activityId?: string;
      activityName: string;
      activityGroup: string;
      activityOrder: string;
      activityDescription?: string;
      activityCategory: string;
      createdOn?: string; // Optional, if present
      docId?: string; // Optional, if present
      docType?: string; // Optional, if present
      feemasterId?: {
        _id: string;
        _rev: string;
        docType: string;
        docId: string;
        feenameid: string;
        feename: string;
        description: string;
        amount: string;
        category: string;
        modifiedBy: string;
        modifiedOn: string;
        createdBy: string;
        createdOn: string;
        userId: string;
        cid: string;
      };
      feepostId?: string; // Optional, if present
    }>;
  
    symptoms: Array<{
      symptoms: string;
      shortDescription: string;
      symptomNotes: string;
      sympId: string;
    }>;
  
    vitals: {
      [key: string]: {
        temp: number;
        height: number;
        weight: number;
        bp: number;
      };
    };
    laboratory: Array<{
      doctorName:string;
      labName:string;
      test:string;
      manage:string;
    }>;
    document:Array<{
      doctor:string;
      documentCategory:string;
    }>;
  
    createdBy: string;
    userId: string;
    cid: string;
    docType: string;
    modifiedBy: string;
    modifiedOn: string;
    visitid: string;
    
  
  
    prescriptionDetails: Array<{
        prescriptiontype: string;
        prescription: string;
        route: string;
        take: string;
        description: string;
        dosage: string;
      }>;
  }
  
  export interface WidgetsResponse {
    doc: Widget[]; 
  }
  