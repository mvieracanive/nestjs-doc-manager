<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# Nest Doc Manager Module

A module for Nest.js for managing documents under the principle of separating file-system information and file’s medatadata.

## Description

For many information systems, no matter their complexity, if they handle files, they always can be conceptualize using the principle of file-system information plus file’s metadata. If we take this in consideration and also take into account that many information systems have to handle files, it could be a good idea to have prepared a module able to handle file’s basic use cases: upload, download, describe and find. **Doc Manger** is a module for **Nest.js** that wraps functions for accomplishing this behavior.

## How to use

For using this module the application must be able to use a relational database in order to save data. For storing file information this module creates a table named "doc_manager_mvc". It should also be noted that **Doc Manager** depends on **Multer** module.

In this guide it would be explained how to install and register the module, upload files, download files, how to define and use metadata and how to search files.

### Installation

```
npm install @mvieracanive/nest_doc_manager

```

### Registering the module

Module can be registered as follows:

```
DocumentModule.forRoot({
	username: DATABASE_USERNAME,
	password: DATABASE_PASSWORD,
	database: DATABASE_NAME,
	type: DATABASE_TYPE,
	multerdest:  FILE_UPLOAD_DIR
})

```

Or, as follows:

```
DocumentModule.forRootAsync({
useFactory: function (config: ConfigService) {
  return {
	username: config.get(DATABASE_USERNAME),
	password: config.get(DATABASE_PASSWORD),
	database: config.get(DATABASE_NAME),
	type: config.get(DATABASE_TYPE),
	multerdest: config.get(FILE_UPLOAD_DIR),
  } as DocModuleAsyncOptions;
},
  inject: ConfigService
})

```

Not all properties of _DocModuleAsyncOptions_ are mandatory, only: username, password and database. Default value for the others are type = ‘postgres’ and multerdest = ‘upload’.

### Describing a file

Following the principle of this module, data structure of any file would be:

```
<<File Type>> {
	id: number; //file unique id
	originalname: string;
	mimetype: string;
	filename: string;
	path: string;
	destination: string;
	size: number;
	encoding: string;
	created_on: Date;
	updated_on: Date;
	metadata: MetadataAbstract;
}

```

Fields _created_on_ and _updated_on_ do not need to be managed, as they area automatically updated in database. All other fields, but metadata, can be clearly applied to any system conceptualization as they are very common file data; please refer to Multer if there is any doubt about the purpose of those fields. Metadata is also perfectly adapted to any information system, but its specific definition may vary from design to design.

**Doc Manager Module** customization is all about defining metadata templates or classes inheriting from _MetadataAbstract_.

### Creating a metadata template

Let’s assume we would like to handle contract files in our system, if this is the case, the first thing to do would be to define a metadata template as follows.

```
export class ContractMetadata extends MetadataAbstract {
	effectiveDate: Date = null;
	terminationDate: Date = null;
	type: string = “”;
}
```

It is assumed a contract would have a date as of the contract is in force and a date as of contract is not valid any more. In addition this template is going to define a type.

IMPORTANT: it is very important to initialize every attribute of the class.

### Uploading a file

Now it is time to upload a file, it is possible to call the create method of service _DocumenService_:

```
_documentService: DocumentService;
//...
_documentService.create(file, metadata);
```

Where parameter “file” is file object uploaded by Multer and metadata is an object of any template, in this case _ContracMetadata_.

###Updating a file
For updating a file, it is necessary the id and an metadata object with data updated.

```
_documentService: DocumentService;
//...
_documentService.update(id, metadata);
```

###Removing a file
For removing a file, it is necessary only the id.

```
_documentService: DocumentService;
//...
_documentService.remove(id);
```

###Downloading a file
For downloading a file, it is necessary only the id.

```
_documentService: DocumentService;
//...
_documentService.downloadFileResponse (id);
```

This method would return an object of type _FileDownloadDto_, with the following attributes.

```
export class FileDownloadDto {
	filename: string;
	file: Buffer;
	path: string;
}
```

With this object you can edit the Response object and send it to client, but if you would like to have the response out-of-the-box for any reason you could use the following method instead.

```
_documentService: DocumentService;
//...
_documentService.generateResDownloadForController(id: number, res);
```

_generateResDownloadForController_ returns the response object _res_ edited, ready to be sent back to client for downloading file whose id is sent as parameter.

###Finding one file by id
For finding file-system data by file’s id you can use function _finOne()_

```
_documentService: DocumentService;
//...
_documentService.findOne (id);
```

Previous method returns an object of type _DocumentDto_

```
export class DocumentDto {
	originalname: string;
	mimetype: string;
	filename: string;
	path: string;
	destination: string;
	size: number;
	encoding: string;
	created_on: Date;
	updated_on: Date;
}
```

Also exists method _findOneMetadata_:

```
_documentService: DocumentService;
...
_documentService.findOneMetadata (id);
```

Previous method returns an object of type _DocumentMetadataDto_

```
export class DocumentMetadataDto {
	id: number;
	metadata: MetadataAbstract;
	originalname: string;
}
```

###Finders
Until now we have seen how to handle basic operations of files, but what about more complicated queries. Well, for that, finders are designed in this module. There is a service called _DocumentFinderService_, this service should offer the methods needed to find files based on their metadata. For example, let’s see the following example.

Consider we would like to find all files in database of type “contract”, for this, we could use the finder _findEquals()_.

```
_documentFinder: DocumentFinderService;
…
const result = await _documentFinder.findEquals({type: "contract"});

```

Every finder should return an array of _DocumentMetadataDto_

## License

Nest Notifier is [MIT licensed](LICENSE).
