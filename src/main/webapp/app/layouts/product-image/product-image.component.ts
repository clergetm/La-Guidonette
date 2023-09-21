import { Component, Input, OnInit } from '@angular/core';
import { S3Service } from 'app/services/aws/s3.service';

@Component({
  selector: 'jhi-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.scss'],
})
export class ProductImageComponent implements OnInit {
  @Input() name?: string = undefined;
  public image?: string;
  public constructor(private s3Service: S3Service) {}

  /**
   * Get the image from S3.
   */
  public async ngOnInit(): Promise<void> {
    this.image = await this.s3Service.getImage(this.name);
  }
}
