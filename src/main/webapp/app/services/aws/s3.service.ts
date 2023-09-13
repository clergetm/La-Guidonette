import { Injectable } from '@angular/core';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class S3Service {
  private s3: S3Client;

  /**
   * Constructs the S3 Client with the credentials and the
   * Please, before starting the application, check the values of:
   *   ACCESS_KEY
   *   SECRET_ACCESS_KEY
   *   BUCKET_REGION
   *   BUCKET_NAME
   *   DEFAULT_IMAGE_NAME
   */
  public constructor() {
    this.s3 = new S3Client({
      credentials: {
        accessKeyId: environment.ACCESS_KEY,
        secretAccessKey: environment.SECRET_ACCESS_KEY,
      },
      region: environment.BUCKET_REGION,
    });
  }

  /**
   * Get from S3 the Image corresponding to the value 'imageName'
   * @param name name of the png to find
   * @returns the image buffered
   */
  public async getImage(name: string | undefined): Promise<string | undefined> {
    return await getSignedUrl(
      this.s3,
      new GetObjectCommand({
        Bucket: environment.BUCKET_NAME,
        Key: name ?? environment.DEFAULT_IMAGE_NAME,
      })
    );
  }
}
