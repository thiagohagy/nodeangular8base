import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../helpers/loader.service';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.css']
})
export class LoadingIndicatorComponent implements OnInit {
  private isLoading = false;

  constructor(private loaderService: LoaderService) {
    this.loaderService.isLoading.subscribe((v) => {
      this.isLoading = v;
    })
  }

  ngOnInit() {
  }

}
