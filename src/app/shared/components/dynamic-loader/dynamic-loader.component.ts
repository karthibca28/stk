import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-dynamic-loader',
  templateUrl: './dynamic-loader.component.html',
  styleUrls: ['./dynamic-loader.component.scss']
})
export class DynamicLoaderComponent implements OnInit {

  isLoading: boolean;

  constructor(private loadingService: LoadingService) {
    this.loadingService.loading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    }); }

  ngOnInit(): void {
  }


}
