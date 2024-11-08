import { Component, OnInit } from '@angular/core';
import { CasecomponentService } from '../services/casecomponent.service';

export interface Widget {
  _id: string;
  _rev: string;
  visitId: string;
  visitCount: number; // Change to number if you want it as a numeric type
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
    docId?: string; 
    docType?: string; 
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
    feepostId?: string; 
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

@Component({
  selector: 'app-casecomponent',
  templateUrl: './casecomponent.component.html',
  styleUrls: ['./casecomponent.component.scss']
})
export class CasecomponentComponent implements OnInit {
  doc: Widget[] = [];
  uniqueJobworkHolders: any[] = [];
 
  caseNoName: string = '';
  selectedActivityData: any[] = []; 
  selectedSymptomData: any[] = []; 
  selectedVitalData: any[] = [];
  selectedPrescriptionData: any[] = [];
  selectedLaboratoryData: any[] = [];
  selectedDocumentData: any[] = [];
  activeIndex: number = 0;
   
  constructor(private _caseservice: CasecomponentService) {}

  ngOnInit(): void {
    this._caseservice.getwidgets().subscribe(
      (response: WidgetsResponse) => {
        if (response && Array.isArray(response)) {
          this.doc = response; 
          this.UniqueJobworkHolders(); 
           
        } else {
          console.error('Response is missing widgets or widgets is not an array.');
        }
      },
      error => {
        console.error('API call failed:', error);
      }
    );
  }


  get hasAnyTabData(): boolean {
    return (
      this.selectedActivityData.length > 0 || 
      this.selectedSymptomData.length > 0 || 
      this.selectedVitalData.length > 0 || 
      this.selectedPrescriptionData.length > 0 ||
      this.selectedLaboratoryData.length > 0 ||
      this.selectedDocumentData.length > 0 
    );
  }

  fetchData(visitId: string): void {
    
    this.fetchActivityData(visitId);
    this.fetchSymptomData(visitId);
    this.fetchVitalData(visitId);
    this.fetchPrescriptionData(visitId);
    this.fetchLaboratoryData(visitId);
    this.fetchDocumentData(visitId);
    this.activeIndex = 0;
    
  }

  UniqueJobworkHolders(): void {
    const holders = this.doc.map(job => job.caseNo);
    this.uniqueJobworkHolders = Array.from(new Set(holders));
  }
  
  setJobworkHolder(name: string): void {
    this.caseNoName = name;
    this.selectedActivityData = []; 
    this.selectedSymptomData = []; 
    this.selectedVitalData = []; 
    this.selectedPrescriptionData  = []; 
    this.selectedLaboratoryData  = []; 
    this.selectedDocumentData  = []; 
    
  }

  getSelectedJobDetails(): Widget[] {
    return this.doc.filter(job => job.caseNo === this.caseNoName);
  }

  fetchActivityData(visitId: string): void {
    const selectedJob = this.doc.find(job => job.visitId === visitId);
    if (selectedJob && selectedJob.activity) {
      this.selectedActivityData = selectedJob.activity.map(activity => ({
        activityName: activity.activityName,
        activityGroup: activity.activityGroup,
        activityOrder: activity.activityOrder,
        activityDescription: activity.activityDescription,
      }));
    } else {
      this.selectedActivityData = [];
    }
  }

  fetchSymptomData(visitId: string): void {
    const selectedJob = this.doc.find(job => job.visitId === visitId);
    if (selectedJob && selectedJob.symptoms) {
        this.selectedSymptomData = selectedJob.symptoms.map(symptom => ({
            symptoms: symptom.symptoms,
            shortDescription: symptom.shortDescription,
            symptomNotes: symptom.symptomNotes,
            sympId: symptom.sympId,
        }));
    } else {
        this.selectedSymptomData = [];
    }
  }

  fetchVitalData(visitId: string): void {
    const selectedJob = this.doc.find(job => job.visitId === visitId);
    if (selectedJob && selectedJob.vitals) {
      this.selectedVitalData = Object.keys(selectedJob.vitals).map(key => ({
        recordKey: key,
        temp: selectedJob.vitals[key].temp,
        height: selectedJob.vitals[key].height,
        weight: selectedJob.vitals[key].weight,
        bp: selectedJob.vitals[key].bp,
      }));
    } else {
      this.selectedVitalData = [];
    }
  }

  fetchPrescriptionData(visitId: string): void {
    const selectedJob = this.doc.find(job => job.visitId === visitId);
    if (selectedJob) {
      const details = selectedJob.prescriptionDetails;
      if (details) {
        const prescriptionsArray = Array.isArray(details) ? details : [details];
        this.selectedPrescriptionData = prescriptionsArray.map(prescription => ({
          prescriptionType: prescription.prescriptiontype,
          prescription: prescription.prescription,
          route: prescription.route,
          take: prescription.take,
          description: prescription.description,
          dosage: prescription.dosage,
        }));
      } else {
        this.selectedPrescriptionData = [];
      }
    } else {
      this.selectedPrescriptionData = [];
    }
  }
  fetchLaboratoryData(visitId: string): void {
    const selectedJob = this.doc.find(job => job.visitId === visitId);
    if (selectedJob && selectedJob.laboratory) {
      this.selectedLaboratoryData = selectedJob.laboratory.map(lab => ({
        doctorName: lab.doctorName,
        labName: lab.labName,
        test: lab.test,
        manage: lab.manage,
      }));
    } else {
      this.selectedLaboratoryData = [];
    }
  }
  
  fetchDocumentData(visitId: string): void {
    const selectedJob = this.doc.find(job => job.visitId === visitId);
    if (selectedJob && selectedJob.document) {
      this.selectedDocumentData = selectedJob.document.map(document => ({
        doctor: document.doctor,
        documentCategory: document.documentCategory,
      }));
    } else {
      this.selectedDocumentData = [];
    }
  }
}  