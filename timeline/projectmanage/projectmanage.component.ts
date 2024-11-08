import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highcharts-gantt';
import { ProjectmanageService } from '../services/projectmanage.service';
import { v4 as uuidv4 } from 'uuid';

export interface Projectmanage {
  id: string;
  _rev: string;
  docType: string;
  docId: string;
  jobWorkId: number;
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
  assignedIssueData: any[];
  createdBy: string;
  createdOn: string;
  modifiedBy: string;
  modifiedOn: string;
  type: string;
  actualTime: string;
  userId: string;
  isAssigned: boolean;
  jobworkHolder: string;
  updatedOn: string;
  takenTime: string;
}

export interface ProjectmanageResponse {
  projectman: Projectmanage[];
}

@Component({
  selector: 'app-projectmanage',
  templateUrl: './projectmanage.component.html',
  styleUrls: ['./projectmanage.component.scss'],
})
export class ProjectmanageComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;
  projectman: Projectmanage[] = [];
  filteredProjectman: Projectmanage[] = [];
  
  constructor(private _pmService: ProjectmanageService) {}

  ngOnInit(): void {
    this._pmService.getTimelineData().subscribe(
      (response: ProjectmanageResponse) => {
        console.log('API Response:', response);

        if (response && Array.isArray(response)) {
          this.projectman = response;
          this.filteredProjectman = this.projectman;  // Initialize with all data
          this.updateChart1(this.filteredProjectman,'month');
        } else {
          console.error('Response is missing or projectman is not an array.');
        }
      },
      (error) => {
        console.error('API call failed:', error);
      }
    );
  }
 onFilterChange(event: any): void {
  const filterValue = event.target.value;
  let filteredData: Projectmanage[] = [];
  
  const today = new Date();
  
  if (filterValue === 'month') {
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    filteredData = this.projectman.filter(project => {
      const projectDate = new Date(project.createdOn);
      return projectDate.getMonth() === currentMonth && projectDate.getFullYear() === currentYear;
    });
  } else if (filterValue === 'today') {
    const todayString = today.toISOString().split('T')[0];
    filteredData = this.projectman.filter(project => project.createdOn.startsWith(todayString));
  } else if (filterValue === 'yesterday') {
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1); // Go back 1 day
    const yesterdayString = yesterday.toISOString().split('T')[0]; // Get yesterday's date as YYYY-MM-DD
    filteredData = this.projectman.filter(project => project.createdOn.startsWith(yesterdayString));
  } else if (filterValue === 'week') {
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1)); // Set start of the week (Monday)
    startOfWeek.setHours(0, 0, 0, 0); // Set start of the day to midnight
  
    filteredData = this.projectman.filter(project => {
      const projectDate = new Date(project.createdOn);
      return projectDate >= startOfWeek && projectDate <= new Date();
    });
  } else if (filterValue === 'year') {
    const currentYear = today.getFullYear();
    filteredData = this.projectman.filter(project => {
      const projectDate = new Date(project.createdOn);
      return projectDate.getFullYear() === currentYear;
    });
  } else if (filterValue === 'previousYear') {
    const previousYear = today.getFullYear() - 1;
    const startOfPreviousYear = new Date(previousYear, 0, 1); // January 1st of the previous year
    const endOfPreviousYear = new Date(previousYear, 11, 31, 23, 59, 59); // December 31st of the previous year
  
    filteredData = this.projectman.filter(project => {
      const projectDate = new Date(project.createdOn);
      return projectDate >= startOfPreviousYear && projectDate <= endOfPreviousYear;
    });
  } else if (filterValue === 'quarter') {
    const currentQuarter = Math.floor(today.getMonth() / 3) + 1; // Get current quarter (1, 2, 3, or 4)
    const startMonth = (currentQuarter - 1) * 3; // Start month of the quarter
    const startOfQuarter = new Date(today.getFullYear(), startMonth, 1);
    const endOfQuarter = new Date(today.getFullYear(), startMonth + 3, 0, 23, 59, 59); // End of the quarter
  
    filteredData = this.projectman.filter(project => {
      const projectDate = new Date(project.createdOn);
      return projectDate >= startOfQuarter && projectDate <= endOfQuarter;
    });
  
  } else {
    filteredData = this.projectman; // 'All' option shows all data
  }
  
  this.updateChart1(filteredData, filterValue); // Pass filtered data and filter type to updateChart1
}







updateChart1(projectman: Projectmanage[], filter: string): void {
  const uniqueJobworkHolders: { [key: string]: Highcharts.GanttPointOptionsObject } = {};

  // Collect unique jobwork holders
  projectman.forEach(project => {
    if (!uniqueJobworkHolders[project.jobworkHolder]) {
      uniqueJobworkHolders[project.jobworkHolder] = {
        id: uuidv4(),
        name: project.jobworkHolder,
      };
    }
  });

  let seriesData: Highcharts.GanttPointOptionsObject[] = [];
  const parentData: any[] = [];

  // Populate parent data for the Gantt chart
  Object.values(uniqueJobworkHolders).forEach(series => {
    parentData.push(series);
  });

  const childData: Highcharts.GanttPointOptionsObject[] = []; // Array to store Gantt child data

  
  parentData.forEach((item: any) => {
    const filterProjects = projectman.filter((project: any) => project.jobworkHolder === item.name);
    if (filterProjects.length > 0) {
        filterProjects.forEach((pro: any) => {
            // Convert the start and end times to Date objects
            const startTime = new Date(this.convertToUTC(pro.createdOn));
            const endTime = new Date(pro.end); // Assuming `pro.end` is where you store the end time

            // Calculate total time in minutes
            const totalTime = Math.floor((endTime.getTime() - startTime.getTime()) / (1000 * 60)); // Convert milliseconds to minutes

            // Calculate completed percentage
            const completedPercentage = pro.actualTime ? pro.actualTime / totalTime : 0;

         
            // Main data entry for the actual duration
            const data: Highcharts.GanttPointOptionsObject = {
                name: pro.jobWorkId,
                start: startTime.getTime(), // Start time
                end: this.convertToUTC(pro.end),// End time
                parent: item.id,
                completed: completedPercentage, // Set the completed percentage
                // Main color
            };

            childData.push(data);

          
        });
    }
});


 
  seriesData = [...parentData, ...childData];
  const today = new Date();
  let minDate: number;
  let maxDate: number;
  let tickInterval: number | undefined;
  let dateTimeLabelFormats: any = {};
  

 
  if (filter === 'today') {
    const today = new Date();
    const midnightToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const midnightTomorrow = new Date(midnightToday.getTime() + 86400000); // Add 1 day in milliseconds

    minDate = midnightToday.getTime();
    maxDate = midnightTomorrow.getTime() - 1; // Exclude the exact midnight of tomorrow

    tickInterval = 3600 * 1000; // 1 hour in milliseconds
    dateTimeLabelFormats = {
        hour: '%H', // Display the hour in 24-hour format (00 to 23)
    };
}

    else if (filter === 'previousYear') {
      const previousYear = today.getFullYear() - 1; // Calculate previous year
      minDate = new Date(previousYear, 0, 1).getTime(); // January 1st of the previous year
      maxDate = new Date(previousYear, 11, 31, 23, 59, 59).getTime(); // December 31st of the previous year
      tickInterval = 30 * 24 * 3600 * 1000; // Approx 1 month interval
      dateTimeLabelFormats = {
        month: '%b', // Display abbreviated month names
      };
    }
  
  else if (filter === 'yesterday') {
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    minDate = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 0, 0, 0).getTime();
    maxDate = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 23, 59, 59).getTime();
    tickInterval = 3600 * 1000; // 1 hour interval for yesterday
    dateTimeLabelFormats = {
      hour: '%H:%M', // Display hours in 24-hour format
    };
  
  } else if (filter === 'week') {
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    minDate = new Date(lastWeek.getFullYear(), lastWeek.getMonth(), lastWeek.getDate(), 0, 0, 0).getTime();
    maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59).getTime();
    tickInterval = 24 * 3600 * 1000; // 1 day interval for week
    dateTimeLabelFormats = {
      day: '%e %b', // Display the day and month
    };
  
  } else if (filter === 'month') {
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59);
    minDate = monthStart.getTime();
    maxDate = monthEnd.getTime();
    tickInterval = 24 * 3600 * 1000; // 1 day interval for month
    dateTimeLabelFormats = {
      day: '%e', // Display the day of the month
    };
  
  } else if (filter === 'quarter') {
    const currentQuarter = Math.floor(today.getMonth() / 3);
    const quarterStartMonth = currentQuarter * 3; // Start month of the quarter
    minDate = new Date(today.getFullYear(), quarterStartMonth, 1).getTime(); // Start of the quarter
    maxDate = new Date(today.getFullYear(), quarterStartMonth + 3, 0, 23, 59, 59).getTime(); // End of the quarter
    tickInterval = 30 * 24 * 3600 * 1000; // Approx 1 month interval
    dateTimeLabelFormats = {
      month: '%b', // Display abbreviated month names
    };
  
  } else {
    // Default or 'year' filter
    minDate = new Date(today.getFullYear(), 0, 1).getTime(); // Start of the year
    maxDate = new Date(today.getFullYear(), 11, 31, 23, 59, 59).getTime(); // End of the year
    tickInterval = 30 * 24 * 3600 * 1000; // 1 month interval
    dateTimeLabelFormats = {
      month: '%b', // Display abbreviated month names
    };
  }
  this.chartOptions = {
    chart: {
      type: 'gantt',
    },
    title: {
      text: 'Gantt Chart by Jobwork Holder',
    },
    xAxis: {
      min: minDate,
      max: maxDate,
      type: 'datetime',
      tickInterval: tickInterval,
      dateTimeLabelFormats: dateTimeLabelFormats,
      title: {
        text: today.toLocaleString('default', { month: 'long' }),
      },
    },
    series: [
      {
        type: 'gantt',
        name: 'Projects',
        data: seriesData,
      },
    ],
  };
}

// Converts a date string to UTC timestamp
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
}











 //   let minDate: number;
  //   let maxDate: number;
  
  //   const today = new Date();
  
  //   if (filter === 'specificDate' && specificDate) {
  //     minDate = new Date(specificDate.getFullYear(), specificDate.getMonth(), specificDate.getDate(), 0, 0, 0).getTime();
  //     maxDate = new Date(specificDate.getFullYear(), specificDate.getMonth(), specificDate.getDate(), 23, 59, 59).getTime();
  //   } else if (filter === 'yearly') {
  //     minDate = new Date(today.getFullYear(), 0, 1).getTime();  // Start of the year
  //     maxDate = new Date(today.getFullYear(), 11, 31, 23, 59, 59).getTime();  // End of the year
  //   } else if (filter === 'today') {
  //     minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0).getTime();
  //     maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59).getTime();
  //   } 
  //   else if (filter === 'month') {
  //     // New logic for month filter
  //     const monthStart = new Date(today.getFullYear(), today.getMonth(), 1); // Start of the month
  //     const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59); // End of the month
  //     minDate = monthStart.getTime();
  //     maxDate = monthEnd.getTime();
  // }else {
  //     // Default to min and max of projectman dates
  //     const createdOnDates = projectman.map(project => new Date(project.createdOn).getTime());
  //     const endDates = projectman.map(project => new Date(project.end).getTime());
  
  //     minDate = Math.min(...createdOnDates);
  //     maxDate = Math.max(...endDates);
  //   }
  
  //   // Set tickInterval and dateTimeLabelFormats based on the filter
  //   let tickInterval: number | undefined;
  //   let dateTimeLabelFormats: { [key: string]: string };
  
  //   if (filter === 'specificDate') {
  //     tickInterval = 3600 * 1000; // 1 hour for specific date
  //     dateTimeLabelFormats = {
  //       hour: '%H:%M',  // Display hours in 24-hour format
  //     };
  //   } else if (filter === 'yearly') {
  //     tickInterval = undefined; // Default interval for yearly
  //     dateTimeLabelFormats = {
  //       month: '%b %Y', // Display month and year for yearly view
  //       year: '%Y',
  //     };
  //   } else if (filter === 'today') {
  //     tickInterval = 3600 * 1000; // 1 hour interval for today
  //     dateTimeLabelFormats = {
  //       hour: '%H:%M',  // Display hours in 24-hour format
  //     };
  //   } 
  //   else if (filter === 'month') {
  //     tickInterval = 24 * 3600 * 1000; // 1 day interval
  //     dateTimeLabelFormats = {
  //         day: '%e', // Display the day of the month
  //     };
  //   }else {
  //     tickInterval = undefined; // Default interval for other cases
  //     dateTimeLabelFormats = {};
  //   }
  
  //   this.chartOptions = {
  //     chart: {
  //       type: 'ganttChart',
  //     },
  //     title: {
  //       text: 'Gantt Chart by Jobwork Holder',
  //     },
  //     xAxis: {
  //           min: minDate,
  //           max: maxDate,
  //           type: 'datetime',
  //           tickInterval: tickInterval,
  //           dateTimeLabelFormats: dateTimeLabelFormats,
  //           title: {
  //               text: today.toLocaleString('default', { month: 'long' }), // Display month name
  //           },
  //       },
  //     yAxis: {
  //       labels: {
  //         formatter: function () {
  //           return `<span style="cursor:pointer;color:blue;">${this.value}</span>`;
  //         },
  //         useHTML: true,
  //       },
  //     },
  //     series: [
  //       {
  //         type: 'gantt',
  //         name: 'Projects',
  //         data: seriesData,
  //       },
  //     ],
  //   };
  // }
  