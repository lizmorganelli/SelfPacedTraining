import { Component, OnInit } from '@angular/core';
import * as XLSX from 'ts-xlsx';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-worksheet',
  templateUrl: './worksheet.component.html',
  styleUrls: ['./worksheet.component.css']
})
export class WorksheetComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  arrayBuffer: any;

  file: File;
  tabNames: string[];
  tabInfo: string[][];
  selectedTabs: string[];
  workbook: any;


  //event is object containing info about the action 
  incomingfile(event) {
    this.file = event.target.files[0];
  }

  Upload() {
    this.selectedTabs = [];
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;

      const data = new Uint8Array(this.arrayBuffer);
      const arr = [];

      data.forEach(int8 => {
        arr.push(String.fromCharCode(int8));
      })

      const bstr = arr.join("");
      //      type which tells the library how to parse the data
      const workbook = XLSX.read(bstr, { type: "binary" });
      console.log(workbook);
      this.workbook = workbook;

      const tabNames = workbook.SheetNames;
      this.tabNames = tabNames;
      console.log(tabNames);
      // const info = [];


      // for (let tabName in tabNames) {
      //   const result = [];
      //   console.log(JSON.stringify(tabNames[tabName]));
      //   //worksheet is one specific tab in the workbook
      //   const worksheet = workbook.Sheets[tabNames[tabName]];
      //   console.log(worksheet);

      //   const range = XLSX.utils.decode_range(worksheet['!ref']);

      //   for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
      //     let row = [];
      //     for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
      //       //cell Adresss
      //       const nextCell = worksheet[XLSX.utils.encode_cell({ r: rowNum, c: colNum })];

      //       if ( typeof nextCell === 'undefined' ) {
      //         row.push('Empty');
      //       } else row.push(nextCell.w);
      //     }
      //     result.push(row);
      //   }
      //   console.log("result");
      //   console.log(result);
      //   info.push(result);
      // }
      // this.tabInfo = info;
      // console.log('info');
      // console.log(info);
    }
    fileReader.readAsArrayBuffer(this.file);
    console.log(this.file.name);
  }

  selectTab(tabName: string, isChecked: boolean) {
    if (isChecked) {
      this.selectedTabs.push(tabName);
    }
    console.log(this.selectedTabs);
  }

  finalPDF: any;

  downloadPDF() {
    const allTabs = this.workbook;
    const names = allTabs.SheetNames;

    let numberOfCols = 0;
    const chosenTabInfo = [];

    

    names.forEach(name => {
      this.selectedTabs.forEach(selectedTab => {
        if (name === selectedTab) {
          const chosenTab = allTabs.Sheets[selectedTab];
          const cellBlock = XLSX.utils.decode_range(chosenTab['!ref']);

          if(numberOfCols < cellBlock.e.c){
            numberOfCols = cellBlock.e.c;
          }
          
          for (let rowNum = cellBlock.s.r; rowNum <= cellBlock.e.r; rowNum++) {
            let row = [];
            for (let colNum = cellBlock.s.c; colNum <= cellBlock.e.c; colNum++) {
              //cell Adresss
              const nextCell = chosenTab[XLSX.utils.encode_cell({ r: rowNum, c: colNum })];

              if ( typeof nextCell === 'undefined' ) {
                row.push('Empty');
              } else row.push(nextCell.w);
            }
            chosenTabInfo.push(row);
          }
          chosenTabInfo.push('');
          console.log("chosenTabInfo");
          console.log(chosenTabInfo);
        }
      });
    });

      const doc = new jsPDF('landscape');
      const col = [];

      for (let c = 0; c <= numberOfCols; c++) {
        col.push('Column ' + String.fromCharCode(c + 65));
      }

      doc.autoTable(col, chosenTabInfo);
      doc.save('ChosenTabs.pdf');
    }

  }



  //this works for ONE tab
//   downloadPDF(tab: string, i: number) {
//     const allTabs = this.workbook;
//     const names = allTabs.SheetNames;
//     let numberOfCols;
//     const chosenTabInfo = [];

//     names.forEach(name => {
//       if (name === tab) {
//         const chosenTab = allTabs.Sheets[tab];
//         const cellBlock = XLSX.utils.decode_range(chosenTab['!ref']);

//         numberOfCols = cellBlock.e.c;

//         for (let rowNum = cellBlock.s.r; rowNum <= cellBlock.e.r; rowNum++) {
//           let row = [];
//           for (let colNum = cellBlock.s.c; colNum <= cellBlock.e.c; colNum++) {
//             //cell Adresss
//             const nextCell = chosenTab[XLSX.utils.encode_cell({ r: rowNum, c: colNum })];

//             if ( typeof nextCell === 'undefined' ) {
//               row.push('Empty');
//             } else row.push(nextCell.w);
//           }
//           chosenTabInfo.push(row);
//         }
//         console.log("chosenTabInfo");
//         console.log(chosenTabInfo);
//       }
//     });

//     const doc = new jsPDF('landscape');
//     const col = [];

//     for (let c = 0; c <= numberOfCols; c++) {
//       col.push('Column ' + String.fromCharCode(c + 65));
//     }

//     doc.autoTable(col, chosenTabInfo);
//     doc.save(tab + '.pdf');
//   }

// }
