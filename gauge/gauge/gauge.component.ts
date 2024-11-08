import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { GaugeService } from '../services/gauge.service';
import HC_more from 'highcharts/highcharts-more';


HC_more(Highcharts);

export interface Gauge {
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
  actualTime: string;
  assignedIssueData: any[];
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
  gauge: Gauge[];
}

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss']
})
export class GaugeComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  gauge: Gauge[] = [];
  chartOptions1!: Highcharts.Options;
  chartOptions2!: Highcharts.Options;
  chartOptions3!: Highcharts.Options;
  chartOptions4!: Highcharts.Options;
  jobworkHolderName: string = ''; 
  uniqueJobworkHolders: string[] = [];

  constructor(private _gservice: GaugeService) {}

  ngOnInit(): void {
    this._gservice.getGaugeData().subscribe(
      (response: GaugeResponse) => {
        console.log('API Response:', response);

        if (response && Array.isArray(response)) {
          this.gauge = response; 
          this.UniqueJobworkHolders(); 
          this.setJobworkHolder('Gunavathi');
        } else {
          console.error('Response is missing or gauge is not an array.');
        }
      },
      (error) => {
        console.error('API call failed:', error);
      }
    );
  }

  UniqueJobworkHolders(): void {
    const holders = this.gauge.map(job => job.jobworkHolder);
    this.uniqueJobworkHolders = Array.from(new Set(holders));
  }

  setJobworkHolder(name: string): void {
    this.jobworkHolderName = name;
    this.updateChart(); 
    this.updateChart1(); 
    this.updateChart2();
    this.updateChart3();
  }
  
  updateChart(): void {
    const filteredGauge = this.gauge.filter(job => job.jobworkHolder === this.jobworkHolderName);
    const totalCount = filteredGauge.length;
    const completedCount = filteredGauge.filter(job => job.jobworkStatus === 'Completed').length;

    const minValue = 0;
    const maxValue = totalCount || 1;

    this.chartOptions1 = {
      chart: {
        type: 'gauge',
      },
      title: {
        text: 'Total Jobwork vs Actual Completion',
       
      },
      pane: {
        startAngle: -150,
        endAngle: 150,
        background: [{
          backgroundColor: 'transparent',
          borderWidth: 0,
        }],
      },
      exporting: {
        enabled: false,
      },
 
      yAxis: {
        min: minValue,
        max: maxValue,
        minorTickInterval: 0,
        tickColor: '#ffffff',
        tickLength: 40,
        tickWidth: 2,
        lineWidth: 0,
     
        labels: {
          distance: 15,
          style: {
            color: 'black',
          },
        },
        plotBands: [{
          from: 0,
          to: Math.round(maxValue * 0.5),
          color: 'red',
          innerRadius: '50%',
        }, {
          from: Math.round(maxValue * 0.5),
          to: Math.round(maxValue * 0.8),
          color: ' rgb(177, 49, 49)',
          innerRadius: '50%',
          zIndex: 1,
        }, {
          from: Math.round(maxValue * 0.8),
          to: maxValue,
          color: 'pink',
          innerRadius: '50%',
        }],
      },
      series: [{
        type: 'gauge',  // Ensure this is set correctly
        name: 'Completed Jobs',
        data: [completedCount] as number[], // Ensure data is an array of numbers
        dataLabels: {
          borderWidth: 0,
          style: {
            fontSize: '2em',
          },
        },
        tooltip: {
          valueSuffix: ' jobs',
        },
      }]
    };
}


updateChart1(): void {
  const filteredGauge = this.gauge.filter(job => job.jobworkHolder === this.jobworkHolderName);
  const totalCount = filteredGauge.length;
  const completedOnTimeCount = filteredGauge.filter(job => 
      job.jobworkStatus === 'Completed' && job.takenTime <= job.timeline
  ).length;

  const minValue = 0;
  const maxValue = totalCount || 1;

  this.chartOptions2 = {
      chart: {
          type: 'gauge',
      },
   
      pane: {
          startAngle: -150,
          endAngle: 150,
          background: [{
              backgroundColor: 'transparent',
              borderWidth: 0,
          }],
      },
      exporting: {
          enabled: false,
      },
      title: {
        text: 'Jobs Completed On Time',
    },
      yAxis: {
          min: minValue,
          max: maxValue,
          minorTickInterval: 0,
          tickColor: '#ffffff',
          tickLength: 40,
          tickWidth: 2,
          lineWidth: 0,
      
          labels: {
              distance: 15,
              style: {
                  color: 'black',
              },
          },
          plotBands: [{
              from: 0,
              to: Math.round(maxValue * 0.5),
              color: '#DF5353', // red for low completion
              innerRadius: '82%',
          }, {
              from: Math.round(maxValue * 0.5),
              to: Math.round(maxValue * 0.8),
              color: '#DDDF0D', // yellow for moderate completion
              innerRadius: '82%',
              zIndex: 1,
          }, {
              from: Math.round(maxValue * 0.8),
              to: maxValue,
              color: '#55BF3B', // green for high completion
              innerRadius: '82%',
          }],
      },
      series: [{
          type: 'gauge',
          name: 'Completed On Time',
          data: [completedOnTimeCount] as number[],
          dataLabels: {
              borderWidth: 0,
              style: {
                  fontSize: '2em',
              },
          },
          
      }]
  };
}

  updateChart2(): void {
    const filteredGauge = this.gauge.filter(job => job.jobworkHolder === this.jobworkHolderName);

    const completedOnTimeCount = filteredGauge.filter(job => 
        job.jobworkStatus === 'Completed' &&job.takenTime  >job.timeline
    ).length;

    const totalCount = filteredGauge.length;

    const completedOnTimePercentage = totalCount > 0 ? (completedOnTimeCount / totalCount) * 100 : 0;

    const minValue = 0;
    const maxValue = 100; 
    this.chartOptions3 = {
        chart: {
            type: 'gauge',
        },
        title: {
            text: 'Jobwork beyond planned (%)',
          
        },
        pane: {
            center: ["50%", "85%"],
            size: "140%",
            startAngle: -90,
            endAngle: 90
        },
        exporting: {
            enabled: false
        },
    
        yAxis: {
            min: minValue,
            max: maxValue,
            tickInterval: 10, 
            lineWidth: 0,
            tickWidth: 0,
           
            labels: {
                enabled: true,
                style: {
                    color: 'black' 
                },
                formatter: function() {
                    return this.value + '%'; 
                }
            },
            plotBands: [{
                from: 0,
                to: 50,
                color: '#DF5353',
                innerRadius: '60%',
            }, {
                from: 50,
                to: 80,
                color: '#DDDF0D',
                innerRadius: '60%',
                zIndex: 1
            }, {
                from: 80,
                to: maxValue,
                color: '#55BF3B',
                innerRadius: '60%',
            }]
        },
        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true,
                }
            }
        },
        series: [{
            type: 'gauge',
            data: [completedOnTimePercentage] 
        }]
    };
}
updateChart3(): void {
  const filteredGauge = this.gauge.filter(job => job.jobworkHolder === this.jobworkHolderName);

  const completedOnTimeCount = filteredGauge.filter(job => 
      job.jobworkStatus === 'Completed' &&job.timeline  > job.takenTime
  ).length;

  const totalCount = filteredGauge.length;

  const completedOnTimePercentage = totalCount > 0 ? (completedOnTimeCount / totalCount) * 100 : 0;

  const minValue = 0;
  const maxValue = 100; 
  this.chartOptions4 = {
      chart: {
          type: 'gauge',
      },
      title: {
          text: 'Jobwork done before planned (%)',
          
      },
      pane: {
          center: ["50%", "85%"],
          size: "140%",
          startAngle: -90,
          endAngle: 90
      },
      exporting: {
          enabled: false
      },
      tooltip: {
          enabled: false
      },
      yAxis: {
          min: minValue,
          max: maxValue,
          tickInterval: 10, 
          lineWidth: 0,
          tickWidth: 0,
          minorTickInterval: null,
          labels: {
              enabled: true,
              style: {
                  color: 'black' 
              },
              formatter: function() {
                  return this.value + '%'; 
              }
          },
          plotBands: [{
              from: 0,
              to: 50,
              color: '#DF5353',
              innerRadius: '82%',
          }, {
              from: 50,
              to: 80,
              color: '#DDDF0D',
              innerRadius: '82%',
              zIndex: 1
          }, {
              from: 80,
              to: maxValue,
              color: '#55BF3B',
              innerRadius: '82%',
          }]
      },
      plotOptions: {
          solidgauge: {
              dataLabels: {
                  y: 5,
                  borderWidth: 0,
                  useHTML: true,
              }
          }
      },
      series: [{
          type: 'gauge',
          data: [completedOnTimePercentage] 
      }]
  };
}

}