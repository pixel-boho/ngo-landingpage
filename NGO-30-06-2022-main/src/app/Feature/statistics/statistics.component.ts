import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from './../../core/service/api.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  projectcountstop: number;

  @Input() chartTitle: string;
  @Input() chartColors: string[];
  @Input() chartColors1: string[];
  @Input() chartData: column[];
  @Input() campaignData: column[];
  @Input() campaignDataExtra: column[];
  @Input() fundData: column[];
  @Input() allChartData: column[];

  circleArray: circle[] = [
    { vector: "M18 3 a 15 15 0 0 1 0 30 a 15 15 0 0 1 0 -30", circumferance: 93 },
    { vector: "M18 5 a 13 13 0 0 1 0 26 a 13 13 0 0 1 0 -26", circumferance: 80.4 },
    { vector: "M18 7 a 11 11 0 0 1 0 22 a 11 11 0 0 1 0 -22", circumferance: 68 }
  ];
  circleArray1: circle[] = [
    { vector: "M18 3 a 15 15 0 0 1 0 30 a 15 15 0 0 1 0 -30", circumferance: 93 },
    { vector: "M18 5 a 13 13 0 0 1 0 26 a 13 13 0 0 1 0 -26", circumferance: 80.4 },
    { vector: "M18 7 a 11 11 0 0 1 0 22 a 11 11 0 0 1 0 -22", circumferance: 68 }
  ];
  dashArray: Array<number[]>;
  totalValue: number;
  AllData: any;
  allUsers: any;
  totalFundraisers: any;
  totalSupporters: any;
  totalCampaigns: any;
  totalFundRaised:any;
  totalFundRequired:any;
  counterStart: number;
  dashArrays:Array<number[]>;
  campaignUsers:number;
  fundrequired: number;
  constructor(private apiService: ApiService,) {

  }

  ngOnInit() {
    document.getElementById("campagin").style.display = "none";
    document.getElementById("campagins").style.display = "none";
    document.getElementById("fund").style.display = "none";

    document.getElementById("funds").style.display = "none";

    this.dashArray = this.getStrokeDashArray();
    this.dashArrays = this.getStrokeDashArrays();

  }
  getStatisticsData(){}
  campaignStatistics(){
    console.log("aaaa")
    document.getElementById("campagin").style.display = "block";
    document.getElementById("campagins").style.display = "block";
    document.getElementById("allUser").style.display = "none";
    document.getElementById("allUsers").style.display = "none";
    document.getElementById("funds").style.display = "none";
    document.getElementById("fund").style.display = "none";
    document.getElementById("campgDta").style.backgroundColor = "navy";
    document.getElementById("userdta").style.backgroundColor = "#c3313e";
    document.getElementById("funddta").style.backgroundColor = "#c3313e";
    const totalCampaigns = this.campaignData[1].Value;
    console.log(totalCampaigns)
    this.campaignUsers = 0;
    setTimeout(() => {
      if(totalCampaigns > 0){
        let projectcountstop = setInterval(()=>{
      this.campaignUsers ++;
      console.log(this.campaignUsers)
      if(this.campaignUsers == totalCampaigns){
        clearInterval(projectcountstop);
      }

    },300);
  }
    }, 1000);

  }

  userData(){
   // document.getElementById("allUser").style.display = "none";
    document.getElementById("campagin").style.display = "none";
    document.getElementById("campagins").style.display = "none";
    document.getElementById("allUser").style.display = "block";
    document.getElementById("allUsers").style.display = "block";
    document.getElementById("fund").style.display = "none";
    document.getElementById("funds").style.display = "none";
    document.getElementById("userdta").style.backgroundColor = "navy";
    document.getElementById("funddta").style.backgroundColor = "#c3313e";
    document.getElementById("campgDta").style.backgroundColor = "#c3313e";

  }
  funds(){
    document.getElementById("campagin").style.display = "none";
    document.getElementById("campagins").style.display = "none";
    document.getElementById("allUser").style.display = "none";
    document.getElementById("fund").style.display = "block";
    document.getElementById("funds").style.display = "block";
    document.getElementById("allUsers").style.display = "none";
    document.getElementById("funddta").style.backgroundColor = "navy";
    document.getElementById("userdta").style.backgroundColor = "#c3313e";
    document.getElementById("campgDta").style.backgroundColor = "#c3313e";


    const fundValue = this.fundData[0].Value;
    this.fundrequired = 0;
    setTimeout(() => {
      if(fundValue > 0){
    let projectcountstop = setInterval(()=>{
      this.fundrequired ++;
      console.log(this.campaignUsers)
      if(this.campaignUsers == fundValue){
        clearInterval(projectcountstop);
      }
    },300);
  }
  }, 1000);

  }
  getStrokeDashArray(): Array<number[]> {
    let result: Array<number[]> = [];
    for (let i = 0; i < this.chartData.length; i++) {
      //let percent = Math.round((this.chartData[i].Value / this.allChartData[i].Value) * 100);
      let percent = Math.floor((this.chartData[i].Value / this.allChartData[i].Value) * 100);
      this.chartData[i].percentage = percent;
      let percentageValue = (percent * this.circleArray[i].circumferance) / 100;
      let resultArray = [percentageValue, this.circleArray[i].circumferance];
      result.push(resultArray);
    }
    return result;
  }
  getStrokeDashArrays(): Array<number[]> {
    let result: Array<number[]> = [];
    for (let i = 0; i < this.campaignData.length; i++) {
      console.log(this.campaignData[i])
      //let percent = Math.round((this.chartData[i].Value / this.allChartData[i].Value) * 100);
      let percent = Math.floor((this.campaignData[i].Value / this.campaignDataExtra[i].Value) * 100);
      this.campaignData[i].percentage = percent;
      let percentageValue = (percent * this.circleArray1[i].circumferance) / 100;
      let resultArray = [percentageValue, this.circleArray1[i].circumferance];
      result.push(resultArray);
    }
    return result;
  }
  getTotalValue(): number {
    let result = 0;
    for (let i = 0; i < this.chartData.length; i++) {
      result = result + this.chartData[i].Value;
    }
    return result;
  }
  getTotalValues(): number {
    let result = 0;
    for (let i = 0; i < this.campaignData.length; i++) {
      result = result + this.campaignData[i].Value;
    }
    return result;
  }

}

export class column {
  Name: string;
  Value: number;
  percentage?: number;
}

export class circle {
  vector: string;
  circumferance: number;
}
