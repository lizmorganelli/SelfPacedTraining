import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  file : File; 
  
      getFiles(event){ 
  
          this.file = event.target.files[0]; 
        console.log(this.file.name);
      } 

}
