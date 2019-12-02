import { Component, OnInit } from '@angular/core';
import { test} from '../lib/main'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {
  title = 'quincy'

  ngOnInit() {
    console.log(test())

  }
}
