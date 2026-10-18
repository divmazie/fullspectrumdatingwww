import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'environments/environment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {SessionService} from '../session.service';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { UcWidgetModule } from 'ngx-uploadcare-widget';
import {ApiService} from '../api.service';

const API_URL = environment.apiUrl;

@Component({
  selector: 'app-upload-picture',
  templateUrl: './upload-picture.component.html',
  styleUrls: ['./upload-picture.component.css']
})
export class UploadPictureComponent implements OnInit {

    afuConfig: object;

    private hasBaseDropZoneOver = false;
    private uploader: FileUploader;
    private title: string;

    constructor(public dialogRef: MatDialogRef<UploadPictureComponent>,
                public sessionService: SessionService,
                private apiService: ApiService) {
        this.afuConfig = {
            multiple: false,
            formatsAllowed: '.jpg,.png',
            maxSize: '20',
            uploadAPI: {
                url: API_URL + 'picture_upload.php?token=' + this.sessionService.hash
            },
            theme: 'dragNDrop',
            hideResetBtn: true
        };
    }

    ngOnInit() {
        /*
        // Create the file uploader, wire it to upload to your account
        const uploaderOptions: FileUploaderOptions = {
            url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`,
            // Upload files automatically upon addition to upload queue
            autoUpload: true,
            // Use xhrTransport in favor of iframeTransport
            isHTML5: true,
            // Calculate progress independently for each uploaded file
            removeAfterUpload: true,
            // XHR request headers
            headers: [
                {
                    name: 'X-Requested-With',
                    value: 'XMLHttpRequest'
                }
            ]
        };

        this.uploader = new FileUploader(uploaderOptions);

        this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
            // Add Cloudinary unsigned upload preset to the upload form
            form.append('upload_preset', this.cloudinary.config().upload_preset);

            // Add file to upload
            form.append('file', fileItem);

            // Use default "withCredentials" value for CORS requests
            fileItem.withCredentials = false;
            return {fileItem, form};
        };
          afterUpload($event) {
            // alert(JSON.stringify($event));
              this.dialogRef.close();
          }
        */
    }

    onUploadHandler($event) {
        alert(JSON.stringify($event.cdnUrl));
        // $event.
    }
}
