import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../../../shared/services/shopping-list.service';

@Component({
  selector: 'app-shopping-list-details',
  templateUrl: './shopping-list-details.component.html',
  styleUrls: ['./shopping-list-details.component.scss']
})
export class ShoppingListDetailsComponent implements OnInit {

  constructor(
    private shoppingListService: ShoppingListService,
  ) { }

  ngOnInit(): void {
  }

}
