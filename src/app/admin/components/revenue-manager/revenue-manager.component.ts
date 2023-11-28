import { Component, OnInit } from '@angular/core';
import * as CanvasJS from "@canvasjs/charts";
import { CoreBaseTemplateComponent } from 'src/app/core/components/core-base-template/core-base-template.component';


@Component({
  selector: 'app-revenue-manager',
  templateUrl: './revenue-manager.component.html',
  styleUrls: ['./revenue-manager.component.css']
})
export class RevenueManagerComponent implements OnInit {

  constructor() {
    CoreBaseTemplateComponent.urlTrace.next([{ name: "Dashboard", url: "/user/dashboard" }, { name: "Revenue", url: "/user/admin/revenue-manager" }])

  }

  ngOnInit(): void {

    //monthlyRevenueChart
    this.monthlyRevenueChart();
    // weeklyRevenueChart
    this.weeklyRevenueChart();
    // overView chart
    this.overView();
  }

  monthlyRevenueChart() {
    var chart = new CanvasJS.Chart("monthlyRevenueChart", {
      //Chart Options - Check https://canvasjs.com/docs/charts/chart-options/
      title: {
        text: "Monthly Revenue",
        animationEnabled: true,
        exportEnabled: true,
        exportFileName: "Monthly Revenue",
        creditText: "Google",
        creditHref: 'https://www.google.com/'
      },
      data: [
        {
          type: "column",
          dataPoints: [
            { label: "Balod", y: 10 },
            { label: "BalodaBazar", y: 15 },
            { label: "Bastar", y: 25 },
            { label: "Bemetara", y: 30 },
            { label: "Bilaspur", y: 28 },
            { label: "Dantewada", y: 28 },
            { label: "Dhamtari", y: 28 },
            { label: "Durg", y: 28 },
            { label: "Gariyaband", y: 28 },
            { label: "JanjgirChampa", y: 20 },
            { label: "Jashpur", y: 28 },
            { label: "Kanker", y: 50 },
            { label: "Kawardha", y: 40 },
            { label: "Korba", y: 28 },
            { label: "Koriya", y: 30 },
            { label: "Mahasamund", y: 60 },
            { label: "Mungeli", y: 28 },
            { label: "Raigarh", y: 50 },
            { label: "Rajnandgaon", y: 20 },
            { label: "Raipur", y: 28 },
            { label: "Sarguja", y: 50 }
          ]
        }]
    });
    //Render Chart
    chart.render();
  }


  weeklyRevenueChart() {
    //Create Chart
    var chart = new CanvasJS.Chart("weeklyRevenueChart", {
      title: {
        animationEnabled: true,
      },
      data: [
        {
          type: "column",
          dataPoints: [
            { label: "Monday", y: 10 },
            { label: "Tuesday", y: 15 },
            { label: "Wednesday", y: 25 },
            { label: "Thursday", y: 30 },
            { label: "Friday", y: 28 },
            { label: "Saturday", y: 28 },
            { label: "Sunday", y: 28 }
          ]
        }]
    });
    //Render Chart
    chart.render();
  }

  overView() {
    var chart = new CanvasJS.Chart("overviewRevenueChart", {
      title: {
        animationEnabled: true,
        exportEnabled:true,
      },
      data: [
        {
          type: "pie",
          dataPoints: [
            { label: "Balod", y: 10 },
            { label: "BalodaBazar", y: 15 },
            { label: "Bastar", y: 25 },
            { label: "Bemetara", y: 30 },
            { label: "Bilaspur", y: 28 },
            { label: "Dantewada", y: 28 },
            { label: "Dhamtari", y: 28 },
            { label: "Durg", y: 28 },
            { label: "Gariyaband", y: 28 },
            { label: "JanjgirChampa", y: 20 },
            { label: "Jashpur", y: 28 },
            { label: "Kanker", y: 50 },
            { label: "Kawardha", y: 40 },
            { label: "Korba", y: 28 },
            { label: "Koriya", y: 30 },
            { label: "Mahasamund", y: 60 },
            { label: "Mungeli", y: 28 },
            { label: "Raigarh", y: 50 },
            { label: "Rajnandgaon", y: 20 },
            { label: "Raipur", y: 28 },
            { label: "Sarguja", y: 50 }
          ]
        }]
    });
    //Render Chart
    chart.render();
  }

}



