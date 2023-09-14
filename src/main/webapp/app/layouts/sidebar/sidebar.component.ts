import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../entities/category/category.model';
import { CategoryService } from '../../entities/category/service/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SortService } from '../../shared/sort/sort.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Brand } from '../../entities/enumerations/brand.model';
import { Color } from '../../entities/enumerations/color.model';

@Component({
  selector: 'jhi-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  categories?: ICategory[];
  brands: string[] = [];
  colors: string[] = [];

  constructor(
    protected categoryService: CategoryService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected sortService: SortService,
    protected modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getColors();
    this.getBrands();
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
    this.categoryService.query().subscribe(
      res => {
        this.categories = res.body ?? [];
      },
      error => {
        console.error('Error fetching categories', error);
      }
    );
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

  public printCategories() {
    this.categories?.forEach(m => {
      console.log('[CAT] ' + m.id + ' - ' + m.name + ' - ' + m.products);
    });
  }

  openAccordeon(id: string): void {
    const elt = document.getElementById(id);
    if (elt === null) {
      return;
    }
    if (elt?.className.indexOf('w3-show') === -1) {
      elt.className += ' w3-show';
      elt.previousElementSibling?.classList.add('w3-green');
    } else {
      elt.className = elt.className.replace(' w3-show', '');
      elt.previousElementSibling?.classList.remove('w3-green');
    }
  }

  protected readonly print = print;
}
