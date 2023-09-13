import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../../entities/product/product.model';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { HttpClient } from '@angular/common/http';
import { GetProductPageResponseDto } from '../../entities/dto/GetProductPageResponseDto';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/search');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}
  search(query: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.resourceUrl}?query=${query}`);
  }
  paginatedSearch(query: string, page: number, size: number): Observable<GetProductPageResponseDto> {
    return this.http.get<GetProductPageResponseDto>(`${this.resourceUrl}?query=${query}&page=${page}&size=${size}`);
  }
}
