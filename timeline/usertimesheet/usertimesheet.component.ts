import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highcharts-gantt';
import { UsertimesheetService } from './services/usertimesheet.service';
import { v4 as uuidv4 } from 'uuid';

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
  start: string;
  type: string;
  end: string;
  timeSpend: number;
  notes: string;
  createdOn: string;
  createdBy: string;
  cid: string;
}

export interface UsertimesheetResponse {
  usertimesheet: Usertimesheet[];
}

@Component({
  selector: 'app-usertimesheet',
  templateUrl: './usertimesheet.component.html',
  styleUrls: ['./usertimesheet.component.scss']
})
export class UsertimesheetComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  
  selectedWeekk!: string; 

  usertimesheet: Usertimesheet[] = [];
  selectedWeek: string = ''; // Holds the selected week value
  chartOptions: any; // Holds the chart options
  selectedDate: string = '';
  selectedMonth: string = '';

  constructor(private usertimesheetService: UsertimesheetService) {}

  ngOnInit(): void {
    // Initially load Gantt chart with the current week's data
    this.loadWeekTimeSheet();
  }

  // Method called when week is changed in the dropdown
  onWeekChange(event: any): void {
    this.selectedWeek = event.target.value; // Store the selected week
    this.selectedDate = ''; // Reset date filter
    this.selectedMonth = ''; // Reset month filter
    console.log('Week value changed to:', this.selectedWeek);
    this.loadTimesheetData();
  }

  // Change selectedDate to store the selected date
  selectedDateChange(event: any): void {
    this.selectedDate = event.target.value; // Store the selected date
    this.selectedWeek = ''; // Reset week filter
    this.selectedMonth = ''; // Reset month filter
    console.log('Date value changed to:', this.selectedDate);
    this.loadTimesheetData();
  }

  // Change selectedMonth to store the selected month
  selectedMonthChange(event: any): void {
    this.selectedMonth = event.target.value; // Store the selected month
    this.selectedWeek = ''; // Reset week filter
    this.selectedDate = ''; // Reset date filter
    console.log('Month value changed to:', this.selectedMonth);
    this.loadTimesheetData();
  }

 
  loadTimesheetData(): void {
    if (this.selectedWeek) {
      this.loadWeekTimeSheet();
    } else if (this.selectedDate) {
      this.loadTimesheetByDate();
    } else if (this.selectedMonth) {
      this.loadTimesheetByMonth();
    } else {
      this.loadWeekTimeSheet(); 
    }
  }


 
  loadWeekTimeSheet(): void {
   
    this.usertimesheetService.getUserTimesheetByWeek().subscribe(
      (response: UsertimesheetResponse) => {
        console.log('API Response:', response);
        if (response && Array.isArray(response)) {
          this.usertimesheet = response; 
          this.updateChart1(this.usertimesheet); 
        } else {
          console.error('Invalid response format or no data available.');
        }
      },
      (error) => {
        console.error('API call failed:', error);
      }
    );
  }
  loadTimesheetByDate(): void {
   
      this.usertimesheetService.getUserTimesheetByDate().subscribe(
        (response: UsertimesheetResponse) => {
          console.log('API Response for Date:', response);
          if (response && Array.isArray(response)) {
            this.usertimesheet = response; 
            this.updateChart1(this.usertimesheet);
          } else {
            console.error('Invalid response format or no data available.');
          }
        },
        (error) => {
          console.error('API call failed for date:', error);
        }
      );
    
  }
  
 
  loadTimesheetByMonth(): void {
   
      this.usertimesheetService.getUserTimesheetByMonth().subscribe(
        (response: UsertimesheetResponse) => {
          console.log('API Response for Month:', response);
          if (response && Array.isArray(response)) {
            this.usertimesheet = response; 
            this.updateChart1(this.usertimesheet);
          } else {
            console.error('Invalid response format or no data available.');
          }
        },
        (error) => {
          console.error('API call failed for month:', error);
        }
      );
    
  }

  updateChart1(usertimesheet: Usertimesheet[]): void {
   
    const uniqueUserName: { [key: string]: Highcharts.GanttPointOptionsObject } = {};
    
   
    usertimesheet.forEach(project => {
       
        if (!uniqueUserName[project.userName]) {
          uniqueUserName[project.userName] = {
                id: uuidv4(), 
                name: project.userName,
            };
        }
    });

    let seriesData: Highcharts.GanttPointOptionsObject[] = [];
    const parentData: any[] = [];

   
    Object.values(uniqueUserName).forEach(series => {
        parentData.push(series);
    });

    const childData: any[] = [];

    parentData.forEach((item: any) => {
        const filterProjects = usertimesheet.filter(
            (project: any) => project.userName === item.name
        );
        
        if (filterProjects.length > 0) {
            filterProjects.forEach((pro: any) => {
                const data = {
                    name: pro.category,
                    start: this.convertToUTC(pro.start),
                    end: this.convertToUTC(pro.end),
                    parent: item.id,
                };
                childData.push(data);
            });
        }
    });

   
    seriesData = [...parentData, ...childData];

    
    let startDate: Date;
    let endDate: Date;
    let minDate: number;
    let maxDate: number;
    let totalDaysInRange: number;
    let tickInterval: number;
    let dateTimeLabelFormats: any;

   
    if (this.selectedMonth) {
        const [year, month] = this.selectedMonth.split('-');
        const monthStart = new Date(parseInt(year, 10), parseInt(month, 10) - 1, 1); 
        const monthEnd = new Date(parseInt(year, 10), parseInt(month, 10), 0, 23, 59, 59); 

        startDate = monthStart;
        endDate = monthEnd;
        minDate = monthStart.getTime();
        maxDate = monthEnd.getTime();
        totalDaysInRange = monthEnd.getDate();
        tickInterval = 24 * 3600 * 1000; 
        dateTimeLabelFormats = { day: '%e ' };
    } else if (this.selectedWeek) {
        const [year, week] = this.selectedWeek.split('-W');
        startDate = this.getStartDateOfWeek(parseInt(week, 10), parseInt(year, 10));
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
        minDate = startDate.getTime();
        maxDate = endDate.getTime();
        totalDaysInRange = 7;
        tickInterval = 24 * 3600 * 1000; 
        dateTimeLabelFormats = { day: '%e %b' };
    } else if (this.selectedDate) {
        startDate = new Date(this.selectedDate);
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 1);
        minDate = startDate.getTime();
        maxDate = endDate.getTime();
        totalDaysInRange = 1;
        tickInterval =  3600 * 1000; 
        dateTimeLabelFormats = { hour: '%H' };
    } else {
        const today = new Date();
        const firstDayOfWeek = today.getDate() - today.getDay() + 1;
        startDate = new Date(today.setDate(firstDayOfWeek)); 
        endDate = new Date(today.setDate(startDate.getDate() + 6)); 
        minDate = startDate.getTime();
        maxDate = endDate.getTime();
        totalDaysInRange = 7;
        tickInterval = 24 * 3600 * 1000; 
        dateTimeLabelFormats = { day: '%e %b ' };
    }

    // Log the start and end dates
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);

    // Set the chart options for the Gantt chart
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
                text: `Total Days: ${totalDaysInRange}`, // Display total days in the selected range as title
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

    // Force re-render of the chart with shallow copy
    this.chartOptions = { ...this.chartOptions };
}

// Helper method to get the start date of a given week and year
getStartDateOfWeek(weekNumber: number, year: number): Date {
    const firstDayOfYear = new Date(year, 0, 1);
    const days = ((weekNumber - 1) * 7) - firstDayOfYear.getDay() + 1;
    return new Date(year, 0, days + 1);
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