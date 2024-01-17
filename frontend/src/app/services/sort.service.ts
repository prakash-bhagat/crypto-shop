import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  constructor() { }

  sort(event: any,ProdData:any) {
    switch (event.target.value) {
      case "low":
        {
          ProdData = ProdData.sort((low:any, high:any) => low.price - high.price);
          break;
        }

      case "high":
        {
          ProdData = ProdData.sort((low:any, high:any) => high.price - low.price);
          break;
        }

      // case "Name":
      //   {
      //     ProdData = ProdData.sort(function (low:any, high:any) {
      //       if (low.Name < high.Name) {
      //         return -1;
      //       }
      //       else if (low.Name > high.Name) {
      //         return 1;
      //       }
      //       else {
      //         return 0;
      //       }
      //     })
      //     break;
      //   }

      default: {
        ProdData = ProdData.sort((low:any, high:any) => low.price - high.price);
        break;
      }

    }
    return ProdData;
  }

  selectedCategories: Set<string> = new Set<string>();

  toggleCategory(category: string): void {
    if (this.selectedCategories.has(category)) {
      this.selectedCategories.delete(category);
    } else {
      this.selectedCategories.add(category);
    }
  }

}
