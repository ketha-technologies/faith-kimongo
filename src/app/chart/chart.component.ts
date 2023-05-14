// inports
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';

// decorator
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
// export used to use this class externally
export class ChartComponent implements OnInit, AfterViewInit {
  data: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getData() 
  }

  // this function fetches data and feeds it to ngOnInit function
  getData() {
    this.http.get<any[]>('http://localhost:3000/collections').subscribe(response => {
      this.data = response;
    });
  }

  ngAfterViewInit() {
    // Delay the chart display until after the data is fetched
    setTimeout(() => {
      this.displayChart();
    }, 0);
  }

  displayChart() {
    const canvas: HTMLCanvasElement = document.getElementById('myChart') as HTMLCanvasElement;
    const ctx: CanvasRenderingContext2D | null = canvas?.getContext('2d');
    if (ctx) {
      this.http.get<any[]>('http://localhost:3000/collections').subscribe(response => {
        const dataByDate: { [key: string]: number } = {};
  
        // Group the data by collection date
        response.forEach(item => {
          const collectionDate = new Date(item.collectionDate).toLocaleDateString();
          if (!dataByDate[collectionDate]) {
            dataByDate[collectionDate] = 0;
          }
          dataByDate[collectionDate] += parseInt(item.collectionSize, 10);
        });
  
        const labels = Object.keys(dataByDate);
        const values = Object.values(dataByDate);
  
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Collections',
                data: values,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      });
    }
  }
  


}
