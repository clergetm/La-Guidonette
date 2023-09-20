import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICategory } from '../../entities/category/category.model';
import { CategoryService } from '../../entities/category/service/category.service';
import { Brand } from '../../entities/enumerations/brand.model';
import { Color } from '../../entities/enumerations/color.model';
import { MatSelectChange } from '@angular/material/select';
import { MatSelectionListChange } from '@angular/material/list';

@Component({
  selector: 'jhi-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  categories?: ICategory[];
  brands: string[] = [];
  colors: string[] = [];
  selectedCategories: string[] = [];
  selectedBrands: string[] = [];
  selectedColors: string[] = [];
  couleurMenu = false;
  categoryMenu = false;
  brandMenu = false;
  @Input() query: string | null = null;
  @Output() selectedCategoriesEvent = new EventEmitter<string[]>();
  @Output() selectedColorsEvent = new EventEmitter<string[]>();
  @Output() selectedBrandsEvent = new EventEmitter<string[]>();

  constructor(protected categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getCategories();
    this.getColors();
    this.getBrands();
  }
  openColors() {
    this.couleurMenu = !this.couleurMenu;
  }
  openCategories() {
    this.categoryMenu = !this.categoryMenu;
  }
  openBrands() {
    this.brandMenu = !this.brandMenu;
  }

  getColors(): void {
    Object.values(Color).forEach(m => {
      this.colors.push(this.formatString(m));
    });
  }

  getBrands(): void {
    Object.values(Brand).forEach(m => {
      this.brands.push(this.formatString(m));
    });
  }

  getCategories(): void {
    this.categoryService.findCategories().subscribe(data => {
      this.categories = data;
    });
  }
  onCategorySelection(event: MatSelectionListChange) {
    if (event.options[0].selectionList._value) {
      this.selectedCategories = event.options[0].selectionList._value;
    }
    this.selectedCategoriesEvent.emit(this.selectedCategories);
  }
  onColorSelection(event: MatSelectionListChange) {
    if (event.options[0].selectionList._value) {
      this.selectedColors = event.options[0].selectionList._value;
    }
    this.selectedColorsEvent.emit(this.upperCase(this.selectedColors));
  }
  onBrandSelection(event: MatSelectionListChange) {
    if (event.options[0].selectionList._value) {
      this.selectedBrands = event.options[0].selectionList._value;
    }
    this.selectedBrandsEvent.emit(this.upperCase(this.selectedBrands));
  }

  /**
   * Format words to have the first letter as Upper and the rest as lower
   * @param input
   * @private
   */
  private formatString(input: string): string {
    const words = input.split(/[ \-]/);

    const formattedWords = words.map((word: string): string => {
      if (word.length === 0) {
        return '';
      } else if (word.length === 1) {
        return word.toUpperCase();
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
    });

    return formattedWords.join(' ');
  }
  private upperCase(array: string[]) {
    return array.map(a => a.toUpperCase());
  }

  protected readonly MatSelectChange = MatSelectChange;
}
