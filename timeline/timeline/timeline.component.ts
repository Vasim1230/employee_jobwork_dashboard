
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highcharts-gantt';
import { TimelineService } from '../services/timeline.service';

export interface Timeline {
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
  actualTime: number;
  start: string;  // ISO 8601 date string
  type: string;
  end: string;    // ISO 8601 date string
  timeSpend: number;
  notes: string;
  createdOn: string;  // ISO 8601 date string
  createdBy: string;
  cid: string;
}

export interface TimelineResponse {
  timeline: Timeline[];
}

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};  
  updateFlag = false;  
  timeline: Timeline[] = []; 

  constructor(private _tlService: TimelineService) {}

  ngOnInit(): void {
    this._tlService.getTimelineData().subscribe(
      (response: TimelineResponse) => {
        console.log('API Response:', response);

        if (response && Array.isArray(response)) {
          this.timeline = response;
          this.updateChart1(this.timeline);  
        } else {
          console.error('Response is missing timeline or timeline is not an array.');
        }
      },
      (error) => {
        console.error('API call failed:', error);
      }
    );
  }

  // Define the method to convert date strings to timestamps
  convertToTimestamp(dateString: string): number {
    return Date.parse(dateString);
  }

  updateChart1(timeline: Timeline[]): void {
    const timeOffset = 5.5 * 60 * 60 * 1000; // 5 hours and 30 minutes in milliseconds

    const userRoleMap: { [key: string]: number } = {};
    const uniqueUserRoles = Array.from(new Set(timeline.map(item => item.userRole)));
    uniqueUserRoles.forEach((role, index) => userRoleMap[role] = index);

    const userRoleTotalTimeMap: { [key: string]: number } = {};

    timeline.forEach(item => {
        const startUTC = this.convertToUTC(item.start) + timeOffset; // Add offset
        const endUTC = this.convertToUTC(item.end) + timeOffset; // Add offset
        const duration = endUTC - startUTC;

        if (!userRoleTotalTimeMap[item.userRole]) {
            userRoleTotalTimeMap[item.userRole] = 0;
        }
        userRoleTotalTimeMap[item.userRole] += duration;
    });

    const userRoleWithTotalTime = uniqueUserRoles.map(role => {
        const totalTimeInMinutes = (userRoleTotalTimeMap[role] / (1000 * 60)).toFixed(2);
        return `${role} (${totalTimeInMinutes} mins)`;
    });

    const seriesData = timeline.map(item => {
        const startUTC = this.convertToUTC(item.start) + timeOffset; // Add offset
        const endUTC = this.convertToUTC(item.end) + timeOffset; // Add offset
        const durationInMinutes = (endUTC - startUTC) / (1000 * 60);

        return {
            name: item.notes,
            start: startUTC,
            end: endUTC,
            y: userRoleMap[item.userRole],
            dataLabels: {
                enabled: true,
                inside: true,
                formatter: function() {
                    return `${durationInMinutes.toFixed(2)} mins`;
                },
                style: {
                    fontSize: '12px',
                    color: '#FFFFFF'
                }
            }
        };
    });

    const minDate = Math.min(...timeline.map(item => this.convertToUTC(item.start) + timeOffset));
    const maxDate = Math.max(...timeline.map(item => this.convertToUTC(item.end) + timeOffset));

    console.log('Converted seriesData:', seriesData);

    this.chartOptions = {
        chart: {
            type: 'gantt',
        },
        xAxis: {
            min: minDate,
            max: maxDate,
            type: 'datetime',
            labels: {
                formatter: function () {
                    if (this.axis && this.axis.max != null && this.axis.min != null) {
                        const range = this.axis.max - this.axis.min;
                        return range < 24 * 3600 * 1000
                            ? Highcharts.dateFormat('%H:%M', Number(this.value))
                            : Highcharts.dateFormat('%d/%m', Number(this.value));
                    } else {
                        return Highcharts.dateFormat('%d/%m', Number(this.value));
                    }
                },
            },
        },
        yAxis: {
            categories: userRoleWithTotalTime,
            title: {
                text: 'User Roles',
            },
        },
        series: [{
            name: 'Project Timelines',
            data: seriesData,
            type: 'gantt'
        }],
        title: {
            text: 'Gantt Chart Example'
        },
    };

    this.updateFlag = true;
}



  
  convertToUTC(dateString: string): number {
    const date = new Date(dateString);
    return Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes()
    );
  }
  
  // getCompletionPercentage(userRole: string): number | undefined {
  //   if (userRole === 'Developer') {
  //     return 0.25; // Example completion percentage
  //   }
  //   return undefined; // For other roles, completed field is optional
  // }
}












// import { Component, OnInit } from '@angular/core';
// import * as Highcharts from "highcharts/highcharts-gantt";



// @Component({
//   selector: 'app-timeline',
//   templateUrl: './timeline.component.html',
//   styleUrls: ['./timeline.component.scss']
// })
// export class TimelineComponent implements OnInit {
//   Highcharts: typeof Highcharts = Highcharts;
//   updateFlag = false;

//   chartOptions: Highcharts.Options = {
    

//     xAxis: [
//       {
//         min: Date.UTC(2023, 6, 31),
//         max: Date.UTC(2023, 7, 1),

       

//         breaks: [
//           {
           
//           },
//         ],
//       },
//       {
//         labels: {
//           formatter: function () {
//             return Highcharts.dateFormat('%d/%m', Number(this.value));
//           },
//         },
//       },
//     ],

   
   
   
    

    
//     series: [
//       {
//         type: 'gantt',
        
//         data: [
//           {
//             name: "Developer",
//             start: Date.UTC(2023, 6, 31, 8, 0),
//             end: Date.UTC(2023, 6,31 , 11, 0),
//             completed: 0.25
//           },
//           {
//             name: "Test prototype",
//             start: Date.UTC(2023, 6, 31, 11, 0),
//             end: Date.UTC(2023, 6, 31, 13, 0),
//           },
//           {
//             name: " backend",
//             start: Date.UTC(2023, 6, 31, 14, 0),
//             end: Date.UTC(2023, 6, 31, 16, 0),
//           },
//           {
//             name: " bpo",
//             start: Date.UTC(2023, 6, 31, 16, 0),
//             end: Date.UTC(2023, 6, 31, 18, 30),
//           },
          
//         ],
//       },
     
//     ],    
    
//   };
  



//   constructor() { }

//   ngOnInit(): void {
//   }


// }



















// import { Component, OnInit } from '@angular/core';
// import * as Highcharts from "highcharts/highcharts-gantt";
// import { TimelineService } from './services/timeline.service';

// export interface Timeline {
//   _id: string;
//   _rev: string;
//   docId: string;
//   docType: string;
//   userName: string;
//   email: string;
//   userImage: string;
//   userRole: string;
//   contactNo: number;
//   userId: string;
//   jobWorkId: string;
//   projectName: string;
//   actualTime: number;
//   start: string;  // ISO 8601 date string
//   type: string;
//   end: string;    // ISO 8601 date string
//   timeSpend: number;
//   notes: string;
//   createdOn: string;  // ISO 8601 date string
//   createdBy: string;
//   cid: string;
// }

// export interface TimelineResponse {
//   timeline: Timeline[]; 
// }

// @Component({
//   selector: 'app-timeline',
//   templateUrl: './timeline.component.html',
//   styleUrls: ['./timeline.component.scss']
// })
// export class TimelineComponent implements OnInit {
//   Highcharts: typeof Highcharts = Highcharts;
//   chartOptions: Highcharts.Options = {}; // Initialize with an empty object

//   constructor(private _tlService: TimelineService) {}

//   ngOnInit(): void {
//     this._tlService.getTimelineData().subscribe(
//       (response: TimelineResponse) => {
//         console.log('API Response:', response);

//         if (response && Array.isArray(response.timeline)) {
//           this.timeline = response; // Store the widgets data
//           this.chartOptions(this.Timeline); 
//           // Map the timeline data to Highcharts format
//           const seriesData = Timeline.map((item: Timeline) => ({
//             name: item.projectName,
//             start: new Date(item.start).getTime(),
//             end: new Date(item.end).getTime(),
//             completed: item.timeSpend / item.actualTime // Example progress calculation
//           }));

//           // Extract createdOn dates to set min and max for X-axis
//           const createdOnDates = Timeline.map(item => new Date(item.createdOn).getTime());
//           const minCreatedOn = Math.min(...createdOnDates);
//           const maxCreatedOn = Math.max(...createdOnDates);

//           // Define chart options
//           this.chartOptions = {
//             title: {
//               text: "Gantt Chart with Progress Indicators"
//             },
//             xAxis: {
//               type: 'datetime', // Set X-axis type to 'datetime'
//               min: minCreatedOn,
//               max: maxCreatedOn,
//               title: {
//                 text: 'Created On Timeline'
//               }
//             },
//             series: [
//               {
//                 type: "gantt",
//                 name: "Project 1",
//                 data: seriesData
//               }
//             ]
//           };

//         } else {
//           console.error('Response is missing timeline or timeline is not an array.');
//         }
//       },
//       error => {
//         console.error('API call failed:', error);
//       }
//     );
//   }
// }
