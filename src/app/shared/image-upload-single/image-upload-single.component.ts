import { Component, OnInit, Input, NgZone, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { UtilService } from 'src/app/core/services/util.service';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { CrudService } from 'src/app/core/services/crud.service';
import { UploadsService } from 'src/app/core/services/uploads.service';
declare var $: any;

@Component({
  selector: 'app-image-upload-single',
  templateUrl: './image-upload-single.component.html',
  styleUrls: ['./image-upload-single.component.scss']
})
export class ImageUploadSingleComponent implements OnInit, OnChanges {

  responses: Array<any>;
  uploaderOptions: FileUploaderOptions;
  uploader: FileUploader;

  @Input() title: any;
  @Input() fileToUpload: any;
  @Input() id: number;
  @Input() affirm: boolean;
  @Output() remove = new EventEmitter();
  @Output() uploadStart = new EventEmitter();
  @Output() uploadEnd = new EventEmitter();
  @Output() binary = new EventEmitter();

  uploadedImages: any[];
  dataToSend: {};
  userObj: any;
  imagePreview: string;

  uploadStartStatus = false;
  uploadEndStatus = false;
  cloudinaryResponseStatus = false;
  uploadPercentageProgress = 0;
  convertedBinary: any;

  constructor(
    private cloudinary: Cloudinary,
    private zone: NgZone,
    private utilService: UtilService,
    private upload: UploadsService
  ) {
    this.responses = [];
    this.uploadedImages = [];
    this.imagePreview = 'assets/img/avatar-icon.jpg';
  }

  ngOnInit() {
    this.initCloudinary();
    this.getUserObject();
  }

  getUserObject() {
    this.userObj = this.utilService.getUserObject();
  }

  initCloudinary() {
    // Create the file uploader, wire it to upload to your account
    this.uploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`,
      // Upload files automatically upon addition to upload queue
      autoUpload: false,
      // Use xhrTransport in favor of iframeTransport
      isHTML5: true,
      // Calculate progress independently for each uploaded file
      removeAfterUpload: false,
      // XHR request headers
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        }
      ],
    };

    this.uploader = new FileUploader(this.uploaderOptions);

    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      // Upload Started
      this.upload.setSettingsProfileImageUploadingStatus(true);

      // console.log('Image upload started');
      // Add Cloudinary's unsigned upload preset to the upload form
      form.append('upload_preset', this.cloudinary.config().upload_preset);
      // Add built-in and custom tags for displaying the uploaded photo in the list
      // let tags = 'myphotoalbum';
      if (this.title) {
        form.append('context', `photo=${this.title}`);
        // tags = `myphotoalbum,${this.title}`;
      }
      // Upload to a custom folder
      // Note that by default, when uploading via the API, folders are not automatically created in your Media Library.
      // In order to automatically create the folders based on the API requests,
      // please go to your account upload settings and set the 'Auto-create folders' option to enabled.
      form.append('folder', this.title);
      // Add custom tags
      // form.append('tags', tags);
      // Add file to upload
      form.append('file', fileItem);

      // Use default "withCredentials" value for CORS requests
      fileItem.withCredentials = false;
      return { fileItem, form };
    };

    this.uploader.onProgressItem = (fileItem, progress) => {
      this.upload.setSettingsProfileImageUploadingProgress(progress);
    };

    // Update model on completion of uploading a file
    this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) =>
      this.upsertResponse(
        {
          file: item.file,
          status,
          data: JSON.parse(response)
        }
      );

    this.upload.setSettingsProfileImageUploadingStatus(false);
  }

  // Insert or update an entry in the responses array
  upsertResponse = fileItem => {

    // Run the update in a custom zone since for some reason change detection isn't performed
    // as part of the XHR request to upload the files.
    // Running in a custom zone forces change detection
    this.zone.run(() => {
      // Update an existing entry if it's upload hasn't completed yet

      // Find the id of an existing item
      const existingId = this.responses.reduce((prev, current, index) => {
        if (current.file.name === fileItem.file.name && !current.status) {
          return index;
        }
        return prev;
      }, -1);
      if (existingId > -1) {
        // Update existing item with new data
        this.responses[existingId] = Object.assign(this.responses[existingId], fileItem);
      } else {
        // Create new response
        this.responses.push(fileItem);
      }

      if (this.responses.length === this.uploadedImages.length) {
        this.responses.forEach(img => {
          this.uploadEnd.emit(img.data.secure_url);
        });

        this.uploadPercentageProgress = 85;
        setTimeout(() => {
          this.uploadPercentageProgress = 100;
        }, 1000);
      }

    });
  }

  uploadFile() {
    this.uploader.addToQueue(this.uploadedImages);
    this.uploader.uploadAll();
  }

  fileToBase64(es) {
    this.uploadedImages = [];
    const d = this;
    const file: File = es.target.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onload = (e: any) => {

      d.convertedBinary = e.target.result;
      d.binary.emit(e.target.result);
      d.uploadFile();
    };
    myReader.readAsDataURL(file);
    this.uploadedImages.push(file);
  }

  ngOnChanges(change: SimpleChanges) {
    if (change.fileToUpload) {
      this.fileToBase64(change.fileToUpload);
    }

    if (change.id) {
      this.id = change.id.currentValue;
    }

    if (change.affirm) {
      if (change.affirm.currentValue === true) {
        this.affirmImage();
      }
    }
  }

  affirmImage() {
    this.imagePreview = this.convertedBinary;
    this.uploadPercentageProgress = 30;
    this.uploadFile();
  }

  removeImage() {
    this.remove.emit(this.id);
  }

  uploadInitiated(e) {
    this.fileToUpload = e;
    this.fileToBase64(e);
  }

}
