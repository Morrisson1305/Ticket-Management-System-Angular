import { Component, OnInit, AfterViewInit } from '@angular/core';
import { User } from '../../interface/user';
import { UserService } from '../../services/user.service';
import { Chart, registerables, ChartConfiguration } from 'chart.js';
import { months } from '../../interface/util';

Chart.register(...registerables);

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit, AfterViewInit {

  users: User[] = [];
  chart: Chart | undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadUserScore();
  }

  ngAfterViewInit(): void {
    this.chart = new Chart('multipleLineChart', this.getChartConfig());
  }

  getChartConfig(): ChartConfiguration {
    const labels = months({ count: 12 });

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Open Tickets',
          data: [23, 12, 7, 0, 2, 1, 3, 4, 12, 3, 0, 2],
          fill: true,
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1
        },
        {
          label: 'Closed Tickets',
          data: [20, 29, 23, 20, 21, 38, 13, 42, 23, 31, 10, 42],
          fill: true,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        },
        {
          label: 'Pending Tickets',
          data: [13, 18, 17, 20, 12, 21, 13, 14, 19, 13, 10, 2],
          fill: true,
          borderColor: 'rgb(54, 162, 235)',
          tension: 0.1
        },
        {
          label: 'Overdue Tickets',
          data: [3, 8, 7, 0, 2, 3, 0, 4, 9, 0, 0, 5],
          fill: true,
          borderColor: 'rgb(138, 43, 226)',
          tension: 0.1
        }
      ]
    };

    return {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true
          },
        }
      }
    };
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }

  searchUsersByEmail(email: string) {
    this.userService.getUserByEmail(email).subscribe(data => {
      // handle search result
    });
  }

  searchUsersByScore(score: number) {
    this.userService.getUserByScore(score).subscribe(data => {
      // handle search result
    });
  }

  loadUserScore() {
    // Implement the logic for loading user score if needed
  }
}
