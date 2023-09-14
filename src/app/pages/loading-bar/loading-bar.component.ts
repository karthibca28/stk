import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss']
})
export class LoadingBarComponent implements OnInit {

  isLoading: boolean;

  constructor(private loadingService: LoadingService) {
    this.loadingService.loading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    }); }

  ngOnInit(): void {
  }

}
