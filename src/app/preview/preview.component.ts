import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient, HttpClientModule } from '@angular/common/http';
 
@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    HttpClientModule,
  ],
 
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css',
})
export class PreviewComponent implements OnInit {
 
  displayedColumns: string[] = ['sport', 'team1', 'team2', 'match_type', 'winner', 'score'];
 
  dataSource = new MatTableDataSource<any>();
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 
  ngOnInit() {
    this.getData();
  }
 
  constructor(private http: HttpClient) {}
  range = 'Sheet1';
  spreadsheetId = '16KFhONQK9W4_-rOTWlXPyZYAe4HyAwOy4Xyvvl2ldB8';
  apiKey = 'AIzaSyCg8Xa6Kqq4ziNmjDHBlfTPiFqNhHJFGME';
  data: any;
 
  getData() {
  this.http
    .get(`https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${this.range}?key=${this.apiKey}`)
    .subscribe(
      (res: any) => {
        const sheetData = res.values;
        if (sheetData && sheetData.length > 1) {
          const headers = sheetData[0].map((header: string) => header.trim().toLowerCase().replace(/\s+/g, '_'));
          const rows = sheetData.slice(1);
 
          const formattedData = rows.map((row: string[]) => {
            const rowData: any = {};
            headers.forEach((header: string, index: number) => {
              rowData[header] = row[index];
            });
            return rowData;
          });
 
          this.dataSource.data = formattedData;
        }
      },
      (error) => {
        console.log(error);
      }
    );
}
}