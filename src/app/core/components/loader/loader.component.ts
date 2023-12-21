import { Component, inject } from '@angular/core';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  isLoading = false;
  private loaderService = inject(LoaderService)

  ngOnInit(): void {
    this.loaderService.isLoading$.subscribe(isloading => {
      this.isLoading = isloading;
    });
  }
}
