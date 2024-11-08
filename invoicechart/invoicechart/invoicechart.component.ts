import { Component, OnInit } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  
  ApexDataLabels,
  ApexPlotOptions,
  ApexLegend,
  ApexFill,
  ApexStroke,
  ApexTitleSubtitle,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip
} from "ng-apexcharts";

import { InvoicechartService } from '../services/invoicechart.service';
import moment from 'moment';

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
  title: ApexTitleSubtitle;
  colors: string[];
};

export interface Invoice {
  docType: string;
  docId: string;
  invoiceNo: string;
  invoiceDate: string;
  name: string;
  address: string;
  state: string;
  district: string;
  city: string;
  postalCode: string;
  contactPerson: string;
  email: string;
  phone: number;
  customerGstNumber: string;
  dueDate: string;
  totalAmount: string;
  totalQuantity: number;
  subTotal: number;
  totalDiscount: number;
  shipping: number;
  totalGst: number;
  igst: number;
  cgst: number;
  sgst: number;
  adjustment: number;
  createdBy: string;
  createdOn: string;
  modifiedBy: string;
  modifiedOn: string;
  reference: string;
  source: string;
  userId: string;
  cid: string;
  status: string;
  paid: boolean;
}

export interface InvoiceResponse {
  invoicechart: Invoice[];
}

@Component({
  selector: 'app-invoicechart',
  templateUrl: './invoicechart.component.html',
  styleUrls: ['./invoicechart.component.scss']
})
export class InvoicechartComponent implements OnInit {
  chartOptions!: Partial<ChartOptions>;
   chartOptions1!: Partial<ChartOptions>;
  chartOptions2!: Partial<ChartOptions>;
  chartOptions3!: Partial<ChartOptions>;
  chartOptions4!: Partial<ChartOptions>;
  chartOptions5!: Partial<ChartOptions>;
  invoicechart: any[] = [];

  constructor(private _IcService: InvoicechartService) {}

  ngOnInit(): void {
    this._IcService.getwidgets().subscribe(
      (response: InvoiceResponse) => { 
        console.log('API Response:', response);

        if (response && Array.isArray(response)) {
          this.invoicechart = response; 
          this.updateChart(this.invoicechart,'week'); 
          this.updateChart1(this.invoicechart,'yearly');
          this.updateChart2(this.invoicechart,'weekly');
          this.updateChart3(this.invoicechart,'weekly');
          this.updateChart4(this.invoicechart,'weekly');
          this.updateChart5(this.invoicechart,'weekly');
        } else {
          console.error('Response is missing invoicechart or invoicechart is not an array.');
        }
      },
      error => {
        console.error('API call failed:', error);
      }
    );
  }

 filterData(filterType: string): Invoice[] {
    const today = moment();
    let filteredInvoices: Invoice[] = [];

    switch (filterType) {
      case 'today':
        filteredInvoices = this.invoicechart.filter(invoice => 
          moment(invoice.createdOn).isSame(today, 'day')
        );
        break;
      case 'yesterday':
        filteredInvoices = this.invoicechart.filter(invoice => 
          moment(invoice.createdOn).isSame(today.clone().subtract(1, 'day'), 'day')
        );
        break;
      case 'week':
        filteredInvoices = this.invoicechart.filter(invoice => 
          moment(invoice.createdOn).isSame(today, 'week')
        );
        break;
      case 'monthly':
        filteredInvoices = this.invoicechart.filter(invoice => 
          moment(invoice.createdOn).isSame(today, 'month')
        );
        break;
      case 'yearly':
        filteredInvoices = this.invoicechart.filter(invoice => 
          moment(invoice.createdOn).isSame(today, 'year')
        );
        break;
      default:
        filteredInvoices = this.invoicechart;     }

    console.log(`Filtered Invoices for ${filterType}:`, filteredInvoices);
    this.updateChart(filteredInvoices,filterType)
    return filteredInvoices;
  }

  updateChart(invoicechart: Invoice[],filterType:string): void {
   
    if (filterType === 'week') {
      
      const referenceCounts: { [reference: string]: number[] } = {
        gstInvoice: Array(7).fill(0),
        linkedInvoice: Array(7).fill(0),
        proformaInvoice: Array(7).fill(0),
        pharmaInvoice: Array(7).fill(0),
      };
    
   
      const weekLabels = Array.from({ length: 7 }, (_, i) => {
        const date = moment().subtract(6 - i, 'days').format('YYYY-MM-DD');
        return moment(date).format('MMM D'); 
      });
    
    
      invoicechart.forEach(Invoice => {
        const widgetDate = moment(Invoice.createdOn).format('YYYY-MM-DD');
        const dayIndex = weekLabels.indexOf(moment(widgetDate).format('MMM D'));
    
        if (dayIndex >= 0) {
         
          if (referenceCounts[Invoice.reference] !== undefined) {
            referenceCounts[Invoice.reference][dayIndex]++;
          }
        }
      });
    
      
      this.chartOptions = {
        series: [
          { name: "GST Invoice", data: referenceCounts.gstInvoice },
          { name: "Linked Invoice", data: referenceCounts.linkedInvoice },
          { name: "Proforma Invoice", data: referenceCounts.proformaInvoice },
          { name: "Pharma Invoice", data: referenceCounts.pharmaInvoice }
        ],
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
            text: "Count"
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return val + " invoices";
            }
          }
        }
      };
    }
    else if (filterType === 'monthly') {

      const daysInMonth = moment().daysInMonth();
      const referenceCounts: { [reference: string]: number[] } = {
        gstInvoice: Array(Math.ceil(daysInMonth / 2)).fill(0),
        linkedInvoice: Array(Math.ceil(daysInMonth / 2)).fill(0),
        proformaInvoice: Array(Math.ceil(daysInMonth / 2)).fill(0),
        pharmaInvoice: Array(Math.ceil(daysInMonth / 2)).fill(0),
      };
    
      const monthLabels = Array.from({ length: Math.ceil(daysInMonth / 2) }, (_, i) => {
        return moment().date(i * 2 + 1).format('D'); 

      });
    
      invoicechart.forEach(Invoice => {
        const widgetDate = moment(Invoice.createdOn);
        const dayIndex = widgetDate.date();
    
      
        if (dayIndex % 2 === 1) {
          const index = Math.floor(dayIndex / 2); 
          if (referenceCounts[Invoice.reference] !== undefined) {
            referenceCounts[Invoice.reference][index]++;
          }
        }
      });
    
      this.chartOptions = {
        series: [
          { name: "GST Invoice", data: referenceCounts.gstInvoice },
          { name: "Linked Invoice", data: referenceCounts.linkedInvoice },
          { name: "Proforma Invoice", data: referenceCounts.proformaInvoice },
          { name: "Pharma Invoice", data: referenceCounts.pharmaInvoice }
        ],
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
          categories: monthLabels
        },
        yaxis: {
          title: {
            text: "Count"
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return val + " invoices";
            }
          }
        }
      };
    }
    
    
else if (filterType === 'today') {
  type InvoiceReference = 'gstInvoice' | 'linkedInvoice' | 'proformaInvoice' | 'pharmaInvoice';

   
    const referenceCounts: Record<InvoiceReference, number[]> = {
        gstInvoice: Array(24).fill(0),
        linkedInvoice: Array(24).fill(0),
        proformaInvoice: Array(24).fill(0),
        pharmaInvoice: Array(24).fill(0),
    };

   
    const today = moment().startOf('day');

    
    invoicechart.forEach(Invoice => {
        const widgetDate = moment(Invoice.createdOn);
        
        if (widgetDate.isSame(today, 'day')) {
            const hour = widgetDate.hour(); 
            const reference: InvoiceReference = Invoice.reference as InvoiceReference; 
            
            
            if (referenceCounts[reference] !== undefined) {
                referenceCounts[reference][hour]++;
            }
        }
    });

    
    this.chartOptions = {
        series: [
            { name: "GST Invoice", data: referenceCounts.gstInvoice },
            { name: "Linked Invoice", data: referenceCounts.linkedInvoice },
            { name: "Proforma Invoice", data: referenceCounts.proformaInvoice },
            { name: "Pharma Invoice", data: referenceCounts.pharmaInvoice }
        ],
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
            categories: Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`), // 00:00 to 23:00
        },
        yaxis: {
            title: {
                text: "Count"
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function(val) {
                    return val + " invoices";
                }
            }
        }
    };
}
else if (filterType === 'yesterday') {
  type InvoiceReference = 'gstInvoice' | 'linkedInvoice' | 'proformaInvoice' | 'pharmaInvoice'
 
  const referenceCounts: Record<InvoiceReference, number[]> = {
      gstInvoice: Array(24).fill(0),
      linkedInvoice: Array(24).fill(0),
      proformaInvoice: Array(24).fill(0),
      pharmaInvoice: Array(24).fill(0),
  };

  
  const yesterday = moment().subtract(1, 'days').startOf('day');

  
  invoicechart.forEach(Invoice => {
      const widgetDate = moment(Invoice.createdOn);
      
      if (widgetDate.isSame(yesterday, 'day')) {
          const hour = widgetDate.hour(); 
          const reference: InvoiceReference = Invoice.reference as InvoiceReference;
          
       
          if (referenceCounts[reference] !== undefined) {
              referenceCounts[reference][hour]++;
          }
      }
  });

  
  this.chartOptions = {
      series: [
          { name: "GST Invoice", data: referenceCounts.gstInvoice },
          { name: "Linked Invoice", data: referenceCounts.linkedInvoice },
          { name: "Proforma Invoice", data: referenceCounts.proformaInvoice },
          { name: "Pharma Invoice", data: referenceCounts.pharmaInvoice }
      ],
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
          categories: Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`), // 00:00 to 23:00
      },
      yaxis: {
          title: {
              text: "Count"
          }
      },
      fill: {
          opacity: 1
      },
      tooltip: {
          y: {
              formatter: function(val) {
                  return val + " invoices";
              }
          }
      }
  };
}
else if (filterType === 'yearly') {
  
      const referenceCounts: { [reference: string]: number[] } = {
        gstInvoice: Array(12).fill(0),
        linkedInvoice: Array(12).fill(0),
        proformaInvoice: Array(12).fill(0),
        pharmaInvoice: Array(12).fill(0),
      };
    
      const yearLabels = moment.months().map(month => month.slice(0, 3)); 
    
      invoicechart.forEach(Invoice => {
        const widgetDate = moment(Invoice.createdOn);
        const monthIndex = widgetDate.month(); 
    
        if (monthIndex >= 0 && monthIndex < yearLabels.length) {
          if (referenceCounts[Invoice.reference] !== undefined) {
            referenceCounts[Invoice.reference][monthIndex]++;
          }
        }
      });
    
      this.chartOptions = {
        series: [
          { name: "GST Invoice", data: referenceCounts.gstInvoice },
          { name: "Linked Invoice", data: referenceCounts.linkedInvoice },
          { name: "Proforma Invoice", data: referenceCounts.proformaInvoice },
          { name: "Pharma Invoice", data: referenceCounts.pharmaInvoice }
        ],
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
          categories: yearLabels 
        },
        yaxis: {
          title: {
            text: "Count"
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return val + " invoices";
            }
          }
        }
      };
    }
    
  }
  filterData1(filterType: string): Invoice[] {
    const today = moment();
    let filteredInvoices: Invoice[] = [];

    switch (filterType) {
      case 'today':
        filteredInvoices = this.invoicechart.filter(invoice => 
          moment(invoice.createdOn).isSame(today, 'day')
        );
        break;
      case 'yesterday':
        filteredInvoices = this.invoicechart.filter(invoice => 
          moment(invoice.createdOn).isSame(today.clone().subtract(1, 'day'), 'day')
        );
        break;
      case 'week':
        filteredInvoices = this.invoicechart.filter(invoice => 
          moment(invoice.createdOn).isSame(today, 'week')
        );
        break;
      case 'monthly':
        filteredInvoices = this.invoicechart.filter(invoice => 
          moment(invoice.createdOn).isSame(today, 'month')
        );
        break;
      case 'yearly':
        filteredInvoices = this.invoicechart.filter(invoice => 
          moment(invoice.createdOn).isSame(today, 'year')
        );
        break;
      default:
        filteredInvoices = this.invoicechart; 
    }

    console.log(`Filtered Invoices for ${filterType}:`, filteredInvoices);
    this.updateChart1(filteredInvoices,filterType)
    return filteredInvoices;
  }
  updateChart1(invoicechart: Invoice[], filterType: string): void {
    if (filterType === 'week') {
        const referenceCounts: { [reference: string]: number[] } = {};
        
        const weekLabels = Array.from({ length: 7 }, (_, i) => {
          const date = moment().subtract(6 - i, 'days').format('YYYY-MM-DD');
          return moment(date).format('MMM D');
        });
      
        // Initialize referenceCounts for unique references
        invoicechart.forEach(invoice => {
          if (!referenceCounts[invoice.reference]) {
            referenceCounts[invoice.reference] = Array(7).fill(0);
          }
        });
      
        // Populate referenceCounts
        invoicechart.forEach(invoice => {
          const widgetDate = moment(invoice.createdOn).format('YYYY-MM-DD');
          const dayIndex = weekLabels.indexOf(moment(widgetDate).format('MMM D'));
      
          if (dayIndex >= 0) {
            referenceCounts[invoice.reference][dayIndex]++;
          }
        });
      
        // Prepare series data dynamically
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
            text: "Invoice Sales Overview"
          },
          xaxis: {
            categories: weekLabels,
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
      
   
      else if (filterType === 'monthly') {
        const daysInMonth = moment().daysInMonth();
        const referenceCounts: { [reference: string]: number[] } = {
          gstInvoice: Array(Math.ceil(daysInMonth / 2)).fill(0),
          linkedInvoice: Array(Math.ceil(daysInMonth / 2)).fill(0),
          proformaInvoice: Array(Math.ceil(daysInMonth / 2)).fill(0),
          pharmaInvoice: Array(Math.ceil(daysInMonth / 2)).fill(0),
        };
    
        const monthLabels = Array.from({ length: Math.ceil(daysInMonth / 2) }, (_, i) => {
          return moment().date(i * 2 + 1).format('D'); 
        });
    
        invoicechart.forEach(invoice => {
          const widgetDate = moment(invoice.createdOn);
          const dayIndex = widgetDate.date();
    
          if (dayIndex % 2 === 1) {
            const index = Math.floor(dayIndex / 2); 
            if (referenceCounts[invoice.reference] !== undefined) {
              referenceCounts[invoice.reference][index]++;
            }
          }
        });
    
        this.chartOptions1 = {
          series: [
            { name: "GST Invoice", data: referenceCounts.gstInvoice },
            { name: "Linked Invoice", data: referenceCounts.linkedInvoice },
            { name: "Proforma Invoice", data: referenceCounts.proformaInvoice },
            { name: "Pharma Invoice", data: referenceCounts.pharmaInvoice }
          ],
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
            text: "Fiction Books Sales"
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
            position: "bottom", // Position legend at the bottom
            horizontalAlign: "center", // Center align the legend
            floating: false, // Ensure it's not floating
            itemMargin: {
              horizontal: 10, // Adjust horizontal spacing between legend items
            }
          }
        };
      }
      else 
      if (filterType === 'yearly') {
        const referenceCounts: { [reference: string]: number[] } = {
          gstInvoice: Array(12).fill(0),
          linkedInvoice: Array(12).fill(0),
          proformaInvoice: Array(12).fill(0),
          pharmaInvoice: Array(12).fill(0),
        };
      
       
        const monthLabels = moment.months().map(month => month.slice(0, 3)); 
      
        invoicechart.forEach(invoice => {
          const widgetDate = moment(invoice.createdOn);
          const monthIndex = widgetDate.month(); 
      
          if (monthIndex >= 0) {
            if (referenceCounts[invoice.reference] !== undefined) {
              referenceCounts[invoice.reference][monthIndex]++;
            }
          }
        });
      
        this.chartOptions1 = {
          series: [
            { name: "GST Invoice", data: referenceCounts.gstInvoice },
            { name: "Linked Invoice", data: referenceCounts.linkedInvoice },
            { name: "Proforma Invoice", data: referenceCounts.proformaInvoice },
            { name: "Pharma Invoice", data: referenceCounts.pharmaInvoice },
          ],
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
            text: "Invoice Counts by Month"
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
              formatter: (val: number): string => `${val}`
            }
          },
          fill: {
            opacity: 1
          },
          legend: {
            position: "bottom", // Position legend at the bottom
            horizontalAlign: "center", // Center align the legend
            floating: false, // Ensure it's not floating
            itemMargin: {
              horizontal: 10, // Adjust horizontal spacing between legend items
            }
          }
        };
      }
      
     if (filterType === 'today') {
       const referenceCounts: { [reference: string]: number[] } = {
          gstInvoice: Array(12).fill(0), 
          linkedInvoice: Array(12).fill(0),
          proformaInvoice: Array(12).fill(0),
          pharmaInvoice: Array(12).fill(0),
        };
      
     
        const hourLabels = Array.from({ length: 12 }, (_, i) => 
          moment.utc().subtract(1, 'days').startOf('day').add(i * 2, 'hours').format('HH')
      );    
        invoicechart.forEach(invoice => {
          const widgetDate = moment.utc(invoice.createdOn); 
          const hourIndex = widgetDate.hour(); 
      
        
          if (widgetDate.isSame(moment.utc(), 'day')) {
            if (referenceCounts[invoice.reference] !== undefined) {
              referenceCounts[invoice.reference][hourIndex]++;
            }
          }
        });
      
        this.chartOptions1 = {
          series: [
            { name: "GST Invoice", data: referenceCounts.gstInvoice },
            { name: "Linked Invoice", data: referenceCounts.linkedInvoice },
            { name: "Proforma Invoice", data: referenceCounts.proformaInvoice },
            { name: "Pharma Invoice", data: referenceCounts.pharmaInvoice },
          ],
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
            text: "Invoice Counts for Today (UTC Time)"
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
            position: "bottom", // Position legend at the bottom
            horizontalAlign: "center", // Center align the legend
            floating: false, // Ensure it's not floating
            itemMargin: {
              horizontal: 10, // Adjust horizontal spacing between legend items
            }
          }
        };
      }
      else if (filterType === 'yesterday') {
        const referenceCounts: { [reference: string]: number[] } = {
          gstInvoice: Array(12).fill(0), 
          linkedInvoice: Array(12).fill(0),
          proformaInvoice: Array(12).fill(0),
          pharmaInvoice: Array(12).fill(0),
        };
      
       
        const hourLabels = Array.from({ length: 12 }, (_, i) => 
          moment.utc().subtract(1, 'days').startOf('day').add(i * 2, 'hours').format('HH')
        );
      
        invoicechart.forEach(invoice => {
          const widgetDate = moment.utc(invoice.createdOn); 
          const hourIndex = Math.floor(widgetDate.hour() / 2); 
      
        
          if (widgetDate.isSame(moment.utc().subtract(1, 'days'), 'day')) {
            if (referenceCounts[invoice.reference] !== undefined) {
              referenceCounts[invoice.reference][hourIndex]++;
            }
          }
        });
      
        this.chartOptions1 = {
          series: [
            { name: "GST Invoice", data: referenceCounts.gstInvoice },
            { name: "Linked Invoice", data: referenceCounts.linkedInvoice },
            { name: "Proforma Invoice", data: referenceCounts.proformaInvoice },
            { name: "Pharma Invoice", data: referenceCounts.pharmaInvoice },
          ],
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
            text: "Invoice Counts for Yesterday (2-Hour Intervals, UTC Time)"
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
            position: "bottom", // Position legend at the bottom
            horizontalAlign: "center", // Center align the legend
            floating: false, // Ensure it's not floating
            itemMargin: {
              horizontal: 10, // Adjust horizontal spacing between legend items
            }
          }
        };
      }
      
    }  
    filterData2(filterType: string): Invoice[] {
      const today = moment();
      let filteredInvoices: Invoice[] = [];
  
      switch (filterType) {
          case 'today':
              filteredInvoices = this.invoicechart.filter(invoice =>
                  moment(invoice.createdOn).isSame(today, 'day')
              );
              break;
          case 'yesterday':
              filteredInvoices = this.invoicechart.filter(invoice =>
                  moment(invoice.createdOn).isSame(today.clone().subtract(1, 'day'), 'day')
              );
              break;
          case 'week':
              filteredInvoices = this.invoicechart.filter(invoice =>
                  moment(invoice.createdOn).isBetween(today.clone().subtract(7, 'days'), today, null, '[]')
              );
              break;
              case 'weekly':
              filteredInvoices = this.invoicechart.filter(invoice =>
                  moment(invoice.createdOn).isBetween(today.clone().subtract(30, 'days'), today, null, '[]')
              );
              break;
              case 'monthly':
                filteredInvoices = this.invoicechart.filter(invoice =>
                    moment(invoice.createdOn).isBetween(today.clone().subtract(30, 'days'), today, null, '[]')
                );
                break;
          case 'yearly':
              filteredInvoices = this.invoicechart.filter(invoice =>
                  moment(invoice.createdOn).isBetween
              );
              break;
          default:
              filteredInvoices = this.invoicechart; 
      }
  
      console.log(`Filtered Invoices for ${filterType}:`, filteredInvoices);
      this.updateChart2(filteredInvoices,filterType);
      return filteredInvoices;
  }
  
  updateChart2(filteredInvoices: Invoice[],filterType:string): void {
     if (filterType === 'monthly') {
      const monthNames = moment.months().map(month => month.slice(0, 3)); 
      const totalCounts = Array(12).fill(0);
      const approvedCounts = Array(12).fill(0);
  
      filteredInvoices.forEach(invoice => {
          const invoiceDate = moment(invoice.createdOn);
          if (invoiceDate.isSame(moment(), 'year') && invoice.reference === "proformaInvoice") {
              const month = invoiceDate.month();
              totalCounts[month] += 1; 
  
              if (invoice.status === "Approved") {
                  approvedCounts[month] += 1;
              }
          }
      });
  
      this.chartOptions2 = {
          series: [
              {
                  name: "Total Proforma Invoices",
                  data: totalCounts.map((count, index) => ({
                      x: monthNames[index],
                      y: count
                  }))
              },
              {
                  name: "Approved Proforma Invoices",
                  data: approvedCounts.map((count, index) => ({
                      x: monthNames[index],
                      y: count
                  }))
              }
          ],
          chart: {
              height: 350,
              type: "bar"
          },
          plotOptions: {
              bar: {
                  columnWidth: "60%"
              }
          },
          colors: ["#00E396", "#775DD0"],
          dataLabels: {
              enabled: true
          },
          xaxis: {
              categories: monthNames,
              title: {
                  text: "Months"
              }
          },
          title: {
              text: "Proforma Invoices by Month"
          },
          
      };
  }else if (filterType === 'week') {
    const dayNames = moment.weekdays().map(weekday => weekday.slice(0, 3)); 
    const totalCounts = Array(7).fill(0); 
    const approvedCounts = Array(7).fill(0); 

    const today = moment();
    
    
    for (let i = 0; i < 7; i++) {
        const day = today.clone().subtract(i, 'days').startOf('day');
        
        filteredInvoices.forEach(invoice => {
            const invoiceDate = moment(invoice.createdOn).startOf('day');
            
            if (invoiceDate.isSame(day, 'day') && invoice.reference === "proformaInvoice") {
                totalCounts[i] += 1;
                
                if (invoice.status === "Approved") {
                    approvedCounts[i] += 1; 
                }
            }
        });
    }

    this.chartOptions2 = {
        series: [
            {
                name: "Total Proforma Invoices",
                data: totalCounts.map((count, index) => ({
                    x: dayNames[6 - index], 
                    y: count
                }))
            },
            {
                name: "Approved Proforma Invoices",
                data: approvedCounts.map((count, index) => ({
                    x: dayNames[6 - index], 
                    y: count
                }))
            }
        ],
        chart: {
            height: 350,
            type: "bar"
        },
        plotOptions: {
            bar: {
                columnWidth: "60%"
            }
        },
        colors: ["#00E396", "#775DD0"],
        dataLabels: {
            enabled: true
        },
        xaxis: {
            categories: dayNames.reverse(), 
            title: {
                text: "Days of the Week"
            }
        },
        title: {
            text: "Proforma Invoices by Day"
        },
        legend: {
            show: true
        }
    };
}
else if (filterType === 'weekly') {
  const totalCounts = Array(4).fill(0); 
  const approvedCounts = Array(4).fill(0);

  const today = moment();
  const startOfMonth = today.clone().startOf('month');
  const endOfMonth = today.clone().endOf('month');

 
  filteredInvoices.forEach(invoice => {
      const invoiceDate = moment(invoice.createdOn);

      
      if (invoiceDate.isBetween(startOfMonth, endOfMonth, null, '[]') && invoice.reference === "proformaInvoice") {
          const weekIndex = Math.floor(invoiceDate.date() / 7); 

          totalCounts[weekIndex] += 1; 
          if (invoice.status === "Approved") {
              approvedCounts[weekIndex] += 1; 
          }
      }
  });

  this.chartOptions2 = {
      series: [
          {
              name: "Total Proforma Invoices",
              data: totalCounts.map((count, index) => ({
                  x: `Week ${index + 1}`, 
                  y: count
              }))
          },
          {
              name: "Approved Proforma Invoices",
              data: approvedCounts.map((count, index) => ({
                  x: `Week ${index + 1}`, 
                  y: count
              }))
          }
      ],
      chart: {
          height: 350,
          type: "bar"
      },
      plotOptions: {
          bar: {
              columnWidth: "60%"
          }
      },
      colors: ["#00E396", "#775DD0"],
      dataLabels: {
          enabled: true
      },
      xaxis: {
          categories: [`Week 1`, `Week 2`, `Week 3`, `Week 4`], // Week labels
          title: {
              text: "Weeks of the Month"
          }
      },
      title: {
          text: "Proforma Invoices by Week"
      },
      legend: {
          show: true
      }
  };
}

else if (filterType === 'today') {
  const totalCounts = Array(12).fill(0); // For total invoices in 12 two-hour segments
  const approvedCounts = Array(12).fill(0); // For approved invoices in 12 two-hour segments

  const today = moment().startOf('day'); // Start of today
  const endOfToday = moment().endOf('day'); // End of today

  // Loop through each invoice and categorize by 2-hour segment
  filteredInvoices.forEach(invoice => {
      const invoiceDate = moment(invoice.createdOn);

      // Check if invoice is created today
      if (invoiceDate.isBetween(today, endOfToday, null, '[]') && invoice.reference === "proformaInvoice") {
          const hourIndex = Math.floor(invoiceDate.hour() / 2); // Determine the 2-hour segment index (0-11)

          totalCounts[hourIndex] += 1; // Count total proforma invoices for that segment

          if (invoice.status === "Approved") {
              approvedCounts[hourIndex] += 1; // Count approved proforma invoices for that segment
          }
      }
  });

  this.chartOptions2 = {
      series: [
          {
              name: "Total Proforma Invoices",
              data: totalCounts.map((count, index) => ({
                  x: `${(index + 1) * 2}`, // 2-hour segment labels (2, 4, 6, ..., 24)
                  y: count
              }))
          },
          {
              name: "Approved Proforma Invoices",
              data: approvedCounts.map((count, index) => ({
                  x: `${(index + 1) * 2}`, // 2-hour segment labels (2, 4, 6, ..., 24)
                  y: count
              }))
          }
      ],
      chart: {
          height: 350,
          type: "bar"
      },
      plotOptions: {
          bar: {
              columnWidth: "60%"
          }
      },
      colors: ["#00E396", "#775DD0"],
      dataLabels: {
          enabled: true
      },
      xaxis: {
          categories: Array.from({ length: 12 }, (_, i) => `${(i + 1) * 2}`), // 2-hour segment labels (2, 4, 6, ..., 24)
          title: {
              text: "Time of Day (2-hour segments)"
          },
        
      },
      title: {
          text: "Proforma Invoices for Today by 2-Hour Segments"
      },
      legend: {
          show: true
      }
  };
}

else if (filterType === 'yesterday') {
  const totalCounts = Array(12).fill(0); // For total invoices in 12 two-hour segments
  const approvedCounts = Array(12).fill(0); // For approved invoices in 12 two-hour segments

  const yesterday = moment().subtract(1, 'days').startOf('day'); // Start of yesterday
  const endOfYesterday = moment().subtract(1, 'days').endOf('day'); // End of yesterday

  // Loop through each invoice and categorize by 2-hour segment
  filteredInvoices.forEach(invoice => {
      const invoiceDate = moment(invoice.createdOn);

      // Check if invoice is created yesterday
      if (invoiceDate.isBetween(yesterday, endOfYesterday, null, '[]') && invoice.reference === "proformaInvoice") {
          const hourIndex = Math.floor(invoiceDate.hour() / 2); // Determine the 2-hour segment index (0-11)

          totalCounts[hourIndex] += 1; // Count total proforma invoices for that segment

          if (invoice.status === "Approved") {
              approvedCounts[hourIndex] += 1; // Count approved proforma invoices for that segment
          }
      }
  });

  this.chartOptions2 = {
      series: [
          {
              name: "Total Proforma Invoices",
              data: totalCounts.map((count, index) => ({
                  x: `${(index + 1) * 2}`, // 2-hour segment labels (2, 4, 6, ..., 24)
                  y: count
              }))
          },
          {
              name: "Approved Proforma Invoices",
              data: approvedCounts.map((count, index) => ({
                  x: `${(index + 1) * 2}`, // 2-hour segment labels (2, 4, 6, ..., 24)
                  y: count
              }))
          }
      ],
      chart: {
          height: 350,
          type: "bar"
      },
      plotOptions: {
          bar: {
              columnWidth: "60%"
          }
      },
      colors: ["#00E396", "#775DD0"],
      dataLabels: {
          enabled: true
      },
      xaxis: {
          categories: Array.from({ length: 12 }, (_, i) => `${(i + 1) * 2}`), // 2-hour segment labels (2, 4, 6, ..., 24)
          title: {
              text: "Time of Day (2-hour segments)"
          },
        
      },
      title: {
          text: "Proforma Invoices for Yesterday by 2-Hour Segments"
      },
      legend: {
          show: true
      }
  };
}
else if (filterType === 'yearly') {
  const totalCounts = Array(5).fill(0);
  const approvedCounts = Array(5).fill(0);
  
  const currentYear = moment().year();
  
  filteredInvoices.forEach(invoice => {
      const invoiceDate = moment(invoice.createdOn);
      const yearDiff = currentYear - invoiceDate.year();
      
      if (yearDiff >= 0 && yearDiff < 5 && invoice.reference === "proformaInvoice") {
          totalCounts[yearDiff] += 1; 
          
          if (invoice.status === "Approved") {
              approvedCounts[yearDiff] += 1;
          }
      }
  });

  this.chartOptions2 = {
      series: [
          {
              name: "Total Proforma Invoices",
              data: totalCounts.map((count, index) => ({
                  x: currentYear - index,
                  y: count
              }))
          },
          {
              name: "Approved Proforma Invoices",
              data: approvedCounts.map((count, index) => ({
                  x: currentYear - index,
                  y: count
              }))
          }
      ],
      chart: {
          height: 350,
          type: "bar"
      },
      plotOptions: {
          bar: {
              columnWidth: "60%"
          }
      },
      colors: ["#00E396", "#775DD0"],
      dataLabels: {
          enabled: true
      },
      xaxis: {
          categories: Array.from({ length: 5 }, (_, i) => currentYear - i),
          title: {
              text: "Years"
          }
      },
      title: {
          text: "Proforma Invoices Over the Last 5 Years"
      },
      legend: {
          show: true
      }
  };
}


}
filterData3(filterType: string): Invoice[] {
  const today = moment();
  let filteredInvoices: Invoice[] = [];

  switch (filterType) {
      case 'today':
          filteredInvoices = this.invoicechart.filter(invoice =>
              moment(invoice.createdOn).isSame(today, 'day')
          );
          break;
      case 'yesterday':
          filteredInvoices = this.invoicechart.filter(invoice =>
              moment(invoice.createdOn).isSame(today.clone().subtract(1, 'day'), 'day')
          );
          break;
      case 'week':
          filteredInvoices = this.invoicechart.filter(invoice =>
              moment(invoice.createdOn).isBetween(today.clone().subtract(7, 'days'), today, null, '[]')
          );
          break;
      case 'month':
          filteredInvoices = this.invoicechart.filter(invoice =>
              moment(invoice.createdOn).isBetween(today.clone().subtract(30, 'days'), today, null, '[]')
          );
          break;
      case 'year':
          filteredInvoices = this.invoicechart.filter(invoice =>
              moment(invoice.createdOn).isBetween(today.clone().subtract(1, 'year'), today, null, '[]')
          );
          break;
      default:
          filteredInvoices = this.invoicechart; 
  }

  console.log(`Filtered Invoices for ${filterType}:`, filteredInvoices);
  this.updateChart3(filteredInvoices, filterType);
  return filteredInvoices;
}

updateChart3(filteredInvoices: Invoice[],filterType:string): void {
  if (filterType === 'monthly') {
    const monthNames = moment.months().map(month => month.slice(0, 3)); 
    const totalCounts = Array(12).fill(0);
    const TrueCounts = Array(12).fill(0);
 
    filteredInvoices.forEach(invoice => {
        const invoiceDate = moment(invoice.createdOn);
        if (invoiceDate.isSame(moment(), 'year') && invoice.reference === "linkedInvoice") {
            const month = invoiceDate.month();
            totalCounts[month] += 1; 
 
           
            if (invoice.paid === true) { 
                TrueCounts[month] += 1;
            }
        }
    });
 
    this.chartOptions3 = {
        series: [
            {
                name: "Total linked Invoices",
                data: totalCounts.map((count, index) => ({
                    x: monthNames[index],
                    y: count
                }))
            },
            {
                name: "Paid linked Invoices",
                data: TrueCounts.map((count, index) => ({
                    x: monthNames[index],
                    y: count
                }))
            }
        ],
        chart: {
            height: 350,
            type: "bar"
        },
        plotOptions: {
            bar: {
                columnWidth: "60%"
            }
        },
        colors: ["#00E396", "#775DD0"],
        dataLabels: {
            enabled: true
        },
        xaxis: {
            categories: monthNames,
            title: {
                text: "Months"
            }
        },
        title: {
            text: "Linked Invoices by Month"
        },
        legend: {
            show: true
        }
    };
 }
 else if (filterType === 'week') {
  const dayNames = moment.weekdays(); 
  const totalCounts = Array(7).fill(0); 
  const TrueCounts = Array(7).fill(0); 

  const today = moment();
  
  
  for (let i = 0; i < 7; i++) {
      const day = today.clone().subtract(i, 'days').startOf('day');
      
      filteredInvoices.forEach(invoice => {
          const invoiceDate = moment(invoice.createdOn).startOf('day');
          
          if (invoiceDate.isSame(day, 'day') && invoice.reference === "linkedInvoice") {
              totalCounts[i] += 1;
              
              if (invoice.paid === true) {
                  TrueCounts[i] += 1; 
              }
          }
      });
  }

  this.chartOptions3 = {
      series: [
          {
              name: "Total Proforma Invoices",
              data: totalCounts.map((count, index) => ({
                  x: dayNames[6 - index], 
                  y: count
              }))
          },
          {
              name: "Approved Proforma Invoices",
              data: TrueCounts.map((count, index) => ({
                  x: dayNames[6 - index], 
                  y: count
              }))
          }
      ],
      chart: {
          height: 350,
          type: "bar"
      },
      plotOptions: {
          bar: {
              columnWidth: "60%"
          }
      },
      colors: ["#00E396", "#775DD0"],
      dataLabels: {
          enabled: true
      },
      xaxis: {
          categories: dayNames.reverse(), 
          title: {
              text: "Days of the Week"
          }
      },
      title: {
          text: "Linked Invoices by Day"
      },
      legend: {
          show: true
      }
  };
}
else if (filterType === 'weekly') {
  const totalCounts = Array(4).fill(0); 
  const TrueCounts = Array(4).fill(0);

  const today = moment();
  const startOfMonth = today.clone().startOf('month');
  const endOfMonth = today.clone().endOf('month');

 
  filteredInvoices.forEach(invoice => {
      const invoiceDate = moment(invoice.createdOn);

      
      if (invoiceDate.isBetween(startOfMonth, endOfMonth, null, '[]') && invoice.reference === "linkedInvoice") {
          const weekIndex = Math.floor(invoiceDate.date() / 7); 

          totalCounts[weekIndex] += 1; 
          if (invoice.paid === true) {
            TrueCounts[weekIndex] += 1; 
          }
      }
  });

  this.chartOptions3 = {
      series: [
          {
              name: "Total Proforma Invoices",
              data: totalCounts.map((count, index) => ({
                  x: `Week ${index + 1}`, 
                  y: count
              }))
          },
          {
              name: "Approved Proforma Invoices",
              data: TrueCounts.map((count, index) => ({
                  x: `Week ${index + 1}`, 
                  y: count
              }))
          }
      ],
      chart: {
          height: 350,
          type: "bar"
      },
      plotOptions: {
          bar: {
              columnWidth: "60%"
          }
      },
      colors: ["#00E396", "#775DD0"],
      dataLabels: {
          enabled: true
      },
      xaxis: {
          categories: [`Week 1`, `Week 2`, `Week 3`, `Week 4`], 
          title: {
              text: "Weeks of the Month"
          }
      },
      title: {
          text: "Proforma Invoices by Week"
      },
      legend: {
          show: true
      }
  };
}

else if (filterType === 'today') {
  const totalCounts = Array(12).fill(0); 
  const TrueCounts = Array(12).fill(0); 
  const today = moment().startOf('day'); 
  const endOfToday = moment().endOf('day'); 

  
  filteredInvoices.forEach(invoice => {
      const invoiceDate = moment(invoice.createdOn);

      // Check if invoice is created today
      if (invoiceDate.isBetween(today, endOfToday, null, '[]') && invoice.reference === "linkedInvoice") {
          const hourIndex = Math.floor(invoiceDate.hour() / 2); // Determine the 2-hour segment index (0-11)

          totalCounts[hourIndex] += 1; // Count total proforma invoices for that segment

          if (invoice.paid === true) {
            TrueCounts[hourIndex] += 1; // Count approved proforma invoices for that segment
          }
      }
  });

  this.chartOptions3 = {
      series: [
          {
              name: "Total Proforma Invoices",
              data: totalCounts.map((count, index) => ({
                  x: `${(index + 1) * 2}`, // 2-hour segment labels (2, 4, 6, ..., 24)
                  y: count
              }))
          },
          {
              name: "Approved Proforma Invoices",
              data: TrueCounts.map((count, index) => ({
                  x: `${(index + 1) * 2}`, // 2-hour segment labels (2, 4, 6, ..., 24)
                  y: count
              }))
          }
      ],
      chart: {
          height: 350,
          type: "bar"
      },
      plotOptions: {
          bar: {
              columnWidth: "60%"
          }
      },
      colors: ["#00E396", "#775DD0"],
      dataLabels: {
          enabled: true
      },
      xaxis: {
          categories: Array.from({ length: 12 }, (_, i) => `${(i + 1) * 2}`), // 2-hour segment labels (2, 4, 6, ..., 24)
          title: {
              text: "Time of Day (2-hour segments)"
          },
        
      },
      title: {
          text: "linked Invoices for Today by 2-Hour Segments"
      },
      legend: {
          show: true
      }
  };
}

else if (filterType === 'yesterday') {
  const totalCounts = Array(12).fill(0); // For total invoices in 12 two-hour segments
  const TrueCounts = Array(12).fill(0); // For approved invoices in 12 two-hour segments

  const yesterday = moment().subtract(1, 'days').startOf('day'); // Start of yesterday
  const endOfYesterday = moment().subtract(1, 'days').endOf('day'); // End of yesterday

  // Loop through each invoice and categorize by 2-hour segment
  filteredInvoices.forEach(invoice => {
      const invoiceDate = moment(invoice.createdOn);

      // Check if invoice is created yesterday
      if (invoiceDate.isBetween(yesterday, endOfYesterday, null, '[]') && invoice.reference === "linkedInvoice") {
          const hourIndex = Math.floor(invoiceDate.hour() / 2); // Determine the 2-hour segment index (0-11)

          totalCounts[hourIndex] += 1; // Count total proforma invoices for that segment

          if (invoice.paid === true) {
            TrueCounts[hourIndex] += 1; // Count approved proforma invoices for that segment
          }
      }
  });

  this.chartOptions3 = {
      series: [
          {
              name: "Total Proforma Invoices",
              data: totalCounts.map((count, index) => ({
                  x: `${(index + 1) * 2}`, // 2-hour segment labels (2, 4, 6, ..., 24)
                  y: count
              }))
          },
          {
              name: "Approved Proforma Invoices",
              data: TrueCounts.map((count, index) => ({
                  x: `${(index + 1) * 2}`, // 2-hour segment labels (2, 4, 6, ..., 24)
                  y: count
              }))
          }
      ],
      chart: {
          height: 350,
          type: "bar"
      },
      plotOptions: {
          bar: {
              columnWidth: "60%"
          }
      },
      colors: ["#00E396", "#775DD0"],
      dataLabels: {
          enabled: true
      },
      xaxis: {
          categories: Array.from({ length: 12 }, (_, i) => `${(i + 1) * 2}`), // 2-hour segment labels (2, 4, 6, ..., 24)
          title: {
              text: "Time of Day (2-hour segments)"
          },
        
      },
      title: {
          text: "linked Invoices for Yesterday by 2-Hour Segments"
      },
      legend: {
          show: true
      }
  };
}
else if (filterType === 'yearly') {
  const totalCounts = Array(5).fill(0);
  const TrueCounts = Array(5).fill(0);
  
  const currentYear = moment().year();
  
  filteredInvoices.forEach(invoice => {
      const invoiceDate = moment(invoice.createdOn);
      const yearDiff = currentYear - invoiceDate.year();
      
      if (yearDiff >= 0 && yearDiff < 5 && invoice.reference === "proformaInvoice") {
          totalCounts[yearDiff] += 1; 
          
          if (invoice.paid === true) {
            TrueCounts[yearDiff] += 1;
          }
      }
  });

  this.chartOptions3 = {
      series: [
          {
              name: "Total Proforma Invoices",
              data: totalCounts.map((count, index) => ({
                  x: currentYear - index,
                  y: count
              }))
          },
          {
              name: "Approved Proforma Invoices",
              data: TrueCounts.map((count, index) => ({
                  x: currentYear - index,
                  y: count
              }))
          }
      ],
      chart: {
          height: 350,
          type: "bar"
      },
      plotOptions: {
          bar: {
              columnWidth: "60%"
          }
      },
      colors: ["#00E396", "#775DD0"],
      dataLabels: {
          enabled: true
      },
      xaxis: {
          categories: Array.from({ length: 5 }, (_, i) => currentYear - i),
          title: {
              text: "Years"
          }
      },
      title: {
          text: "Proforma Invoices Over the Last 5 Years"
      },
      legend: {
          show: true
      }
  };
}


}
filterData4(filterType: string): Invoice[] {
  const today = moment();
  let filteredInvoices: Invoice[] = [];

  switch (filterType) {
      case 'today':
          filteredInvoices = this.invoicechart.filter(invoice =>
              moment(invoice.createdOn).isSame(today, 'day')
          );
          break;
      case 'yesterday':
          filteredInvoices = this.invoicechart.filter(invoice =>
              moment(invoice.createdOn).isSame(today.clone().subtract(1, 'day'), 'day')
          );
          break;
      case 'week':
          filteredInvoices = this.invoicechart.filter(invoice =>
              moment(invoice.createdOn).isBetween(today.clone().subtract(7, 'days'), today, null, '[]')
          );
          break;
      case 'month':
          filteredInvoices = this.invoicechart.filter(invoice =>
              moment(invoice.createdOn).isBetween(today.clone().subtract(30, 'days'), today, null, '[]')
          );
          break;
      case 'year':
          filteredInvoices = this.invoicechart.filter(invoice =>
              moment(invoice.createdOn).isBetween(today.clone().subtract(1, 'year'), today, null, '[]')
          );
          break;
      default:
          filteredInvoices = this.invoicechart; 
  }

  console.log(`Filtered Invoices for ${filterType}:`, filteredInvoices);
  this.updateChart4(filteredInvoices, filterType);
  return filteredInvoices;
}

updateChart4(filteredInvoices: Invoice[],filterType:string): void {
  if (filterType === 'monthly') {
    const monthNames = moment.months().map(month => month.slice(0, 3)); 
    const totalCounts = Array(12).fill(0);
    const TrueCounts = Array(12).fill(0);
 
    filteredInvoices.forEach(invoice => {
        const invoiceDate = moment(invoice.createdOn);
        if (invoiceDate.isSame(moment(), 'year') && invoice.reference === "normalInvoice") {
            const month = invoiceDate.month();
            totalCounts[month] += 1; 
 
           
            if (invoice.paid === true) { 
                TrueCounts[month] += 1;
            }
        }
    });
 
    this.chartOptions4 = {
        series: [
            {
                name: "Total linked Invoices",
                data: totalCounts.map((count, index) => ({
                    x: monthNames[index],
                    y: count
                }))
            },
            {
                name: "Paid linked Invoices",
                data: TrueCounts.map((count, index) => ({
                    x: monthNames[index],
                    y: count
                }))
            }
        ],
        chart: {
            height: 350,
            type: "bar"
        },
        plotOptions: {
            bar: {
                columnWidth: "60%"
            }
        },
        colors: ["#00E396", "#775DD0"],
        dataLabels: {
            enabled: true
        },
        xaxis: {
            categories: monthNames,
            title: {
                text: "Months"
            }
        },
        title: {
            text: "Linked Invoices by Month"
        },
        legend: {
            show: true
        }
    };
 }
 else if (filterType === 'week') {
  const dayNames = moment.weekdays().map(weekday => weekday.slice(0, 3));
  const totalCounts = Array(7).fill(0); 
  const TrueCounts = Array(7).fill(0); 

  const today = moment();
  
  
  for (let i = 0; i < 7; i++) {
      const day = today.clone().subtract(i, 'days').startOf('day');
      
      filteredInvoices.forEach(invoice => {
          const invoiceDate = moment(invoice.createdOn).startOf('day');
          
          if (invoiceDate.isSame(day, 'day') && invoice.reference === "normalInvoice") {
              totalCounts[i] += 1;
              
              if (invoice.paid === true) {
                  TrueCounts[i] += 1; 
              }
          }
      });
  }

  this.chartOptions4 = {
      series: [
          {
              name: "Total Proforma Invoices",
              data: totalCounts.map((count, index) => ({
                  x: dayNames[6 - index], 
                  y: count
              }))
          },
          {
              name: "Approved Proforma Invoices",
              data: TrueCounts.map((count, index) => ({
                  x: dayNames[6 - index], 
                  y: count
              }))
          }
      ],
      chart: {
          height: 350,
          type: "bar"
      },
      plotOptions: {
          bar: {
              columnWidth: "60%"
          }
      },
      colors: ["#00E396", "#775DD0"],
      dataLabels: {
          enabled: true
      },
      xaxis: {
          categories: dayNames.reverse(), 
          title: {
              text: "Days of the Week"
          }
      },
      title: {
          text: "Linked Invoices by Day"
      },
      legend: {
          show: true
      }
  };
}
else if (filterType === 'weekly') {
  const totalCounts = Array(4).fill(0); 
  const TrueCounts = Array(4).fill(0);

  const today = moment();
  const startOfMonth = today.clone().startOf('month');
  const endOfMonth = today.clone().endOf('month');

 
  filteredInvoices.forEach(invoice => {
      const invoiceDate = moment(invoice.createdOn);

      
      if (invoiceDate.isBetween(startOfMonth, endOfMonth, null, '[]') && invoice.reference === "normalInvoice") {
          const weekIndex = Math.floor(invoiceDate.date() / 7); 

          totalCounts[weekIndex] += 1; 
          if (invoice.paid === true) {
            TrueCounts[weekIndex] += 1; 
          }
      }
  });

  this.chartOptions4 = {
      series: [
          {
              name: "Total Proforma Invoices",
              data: totalCounts.map((count, index) => ({
                  x: `Week ${index + 1}`, 
                  y: count
              }))
          },
          {
              name: "Approved Proforma Invoices",
              data: TrueCounts.map((count, index) => ({
                  x: `Week ${index + 1}`, 
                  y: count
              }))
          }
      ],
      chart: {
          height: 350,
          type: "bar"
      },
      plotOptions: {
          bar: {
              columnWidth: "60%"
          }
      },
      colors: ["#00E396", "#775DD0"],
      dataLabels: {
          enabled: true
      },
      xaxis: {
          categories: [`Week 1`, `Week 2`, `Week 3`, `Week 4`], 
          title: {
              text: "Weeks of the Month"
          }
      },
      title: {
          text: "Proforma Invoices by Week"
      },
      legend: {
          show: true
      }
  };
}

else if (filterType === 'today') {
  const totalCounts = Array(12).fill(0); 
  const TrueCounts = Array(12).fill(0); 
  const today = moment().startOf('day'); 
  const endOfToday = moment().endOf('day'); 

  
  filteredInvoices.forEach(invoice => {
      const invoiceDate = moment(invoice.createdOn);

      
      if (invoiceDate.isBetween(today, endOfToday, null, '[]') && invoice.reference === "normalInvoice") {
          const hourIndex = Math.floor(invoiceDate.hour() / 2); 

          totalCounts[hourIndex] += 1; 

          if (invoice.paid === true) {
            TrueCounts[hourIndex] += 1;
          }
      }
  });

  this.chartOptions4 = {
      series: [
          {
              name: "Total Proforma Invoices",
              data: totalCounts.map((count, index) => ({
                  x: `${(index + 1) * 2}`,
                  y: count
              }))
          },
          {
              name: "Approved Proforma Invoices",
              data: TrueCounts.map((count, index) => ({
                  x: `${(index + 1) * 2}`, 
                  y: count
              }))
          }
      ],
      chart: {
          height: 350,
          type: "bar"
      },
      plotOptions: {
          bar: {
              columnWidth: "60%"
          }
      },
      colors: ["#00E396", "#775DD0"],
      dataLabels: {
          enabled: true
      },
      xaxis: {
          categories: Array.from({ length: 12 }, (_, i) => `${(i + 1) * 2}`), 
          title: {
              text: "Time of Day (2-hour segments)"
          },
        
      },
      title: {
          text: "linked Invoices for Today by 2-Hour Segments"
      },
      legend: {
          show: true
      }
  };
}

else if (filterType === 'yesterday') {
  const totalCounts = Array(12).fill(0);
  const TrueCounts = Array(12).fill(0); 

  const yesterday = moment().subtract(1, 'days').startOf('day'); 
  const endOfYesterday = moment().subtract(1, 'days').endOf('day');

 
  filteredInvoices.forEach(invoice => {
      const invoiceDate = moment(invoice.createdOn);

   
      if (invoiceDate.isBetween(yesterday, endOfYesterday, null, '[]') && invoice.reference === "normalInvoice") {
          const hourIndex = Math.floor(invoiceDate.hour() / 2);

          totalCounts[hourIndex] += 1; 

          if (invoice.paid === true) {
            TrueCounts[hourIndex] += 1; 
          }
      }
  });

  this.chartOptions4 = {
      series: [
          {
              name: "Total Proforma Invoices",
              data: totalCounts.map((count, index) => ({
                  x: `${(index + 1) * 2}`, 
                  y: count
              }))
          },
          {
              name: "Approved Proforma Invoices",
              data: TrueCounts.map((count, index) => ({
                  x: `${(index + 1) * 2}`, 
                  y: count
              }))
          }
      ],
      chart: {
          height: 350,
          type: "bar"
      },
      plotOptions: {
          bar: {
              columnWidth: "60%"
          }
      },
      colors: ["#00E396", "#775DD0"],
      dataLabels: {
          enabled: true
      },
      xaxis: {
          categories: Array.from({ length: 12 }, (_, i) => `${(i + 1) * 2}`), 
          title: {
              text: "Time of Day (2-hour segments)"
          },
        
      },
      title: {
          text: "linked Invoices for Yesterday by 2-Hour Segments"
      },
      legend: {
          show: true
      }
  };
}
else if (filterType === 'yearly') {
  const totalCounts = Array(5).fill(0);
  const TrueCounts = Array(5).fill(0);
  
  const currentYear = moment().year();
  
  filteredInvoices.forEach(invoice => {
      const invoiceDate = moment(invoice.createdOn);
      const yearDiff = currentYear - invoiceDate.year();
      
      if (yearDiff >= 0 && yearDiff < 5 && invoice.reference === "normalInvoice") {
          totalCounts[yearDiff] += 1; 
          
          if (invoice.paid === true) {
            TrueCounts[yearDiff] += 1;
          }
      }
  });

  this.chartOptions4 = {
      series: [
          {
              name: "Total Proforma Invoices",
              data: totalCounts.map((count, index) => ({
                  x: currentYear - index,
                  y: count
              }))
          },
          {
              name: "Approved Proforma Invoices",
              data: TrueCounts.map((count, index) => ({
                  x: currentYear - index,
                  y: count
              }))
          }
      ],
      chart: {
          height: 350,
          type: "bar"
      },
      plotOptions: {
          bar: {
              columnWidth: "60%"
          }
      },
      colors: ["#00E396", "#775DD0"],
      dataLabels: {
          enabled: true
      },
      xaxis: {
          categories: Array.from({ length: 5 }, (_, i) => currentYear - i),
          title: {
              text: "Years"
          }
      },
      title: {
          text: "Proforma Invoices Over the Last 5 Years"
      },
      legend: {
          show: true
      }
  };
}

}
filterData5(filterType: string): Invoice[] {
  const today = moment();
  let filteredInvoices: Invoice[] = [];

  switch (filterType) {
      case 'today':
          filteredInvoices = this.invoicechart.filter(invoice =>
              moment(invoice.createdOn).isSame(today, 'day')
          );
          break;
      case 'yesterday':
          filteredInvoices = this.invoicechart.filter(invoice =>
              moment(invoice.createdOn).isSame(today.clone().subtract(1, 'day'), 'day')
          );
          break;
      case 'week':
          filteredInvoices = this.invoicechart.filter(invoice =>
              moment(invoice.createdOn).isBetween(today.clone().subtract(7, 'days'), today, null, '[]')
          );
          break;
      case 'month':
          filteredInvoices = this.invoicechart.filter(invoice =>
              moment(invoice.createdOn).isBetween(today.clone().subtract(30, 'days'), today, null, '[]')
          );
          break;
      case 'year':
          filteredInvoices = this.invoicechart.filter(invoice =>
              moment(invoice.createdOn).isBetween(today.clone().subtract(1, 'year'), today, null, '[]')
          );
          break;
      default:
          filteredInvoices = this.invoicechart; 
  }

  console.log(`Filtered Invoices for ${filterType}:`, filteredInvoices);
  this.updateChart5(filteredInvoices, filterType);
  return filteredInvoices;
}

updateChart5(filteredInvoices: Invoice[],filterType:string): void {
  if (filterType === 'monthly') {
    const monthNames = moment.months().map(month => month.slice(0, 3)); 
    const totalCounts = Array(12).fill(0);
    const TrueCounts = Array(12).fill(0);
 
    filteredInvoices.forEach(invoice => {
        const invoiceDate = moment(invoice.createdOn);
        if (invoiceDate.isSame(moment(), 'year') && invoice.reference === "productInvoice") {
            const month = invoiceDate.month();
            totalCounts[month] += 1; 
 
           
            if (invoice.paid === true) { 
                TrueCounts[month] += 1;
            }
        }
    });
 
    this.chartOptions5 = {
        series: [
            {
                name: "Total linked Invoices",
                data: totalCounts.map((count, index) => ({
                    x: monthNames[index],
                    y: count
                }))
            },
            {
                name: "Paid linked Invoices",
                data: TrueCounts.map((count, index) => ({
                    x: monthNames[index],
                    y: count
                }))
            }
        ],
        chart: {
            height: 350,
            type: "bar"
        },
        plotOptions: {
            bar: {
                columnWidth: "60%"
            }
        },
        colors: ["#00E396", "#775DD0"],
        dataLabels: {
            enabled: true
        },
        xaxis: {
            categories: monthNames,
            title: {
                text: "Months"
            }
        },
        title: {
            text: "Linked Invoices by Month"
        },
        legend: {
            show: true
        }
    };
 }
 else if (filterType === 'week') {
  const dayNames = moment.weekdays().map(weekday => weekday.slice(0, 3));
  const totalCounts = Array(7).fill(0); 
  const TrueCounts = Array(7).fill(0); 

  const today = moment();
  
  
  for (let i = 0; i < 7; i++) {
      const day = today.clone().subtract(i, 'days').startOf('day');
      
      filteredInvoices.forEach(invoice => {
          const invoiceDate = moment(invoice.createdOn).startOf('day');
          
          if (invoiceDate.isSame(day, 'day') && invoice.reference === "productInvoice") {
              totalCounts[i] += 1;
              
              if (invoice.paid === true) {
                  TrueCounts[i] += 1; 
              }
          }
      });
  }

  this.chartOptions5 = {
      series: [
          {
              name: "Total Proforma Invoices",
              data: totalCounts.map((count, index) => ({
                  x: dayNames[6 - index], 
                  y: count
              }))
          },
          {
              name: "Approved Proforma Invoices",
              data: TrueCounts.map((count, index) => ({
                  x: dayNames[6 - index], 
                  y: count
              }))
          }
      ],
      chart: {
          height: 350,
          type: "bar"
      },
      plotOptions: {
          bar: {
              columnWidth: "60%"
          }
      },
      colors: ["#00E396", "#775DD0"],
      dataLabels: {
          enabled: true
      },
      xaxis: {
          categories: dayNames.reverse(), 
          title: {
              text: "Days of the Week"
          }
      },
      title: {
          text: "Linked Invoices by Day"
      },
      legend: {
          show: true
      }
  };
}
else if (filterType === 'weekly') {
  const totalCounts = Array(4).fill(0); 
  const TrueCounts = Array(4).fill(0);

  const today = moment();
  const startOfMonth = today.clone().startOf('month');
  const endOfMonth = today.clone().endOf('month');

 
  filteredInvoices.forEach(invoice => {
      const invoiceDate = moment(invoice.createdOn);

      
      if (invoiceDate.isBetween(startOfMonth, endOfMonth, null, '[]') && invoice.reference === "productInvoice") {
          const weekIndex = Math.floor(invoiceDate.date() / 7); 

          totalCounts[weekIndex] += 1; 
          if (invoice.paid === true) {
            TrueCounts[weekIndex] += 1; 
          }
      }
  });

  this.chartOptions5 = {
      series: [
          {
              name: "Total Proforma Invoices",
              data: totalCounts.map((count, index) => ({
                  x: `Week ${index + 1}`, 
                  y: count
              }))
          },
          {
              name: "Approved Proforma Invoices",
              data: TrueCounts.map((count, index) => ({
                  x: `Week ${index + 1}`, 
                  y: count
              }))
          }
      ],
      chart: {
          height: 350,
          type: "bar"
      },
      plotOptions: {
          bar: {
              columnWidth: "60%"
          }
      },
      colors: ["#00E396", "#775DD0"],
      dataLabels: {
          enabled: true
      },
      xaxis: {
          categories: [`Week 1`, `Week 2`, `Week 3`, `Week 4`], 
          title: {
              text: "Weeks of the Month"
          }
      },
      title: {
          text: "Proforma Invoices by Week"
      },
      legend: {
          show: true
      }
  };
}

else if (filterType === 'today') {
  const totalCounts = Array(12).fill(0); 
  const TrueCounts = Array(12).fill(0); 
  const today = moment().startOf('day'); 
  const endOfToday = moment().endOf('day'); 

  
  filteredInvoices.forEach(invoice => {
      const invoiceDate = moment(invoice.createdOn);

      
      if (invoiceDate.isBetween(today, endOfToday, null, '[]') && invoice.reference === "productInvoice") {
          const hourIndex = Math.floor(invoiceDate.hour() / 2); 

          totalCounts[hourIndex] += 1; 

          if (invoice.paid === true) {
            TrueCounts[hourIndex] += 1;
          }
      }
  });

  this.chartOptions5 = {
      series: [
          {
              name: "Total Proforma Invoices",
              data: totalCounts.map((count, index) => ({
                  x: `${(index + 1) * 2}`,
                  y: count
              }))
          },
          {
              name: "Approved Proforma Invoices",
              data: TrueCounts.map((count, index) => ({
                  x: `${(index + 1) * 2}`, 
                  y: count
              }))
          }
      ],
      chart: {
          height: 350,
          type: "bar"
      },
      plotOptions: {
          bar: {
              columnWidth: "60%"
          }
      },
      colors: ["#00E396", "#775DD0"],
      dataLabels: {
          enabled: true
      },
      xaxis: {
          categories: Array.from({ length: 12 }, (_, i) => `${(i + 1) * 2}`), 
          title: {
              text: "Time of Day (2-hour segments)"
          },
        
      },
      title: {
          text: "linked Invoices for Today by 2-Hour Segments"
      },
      legend: {
          show: true
      }
  };
}

else if (filterType === 'yesterday') {
  const totalCounts = Array(12).fill(0);
  const TrueCounts = Array(12).fill(0); 

  const yesterday = moment().subtract(1, 'days').startOf('day'); 
  const endOfYesterday = moment().subtract(1, 'days').endOf('day');

 
  filteredInvoices.forEach(invoice => {
      const invoiceDate = moment(invoice.createdOn);

   
      if (invoiceDate.isBetween(yesterday, endOfYesterday, null, '[]') && invoice.reference === "productInvoice") {
          const hourIndex = Math.floor(invoiceDate.hour() / 2);

          totalCounts[hourIndex] += 1; 

          if (invoice.paid === true) {
            TrueCounts[hourIndex] += 1; 
          }
      }
  });

  this.chartOptions5 = {
      series: [
          {
              name: "Total Proforma Invoices",
              data: totalCounts.map((count, index) => ({
                  x: `${(index + 1) * 2}`, 
                  y: count
              }))
          },
          {
              name: "Approved Proforma Invoices",
              data: TrueCounts.map((count, index) => ({
                  x: `${(index + 1) * 2}`, 
                  y: count
              }))
          }
      ],
      chart: {
          height: 350,
          type: "bar"
      },
      plotOptions: {
          bar: {
              columnWidth: "60%"
          }
      },
      colors: ["#00E396", "#775DD0"],
      dataLabels: {
          enabled: true
      },
      xaxis: {
          categories: Array.from({ length: 12 }, (_, i) => `${(i + 1) * 2}`), 
          title: {
              text: "Time of Day (2-hour segments)"
          },
        
      },
      title: {
          text: "linked Invoices for Yesterday by 2-Hour Segments"
      },
      legend: {
          show: true
      }
  };
}
else if (filterType === 'yearly') {
  const totalCounts = Array(5).fill(0);
  const TrueCounts = Array(5).fill(0);
  
  const currentYear = moment().year();
  
  filteredInvoices.forEach(invoice => {
      const invoiceDate = moment(invoice.createdOn);
      const yearDiff = currentYear - invoiceDate.year();
      
      if (yearDiff >= 0 && yearDiff < 5 && invoice.reference === "productInvoice") {
          totalCounts[yearDiff] += 1; 
          
          if (invoice.paid === true) {
            TrueCounts[yearDiff] += 1;
          }
      }
  });

  this.chartOptions5 = {
      series: [
          {
              name: "Total Proforma Invoices",
              data: totalCounts.map((count, index) => ({
                  x: currentYear - index,
                  y: count
              }))
          },
          {
              name: "Approved Proforma Invoices",
              data: TrueCounts.map((count, index) => ({
                  x: currentYear - index,
                  y: count
              }))
          }
      ],
      chart: {
          height: 350,
          type: "bar"
      },
      plotOptions: {
          bar: {
              columnWidth: "60%"
          }
      },
      colors: ["#00E396", "#775DD0"],
      dataLabels: {
          enabled: true
      },
      xaxis: {
          categories: Array.from({ length: 5 }, (_, i) => currentYear - i),
          title: {
              text: "Years"
          }
      },
      title: {
          text: "Proforma Invoices Over the Last 5 Years"
      },
      legend: {
          show: true
      }
  };
}
}
}