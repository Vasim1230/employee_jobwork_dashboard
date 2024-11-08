import { Component, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexResponsive,
  ApexTooltip
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive[];
  
};
import moment from 'moment';
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
  category: string; 
  end: string;    // ISO 8601 date string
  timeSpend: string;
  notes: string;
  createdOn: string;  // ISO 8601 date string
  createdBy: string;
  cid: string;
  commitId: string;
}

export interface WidgetsResponse {
  basictimesheet: Widget[]; 
}

import { BasictimesheetService } from './services/basictimesheet.service';

@Component({
  selector: 'app-basictimesheet',
  templateUrl: './basictimesheet.component.html',
  styleUrls: ['./basictimesheet.component.scss']
})
export class BasictimesheetComponent implements OnInit {
  startDate2: string = moment().subtract(6, 'days').format('YYYY-MM-DD'); 
  endDate2: string = moment().format('YYYY-MM-DD');
  startDate1: string = moment().subtract(6, 'days').format('YYYY-MM-DD'); 
  endDate1: string = moment().format('YYYY-MM-DD');
  startDate: string = moment().subtract(6, 'days').format('YYYY-MM-DD'); 
  endDate: string = moment().format('YYYY-MM-DD');
  public chartOptions!: Partial<ChartOptions>;
  basictimesheet: Widget[] = [];
  jobworkHolderName: string = ''; 
  uniqueJobworkHolders: string[] = [];
  
  public chartOptions2!: Partial<ChartOptions>;
  public chartOptions3!: Partial<ChartOptions>;
  public chartOptions4!: Partial<ChartOptions>;
  categories: { label: string, value: string }[] = [];
  selectedCategories: string[] = [];
  
  usernames: { label: string, value: string }[] = [];
  selectedUsernames: string[] = [];

  selectedcategories: string[] = [];
  
 
  selectedusernames: string[] = [];
  

  constructor(private _btwidgetsService: BasictimesheetService) { }

  ngOnInit(): void {
    this._btwidgetsService.getwidgets().subscribe(
      (response: WidgetsResponse) => {
        if (response && Array.isArray(response)) {
          this.basictimesheet = response;
          this.getUniqueUsernames();
          this.UniqueJobworkHolders();
          this.populateCategories(); 
          this.updateChartData(); 
          this.updateChartData1(); 
          this.updateChartData2(); 
          this.updateChartData3();
         
        } else {
          console.error('Response is missing widgets or widgets is not an array.');
        }
      },
      error => {
        console.error('API call failed:', error);
      }
    );
  }

  UniqueJobworkHolders(): void {
    const holders = this.basictimesheet.map(job => job.userName);
    this.uniqueJobworkHolders = Array.from(new Set(holders));
    console.log(this.uniqueJobworkHolders); 
  }

  setJobworkHolder(name: string): void {
    this.jobworkHolderName = name;
    this.updateChartData(); 
  }
  
  updateChartData(): void {
   
    const filteredJobs = this.basictimesheet.filter(job => job.userName === this.jobworkHolderName);
    
   
    const categories = Array.from(new Set(filteredJobs.map(job => job.category)));
    const referenceCounts: { [category: string]: number[] } = {};
  
   
    categories.forEach(category => {
      referenceCounts[category] = [];
    });
  
    
    const startMoment = moment(this.startDate);
    const endMoment = moment(this.endDate);
    const weekLabels: string[] = [];
  
    for (let m = startMoment.clone(); m.isSameOrBefore(endMoment); m.add(1, 'days')) {
      weekLabels.push(m.format('MMM D'));
      categories.forEach(category => {
        referenceCounts[category].push(0);
      });
    }
  

    filteredJobs.forEach(widget => {
      const widgetDate = moment(widget.createdOn).format('YYYY-MM-DD');
  
    
      if (moment(widgetDate).isBetween(startMoment, endMoment, null, '[]')) {
        const dayIndex = weekLabels.indexOf(moment(widgetDate).format('MMM D'));
        const category = widget.category;
        const timeSpent = Number(widget.timeSpend) || 0; 
  
        if (dayIndex >= 0 && referenceCounts[category] !== undefined) {
          referenceCounts[category][dayIndex] += timeSpent; 
        }
      }
    });
  
   
    this.chartOptions = {
      series: categories.map(category => ({
        name: category,
        data: referenceCounts[category]
      })),
      chart: {
        type: "bar",
        height: 350
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
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: weekLabels 
      },
      yaxis: {
        title: {
          text: "Time Spent (hours)" 
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return val + " Mins";
          }
        }
      }
    };
  }
  
  updateChartData1(): void {
    
    const filteredJobs = this.basictimesheet;

    
    const categories = Array.from(new Set(filteredJobs.map(job => job.category)));
    const referenceCounts: { [category: string]: number[] } = {};

   
    const startMoment = moment(this.startDate);
    const endMoment = moment(this.endDate);
    const weekLabels: string[] = [];

    for (let m = startMoment.clone(); m.isSameOrBefore(endMoment); m.add(1, 'days')) {
        weekLabels.push(m.format('MMM D'));
    }

   
    categories.forEach(category => {
        referenceCounts[category] = Array(weekLabels.length).fill(0); 
    });

    filteredJobs.forEach(widget => {
        const widgetDate = moment(widget.createdOn).format('YYYY-MM-DD');

        if (moment(widgetDate).isBetween(startMoment, endMoment, null, '[]')) {
            const dayIndex = weekLabels.indexOf(moment(widgetDate).format('MMM D'));
            const category = widget.category;
            const timeSpent = Number(widget.timeSpend) || 0; 

            if (dayIndex >= 0 && referenceCounts[category] !== undefined) {
                referenceCounts[category][dayIndex] += timeSpent; 
            }
        }
    });

    const seriesData = categories.map(category => ({
        name: category,
        data: referenceCounts[category]
    }));

    this.chartOptions2 = {
        series: seriesData,
        chart: {
            height: 350,
            type: "area"
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: "smooth" 
        },
        xaxis: {
            categories: weekLabels 
        },
        yaxis: {
            title: {
                text: "Time Spent (Mins)" 
            }
        },
        tooltip: {
            y: {
                formatter: function(val) {
                    return val + " Mins"; 
                }
            }
        }
    };
}
getUniqueUsernames(): void {
  const uniqueUsernames = Array.from(new Set(this.basictimesheet.map(job => job.userName)));
  this.usernames = uniqueUsernames.map(username => ({ label: username, value: username }));
}
populateCategories() {
  const uniqueCategories = Array.from(new Set(this.basictimesheet.map(job => job.category)));
  this.categories = uniqueCategories.map(category => ({ label: category, value: category }));
}

updateChartData2(): void {
  const filteredJobs = this.basictimesheet.filter(job => 
      (this.selectedUsernames.length === 0 || this.selectedUsernames.includes(job.userName)) &&
      (this.selectedCategories.length === 0 || this.selectedCategories.includes(job.category))
  );

  const weekLabels: string[] = [];
  const startMoment = moment(this.startDate1);
  const endMoment = moment(this.endDate1);

  for (let m = startMoment.clone(); m.isSameOrBefore(endMoment); m.add(1, 'days')) {
      weekLabels.push(m.format('MMM D'));
  }

  const referenceCounts: { [category: string]: number[] } = {};
  const categories = Array.from(new Set(filteredJobs.map(job => job.category)));

  categories.forEach(category => {
      referenceCounts[category] = Array(weekLabels.length).fill(0); 
  });

  filteredJobs.forEach(widget => {
      const widgetDate = moment(widget.createdOn).format('YYYY-MM-DD');

      if (moment(widgetDate).isBetween(startMoment, endMoment, null, '[]')) {
          const dayIndex = weekLabels.indexOf(moment(widgetDate).format('MMM D'));
          const category = widget.category;
          const timeSpent = Number(widget.timeSpend) || 0; 

          if (dayIndex >= 0 && referenceCounts[category] !== undefined) {
              referenceCounts[category][dayIndex] += timeSpent; 
          }
      }
  });

  const seriesData = categories.map(category => ({
      name: category,
      data: referenceCounts[category]
  }));

  this.chartOptions3 = {
      series: seriesData,
      chart: {
          height: 350,
          type: "area"
      },
      dataLabels: {
          enabled: false
      },
      stroke: {
          curve: "smooth" 
      },
      xaxis: {
          categories: weekLabels 
      },
      yaxis: {
          title: {
              text: "Time Spent (Mins)" 
          }
      },
      tooltip: {
          y: {
              formatter: function(val) {
                  return val + " Mins"; 
              }
          }
      }
  };
}


applyFilters1(): void {
  this.updateChartData2();

}

updateChartData3(): void {
  const startMoment = moment(this.startDate2);
  const endMoment = moment(this.endDate2);

 
  const filteredJobs = this.basictimesheet.filter(job => {
      const jobDate = moment(job.createdOn);
      return (
          (this.selectedusernames.length === 0 || this.selectedusernames.includes(job.userName)) &&
          (this.selectedcategories.length === 0 || this.selectedcategories.includes(job.category)) &&
          jobDate.isBetween(startMoment, endMoment, null, '[]') 
      );
  });

  const referenceCounts: { [username: string]: { [category: string]: number } } = {};
  const categories = Array.from(new Set(filteredJobs.map(job => job.category)));

 
  filteredJobs.forEach(job => {
      const username = job.userName;
      const timeSpent = Number(job.timeSpend) || 0;

     
      if (!referenceCounts[username]) {
          referenceCounts[username] = {};
          categories.forEach(category => {
              referenceCounts[username][category] = 0;
          });
      }

    
      referenceCounts[username][job.category] += timeSpent;
  });


  const seriesData = categories.map(category => ({
      name: category,
      data: Object.values(referenceCounts).map(userData => userData[category] || 0) 
  }));

  const usernames = Object.keys(referenceCounts); 

 
  this.chartOptions4 = {
      series: seriesData,
      chart: {
          height: 350,
          type: "bar",  
          stacked: true,
          toolbar: {
              show: true
          },
          zoom: {
              enabled: true
          }
      },
      plotOptions: {
          bar: {
              horizontal: false
          }
      },
      xaxis: {
          type: "category",
          categories: usernames.length > 0 ? usernames : ['No Data'] 
      },
      legend: {
          position: "right",
          offsetY: 40
      },
      fill: {
          opacity: 1
      },
      yaxis: {
          title: {
              text: "Time Spent (Mins)"
          }
      },
      tooltip: {
          y: {
              formatter: function(val) {
                  return val + " Mins";
              }
          }
      },
      responsive: [
          {
              breakpoint: 480,
              options: {
                  legend: {
                      position: "bottom",
                      offsetX: -10,
                      offsetY: 0
                  }
              }
          }
      ]
  };
}
applyFilters2(): void {
 
  this.updateChartData3();
}
clearSelections2():void {
 
  this.updateChartData3();
}
clearSelections1():void {
 
  this.updateChartData2();
}
}



// updateChartData2(): void {
//   // Filter jobs based on selected usernames
//   const filteredJobs = this.basictimesheet.filter(job =>
//     this.selectedUsers.includes(job.userName)
//   );

//   console.log("Filtered Jobs:", filteredJobs); // Debugging log

//   // Get unique categories from filtered jobs
//   const categories = Array.from(new Set(filteredJobs.map(job => job.category)));
//   const referenceCounts: { [category: string]: number[] } = {};

//   // Initialize referenceCounts for each category
//   categories.forEach(category => {
//     referenceCounts[category] = [];
//   });

//   const startMoment = moment(this.startDate);
//   const endMoment = moment(this.endDate);
//   const weekLabels: string[] = [];

//   // Create week labels and initialize counts
//   for (let m = startMoment.clone(); m.isSameOrBefore(endMoment); m.add(1, 'days')) {
//     weekLabels.push(m.format('MMM D'));
//     categories.forEach(category => {
//       referenceCounts[category].push(0);
//     });
//   }

//   // Aggregate time spent per category
//   filteredJobs.forEach(widget => {
//     const widgetDate = moment(widget.createdOn).format('YYYY-MM-DD');

//     if (moment(widgetDate).isBetween(startMoment, endMoment, null, '[]')) {
//       const dayIndex = weekLabels.indexOf(moment(widgetDate).format('MMM D'));
//       const category = widget.category;
//       const timeSpent = Number(widget.timeSpend) || 0; 

//       if (dayIndex >= 0 && referenceCounts[category] !== undefined) {
//         referenceCounts[category][dayIndex] += timeSpent; 
//       }
//     }
//   });

//   console.log("Reference Counts:", referenceCounts); // Debugging log

//   // Update chart options to only include selected categories
//   this.chartOptions3 = {
//     series: categories.map(category => ({
//       name: category,
//       data: referenceCounts[category]
//     })),
//     chart: {
//       type: "area",
//       height: 350
//     },
//     dataLabels: {
//       enabled: false
//     },
//     stroke: {
//       curve: 'smooth',
//       width: 2
//     },
//     xaxis: {
//       categories: weekLabels,
//       title: {
//         text: 'Date'
//       }
//     },
//     yaxis: {
//       title: {
//         text: "Time Spent (hours)" 
//       }
//     },
//     tooltip: {
//       y: {
//         formatter: function(val) {
//           return val + " Mins";
//         }
//       }
//     },
//     fill: {
//       opacity: 0.6
//     }
//   };
// }

// applyFilters(): void {
//   this.updateChartData2();
// }
// }