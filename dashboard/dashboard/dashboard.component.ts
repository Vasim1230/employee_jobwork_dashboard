import { Component, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexFill,
  ApexTooltip,
  ApexResponsive
} from "ng-apexcharts";
import { DashboardService } from '../services/dashboard.service';
import moment from 'moment';

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  title?: ApexTitleSubtitle; 
  grid?: ApexGrid; 
  responsive: ApexResponsive[];
  legend?: ApexLegend; 
  labels: any;
};

export interface ColumnCharts {
  start: string;
  
  Id: string;   
  role: string;
  name: string;
}

export interface ColumnChart {
  date: string;
   
 
  
  
  
}
export interface Areacharts{
  date: string;
  Id: string;   
xaxis: string;
 
}

export interface Piecharts{
  date: string;
 
  xaxis: string;
 
}
export interface Barcharts{
  date: string;
  
  xaxis: string;
}
export interface title{
  title:string;
}
export interface FilterOption {
  name: string;
  description: string;
  code: number;
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


export interface WidgetsResponse {
  dashboard: RawWidgetData[]; 
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public chartOptions!: Partial<ChartOptions>;
  public chartOptions4!: Partial<ChartOptions>;
  public chartOptions5!: Partial<ChartOptions>;
  public chartOptions1!: Partial<ChartOptions>;
  dashboard: ColumnCharts[] = []; 
  
  columnChartsData: ColumnChart[] = [];
  areaChartsData: Areacharts[] = [];
  pieChartsData: Piecharts[] = [];
  barChartsData: Barcharts[] = [];
  dynamicTitle: string = "Invoice";
  chart1:string= "vas"
   chart2:string= "v"
    chart3:string= "v"
     chart4:string= "v"
     columnuniqueFilterOptions: FilterOption[] = []; 
     areauniqueFilterOptions: FilterOption[] = []; 
     pieuniqueFilterOptions: FilterOption[] = []; 
     baruniqueFilterOptions: FilterOption[] = []; 
     
  constructor(private _dbservice: DashboardService) {
    
  }

  ngOnInit(): void {
    this._dbservice.getwidgets().subscribe(
      (response: WidgetsResponse) => {
        console.log('API Response:', response);

        if (response && Array.isArray(response)) {
          this.dashboard = response.map(widget => ({
            start: widget.  createdOn,
           
            Id: widget.jobWorkId,
            role: widget.category,
            name:widget.userName,
            
          }));
          
     this.mapColumnCharts();
     this.mapAreaCharts();
     this.mapPieCharts();
     this.mapBarCharts();
     this.columnUniqueFilter();
     this.areaUniqueFilter();
     this.pieUniqueFilter();
     this.barUniqueFilter();
   }
 }
);
}

private mapColumnCharts(): void {
this.columnChartsData = this.dashboard.map(widget => ({
 date: widget.start,
//  xaxis: widget,
//  Id: widget.Id,
 
}));
}

private mapAreaCharts(): void {
this.areaChartsData = this.dashboard.map(widget => ({
 date: widget.start,
 Id: widget.Id,
 xaxis: widget.role,
 
}));
}

private mapPieCharts(): void {
this.pieChartsData = this.dashboard.map(widget => ({
 date: widget.start,
 xaxis: widget.role
}));
}

private mapBarCharts(): void {
this.barChartsData = this.dashboard.map(widget => ({
 date: widget.start,
 xaxis: widget.name
}));
}
private columnUniqueFilter(): void {
 
  const masterData = [
    { name: "today", description: "Today", code: 1 },
    { name: "yesterday", description: "Yesterday", code: 2 },
    { name: "last7Days", description: "this week", code: 3 },
    { name: "last quarter", description: "last quarter", code: 4 },
   
  ];

  
  this.columnuniqueFilterOptions = masterData;

  console.log('Unique Filter Options:', this.columnuniqueFilterOptions);
}
private areaUniqueFilter(): void {
 
  const masterData = [
    { name: "today", description: "Today", code: 1 },
    { name: "yesterday", description: "Yesterday", code: 2 },
    { name: "yearly", description: "Yearly", code: 3 },
 
  ];

  
  this.areauniqueFilterOptions = masterData;

  console.log('Unique Filter Options:', this.areauniqueFilterOptions);
}


private pieUniqueFilter(): void {
 
  const masterData = [
    { name: "today", description: "Today", code: 1 },
    { name: "yesterday", description: "Yesterday", code: 2 },
    { name: "yearly", description: "Yearly", code: 3 },
    { name: "last week", description: "This week", code: 4 }
  ];

  
  this.pieuniqueFilterOptions = masterData;

  console.log('Unique Filter Options:', this.pieuniqueFilterOptions);
}
private barUniqueFilter(): void {
 
  const masterData = [
    { name: "today", description: "Today", code: 1 },
    { name: "yesterday", description: "Yesterday", code: 2 },
    { name: "yearly", description: "Yearly", code: 3 },
    { name: "last week", description: "This week", code: 4 },
    
 
  ];

  
  this.baruniqueFilterOptions = masterData;

  console.log('Unique Filter Options:', this.baruniqueFilterOptions);
}

  filterData(filterType: string): void {
    const today = moment();
    let filteredWidgets: ColumnChart[] = [];

    // switch (filterType) {
    //   case 'today':
    //     filteredWidgets = this.columnChartsData.filter(widget => moment(widget.date).isSame(today, 'day'));
    //     break;
    //   case 'yesterday':
    //     filteredWidgets = this.columnChartsData.filter(widget => moment(widget.date).isSame(today.clone().subtract(1, 'day'), 'day'));
    //     break;
    //     case 'week':
    //       filteredWidgets = this.columnChartsData.filter(widget =>
    //         moment(widget. date).isSame(today, 'week')
    //       );
    //       break;
    //   case 'monthly':
    //     filteredWidgets = this.columnChartsData.filter(widget => moment(widget.date).isSame(today, 'month'));
    //     break;
    //   case 'yearly':
    //     filteredWidgets = this.columnChartsData.filter(widget => moment(widget.date).isSame(today, 'year'));
    //     break;
    //   default:
    //     filteredWidgets = this.columnChartsData;
    // }
   
    switch (filterType) {
      case 'today':
        filteredWidgets = this.columnChartsData.filter(widget =>
          moment(widget.date).isSame(today, 'day'));
        break;
      case 'yesterday':
        filteredWidgets = this.columnChartsData.filter(widget =>
          moment(widget.date).isSame(today.clone().subtract(1, 'day'), 'day'));
        break;
      case 'this week':
        filteredWidgets = this.columnChartsData.filter(widget =>
          moment(widget.date).isSame(today, 'week'));
        break;
      case 'last week':
        filteredWidgets = this.columnChartsData.filter(widget =>
          moment(widget.date).isSame(today.clone().subtract(1, 'week'), 'week'));
        break;
      case 'last7Days':
        filteredWidgets = this.columnChartsData.filter(widget =>
          moment(widget.date).isAfter(today.clone().subtract(7, 'days')));
        break;
      case 'last 30 days':
        filteredWidgets = this.columnChartsData.filter(widget =>
          moment(widget.date).isAfter(today.clone().subtract(30, 'days')));
        break;
      case 'this month':
        filteredWidgets = this.columnChartsData.filter(widget =>
          moment(widget.date).isSame(today, 'month'));
        break;
      case 'this quarter':
        filteredWidgets = this.columnChartsData.filter(widget =>
          moment(widget.date).isSame(today, 'quarter'));
        break;
      case 'last quarter':
        filteredWidgets = this.columnChartsData.filter(widget =>
          moment(widget.date).isSame(today.clone().subtract(1, 'quarter'), 'quarter'));
        break;
      case 'yearly':
        filteredWidgets = this.columnChartsData.filter(widget =>
          moment(widget.date).isBetween(today.clone().startOf('year'), today.clone().endOf('year'), null, '[]'));
        break;
      case 'past 5 years':
        filteredWidgets = this.columnChartsData.filter(widget =>
          moment(widget.date).isAfter(today.clone().subtract(5, 'years')));
        break;
      default:
        filteredWidgets = this.columnChartsData;
    }
  
    
    
    console.log(`Filtered Widgets for ${filterType}:`, filteredWidgets);
    this. updateChart1(filteredWidgets,filterType);
  }

  updateChart1(filteredWidgets: ColumnChart[], filterType: string): void {
   if (filterType === 'week') {
      const dayNames = moment.weekdays(); 
      const dayCounts = Array(7).fill(0); 
    
      filteredWidgets.forEach((widget) => {
        const widgetDate = moment(widget.date);
        const startOfWeek = moment().startOf('week'); 
        
       
        if (widgetDate.isBetween(startOfWeek, startOfWeek.clone().add(6, 'days'), null, '[]')) {
          const day = widgetDate.day(); 
          dayCounts[day] += 1; 
        }
      });
    
      this.chartOptions = {
        series: [
          { name: "Total", data: dayCounts },
        ],
        chart: {
          type: "bar",
          height: 350,
        },
        title: {
               text: "Invoice Sales Overview - Yearly"
          },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: dayNames,
          title: {
            text: "Days"
          }
        },
        yaxis: {
          title: {
            text: "Count"
          }
        },
        fill: {
          opacity: 1
        },
      };
    }
    
    else if (filterType === 'today' || filterType === 'yesterday') {
      const hourNames = Array.from({ length: 24 }, (_, i) => `${i}:00`); 
      const hourCounts = Array(24).fill(0); 
    
      const startOfPeriod = filterType === 'today' 
        ? moment().startOf('day') 
        : moment().subtract(1, 'days').startOf('day');
    
      const endOfPeriod = filterType === 'today' 
        ? moment().endOf('day') 
        : moment().subtract(1, 'days').endOf('day');
    
      filteredWidgets.forEach((widget) => {
        const widgetDate = moment(widget.date);
    
      
        if (widgetDate.isBetween(startOfPeriod, endOfPeriod, null, '[]')) {
          const hour = widgetDate.hour(); 
          hourCounts[hour] += 1; 
        }
      });
    
      this.chartOptions = {
        series: [
          { name: "Total", data: hourCounts },
        ],
        chart: {
          type: "bar",
          height: 350,
        },
        title: {
          text: this.dynamicTitle
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: hourNames,
          title: {
            text: "Hours"
          }
        },
        yaxis: {
          title: {
            text: "Count"
          }
        },
        fill: {
          opacity: 1
        },
      };
    }
    else if (filterType === 'this week') {
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const dayCounts = Array(7).fill(0); 
    
      filteredWidgets.forEach((widget) => {
        const widgetDate = moment(widget.date);
        if (widgetDate.isSame(moment(), 'week')) {
          const day = widgetDate.day();
          dayCounts[day] += 1; 
        }
      });
    
      this.chartOptions = {
        series: [
          { name: "Total", data: dayCounts },
        ],
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
          }
        },
        dataLabels: {
          enabled: false
        },
        title: {
          text: this.dynamicTitle
        },
        xaxis: {
          categories: dayNames,
          title: {
            text: "Days"
          }
        },
        yaxis: {
          title: {
            text: "Count"
          }
        },
        fill: {
          opacity: 1
        },
      };
    }
    else if (filterType === 'last week') {
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const dayCounts = Array(7).fill(0); 
    
      filteredWidgets.forEach((widget) => {
        const widgetDate = moment(widget.date);
        if (widgetDate.isSame(moment().subtract(1, 'weeks'), 'week')) {
          const day = widgetDate.day(); 
          dayCounts[day] += 1; 
        }
      });
    
      this.chartOptions = {
        series: [
          { name: "Total", data: dayCounts },
        ],
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
          }
        },
        dataLabels: {
          enabled: false
        },
        title: {
          text: this.dynamicTitle
        },
        xaxis: {
          categories: dayNames,
          title: {
            text: "Days"
          }
        },
        yaxis: {
          title: {
            text: "Count"
          }
        },
        fill: {
          opacity: 1
        },
      };
    }

    else if (filterType === 'last7Days') {
      const dayNames = Array.from({ length: 7 }, (_, i) => moment().subtract(i, 'days').format('ddd'));
      const dayCounts = Array(7).fill(0); 
    
      filteredWidgets.forEach((widget) => {
        const widgetDate = moment(widget.date);
        if (widgetDate.isAfter(moment().subtract(7, 'days'))) {
          const dayIndex = moment(widgetDate).diff(moment().startOf('day'), 'days'); 
          dayCounts[dayIndex] += 1; 
        }
      });
    
      this.chartOptions = {
        series: [
          { name: "Total", data: dayCounts.reverse() }, 
        ],
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
          }
        },
        dataLabels: {
          enabled: false
        },
        title: {
          text: this.dynamicTitle
        },
        xaxis: {
          categories: dayNames.reverse(),
          title: {
            text: "Days"
          }
        },
        yaxis: {
          title: {
            text: "Count"
          }
        },
        fill: {
          opacity: 1
        },
      };
    }
    else if (filterType === 'last30Days') {
      const dayNames = Array.from({ length: 30 }, (_, i) => moment().subtract(29 - i, 'days').format('MMM D'));
      const dayCounts = Array(30).fill(0); 
    
      filteredWidgets.forEach((widget) => {
        const widgetDate = moment(widget.date);
        if (widgetDate.isAfter(moment().subtract(30, 'days'))) {
          const dayIndex = moment().diff(widgetDate, 'days'); 
          dayCounts[dayIndex] += 1; 
        }
      });
    
      this.chartOptions = {
        series: [
          { name: "Total", data: dayCounts.reverse() },
        ],
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
          }
        },
        dataLabels: {
          enabled: false
        },
        title: {
          text: this.dynamicTitle
        },
        xaxis: {
          categories: dayNames.reverse(),
          title: {
            text: "Days"
          }
        },
        yaxis: {
          title: {
            text: "Count"
          }
        },
        fill: {
          opacity: 1
        },
      };
    }
    else if (filterType === 'this quarter') {
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const currentQuarter = Math.ceil((moment().month() + 1) / 3);
      const monthCounts = Array(3).fill(0);
      
      filteredWidgets.forEach((widget) => {
        const widgetDate = moment(widget.date);
        if (widgetDate.isSame(moment(), 'quarter')) {
          const monthIndex = widgetDate.month() % 3; 
          monthCounts[monthIndex] += 1;
        }
      });
    
      this.chartOptions = {
        series: [
          { name: "Total", data: monthCounts },
        ],
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
          }
        },
        dataLabels: {
          enabled: false
        },
        title: {
          text: this.dynamicTitle
        },
        xaxis: {
          categories: monthNames.slice((currentQuarter - 1) * 3, currentQuarter * 3), 
          title: {
            text: "Months"
          }
        },
        yaxis: {
          title: {
            text: "Count"
          }
        },
        fill: {
          opacity: 1
        },
      };
    }
    else if (filterType === 'last quarter') {
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const lastQuarterStartMonth = moment().subtract(1, 'quarters').startOf('quarter').month();
      const monthCounts = Array(3).fill(0);
    
      filteredWidgets.forEach((widget) => {
        const widgetDate = moment(widget.date);
        if (widgetDate.isSame(moment().subtract(1, 'quarters'), 'quarter')) {
          const monthIndex = widgetDate.month() - lastQuarterStartMonth;
          monthCounts[monthIndex] += 1;
        }
      });
    
      this.chartOptions = {
        series: [
          { name: "Total", data: monthCounts },
        ],
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
          }
        },
        dataLabels: {
          enabled: false
        },
        title: {
          text: this.dynamicTitle
        },
        xaxis: {
          categories: monthNames.slice(lastQuarterStartMonth, lastQuarterStartMonth + 3),
          title: {
            text: "Months"
          }
        },
        yaxis: {
          title: {
            text: "Count"
          }
        },
        fill: {
          opacity: 1
        },
      };
    }
    else if (filterType === 'past5Years') {
      const yearNames = Array.from({ length: 5 }, (_, i) => moment().subtract(i, 'years').year().toString());
      const yearCounts = Array(5).fill(0); 
    
      filteredWidgets.forEach((widget) => {
        const widgetDate = moment(widget.date);
        const yearDiff = moment().year() - widgetDate.year();
        if (yearDiff >= 0 && yearDiff < 5) {
          yearCounts[yearDiff] += 1; 
        }
      });
    
      this.chartOptions = {
        series: [
          { name: "Total", data: yearCounts.reverse() }, 
        ],
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
          }
        },
        dataLabels: {
          enabled: false
        },
        title: {
          text: this.dynamicTitle
        },
        xaxis: {
          categories: yearNames.reverse(),
          title: {
            text: "Years"
          }
        },
        yaxis: {
          title: {
            text: "Count"
          }
        },
        fill: {
          opacity: 1
        },
      };
    }
                
     else if (filterType === 'monthly') {
      const dayNames = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
      const dayCounts = Array(31).fill(0); 
    
      filteredWidgets.forEach((widget) => {
        const widgetDate = moment(widget.date);
        if (widgetDate.isSame(moment(), 'month')) {
          const day = widgetDate.date();
          dayCounts[day - 1] += 1; 
        }
      });
    
      this.chartOptions = {
        series: [
          { name: "Total", data: dayCounts },
        ],
        chart: {
          type: "bar",
          height: 350,
        },
        
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
          }
        },
        dataLabels: {
          enabled: false
        },
        title: {
          text: this.dynamicTitle
        },
        xaxis: {
          categories: dayNames,
          title: {
            text: "Days"
          }
        },
        yaxis: {
          title: {
            text: "Count"
          }
        },
        fill: {
          opacity: 1
        },
      };
    }
     else if (filterType === 'yearly') {
      const monthNames = moment.months().map(month => month.substring(0, 3));
      const monthCounts = Array(12).fill(0);

      filteredWidgets.forEach((widget) => {
        const widgetDate = moment(widget.date);
        if (widgetDate.isSame(moment(), 'year')) {
          const month = widgetDate.month();
          monthCounts[month] += 1; 
        }
      });

      this.chartOptions = {
        series: [
          { name: "Total ", data: monthCounts },
        ],
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
          }
        },
        dataLabels: {
          enabled: false
        },
        title: {
          text: this.dynamicTitle
        },
        xaxis: {
          categories: monthNames
        },
        yaxis: {
          title: {
            text: "Count"
          }
        },
        fill: {
          opacity: 1
        },
      };
    }
  }

  filterData1(filterType: string): void {
    const today = moment();
    let filteredWidgets: Areacharts[] = [];
   
    // switch (filterType) {
    //   case 'today':
    //     filteredWidgets = this.areaChartsData.filter(widget => moment(widget.date).isSame(today, 'day'));
    //     break;
    //   case 'yesterday':
    //     filteredWidgets = this.areaChartsData.filter(widget => moment(widget.date).isSame(today.clone().subtract(1, 'day'), 'day'));
    //     break;
    //     case 'week':
    //       filteredWidgets = this.areaChartsData.filter(widget =>
    //         moment(widget. date).isSame(today, 'week')
    //       );
    //       break;
    //   case 'monthly':
    //     filteredWidgets = this.areaChartsData.filter(widget => moment(widget.date).isSame(today, 'month'));
    //     break;
    //   case 'yearly':
    //     filteredWidgets = this.areaChartsData.filter(widget => moment(widget.date).isSame(today, 'year'));
    //     break;
    //   default:
    //     filteredWidgets = this.areaChartsData;
    // }
    switch (filterType) {
      case 'today':
        filteredWidgets = this.areaChartsData.filter(widget =>
          moment(widget.date).isSame(today, 'day'));
        break;
      case 'yesterday':
        filteredWidgets = this.areaChartsData.filter(widget =>
          moment(widget.date).isSame(today.clone().subtract(1, 'day'), 'day'));
        break;
      case 'this week':
        filteredWidgets = this.areaChartsData.filter(widget =>
          moment(widget.date).isSame(today, 'week'));
        break;
      case 'last week':
        filteredWidgets = this.areaChartsData.filter(widget =>
          moment(widget.date).isSame(today.clone().subtract(1, 'week'), 'week'));
        break;
      case 'last 7 days':
        filteredWidgets = this.areaChartsData.filter(widget =>
          moment(widget.date).isAfter(today.clone().subtract(7, 'days')));
        break;
      case 'last 30 days':
        filteredWidgets = this.areaChartsData.filter(widget =>
          moment(widget.date).isAfter(today.clone().subtract(30, 'days')));
        break;
      case 'this month':
        filteredWidgets = this.areaChartsData.filter(widget =>
          moment(widget.date).isSame(today, 'month'));
        break;
      case 'this quarter':
        filteredWidgets = this.areaChartsData.filter(widget =>
          moment(widget.date).isSame(today, 'quarter'));
        break;
      case 'last quarter':
        filteredWidgets = this.areaChartsData.filter(widget =>
          moment(widget.date).isSame(today.clone().subtract(1, 'quarter'), 'quarter'));
        break;
      case 'yearly':
        filteredWidgets = this.areaChartsData.filter(widget =>
          moment(widget.date).isBetween(today.clone().startOf('year'), today.clone().endOf('year'), null, '[]'));
        break;
      case 'past 5 years':
        filteredWidgets = this.areaChartsData.filter(widget =>
          moment(widget.date).isAfter(today.clone().subtract(5, 'years')));
        break;
      default:
        filteredWidgets = this.areaChartsData;
    }
  
    
    
    console.log(`Filtered Widgets for ${filterType}:`, filteredWidgets);
    this. updateChart2(filteredWidgets,filterType);
  }
 
    updateChart2(filteredWidgets: Areacharts[], filterType: string): void {
      if (filterType === 'this week') {
        const startOfWeek = moment().startOf('week');
        const daysInWeek = 7;
        const weekLabels = Array.from({ length: daysInWeek }, (_, i) => {
            return startOfWeek.clone().add(i, 'days').format('dddd');
        });
        
        const referenceCounts: Record<string, number[]> = {};
    
        this.areaChartsData.forEach(widget => {
            const widgetDate = moment(widget.date);
            const dayIndex = widgetDate.isoWeekday() - 1;
    
            if (!referenceCounts[widget.xaxis]) {
                referenceCounts[widget.xaxis] = Array(daysInWeek).fill(0);
            }
            
            if (widgetDate.isSame(startOfWeek, 'week')) {
                referenceCounts[widget.xaxis][dayIndex]++;
            }
        });
    
        const seriesData = Object.keys(referenceCounts).map(reference => ({
            name: reference,
            data: referenceCounts[reference],
        }));
    
        this.chartOptions1 = {
            series: seriesData,
            chart: {
                type: "bar",
                height: 350,
                stacked: true
            },
            plotOptions: {
                bar: {
                    horizontal: true
                }
            },
            stroke: {
                width: 1,
                colors: ["#fff"]
            },
            title: {
                text: this.dynamicTitle 
            },
            xaxis: {
                categories: weekLabels,
            },
            yaxis: {
                title: {
                    text: undefined
                }
            },
            tooltip: {
                y: {
                    formatter: (val) => `${val}K`
                }
            },
            fill: {
                opacity: 1
            },
            legend: {
                position: "bottom", 
                horizontalAlign: "center",
                floating: false,
                itemMargin: {
                    horizontal: 10,
                }
            }
        };
    }
    else if (filterType === 'lastWeek') {
      const startOfLastWeek = moment().subtract(1, 'week').startOf('week');
      const weekLabels = Array.from({ length: 7 }, (_, i) => {
          return startOfLastWeek.clone().add(i, 'days').format('dddd');
      });
  
      const referenceCounts: Record<string, number[]> = {};
  
      this.areaChartsData.forEach(widget => {
          const widgetDate = moment(widget.date);
          const dayIndex = widgetDate.isoWeekday() - 1;
  
          if (!referenceCounts[widget.xaxis]) {
              referenceCounts[widget.xaxis] = Array(7).fill(0);
          }
  
          if (widgetDate.isSame(startOfLastWeek, 'week')) {
              referenceCounts[widget.xaxis][dayIndex]++;
          }
      });
  
      const seriesData = Object.keys(referenceCounts).map(reference => ({
          name: reference,
          data: referenceCounts[reference],
      }));
  
      this.chartOptions1 = {
          series: seriesData,
          chart: {
              type: "bar",
              height: 350,
              stacked: true
          },
          plotOptions: {
              bar: {
                  horizontal: true
              }
          },
          stroke: {
              width: 1,
              colors: ["#fff"]
          },
          title: {
              text: this.dynamicTitle 
          },
          xaxis: {
              categories: weekLabels,
          },
          yaxis: {
              title: {
                  text: undefined
              }
          },
          tooltip: {
              y: {
                  formatter: (val) => `${val}K`
              }
          },
          fill: {
              opacity: 1
          },
          legend: {
              position: "bottom", 
              horizontalAlign: "center",
              floating: false,
              itemMargin: {
                  horizontal: 10,
              }
          }
      };
  }
  else if (filterType === 'last7Days') {
    const referenceCounts: Record<string, number[]> = {};
    const startDate = moment().subtract(7, 'days');

    const labels = Array.from({ length: 7 }, (_, i) => {
        return moment().subtract(6 - i, 'days').format('MM-DD'); 
    });

    this.areaChartsData.forEach(widget => {
        const widgetDate = moment(widget.date);

        if (!referenceCounts[widget.xaxis]) {
            referenceCounts[widget.xaxis] = Array(7).fill(0);
        }

        if (widgetDate.isAfter(startDate)) {
            const dayIndex = moment(widgetDate).diff(startDate, 'days');
            referenceCounts[widget.xaxis][dayIndex]++;
        }
    });

    const seriesData = Object.keys(referenceCounts).map(reference => ({
        name: reference,
        data: referenceCounts[reference],
    }));

    this.chartOptions1 = {
        series: seriesData,
        chart: {
            type: "bar",
            height: 350,
            stacked: true
        },
        plotOptions: {
            bar: {
                horizontal: true
            }
        },
        stroke: {
            width: 1,
            colors: ["#fff"]
        },
        title: {
            text: this.dynamicTitle
        },
        xaxis: {
            categories: labels,
        },
        yaxis: {
            title: {
                text: undefined
            }
        },
        tooltip: {
            y: {
                formatter: (val) => `${val}K`
            }
        },
        fill: {
            opacity: 1
        },
        legend: {
            position: "bottom", 
            horizontalAlign: "center",
            floating: false,
            itemMargin: {
                horizontal: 10,
            }
        }
    };
}
  
    
      else if (filterType === 'today') {
        const referenceCounts: { [reference: string]: number[] } = {};
        const hourLabels = Array.from({ length: 24 }, (_, i) => {
          const hour = i % 12 || 12; 
          const period = i < 12 ? 'AM' : 'PM';
          return `${hour} ${period}`; 
        });
    
        
        filteredWidgets.forEach(widget => {
          if (!referenceCounts[widget.xaxis]) {
            referenceCounts[widget.xaxis] = Array(24).fill(0);
          }
        });
    
        
        const todayStart = moment().startOf('day');
        const todayEnd = moment().endOf('day');
    
        filteredWidgets.forEach(widget => {
          const widgetDate = moment(widget.date);
          if (widgetDate.isBetween(todayStart, todayEnd, null, '[]')) {
            const hourIndex = widgetDate.hour();
            referenceCounts[widget.xaxis][hourIndex]++;
          }
        });
    
        
        const seriesData = Object.keys(referenceCounts).map(reference => ({
          name: reference,
          data: referenceCounts[reference],
        }));
    
        
        this.chartOptions1 = {
          series: seriesData,
          chart: {
            type: "bar",
            height: 350,
            stacked: true
          },
          plotOptions: {
            bar: {
              horizontal: true
            }
          },
          stroke: {
            width: 1,
            colors: ["#fff"]
          },
          title: {
            text: this.dynamicTitle
          },
          xaxis: {
            categories: hourLabels,
            labels: {}
          },
          yaxis: {
            title: {
              text: undefined
            }
          },
          tooltip: {
            y: {
              formatter: (val: number): string => `${val}`
            }
          },
          fill: {
            opacity: 1
          },
          legend: {
            position: "top",
            horizontalAlign: "left",
            offsetX: 40
          }
        };
      }
      else if (filterType === 'yesterday') {
        const referenceCounts: { [reference: string]: number[] } = {};
        const hourLabels = Array.from({ length: 24 }, (_, i) => {
          const hour = i % 12 || 12; 
          const period = i < 12 ? 'AM' : 'PM';
          return `${hour} ${period}`; 
        });
    
       
        filteredWidgets.forEach(widget => {
          if (!referenceCounts[widget.xaxis]) {
            referenceCounts[widget.xaxis] = Array(24).fill(0);
          }
        });
    
      
        const yesterdayStart = moment().subtract(1, 'days').startOf('day');
        const yesterdayEnd = moment().subtract(1, 'days').endOf('day');
    
        filteredWidgets.forEach(widget => {
          const widgetDate = moment(widget.date);
          if (widgetDate.isBetween(yesterdayStart, yesterdayEnd, null, '[]')) {
            const hourIndex = widgetDate.hour();
            referenceCounts[widget.xaxis][hourIndex]++;
          }
        });
    
       
        const seriesData = Object.keys(referenceCounts).map(reference => ({
          name: reference,
          data: referenceCounts[reference],
        }));
    
      
        this.chartOptions1 = {
          series: seriesData,
          chart: {
            type: "bar",
            height: 350,
            stacked: true
          },
          plotOptions: {
            bar: {
              horizontal: true
            }
          },
          stroke: {
            width: 1,
            colors: ["#fff"]
          },
          title: {
            text:this.dynamicTitle
          },
          xaxis: {
            categories: hourLabels,
            labels: {}
          },
          yaxis: {
            title: {
              text: undefined
            }
          },
          tooltip: {
            y: {
              formatter: (val: number): string => `${val}`
            }
          },
          fill: {
            opacity: 1
          },
          legend: {
            position: "top",
            horizontalAlign: "left",
            offsetX: 40
          }
        };
      }
      else if (filterType === 'thisMonth') {
        const daysInMonth = moment().daysInMonth();
        const monthLabels = Array.from({ length: daysInMonth }, (_, i) => {
            return moment().date(i + 1).format('D');
        });
    
        const referenceCounts: Record<string, number[]> = {};
    
        this.areaChartsData.forEach(widget => {
            const widgetDate = moment(widget.date);
            const dayIndex = widgetDate.date() - 1;
    
            if (!referenceCounts[widget.xaxis]) {
                referenceCounts[widget.xaxis] = Array(daysInMonth).fill(0);
            }
    
            if (widgetDate.isSame(moment(), 'month')) { 
                referenceCounts[widget.xaxis][dayIndex]++;
            }
        });
    
        const seriesData = Object.keys(referenceCounts).map(reference => ({
            name: reference,
            data: referenceCounts[reference],
        }));
    
        this.chartOptions1 = {
            series: seriesData,
            chart: {
                type: "bar",
                height: 350,
                stacked: true
            },
            plotOptions: {
                bar: {
                    horizontal: true
                }
            },
            stroke: {
                width: 1,
                colors: ["#fff"]
            },
            title: {
                text: this.dynamicTitle
            },
            xaxis: {
                categories: monthLabels,
            },
            yaxis: {
                title: {
                    text: undefined
                }
            },
            tooltip: {
                y: {
                    formatter: (val) => `${val}K`
                }
            },
            fill: {
                opacity: 1
            },
            legend: {
                position: "bottom", 
                horizontalAlign: "center",
                floating: false,
                itemMargin: {
                    horizontal: 10,
                }
            }
        };
    }
    else if (filterType === 'last30Days') {
      const referenceCounts: Record<string, number[]> = {};
      const startDate = moment().subtract(30, 'days');
  
      const labels = Array.from({ length: 30 }, (_, i) => {
          return moment().subtract(29 - i, 'days').format('MM-DD');
      });
  
      this.areaChartsData.forEach(widget => {
          const widgetDate = moment(widget.date);
  
          if (!referenceCounts[widget.xaxis]) {
              referenceCounts[widget.xaxis] = Array(30).fill(0);
          }
  
          if (widgetDate.isAfter(startDate)) {
              const dayIndex = moment(widgetDate).diff(startDate, 'days');
              referenceCounts[widget.xaxis][dayIndex]++;
          }
      });
  
      const seriesData = Object.keys(referenceCounts).map(reference => ({
          name: reference,
          data: referenceCounts[reference],
      }));
  
      this.chartOptions1 = {
          series: seriesData,
          chart: {
              type: "bar",
              height: 350,
              stacked: true
          },
          plotOptions: {
              bar: {
                  horizontal: true
              }
          },
          stroke: {
              width: 1,
              colors: ["#fff"]
          },
          title: {
              text: this.dynamicTitle 
          },
          xaxis: {
              categories: labels,
          },
          yaxis: {
              title: {
                  text: undefined
              }
          },
          tooltip: {
              y: {
                  formatter: (val) => `${val}K`
              }
          },
          fill: {
              opacity: 1
          },
          legend: {
              position: "bottom", 
              horizontalAlign: "center",
              floating: false,
              itemMargin: {
                  horizontal: 10,
              }
          }
      };
  }
  else if (filterType === 'thisQuarter') {
    const startOfQuarter = moment().startOf('quarter');
    const daysInQuarter = moment().endOf('quarter').date();
    const quarterLabels = Array.from({ length: daysInQuarter }, (_, i) => {
        return startOfQuarter.clone().add(i, 'days').format('D');
    });

    const referenceCounts: Record<string, number[]> = {};

    this.areaChartsData.forEach(widget => {
        const widgetDate = moment(widget.date);
        const dayIndex = widgetDate.date() - 1;

        if (!referenceCounts[widget.xaxis]) {
            referenceCounts[widget.xaxis] = Array(daysInQuarter).fill(0);
        }

        if (widgetDate.isSame(startOfQuarter, 'quarter')) {
            referenceCounts[widget.xaxis][dayIndex]++;
        }
    });

    const seriesData = Object.keys(referenceCounts).map(reference => ({
        name: reference,
        data: referenceCounts[reference],
    }));

    this.chartOptions1 = {
        series: seriesData,
        chart: {
            type: "bar",
            height: 350,
            stacked: true
        },
        plotOptions: {
            bar: {
                horizontal: true
            }
        },
        stroke: {
            width: 1,
            colors: ["#fff"]
        },
        title: {
            text: this.dynamicTitle 
        },
        xaxis: {
            categories: quarterLabels,
        },
        yaxis: {
            title: {
                text: undefined
            }
        },
        tooltip: {
            y: {
                formatter: (val) => `${val}K`
            }
        },
        fill: {
            opacity: 1
        },
        legend: {
            position: "bottom", 
            horizontalAlign: "center",
            floating: false,
            itemMargin: {
                horizontal: 10,
            }
        }
    };
}
else if (filterType === 'lastQuarter') {
  const startOfLastQuarter = moment().subtract(1, 'quarter').startOf('quarter');
  const daysInQuarter = moment().endOf('quarter').date();
  const quarterLabels = Array.from({ length: daysInQuarter }, (_, i) => {
      return startOfLastQuarter.clone().add(i, 'days').format('D');
  });

  const referenceCounts: Record<string, number[]> = {};

  this.areaChartsData.forEach(widget => {
      const widgetDate = moment(widget.date);
      const dayIndex = widgetDate.date() - 1;

      if (!referenceCounts[widget.xaxis]) {
          referenceCounts[widget.xaxis] = Array(daysInQuarter).fill(0);
      }

      if (widgetDate.isSame(startOfLastQuarter, 'quarter')) {
          referenceCounts[widget.xaxis][dayIndex]++;
      }
  });

  const seriesData = Object.keys(referenceCounts).map(reference => ({
      name: reference,
      data: referenceCounts[reference],
  }));

  this.chartOptions1 = {
      series: seriesData,
      chart: {
          type: "bar",
          height: 350,
          stacked: true
      },
      plotOptions: {
          bar: {
              horizontal: true
          }
      },
      stroke: {
          width: 1,
          colors: ["#fff"]
      },
      title: {
          text: this.dynamicTitle 
      },
      xaxis: {
          categories: quarterLabels,
      },
      yaxis: {
          title: {
              text: undefined
          }
      },
      tooltip: {
          y: {
              formatter: (val) => `${val}K`
          }
      },
      fill: {
          opacity: 1
      },
      legend: {
          position: "bottom", 
          horizontalAlign: "center",
          floating: false,
          itemMargin: {
              horizontal: 10,
          }
      }
  };
}

      else if (filterType === 'yearly') {
        const monthsInYear = 12;
        const referenceCounts: { [reference: string]: number[] } = {};
    
        const monthLabels = moment.months(); 
    
       
        this.areaChartsData.forEach(widget => {
            const widgetDate = moment(widget.date);
            const monthIndex = widgetDate.month(); 
    
            
            if (!referenceCounts[widget.xaxis]) {
                referenceCounts[widget.xaxis] = Array(monthsInYear).fill(0);
            }
    
            
            referenceCounts[widget.xaxis][monthIndex]++; 
        });
    
      
        const seriesData = Object.keys(referenceCounts).map(reference => ({
            name: reference,
            data: referenceCounts[reference],
        }));
    
        this.chartOptions1 = {
            series: seriesData,
            chart: {
                type: "bar",
                height: 350,
                stacked: true
            },
            plotOptions: {
                bar: {
                    horizontal: true
                }
            },
            stroke: {
                width: 1,
                colors: ["#fff"]
            },
            title: {
                text: this.dynamicTitle
            },
            xaxis: {
                categories: monthLabels,
                labels: {}
            },
            yaxis: {
                title: {
                    text: undefined
                }
            },
            tooltip: {
                y: {
                    formatter: (val: number): string => `${val}K` 
                }
            },
            fill: {
                opacity: 1
            },
            legend: {
                position: "bottom", 
                horizontalAlign: "center", 
                floating: false, 
                itemMargin: {
                    horizontal: 10, 
                }
            }
        };
    }
    else if (filterType === 'past5Years') {
      const referenceCounts: Record<string, number[]> = {};
      const startYear = moment().subtract(5, 'years').startOf('year');
      const labels = Array.from({ length: 5 }, (_, i) => {
          return startYear.clone().add(i, 'years').format('YYYY');
      });
  
      this.areaChartsData.forEach(widget => {
          const widgetDate = moment(widget.date);
          const yearIndex = widgetDate.year() - startYear.year(); 
  
          if (!referenceCounts[widget.xaxis]) {
              referenceCounts[widget.xaxis] = Array(5).fill(0);
          }
  
          if (widgetDate.isBetween(startYear, moment(), 'year', '[]')) {
              referenceCounts[widget.xaxis][yearIndex]++;
          }
      });
  
      const seriesData = Object.keys(referenceCounts).map(reference => ({
          name: reference,
          data: referenceCounts[reference],
      }));
  
      this.chartOptions1 = {
          series: seriesData,
          chart: {
              type: "bar",
              height: 350,
              stacked: true
          },
          plotOptions: {
              bar: {
                  horizontal: true
              }
          },
          stroke: {
              width: 1,
              colors: ["#fff"]
          },
          title: {
              text: this.dynamicTitle 
          },
          xaxis: {
              categories: labels,
          },
          yaxis: {
              title: {
                  text: undefined
              }
          },
          tooltip: {
              y: {
                  formatter: (val) => `${val}K`
              }
          },
          fill: {
              opacity: 1
          },
          legend: {
              position: "bottom", 
              horizontalAlign: "center",
              floating: false,
              itemMargin: {
                  horizontal: 10,
              }
          }
      };
  }
  
    }
    
    
  

  // getUniqueUsernames(): void {
  //   const uniqueUsernames = Array.from(new Set(this.dashboard.map(job => job.name)));
  //   this.usernames = uniqueUsernames.map(username => ({ label: username, value: username }));
  // }
  // populateCategories() {
  //   const uniqueCategories = Array.from(new Set(this.dashboard.map(job => job. role)));
  //   this.categories = uniqueCategories.map(category => ({ label: category, value: category }));
  // }
  
  // updateChart2(): void {
  //   const filteredJobs = this.dashboard.filter(job => 
  //       (this.selectedUsernames.length === 0 || this.selectedUsernames.includes(job.name)) &&
  //       (this.selectedCategories.length === 0 || this.selectedCategories.includes(job.role))
  //   );
  
  //   const weekLabels: string[] = [];
  //   const startMoment = moment(this.startDate1);
  //   const endMoment = moment(this.endDate1);
  
  //   for (let m = startMoment.clone(); m.isSameOrBefore(endMoment); m.add(1, 'days')) {
  //       weekLabels.push(m.format('MMM D'));
  //   }
  
  //   const referenceCounts: { [category: string]: number[] } = {};
  //   const categories = Array.from(new Set(filteredJobs.map(job => job.role)));
  
  //   categories.forEach(category => {
  //       referenceCounts[category] = Array(weekLabels.length).fill(0); 
  //   });
  
  //   filteredJobs.forEach(widget => {
  //       const widgetDate = moment(widget.start).format('YYYY-MM-DD');
  
  //       if (moment(widgetDate).isBetween(startMoment, endMoment, null, '[]')) {
  //           const dayIndex = weekLabels.indexOf(moment(widgetDate).format('MMM D'));
  //           const category = widget.role;
  //           const timeSpent = Number(widget.timeTaken) || 0; 
  
  //           if (dayIndex >= 0 && referenceCounts[category] !== undefined) {
  //               referenceCounts[category][dayIndex] += timeSpent; 
  //           }
  //       }
  //   });
  
  //   const seriesData = categories.map(category => ({
  //       name: category,
  //       data: referenceCounts[category]
  //   }));
  
  //   this.chartOptions3 = {
  //       series: seriesData,
  //       chart: {
  //           height: 350,
  //           type: "area"
  //       },
  //       dataLabels: {
  //           enabled: false
  //       },
  //       stroke: {
  //           curve: "smooth" 
  //       },
  //       xaxis: {
  //           categories: weekLabels 
  //       },
  //       yaxis: {
  //           title: {
  //               text: "Time Spent (Mins)" 
  //           }
  //       },
  //       tooltip: {
  //           y: {
  //               formatter: function(val) {
  //                   return val + " Mins"; 
  //               }
  //           }
  //       }
  //   };
  // }
  
  
  // applyFilters1(): void {
  //   this.updateChart2();
  
  // }
  // clearSelections1():void {
 
  //   this.updateChart2();
  // }
  
  filterDatachart4(filterType: string): void {
    const today = moment();
    let filteredWidgets: Piecharts[] = [];

    switch (filterType) {
      case 'today':
        filteredWidgets = this.pieChartsData.filter(widget =>
          moment(widget.date).isSame(today, 'day'));
        break;
      case 'yesterday':
        filteredWidgets = this.pieChartsData.filter(widget =>
          moment(widget.date).isSame(today.clone().subtract(1, 'day'), 'day'));
        break;
      case 'this week':
        filteredWidgets = this.pieChartsData.filter(widget =>
          moment(widget.date).isSame(today, 'week'));
        break;
      case 'last week':
        filteredWidgets = this.pieChartsData.filter(widget =>
          moment(widget.date).isSame(today.clone().subtract(1, 'week'), 'week'));
        break;
      case 'last 7 days':
        filteredWidgets = this.pieChartsData.filter(widget =>
          moment(widget.date).isAfter(today.clone().subtract(7, 'days')));
        break;
      case 'last 30 days':
        filteredWidgets = this.pieChartsData.filter(widget =>
          moment(widget.date).isAfter(today.clone().subtract(30, 'days')));
        break;
      case 'this month':
        filteredWidgets = this.pieChartsData.filter(widget =>
          moment(widget.date).isSame(today, 'month'));
        break;
      case 'this quarter':
        filteredWidgets = this.pieChartsData.filter(widget =>
          moment(widget.date).isSame(today, 'quarter'));
        break;
      case 'last quarter':
        filteredWidgets = this.pieChartsData.filter(widget =>
          moment(widget.date).isSame(today.clone().subtract(1, 'quarter'), 'quarter'));
        break;
      case 'yearly':
        filteredWidgets = this.pieChartsData.filter(widget =>
          moment(widget.date).isBetween(today.clone().startOf('year'), today.clone().endOf('year'), null, '[]'));
        break;
      case 'past 5 years':
        filteredWidgets = this.pieChartsData.filter(widget =>
          moment(widget.date).isAfter(today.clone().subtract(5, 'years')));
        break;
      default:
        filteredWidgets = this.pieChartsData;
    }

    console.log(`Filtered Widgets for ${filterType}:`, filteredWidgets);
    this.updateChart3(filteredWidgets);
  }

  updateChart3(pieChartsData: Piecharts[]): void {
    const statuses = [...new Set(pieChartsData.map(widget => widget.xaxis))];

    const statusCounts: { [key: string]: number } = statuses.reduce((acc, status) => {
      acc[status] = pieChartsData.filter(widget => widget.xaxis === status).length;
      return acc;
    }, {} as { [key: string]: number });

    const seriesData = statuses.map(status => statusCounts[status]);

    this.chartOptions4 = {
      series: seriesData,
      chart: {
        width: 380,
        type: "pie"
      },
      title: {
        text: this.dynamicTitle
      },
      labels: statuses,
      legend: {
        position: "bottom",
        horizontalAlign: "center",
        floating: false,
        itemMargin: {
          horizontal: 10,
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            }
          }
        }
      ]
    };
  }

  filterDatachart5(filterType: string): void {
    const today = moment();
    let filteredWidgets: Barcharts[] = []; // Adjust type as needed
  
    
    switch (filterType) {
      case 'today':
        filteredWidgets = this.barChartsData.filter(widget =>
          moment(widget.date).isSame(today, 'day'));
        break;
      case 'yesterday':
        filteredWidgets = this.barChartsData.filter(widget =>
          moment(widget.date).isSame(today.clone().subtract(1, 'day'), 'day'));
        break;
      case 'this week':
        filteredWidgets = this.barChartsData.filter(widget =>
          moment(widget.date).isSame(today, 'week'));
        break;
      case 'last week':
        filteredWidgets = this.barChartsData.filter(widget =>
          moment(widget.date).isSame(today.clone().subtract(1, 'week'), 'week'));
        break;
      case 'last 7 days':
        filteredWidgets = this.barChartsData.filter(widget =>
          moment(widget.date).isAfter(today.clone().subtract(7, 'days')));
        break;
      case 'last 30 days':
        filteredWidgets = this.barChartsData.filter(widget =>
          moment(widget.date).isAfter(today.clone().subtract(30, 'days')));
        break;
      case 'this month':
        filteredWidgets = this.barChartsData.filter(widget =>
          moment(widget.date).isSame(today, 'month'));
        break;
      case 'this quarter':
        filteredWidgets = this.barChartsData.filter(widget =>
          moment(widget.date).isSame(today, 'quarter'));
        break;
      case 'last quarter':
        filteredWidgets = this.barChartsData.filter(widget =>
          moment(widget.date).isSame(today.clone().subtract(1, 'quarter'), 'quarter'));
        break;
      case 'yearly':
        filteredWidgets = this.barChartsData.filter(widget =>
          moment(widget.date).isBetween(today.clone().startOf('year'), today.clone().endOf('year'), null, '[]'));
        break;
      case 'past 5 years':
        filteredWidgets = this.barChartsData.filter(widget =>
          moment(widget.date).isAfter(today.clone().subtract(5, 'years')));
        break;
      default:
        filteredWidgets = this.barChartsData;
    }
  
    console.log(`Filtered Widgets for ${filterType}:`, filteredWidgets);
    this.updateChart4(filteredWidgets);
  }
  
  updateChart4( barChartsData: Barcharts[] = []): void {
 
    if (barChartsData && Array.isArray(barChartsData)) {
    
      const counts: { [key: string]: number } = {};
  
      
      barChartsData.forEach(widget => {
        counts[widget.xaxis] = (counts[widget.xaxis] || 0) + 1;
      });
  
     
      const names = Object.keys(counts);
      const seriesData = Object.values(counts);
  
    
      this.chartOptions5 = {
        series: [
          {
            name: "Count",
            data: seriesData as number[] 
          }
        ],
        chart: {
          type: "bar",
          height: 350
        },
        title: {
          text: this.dynamicTitle
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: names
        }
      };
    }
  }
}  