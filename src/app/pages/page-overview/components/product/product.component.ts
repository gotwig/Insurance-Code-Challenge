import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Product} from '../../interfaces/product';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent {
    @Input() public product: Product;
    @Input() public activeProduct: boolean
}
