import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {SessionService} from '../session.service';

@Component({
  selector: 'app-upload-picture',
  templateUrl: './upload-picture.component.html',
  styleUrls: ['./upload-picture.component.css']
})
export class UploadPictureComponent implements OnInit {
  afuConfig: object;

  constructor(public dialogRef: MatDialogRef<UploadPictureComponent>,
              public sessionService: SessionService) {
      this.afuConfig = {
          multiple: false,
          formatsAllowed: '.jpg,.png',
          maxSize: '20',
          uploadAPI: {
              url: 'http://localhost:8888/picture_upload.php?token=' + this.sessionService.hash
          },
          theme: 'dragNDrop',
          hideResetBtn: true
      };
  }

  ngOnInit() {
  }

  afterUpload($event) {
    // alert(JSON.stringify($event));
      this.dialogRef.close();
  }

}
