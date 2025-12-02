ALTER TABLE dbo.Category
ADD
    parentId  INT            NULL,
    sortOrder INT            NULL,
    slug      NVARCHAR(100)  NULL,
    isActive  BIT            NOT NULL CONSTRAINT DF_Category_isActive DEFAULT (1),
    createdAt DATETIME2      NULL,
    updatedAt DATETIME2      NULL;

ALTER TABLE dbo.Category
ADD
    url_image  NVARCHAR(300)            NULL

Select * from Category
