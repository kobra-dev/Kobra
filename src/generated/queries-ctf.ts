import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {"context":{"clientName":"ctf"}}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * A date-time string at UTC, such as 2007-12-03T10:15:30Z,
   *     compliant with the 'date-time' format outlined in section 5.6 of
   *     the RFC 3339 profile of the ISO 8601 standard for representation
   *     of dates and times using the Gregorian calendar.
   */
  DateTime: any;
  /** The 'Dimension' type represents dimensions as whole numeric values between `1` and `4000`. */
  Dimension: any;
  /** The 'HexColor' type represents color in `rgb:ffffff` string format. */
  HexColor: any;
  /** The 'Quality' type represents quality as whole numeric values between `1` and `100`. */
  Quality: any;
};

/** An account (e.g. GitHub, Twitter, etc) [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/account) */
export type Account = Entry & {
  __typename?: 'Account';
  sys: Sys;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<AccountLinkingCollections>;
  name: Scalars['String'];
  url: KeyValuePair;
  icon: FontAwesomeIcon;
};


/** An account (e.g. GitHub, Twitter, etc) [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/account) */
export type AccountLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** An account (e.g. GitHub, Twitter, etc) [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/account) */
export type AccountNameArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** An account (e.g. GitHub, Twitter, etc) [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/account) */
export type AccountUrlArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


/** An account (e.g. GitHub, Twitter, etc) [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/account) */
export type AccountIconArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type AccountCollection = {
  __typename?: 'AccountCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Account>;
};

export type AccountFilter = {
  url?: Maybe<CfKeyValuePairNestedFilter>;
  icon?: Maybe<CfFontAwesomeIconNestedFilter>;
  sys?: Maybe<SysFilter>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  name_exists?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  name_contains?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  url_exists?: Maybe<Scalars['Boolean']>;
  icon_exists?: Maybe<Scalars['Boolean']>;
  OR?: Maybe<Array<Maybe<AccountFilter>>>;
  AND?: Maybe<Array<Maybe<AccountFilter>>>;
};

export type AccountLinkingCollections = {
  __typename?: 'AccountLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  footerCollection?: Maybe<FooterCollection>;
};


export type AccountLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type AccountLinkingCollectionsFooterCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum AccountOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** Represents a binary file in a space. An asset can be any file type. */
export type Asset = {
  __typename?: 'Asset';
  sys: Sys;
  contentfulMetadata: ContentfulMetadata;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  contentType?: Maybe<Scalars['String']>;
  fileName?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  linkedFrom?: Maybe<AssetLinkingCollections>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetUrlArgs = {
  transform?: Maybe<ImageTransformOptions>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AssetCollection = {
  __typename?: 'AssetCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Asset>>;
};

export type AssetFilter = {
  sys?: Maybe<SysFilter>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  title_not?: Maybe<Scalars['String']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_contains?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  description_exists?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  description_not?: Maybe<Scalars['String']>;
  description_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  description_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  description_contains?: Maybe<Scalars['String']>;
  description_not_contains?: Maybe<Scalars['String']>;
  url_exists?: Maybe<Scalars['Boolean']>;
  url?: Maybe<Scalars['String']>;
  url_not?: Maybe<Scalars['String']>;
  url_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  url_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  url_contains?: Maybe<Scalars['String']>;
  url_not_contains?: Maybe<Scalars['String']>;
  size_exists?: Maybe<Scalars['Boolean']>;
  size?: Maybe<Scalars['Int']>;
  size_not?: Maybe<Scalars['Int']>;
  size_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  size_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  size_gt?: Maybe<Scalars['Int']>;
  size_gte?: Maybe<Scalars['Int']>;
  size_lt?: Maybe<Scalars['Int']>;
  size_lte?: Maybe<Scalars['Int']>;
  contentType_exists?: Maybe<Scalars['Boolean']>;
  contentType?: Maybe<Scalars['String']>;
  contentType_not?: Maybe<Scalars['String']>;
  contentType_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentType_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentType_contains?: Maybe<Scalars['String']>;
  contentType_not_contains?: Maybe<Scalars['String']>;
  fileName_exists?: Maybe<Scalars['Boolean']>;
  fileName?: Maybe<Scalars['String']>;
  fileName_not?: Maybe<Scalars['String']>;
  fileName_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  fileName_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  fileName_contains?: Maybe<Scalars['String']>;
  fileName_not_contains?: Maybe<Scalars['String']>;
  width_exists?: Maybe<Scalars['Boolean']>;
  width?: Maybe<Scalars['Int']>;
  width_not?: Maybe<Scalars['Int']>;
  width_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  width_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  width_gt?: Maybe<Scalars['Int']>;
  width_gte?: Maybe<Scalars['Int']>;
  width_lt?: Maybe<Scalars['Int']>;
  width_lte?: Maybe<Scalars['Int']>;
  height_exists?: Maybe<Scalars['Boolean']>;
  height?: Maybe<Scalars['Int']>;
  height_not?: Maybe<Scalars['Int']>;
  height_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  height_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  height_gt?: Maybe<Scalars['Int']>;
  height_gte?: Maybe<Scalars['Int']>;
  height_lt?: Maybe<Scalars['Int']>;
  height_lte?: Maybe<Scalars['Int']>;
  OR?: Maybe<Array<Maybe<AssetFilter>>>;
  AND?: Maybe<Array<Maybe<AssetFilter>>>;
};

export type AssetLinkingCollections = {
  __typename?: 'AssetLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  twoBlocksCollection?: Maybe<TwoBlocksCollection>;
  navbarCollection?: Maybe<NavbarCollection>;
  mastheadCollection?: Maybe<MastheadCollection>;
  footerCollection?: Maybe<FooterCollection>;
  iconOrImageCollection?: Maybe<IconOrImageCollection>;
};


export type AssetLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type AssetLinkingCollectionsTwoBlocksCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type AssetLinkingCollectionsNavbarCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type AssetLinkingCollectionsMastheadCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type AssetLinkingCollectionsFooterCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type AssetLinkingCollectionsIconOrImageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum AssetOrder {
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  ContentTypeAsc = 'contentType_ASC',
  ContentTypeDesc = 'contentType_DESC',
  FileNameAsc = 'fileName_ASC',
  FileNameDesc = 'fileName_DESC',
  WidthAsc = 'width_ASC',
  WidthDesc = 'width_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** A content section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/content) */
export type Content = Entry & {
  __typename?: 'Content';
  sys: Sys;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<ContentLinkingCollections>;
  heading: Scalars['String'];
  description: Scalars['String'];
  media?: Maybe<IconOrImage>;
  imageOnLeft?: Maybe<Scalars['Boolean']>;
  callToActionButton?: Maybe<FooterLink>;
};


/** A content section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/content) */
export type ContentLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** A content section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/content) */
export type ContentHeadingArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** A content section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/content) */
export type ContentDescriptionArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** A content section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/content) */
export type ContentMediaArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


/** A content section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/content) */
export type ContentImageOnLeftArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** A content section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/content) */
export type ContentCallToActionButtonArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type ContentCollection = {
  __typename?: 'ContentCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Content>;
};

export type ContentFilter = {
  media?: Maybe<CfIconOrImageNestedFilter>;
  callToActionButton?: Maybe<CfFooterLinkNestedFilter>;
  sys?: Maybe<SysFilter>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  heading_exists?: Maybe<Scalars['Boolean']>;
  heading?: Maybe<Scalars['String']>;
  heading_not?: Maybe<Scalars['String']>;
  heading_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  heading_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  heading_contains?: Maybe<Scalars['String']>;
  heading_not_contains?: Maybe<Scalars['String']>;
  description_exists?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  description_not?: Maybe<Scalars['String']>;
  description_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  description_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  description_contains?: Maybe<Scalars['String']>;
  description_not_contains?: Maybe<Scalars['String']>;
  media_exists?: Maybe<Scalars['Boolean']>;
  imageOnLeft_exists?: Maybe<Scalars['Boolean']>;
  imageOnLeft?: Maybe<Scalars['Boolean']>;
  imageOnLeft_not?: Maybe<Scalars['Boolean']>;
  callToActionButton_exists?: Maybe<Scalars['Boolean']>;
  OR?: Maybe<Array<Maybe<ContentFilter>>>;
  AND?: Maybe<Array<Maybe<ContentFilter>>>;
};

export type ContentLinkingCollections = {
  __typename?: 'ContentLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageCollection?: Maybe<PageCollection>;
};


export type ContentLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type ContentLinkingCollectionsPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum ContentOrder {
  HeadingAsc = 'heading_ASC',
  HeadingDesc = 'heading_DESC',
  ImageOnLeftAsc = 'imageOnLeft_ASC',
  ImageOnLeftDesc = 'imageOnLeft_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type ContentfulMetadata = {
  __typename?: 'ContentfulMetadata';
  tags: Array<Maybe<ContentfulTag>>;
};

export type ContentfulMetadataFilter = {
  tags_exists?: Maybe<Scalars['Boolean']>;
  tags?: Maybe<ContentfulMetadataTagsFilter>;
};

export type ContentfulMetadataTagsFilter = {
  id_contains_all?: Maybe<Array<Maybe<Scalars['String']>>>;
  id_contains_some?: Maybe<Array<Maybe<Scalars['String']>>>;
  id_contains_none?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/**
 * Represents a tag entity for finding and organizing content easily.
 *     Find out more here: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-tags
 */
export type ContentfulTag = {
  __typename?: 'ContentfulTag';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};


/** A demo section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/demo) */
export type Demo = Entry & {
  __typename?: 'Demo';
  sys: Sys;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<DemoLinkingCollections>;
  heading: Scalars['String'];
  url: KeyValuePair;
};


/** A demo section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/demo) */
export type DemoLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** A demo section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/demo) */
export type DemoHeadingArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** A demo section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/demo) */
export type DemoUrlArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type DemoCollection = {
  __typename?: 'DemoCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Demo>;
};

export type DemoFilter = {
  url?: Maybe<CfKeyValuePairNestedFilter>;
  sys?: Maybe<SysFilter>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  heading_exists?: Maybe<Scalars['Boolean']>;
  heading?: Maybe<Scalars['String']>;
  heading_not?: Maybe<Scalars['String']>;
  heading_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  heading_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  heading_contains?: Maybe<Scalars['String']>;
  heading_not_contains?: Maybe<Scalars['String']>;
  url_exists?: Maybe<Scalars['Boolean']>;
  OR?: Maybe<Array<Maybe<DemoFilter>>>;
  AND?: Maybe<Array<Maybe<DemoFilter>>>;
};

export type DemoLinkingCollections = {
  __typename?: 'DemoLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageCollection?: Maybe<PageCollection>;
};


export type DemoLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type DemoLinkingCollectionsPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum DemoOrder {
  HeadingAsc = 'heading_ASC',
  HeadingDesc = 'heading_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}


export type Entry = {
  sys: Sys;
  contentfulMetadata: ContentfulMetadata;
};

export type EntryCollection = {
  __typename?: 'EntryCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Maybe<Entry>>;
};

export type EntryFilter = {
  sys?: Maybe<SysFilter>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  OR?: Maybe<Array<Maybe<EntryFilter>>>;
  AND?: Maybe<Array<Maybe<EntryFilter>>>;
};

export enum EntryOrder {
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** A feature to display in a features section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/feature) */
export type Feature = Entry & {
  __typename?: 'Feature';
  sys: Sys;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<FeatureLinkingCollections>;
  heading: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  media?: Maybe<IconOrImage>;
};


/** A feature to display in a features section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/feature) */
export type FeatureLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** A feature to display in a features section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/feature) */
export type FeatureHeadingArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** A feature to display in a features section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/feature) */
export type FeatureDescriptionArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** A feature to display in a features section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/feature) */
export type FeatureMediaArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type FeatureCollection = {
  __typename?: 'FeatureCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Feature>;
};

export type FeatureFilter = {
  media?: Maybe<CfIconOrImageNestedFilter>;
  sys?: Maybe<SysFilter>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  heading_exists?: Maybe<Scalars['Boolean']>;
  heading?: Maybe<Scalars['String']>;
  heading_not?: Maybe<Scalars['String']>;
  heading_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  heading_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  heading_contains?: Maybe<Scalars['String']>;
  heading_not_contains?: Maybe<Scalars['String']>;
  description_exists?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  description_not?: Maybe<Scalars['String']>;
  description_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  description_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  description_contains?: Maybe<Scalars['String']>;
  description_not_contains?: Maybe<Scalars['String']>;
  media_exists?: Maybe<Scalars['Boolean']>;
  OR?: Maybe<Array<Maybe<FeatureFilter>>>;
  AND?: Maybe<Array<Maybe<FeatureFilter>>>;
};

export type FeatureLinkingCollections = {
  __typename?: 'FeatureLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  featuresCollection?: Maybe<FeaturesCollection>;
};


export type FeatureLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type FeatureLinkingCollectionsFeaturesCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum FeatureOrder {
  HeadingAsc = 'heading_ASC',
  HeadingDesc = 'heading_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** Features section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/features) */
export type Features = Entry & {
  __typename?: 'Features';
  sys: Sys;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<FeaturesLinkingCollections>;
  heading: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  featuresCollection?: Maybe<FeaturesFeaturesCollection>;
};


/** Features section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/features) */
export type FeaturesLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** Features section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/features) */
export type FeaturesHeadingArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Features section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/features) */
export type FeaturesDescriptionArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Features section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/features) */
export type FeaturesFeaturesCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type FeaturesCollection = {
  __typename?: 'FeaturesCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Features>;
};

export type FeaturesFeaturesCollection = {
  __typename?: 'FeaturesFeaturesCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Feature>;
};

export type FeaturesFilter = {
  sys?: Maybe<SysFilter>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  heading_exists?: Maybe<Scalars['Boolean']>;
  heading?: Maybe<Scalars['String']>;
  heading_not?: Maybe<Scalars['String']>;
  heading_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  heading_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  heading_contains?: Maybe<Scalars['String']>;
  heading_not_contains?: Maybe<Scalars['String']>;
  description_exists?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  description_not?: Maybe<Scalars['String']>;
  description_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  description_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  description_contains?: Maybe<Scalars['String']>;
  description_not_contains?: Maybe<Scalars['String']>;
  featuresCollection_exists?: Maybe<Scalars['Boolean']>;
  OR?: Maybe<Array<Maybe<FeaturesFilter>>>;
  AND?: Maybe<Array<Maybe<FeaturesFilter>>>;
};

export type FeaturesLinkingCollections = {
  __typename?: 'FeaturesLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageCollection?: Maybe<PageCollection>;
};


export type FeaturesLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type FeaturesLinkingCollectionsPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum FeaturesOrder {
  HeadingAsc = 'heading_ASC',
  HeadingDesc = 'heading_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/fontAwesomeIcon) */
export type FontAwesomeIcon = Entry & {
  __typename?: 'FontAwesomeIcon';
  sys: Sys;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<FontAwesomeIconLinkingCollections>;
  name: Scalars['String'];
  collection?: Maybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/fontAwesomeIcon) */
export type FontAwesomeIconLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/fontAwesomeIcon) */
export type FontAwesomeIconNameArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/fontAwesomeIcon) */
export type FontAwesomeIconCollectionArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type FontAwesomeIconCollection = {
  __typename?: 'FontAwesomeIconCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<FontAwesomeIcon>;
};

export type FontAwesomeIconFilter = {
  sys?: Maybe<SysFilter>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  name_exists?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  name_contains?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  collection_exists?: Maybe<Scalars['Boolean']>;
  collection?: Maybe<Scalars['String']>;
  collection_not?: Maybe<Scalars['String']>;
  collection_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  collection_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  collection_contains?: Maybe<Scalars['String']>;
  collection_not_contains?: Maybe<Scalars['String']>;
  OR?: Maybe<Array<Maybe<FontAwesomeIconFilter>>>;
  AND?: Maybe<Array<Maybe<FontAwesomeIconFilter>>>;
};

export type FontAwesomeIconLinkingCollections = {
  __typename?: 'FontAwesomeIconLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  accountCollection?: Maybe<AccountCollection>;
};


export type FontAwesomeIconLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type FontAwesomeIconLinkingCollectionsAccountCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum FontAwesomeIconOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  CollectionAsc = 'collection_ASC',
  CollectionDesc = 'collection_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** A footer section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/footer) */
export type Footer = Entry & {
  __typename?: 'Footer';
  sys: Sys;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<FooterLinkingCollections>;
  id: Scalars['String'];
  organizationName: KeyValuePair;
  organizationIcon: Asset;
  iconsCollection: FooterIconsCollection;
  linksCollection: FooterLinksCollection;
};


/** A footer section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/footer) */
export type FooterLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** A footer section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/footer) */
export type FooterIdArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** A footer section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/footer) */
export type FooterOrganizationNameArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


/** A footer section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/footer) */
export type FooterOrganizationIconArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


/** A footer section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/footer) */
export type FooterIconsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


/** A footer section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/footer) */
export type FooterLinksCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type FooterCollection = {
  __typename?: 'FooterCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Footer>;
};

export type FooterFilter = {
  organizationName?: Maybe<CfKeyValuePairNestedFilter>;
  sys?: Maybe<SysFilter>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  id_exists?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  id_not?: Maybe<Scalars['String']>;
  id_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  id_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  id_contains?: Maybe<Scalars['String']>;
  id_not_contains?: Maybe<Scalars['String']>;
  organizationName_exists?: Maybe<Scalars['Boolean']>;
  organizationIcon_exists?: Maybe<Scalars['Boolean']>;
  iconsCollection_exists?: Maybe<Scalars['Boolean']>;
  linksCollection_exists?: Maybe<Scalars['Boolean']>;
  OR?: Maybe<Array<Maybe<FooterFilter>>>;
  AND?: Maybe<Array<Maybe<FooterFilter>>>;
};

export type FooterIconsCollection = {
  __typename?: 'FooterIconsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Account>;
};

/** [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/footerLink) */
export type FooterLink = Entry & {
  __typename?: 'FooterLink';
  sys: Sys;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<FooterLinkLinkingCollections>;
  text: Scalars['String'];
  url: KeyValuePair;
};


/** [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/footerLink) */
export type FooterLinkLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/footerLink) */
export type FooterLinkTextArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/footerLink) */
export type FooterLinkUrlArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type FooterLinkCollection = {
  __typename?: 'FooterLinkCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<FooterLink>;
};

export type FooterLinkFilter = {
  url?: Maybe<CfKeyValuePairNestedFilter>;
  sys?: Maybe<SysFilter>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  text_exists?: Maybe<Scalars['Boolean']>;
  text?: Maybe<Scalars['String']>;
  text_not?: Maybe<Scalars['String']>;
  text_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  text_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  text_contains?: Maybe<Scalars['String']>;
  text_not_contains?: Maybe<Scalars['String']>;
  url_exists?: Maybe<Scalars['Boolean']>;
  OR?: Maybe<Array<Maybe<FooterLinkFilter>>>;
  AND?: Maybe<Array<Maybe<FooterLinkFilter>>>;
};

export type FooterLinkLinkingCollections = {
  __typename?: 'FooterLinkLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  twoBlocksCollection?: Maybe<TwoBlocksCollection>;
  navbarButtonCollection?: Maybe<NavbarButtonCollection>;
  mastheadCollection?: Maybe<MastheadCollection>;
  contentCollection?: Maybe<ContentCollection>;
  footerCollection?: Maybe<FooterCollection>;
};


export type FooterLinkLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type FooterLinkLinkingCollectionsTwoBlocksCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type FooterLinkLinkingCollectionsNavbarButtonCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type FooterLinkLinkingCollectionsMastheadCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type FooterLinkLinkingCollectionsContentCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type FooterLinkLinkingCollectionsFooterCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum FooterLinkOrder {
  TextAsc = 'text_ASC',
  TextDesc = 'text_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type FooterLinkingCollections = {
  __typename?: 'FooterLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageCollection?: Maybe<PageCollection>;
};


export type FooterLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type FooterLinkingCollectionsPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type FooterLinksCollection = {
  __typename?: 'FooterLinksCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<FooterLink>;
};

export enum FooterOrder {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}


/** Either a Font Awesome icon or an image [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/iconOrImage) */
export type IconOrImage = Entry & {
  __typename?: 'IconOrImage';
  sys: Sys;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<IconOrImageLinkingCollections>;
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Asset>;
  faIconName?: Maybe<Scalars['String']>;
};


/** Either a Font Awesome icon or an image [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/iconOrImage) */
export type IconOrImageLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** Either a Font Awesome icon or an image [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/iconOrImage) */
export type IconOrImageIdArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Either a Font Awesome icon or an image [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/iconOrImage) */
export type IconOrImageImageArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


/** Either a Font Awesome icon or an image [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/iconOrImage) */
export type IconOrImageFaIconNameArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type IconOrImageCollection = {
  __typename?: 'IconOrImageCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<IconOrImage>;
};

export type IconOrImageFilter = {
  sys?: Maybe<SysFilter>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  id_exists?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  id_not?: Maybe<Scalars['String']>;
  id_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  id_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  id_contains?: Maybe<Scalars['String']>;
  id_not_contains?: Maybe<Scalars['String']>;
  image_exists?: Maybe<Scalars['Boolean']>;
  faIconName_exists?: Maybe<Scalars['Boolean']>;
  faIconName?: Maybe<Scalars['String']>;
  faIconName_not?: Maybe<Scalars['String']>;
  faIconName_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  faIconName_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  faIconName_contains?: Maybe<Scalars['String']>;
  faIconName_not_contains?: Maybe<Scalars['String']>;
  OR?: Maybe<Array<Maybe<IconOrImageFilter>>>;
  AND?: Maybe<Array<Maybe<IconOrImageFilter>>>;
};

export type IconOrImageLinkingCollections = {
  __typename?: 'IconOrImageLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  contentCollection?: Maybe<ContentCollection>;
  featureCollection?: Maybe<FeatureCollection>;
};


export type IconOrImageLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type IconOrImageLinkingCollectionsContentCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type IconOrImageLinkingCollectionsFeatureCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum IconOrImageOrder {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FaIconNameAsc = 'faIconName_ASC',
  FaIconNameDesc = 'faIconName_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum ImageFormat {
  /** JPG image format. */
  Jpg = 'JPG',
  /**
   * Progressive JPG format stores multiple passes of an image in progressively higher detail.
   *         When a progressive image is loading, the viewer will first see a lower quality pixelated version which
   *         will gradually improve in detail, until the image is fully downloaded. This is to display an image as
   *         early as possible to make the layout look as designed.
   */
  JpgProgressive = 'JPG_PROGRESSIVE',
  /** PNG image format */
  Png = 'PNG',
  /**
   * 8-bit PNG images support up to 256 colors and weigh less than the standard 24-bit PNG equivalent.
   *         The 8-bit PNG format is mostly used for simple images, such as icons or logos.
   */
  Png8 = 'PNG8',
  /** WebP image format. */
  Webp = 'WEBP'
}

export enum ImageResizeFocus {
  /** Focus the resizing on the center. */
  Center = 'CENTER',
  /** Focus the resizing on the top. */
  Top = 'TOP',
  /** Focus the resizing on the top right. */
  TopRight = 'TOP_RIGHT',
  /** Focus the resizing on the right. */
  Right = 'RIGHT',
  /** Focus the resizing on the bottom right. */
  BottomRight = 'BOTTOM_RIGHT',
  /** Focus the resizing on the bottom. */
  Bottom = 'BOTTOM',
  /** Focus the resizing on the bottom left. */
  BottomLeft = 'BOTTOM_LEFT',
  /** Focus the resizing on the left. */
  Left = 'LEFT',
  /** Focus the resizing on the top left. */
  TopLeft = 'TOP_LEFT',
  /** Focus the resizing on the largest face. */
  Face = 'FACE',
  /** Focus the resizing on the area containing all the faces. */
  Faces = 'FACES'
}

export enum ImageResizeStrategy {
  /** Resizes the image to fit into the specified dimensions. */
  Fit = 'FIT',
  /**
   * Resizes the image to the specified dimensions, padding the image if needed.
   *         Uses desired background color as padding color.
   */
  Pad = 'PAD',
  /** Resizes the image to the specified dimensions, cropping the image if needed. */
  Fill = 'FILL',
  /** Resizes the image to the specified dimensions, changing the original aspect ratio if needed. */
  Scale = 'SCALE',
  /** Crops a part of the original image to fit into the specified dimensions. */
  Crop = 'CROP',
  /** Creates a thumbnail from the image. */
  Thumb = 'THUMB'
}

export type ImageTransformOptions = {
  /** Desired width in pixels. Defaults to the original image width. */
  width?: Maybe<Scalars['Dimension']>;
  /** Desired height in pixels. Defaults to the original image height. */
  height?: Maybe<Scalars['Dimension']>;
  /**
   * Desired quality of the image in percents.
   *         Used for `PNG8`, `JPG`, `JPG_PROGRESSIVE` and `WEBP` formats.
   */
  quality?: Maybe<Scalars['Quality']>;
  /**
   * Desired corner radius in pixels.
   *         Results in an image with rounded corners (pass `-1` for a full circle/ellipse).
   *         Defaults to `0`. Uses desired background color as padding color,
   *         unless the format is `JPG` or `JPG_PROGRESSIVE` and resize strategy is `PAD`, then defaults to white.
   */
  cornerRadius?: Maybe<Scalars['Int']>;
  /** Desired resize strategy. Defaults to `FIT`. */
  resizeStrategy?: Maybe<ImageResizeStrategy>;
  /** Desired resize focus area. Defaults to `CENTER`. */
  resizeFocus?: Maybe<ImageResizeFocus>;
  /**
   * Desired background color, used with corner radius or `PAD` resize strategy.
   *         Defaults to transparent (for `PNG`, `PNG8` and `WEBP`) or white (for `JPG` and `JPG_PROGRESSIVE`).
   */
  backgroundColor?: Maybe<Scalars['HexColor']>;
  /** Desired image format. Defaults to the original image format. */
  format?: Maybe<ImageFormat>;
};

/** Type for storing miscellaneous information [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/keyValuePair) */
export type KeyValuePair = Entry & {
  __typename?: 'KeyValuePair';
  sys: Sys;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<KeyValuePairLinkingCollections>;
  key: Scalars['String'];
  value: Scalars['String'];
};


/** Type for storing miscellaneous information [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/keyValuePair) */
export type KeyValuePairLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** Type for storing miscellaneous information [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/keyValuePair) */
export type KeyValuePairKeyArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Type for storing miscellaneous information [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/keyValuePair) */
export type KeyValuePairValueArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type KeyValuePairCollection = {
  __typename?: 'KeyValuePairCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<KeyValuePair>;
};

export type KeyValuePairFilter = {
  sys?: Maybe<SysFilter>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  key_exists?: Maybe<Scalars['Boolean']>;
  key?: Maybe<Scalars['String']>;
  key_not?: Maybe<Scalars['String']>;
  key_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  key_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  key_contains?: Maybe<Scalars['String']>;
  key_not_contains?: Maybe<Scalars['String']>;
  value_exists?: Maybe<Scalars['Boolean']>;
  value?: Maybe<Scalars['String']>;
  value_not?: Maybe<Scalars['String']>;
  value_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  value_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  value_contains?: Maybe<Scalars['String']>;
  value_not_contains?: Maybe<Scalars['String']>;
  OR?: Maybe<Array<Maybe<KeyValuePairFilter>>>;
  AND?: Maybe<Array<Maybe<KeyValuePairFilter>>>;
};

export type KeyValuePairLinkingCollections = {
  __typename?: 'KeyValuePairLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  mastheadCollection?: Maybe<MastheadCollection>;
  footerLinkCollection?: Maybe<FooterLinkCollection>;
  footerCollection?: Maybe<FooterCollection>;
  accountCollection?: Maybe<AccountCollection>;
  demoCollection?: Maybe<DemoCollection>;
};


export type KeyValuePairLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type KeyValuePairLinkingCollectionsMastheadCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type KeyValuePairLinkingCollectionsFooterLinkCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type KeyValuePairLinkingCollectionsFooterCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type KeyValuePairLinkingCollectionsAccountCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type KeyValuePairLinkingCollectionsDemoCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum KeyValuePairOrder {
  KeyAsc = 'key_ASC',
  KeyDesc = 'key_DESC',
  ValueAsc = 'value_ASC',
  ValueDesc = 'value_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** A masthead section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/masthead) */
export type Masthead = Entry & {
  __typename?: 'Masthead';
  sys: Sys;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<MastheadLinkingCollections>;
  heading: Scalars['String'];
  subheading: KeyValuePair;
  image: Asset;
  callToActionButton: FooterLink;
  subtext: Scalars['String'];
};


/** A masthead section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/masthead) */
export type MastheadLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** A masthead section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/masthead) */
export type MastheadHeadingArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** A masthead section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/masthead) */
export type MastheadSubheadingArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


/** A masthead section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/masthead) */
export type MastheadImageArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


/** A masthead section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/masthead) */
export type MastheadCallToActionButtonArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


/** A masthead section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/masthead) */
export type MastheadSubtextArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type MastheadCollection = {
  __typename?: 'MastheadCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Masthead>;
};

export type MastheadFilter = {
  subheading?: Maybe<CfKeyValuePairNestedFilter>;
  callToActionButton?: Maybe<CfFooterLinkNestedFilter>;
  sys?: Maybe<SysFilter>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  heading_exists?: Maybe<Scalars['Boolean']>;
  heading?: Maybe<Scalars['String']>;
  heading_not?: Maybe<Scalars['String']>;
  heading_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  heading_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  heading_contains?: Maybe<Scalars['String']>;
  heading_not_contains?: Maybe<Scalars['String']>;
  subheading_exists?: Maybe<Scalars['Boolean']>;
  image_exists?: Maybe<Scalars['Boolean']>;
  callToActionButton_exists?: Maybe<Scalars['Boolean']>;
  subtext_exists?: Maybe<Scalars['Boolean']>;
  subtext?: Maybe<Scalars['String']>;
  subtext_not?: Maybe<Scalars['String']>;
  subtext_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  subtext_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  subtext_contains?: Maybe<Scalars['String']>;
  subtext_not_contains?: Maybe<Scalars['String']>;
  OR?: Maybe<Array<Maybe<MastheadFilter>>>;
  AND?: Maybe<Array<Maybe<MastheadFilter>>>;
};

export type MastheadLinkingCollections = {
  __typename?: 'MastheadLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageCollection?: Maybe<PageCollection>;
};


export type MastheadLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type MastheadLinkingCollectionsPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum MastheadOrder {
  HeadingAsc = 'heading_ASC',
  HeadingDesc = 'heading_DESC',
  SubtextAsc = 'subtext_ASC',
  SubtextDesc = 'subtext_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/navbar) */
export type Navbar = Entry & {
  __typename?: 'Navbar';
  sys: Sys;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<NavbarLinkingCollections>;
  logo: Asset;
  buttonsCollection: NavbarButtonsCollection;
};


/** [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/navbar) */
export type NavbarLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/navbar) */
export type NavbarLogoArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/navbar) */
export type NavbarButtonsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

/** [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/navbarButton) */
export type NavbarButton = Entry & {
  __typename?: 'NavbarButton';
  sys: Sys;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<NavbarButtonLinkingCollections>;
  isBrandColorBackground: Scalars['Boolean'];
  texturlPair: FooterLink;
};


/** [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/navbarButton) */
export type NavbarButtonLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/navbarButton) */
export type NavbarButtonIsBrandColorBackgroundArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/navbarButton) */
export type NavbarButtonTexturlPairArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type NavbarButtonCollection = {
  __typename?: 'NavbarButtonCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<NavbarButton>;
};

export type NavbarButtonFilter = {
  texturlPair?: Maybe<CfFooterLinkNestedFilter>;
  sys?: Maybe<SysFilter>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  isBrandColorBackground_exists?: Maybe<Scalars['Boolean']>;
  isBrandColorBackground?: Maybe<Scalars['Boolean']>;
  isBrandColorBackground_not?: Maybe<Scalars['Boolean']>;
  texturlPair_exists?: Maybe<Scalars['Boolean']>;
  OR?: Maybe<Array<Maybe<NavbarButtonFilter>>>;
  AND?: Maybe<Array<Maybe<NavbarButtonFilter>>>;
};

export type NavbarButtonLinkingCollections = {
  __typename?: 'NavbarButtonLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  navbarCollection?: Maybe<NavbarCollection>;
};


export type NavbarButtonLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type NavbarButtonLinkingCollectionsNavbarCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum NavbarButtonOrder {
  IsBrandColorBackgroundAsc = 'isBrandColorBackground_ASC',
  IsBrandColorBackgroundDesc = 'isBrandColorBackground_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type NavbarButtonsCollection = {
  __typename?: 'NavbarButtonsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<NavbarButton>;
};

export type NavbarCollection = {
  __typename?: 'NavbarCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Navbar>;
};

export type NavbarFilter = {
  sys?: Maybe<SysFilter>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  logo_exists?: Maybe<Scalars['Boolean']>;
  buttonsCollection_exists?: Maybe<Scalars['Boolean']>;
  OR?: Maybe<Array<Maybe<NavbarFilter>>>;
  AND?: Maybe<Array<Maybe<NavbarFilter>>>;
};

export type NavbarLinkingCollections = {
  __typename?: 'NavbarLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageCollection?: Maybe<PageCollection>;
};


export type NavbarLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type NavbarLinkingCollectionsPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum NavbarOrder {
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** Content to show in a landing page [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/page) */
export type Page = Entry & {
  __typename?: 'Page';
  sys: Sys;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<PageLinkingCollections>;
  id: Scalars['String'];
  navbar: Navbar;
  contentsCollection: PageContentsCollection;
};


/** Content to show in a landing page [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/page) */
export type PageLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** Content to show in a landing page [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/page) */
export type PageIdArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Content to show in a landing page [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/page) */
export type PageNavbarArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


/** Content to show in a landing page [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/page) */
export type PageContentsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type PageCollection = {
  __typename?: 'PageCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Page>;
};

export type PageContentsCollection = {
  __typename?: 'PageContentsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<PageContentsItem>;
};

export type PageContentsItem = Content | Demo | Features | Footer | Masthead | Reviews | TwoBlocks;

export type PageFilter = {
  navbar?: Maybe<CfNavbarNestedFilter>;
  sys?: Maybe<SysFilter>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  id_exists?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  id_not?: Maybe<Scalars['String']>;
  id_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  id_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  id_contains?: Maybe<Scalars['String']>;
  id_not_contains?: Maybe<Scalars['String']>;
  navbar_exists?: Maybe<Scalars['Boolean']>;
  contentsCollection_exists?: Maybe<Scalars['Boolean']>;
  OR?: Maybe<Array<Maybe<PageFilter>>>;
  AND?: Maybe<Array<Maybe<PageFilter>>>;
};

export type PageLinkingCollections = {
  __typename?: 'PageLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
};


export type PageLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum PageOrder {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}


export type Query = {
  __typename?: 'Query';
  asset?: Maybe<Asset>;
  assetCollection?: Maybe<AssetCollection>;
  page?: Maybe<Page>;
  pageCollection?: Maybe<PageCollection>;
  twoBlocks?: Maybe<TwoBlocks>;
  twoBlocksCollection?: Maybe<TwoBlocksCollection>;
  navbar?: Maybe<Navbar>;
  navbarCollection?: Maybe<NavbarCollection>;
  navbarButton?: Maybe<NavbarButton>;
  navbarButtonCollection?: Maybe<NavbarButtonCollection>;
  reviews?: Maybe<Reviews>;
  reviewsCollection?: Maybe<ReviewsCollection>;
  review?: Maybe<Review>;
  reviewCollection?: Maybe<ReviewCollection>;
  masthead?: Maybe<Masthead>;
  mastheadCollection?: Maybe<MastheadCollection>;
  content?: Maybe<Content>;
  contentCollection?: Maybe<ContentCollection>;
  footerLink?: Maybe<FooterLink>;
  footerLinkCollection?: Maybe<FooterLinkCollection>;
  footer?: Maybe<Footer>;
  footerCollection?: Maybe<FooterCollection>;
  account?: Maybe<Account>;
  accountCollection?: Maybe<AccountCollection>;
  fontAwesomeIcon?: Maybe<FontAwesomeIcon>;
  fontAwesomeIconCollection?: Maybe<FontAwesomeIconCollection>;
  iconOrImage?: Maybe<IconOrImage>;
  iconOrImageCollection?: Maybe<IconOrImageCollection>;
  features?: Maybe<Features>;
  featuresCollection?: Maybe<FeaturesCollection>;
  demo?: Maybe<Demo>;
  demoCollection?: Maybe<DemoCollection>;
  feature?: Maybe<Feature>;
  featureCollection?: Maybe<FeatureCollection>;
  keyValuePair?: Maybe<KeyValuePair>;
  keyValuePairCollection?: Maybe<KeyValuePairCollection>;
  entryCollection?: Maybe<EntryCollection>;
};


export type QueryAssetArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryAssetCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<AssetFilter>;
  order?: Maybe<Array<Maybe<AssetOrder>>>;
};


export type QueryPageArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<PageFilter>;
  order?: Maybe<Array<Maybe<PageOrder>>>;
};


export type QueryTwoBlocksArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryTwoBlocksCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<TwoBlocksFilter>;
  order?: Maybe<Array<Maybe<TwoBlocksOrder>>>;
};


export type QueryNavbarArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryNavbarCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<NavbarFilter>;
  order?: Maybe<Array<Maybe<NavbarOrder>>>;
};


export type QueryNavbarButtonArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryNavbarButtonCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<NavbarButtonFilter>;
  order?: Maybe<Array<Maybe<NavbarButtonOrder>>>;
};


export type QueryReviewsArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryReviewsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<ReviewsFilter>;
  order?: Maybe<Array<Maybe<ReviewsOrder>>>;
};


export type QueryReviewArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryReviewCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<ReviewFilter>;
  order?: Maybe<Array<Maybe<ReviewOrder>>>;
};


export type QueryMastheadArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryMastheadCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<MastheadFilter>;
  order?: Maybe<Array<Maybe<MastheadOrder>>>;
};


export type QueryContentArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryContentCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<ContentFilter>;
  order?: Maybe<Array<Maybe<ContentOrder>>>;
};


export type QueryFooterLinkArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryFooterLinkCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<FooterLinkFilter>;
  order?: Maybe<Array<Maybe<FooterLinkOrder>>>;
};


export type QueryFooterArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryFooterCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<FooterFilter>;
  order?: Maybe<Array<Maybe<FooterOrder>>>;
};


export type QueryAccountArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryAccountCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<AccountFilter>;
  order?: Maybe<Array<Maybe<AccountOrder>>>;
};


export type QueryFontAwesomeIconArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryFontAwesomeIconCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<FontAwesomeIconFilter>;
  order?: Maybe<Array<Maybe<FontAwesomeIconOrder>>>;
};


export type QueryIconOrImageArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryIconOrImageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<IconOrImageFilter>;
  order?: Maybe<Array<Maybe<IconOrImageOrder>>>;
};


export type QueryFeaturesArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryFeaturesCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<FeaturesFilter>;
  order?: Maybe<Array<Maybe<FeaturesOrder>>>;
};


export type QueryDemoArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryDemoCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<DemoFilter>;
  order?: Maybe<Array<Maybe<DemoOrder>>>;
};


export type QueryFeatureArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryFeatureCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<FeatureFilter>;
  order?: Maybe<Array<Maybe<FeatureOrder>>>;
};


export type QueryKeyValuePairArgs = {
  id: Scalars['String'];
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryKeyValuePairCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<KeyValuePairFilter>;
  order?: Maybe<Array<Maybe<KeyValuePairOrder>>>;
};


export type QueryEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  where?: Maybe<EntryFilter>;
  order?: Maybe<Array<Maybe<EntryOrder>>>;
};

/** A review to display in a reviews section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/review) */
export type Review = Entry & {
  __typename?: 'Review';
  sys: Sys;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<ReviewLinkingCollections>;
  reviewText: Scalars['String'];
  person: Scalars['String'];
};


/** A review to display in a reviews section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/review) */
export type ReviewLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** A review to display in a reviews section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/review) */
export type ReviewReviewTextArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** A review to display in a reviews section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/review) */
export type ReviewPersonArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type ReviewCollection = {
  __typename?: 'ReviewCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Review>;
};

export type ReviewFilter = {
  sys?: Maybe<SysFilter>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  reviewText_exists?: Maybe<Scalars['Boolean']>;
  reviewText?: Maybe<Scalars['String']>;
  reviewText_not?: Maybe<Scalars['String']>;
  reviewText_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  reviewText_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  reviewText_contains?: Maybe<Scalars['String']>;
  reviewText_not_contains?: Maybe<Scalars['String']>;
  person_exists?: Maybe<Scalars['Boolean']>;
  person?: Maybe<Scalars['String']>;
  person_not?: Maybe<Scalars['String']>;
  person_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  person_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  person_contains?: Maybe<Scalars['String']>;
  person_not_contains?: Maybe<Scalars['String']>;
  OR?: Maybe<Array<Maybe<ReviewFilter>>>;
  AND?: Maybe<Array<Maybe<ReviewFilter>>>;
};

export type ReviewLinkingCollections = {
  __typename?: 'ReviewLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  reviewsCollection?: Maybe<ReviewsCollection>;
};


export type ReviewLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type ReviewLinkingCollectionsReviewsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum ReviewOrder {
  PersonAsc = 'person_ASC',
  PersonDesc = 'person_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** A reviews section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/reviews) */
export type Reviews = Entry & {
  __typename?: 'Reviews';
  sys: Sys;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<ReviewsLinkingCollections>;
  heading: Scalars['String'];
  reviewsCollection: ReviewsReviewsCollection;
};


/** A reviews section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/reviews) */
export type ReviewsLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** A reviews section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/reviews) */
export type ReviewsHeadingArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** A reviews section [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/reviews) */
export type ReviewsReviewsCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type ReviewsCollection = {
  __typename?: 'ReviewsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Reviews>;
};

export type ReviewsFilter = {
  sys?: Maybe<SysFilter>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  heading_exists?: Maybe<Scalars['Boolean']>;
  heading?: Maybe<Scalars['String']>;
  heading_not?: Maybe<Scalars['String']>;
  heading_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  heading_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  heading_contains?: Maybe<Scalars['String']>;
  heading_not_contains?: Maybe<Scalars['String']>;
  reviewsCollection_exists?: Maybe<Scalars['Boolean']>;
  OR?: Maybe<Array<Maybe<ReviewsFilter>>>;
  AND?: Maybe<Array<Maybe<ReviewsFilter>>>;
};

export type ReviewsLinkingCollections = {
  __typename?: 'ReviewsLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageCollection?: Maybe<PageCollection>;
};


export type ReviewsLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type ReviewsLinkingCollectionsPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum ReviewsOrder {
  HeadingAsc = 'heading_ASC',
  HeadingDesc = 'heading_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type ReviewsReviewsCollection = {
  __typename?: 'ReviewsReviewsCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<Review>;
};

export type Sys = {
  __typename?: 'Sys';
  id: Scalars['String'];
  spaceId: Scalars['String'];
  environmentId: Scalars['String'];
  publishedAt?: Maybe<Scalars['DateTime']>;
  firstPublishedAt?: Maybe<Scalars['DateTime']>;
  publishedVersion?: Maybe<Scalars['Int']>;
};

export type SysFilter = {
  id_exists?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  id_not?: Maybe<Scalars['String']>;
  id_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  id_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  id_contains?: Maybe<Scalars['String']>;
  id_not_contains?: Maybe<Scalars['String']>;
  publishedAt_exists?: Maybe<Scalars['Boolean']>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  publishedAt_not?: Maybe<Scalars['DateTime']>;
  publishedAt_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  publishedAt_not_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  publishedAt_gt?: Maybe<Scalars['DateTime']>;
  publishedAt_gte?: Maybe<Scalars['DateTime']>;
  publishedAt_lt?: Maybe<Scalars['DateTime']>;
  publishedAt_lte?: Maybe<Scalars['DateTime']>;
  firstPublishedAt_exists?: Maybe<Scalars['Boolean']>;
  firstPublishedAt?: Maybe<Scalars['DateTime']>;
  firstPublishedAt_not?: Maybe<Scalars['DateTime']>;
  firstPublishedAt_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  firstPublishedAt_not_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  firstPublishedAt_gt?: Maybe<Scalars['DateTime']>;
  firstPublishedAt_gte?: Maybe<Scalars['DateTime']>;
  firstPublishedAt_lt?: Maybe<Scalars['DateTime']>;
  firstPublishedAt_lte?: Maybe<Scalars['DateTime']>;
  publishedVersion_exists?: Maybe<Scalars['Boolean']>;
  publishedVersion?: Maybe<Scalars['Float']>;
  publishedVersion_not?: Maybe<Scalars['Float']>;
  publishedVersion_in?: Maybe<Array<Maybe<Scalars['Float']>>>;
  publishedVersion_not_in?: Maybe<Array<Maybe<Scalars['Float']>>>;
  publishedVersion_gt?: Maybe<Scalars['Float']>;
  publishedVersion_gte?: Maybe<Scalars['Float']>;
  publishedVersion_lt?: Maybe<Scalars['Float']>;
  publishedVersion_lte?: Maybe<Scalars['Float']>;
};

/** A section with two content blocks (usually for different CTAs) [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/twoBlocks) */
export type TwoBlocks = Entry & {
  __typename?: 'TwoBlocks';
  sys: Sys;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<TwoBlocksLinkingCollections>;
  leftTitle: Scalars['String'];
  leftImage: Asset;
  leftButton: FooterLink;
  rightTitle: Scalars['String'];
  rightImage: Asset;
  rightButton: FooterLink;
};


/** A section with two content blocks (usually for different CTAs) [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/twoBlocks) */
export type TwoBlocksLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** A section with two content blocks (usually for different CTAs) [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/twoBlocks) */
export type TwoBlocksLeftTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** A section with two content blocks (usually for different CTAs) [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/twoBlocks) */
export type TwoBlocksLeftImageArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


/** A section with two content blocks (usually for different CTAs) [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/twoBlocks) */
export type TwoBlocksLeftButtonArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


/** A section with two content blocks (usually for different CTAs) [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/twoBlocks) */
export type TwoBlocksRightTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** A section with two content blocks (usually for different CTAs) [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/twoBlocks) */
export type TwoBlocksRightImageArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


/** A section with two content blocks (usually for different CTAs) [See type definition](https://app.contentful.com/spaces/toxox86i0ilk/content_types/twoBlocks) */
export type TwoBlocksRightButtonArgs = {
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export type TwoBlocksCollection = {
  __typename?: 'TwoBlocksCollection';
  total: Scalars['Int'];
  skip: Scalars['Int'];
  limit: Scalars['Int'];
  items: Array<TwoBlocks>;
};

export type TwoBlocksFilter = {
  leftButton?: Maybe<CfFooterLinkNestedFilter>;
  rightButton?: Maybe<CfFooterLinkNestedFilter>;
  sys?: Maybe<SysFilter>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  leftTitle_exists?: Maybe<Scalars['Boolean']>;
  leftTitle?: Maybe<Scalars['String']>;
  leftTitle_not?: Maybe<Scalars['String']>;
  leftTitle_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  leftTitle_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  leftTitle_contains?: Maybe<Scalars['String']>;
  leftTitle_not_contains?: Maybe<Scalars['String']>;
  leftImage_exists?: Maybe<Scalars['Boolean']>;
  leftButton_exists?: Maybe<Scalars['Boolean']>;
  rightTitle_exists?: Maybe<Scalars['Boolean']>;
  rightTitle?: Maybe<Scalars['String']>;
  rightTitle_not?: Maybe<Scalars['String']>;
  rightTitle_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  rightTitle_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  rightTitle_contains?: Maybe<Scalars['String']>;
  rightTitle_not_contains?: Maybe<Scalars['String']>;
  rightImage_exists?: Maybe<Scalars['Boolean']>;
  rightButton_exists?: Maybe<Scalars['Boolean']>;
  OR?: Maybe<Array<Maybe<TwoBlocksFilter>>>;
  AND?: Maybe<Array<Maybe<TwoBlocksFilter>>>;
};

export type TwoBlocksLinkingCollections = {
  __typename?: 'TwoBlocksLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  pageCollection?: Maybe<PageCollection>;
};


export type TwoBlocksLinkingCollectionsEntryCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};


export type TwoBlocksLinkingCollectionsPageCollectionArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  preview?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
};

export enum TwoBlocksOrder {
  LeftTitleAsc = 'leftTitle_ASC',
  LeftTitleDesc = 'leftTitle_DESC',
  RightTitleAsc = 'rightTitle_ASC',
  RightTitleDesc = 'rightTitle_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type CfFontAwesomeIconNestedFilter = {
  sys?: Maybe<SysFilter>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  name_exists?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  name_not?: Maybe<Scalars['String']>;
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  name_contains?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  collection_exists?: Maybe<Scalars['Boolean']>;
  collection?: Maybe<Scalars['String']>;
  collection_not?: Maybe<Scalars['String']>;
  collection_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  collection_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  collection_contains?: Maybe<Scalars['String']>;
  collection_not_contains?: Maybe<Scalars['String']>;
  OR?: Maybe<Array<Maybe<CfFontAwesomeIconNestedFilter>>>;
  AND?: Maybe<Array<Maybe<CfFontAwesomeIconNestedFilter>>>;
};

export type CfFooterLinkNestedFilter = {
  sys?: Maybe<SysFilter>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  text_exists?: Maybe<Scalars['Boolean']>;
  text?: Maybe<Scalars['String']>;
  text_not?: Maybe<Scalars['String']>;
  text_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  text_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  text_contains?: Maybe<Scalars['String']>;
  text_not_contains?: Maybe<Scalars['String']>;
  url_exists?: Maybe<Scalars['Boolean']>;
  OR?: Maybe<Array<Maybe<CfFooterLinkNestedFilter>>>;
  AND?: Maybe<Array<Maybe<CfFooterLinkNestedFilter>>>;
};

export type CfIconOrImageNestedFilter = {
  sys?: Maybe<SysFilter>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  id_exists?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  id_not?: Maybe<Scalars['String']>;
  id_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  id_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  id_contains?: Maybe<Scalars['String']>;
  id_not_contains?: Maybe<Scalars['String']>;
  image_exists?: Maybe<Scalars['Boolean']>;
  faIconName_exists?: Maybe<Scalars['Boolean']>;
  faIconName?: Maybe<Scalars['String']>;
  faIconName_not?: Maybe<Scalars['String']>;
  faIconName_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  faIconName_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  faIconName_contains?: Maybe<Scalars['String']>;
  faIconName_not_contains?: Maybe<Scalars['String']>;
  OR?: Maybe<Array<Maybe<CfIconOrImageNestedFilter>>>;
  AND?: Maybe<Array<Maybe<CfIconOrImageNestedFilter>>>;
};

export type CfKeyValuePairNestedFilter = {
  sys?: Maybe<SysFilter>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  key_exists?: Maybe<Scalars['Boolean']>;
  key?: Maybe<Scalars['String']>;
  key_not?: Maybe<Scalars['String']>;
  key_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  key_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  key_contains?: Maybe<Scalars['String']>;
  key_not_contains?: Maybe<Scalars['String']>;
  value_exists?: Maybe<Scalars['Boolean']>;
  value?: Maybe<Scalars['String']>;
  value_not?: Maybe<Scalars['String']>;
  value_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  value_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  value_contains?: Maybe<Scalars['String']>;
  value_not_contains?: Maybe<Scalars['String']>;
  OR?: Maybe<Array<Maybe<CfKeyValuePairNestedFilter>>>;
  AND?: Maybe<Array<Maybe<CfKeyValuePairNestedFilter>>>;
};

export type CfNavbarNestedFilter = {
  sys?: Maybe<SysFilter>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  logo_exists?: Maybe<Scalars['Boolean']>;
  buttonsCollection_exists?: Maybe<Scalars['Boolean']>;
  OR?: Maybe<Array<Maybe<CfNavbarNestedFilter>>>;
  AND?: Maybe<Array<Maybe<CfNavbarNestedFilter>>>;
};

export type GetDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDataQuery = (
  { __typename?: 'Query' }
  & { assetCollection?: Maybe<(
    { __typename?: 'AssetCollection' }
    & { items: Array<Maybe<(
      { __typename?: 'Asset' }
      & Pick<Asset, 'url'>
    )>> }
  )>, pageCollection?: Maybe<(
    { __typename?: 'PageCollection' }
    & { items: Array<(
      { __typename?: 'Page' }
      & { navbar: (
        { __typename?: 'Navbar' }
        & { logo: (
          { __typename?: 'Asset' }
          & Pick<Asset, 'url'>
        ) }
      ) }
    )> }
  )> }
);


export const GetDataDocument = gql`
    query GetData {
  assetCollection(where: {title_in: ["Favicon"]}) {
    items {
      url
    }
  }
  pageCollection(where: {id: "Index"}, limit: 1) {
    items {
      navbar {
        logo {
          url
        }
      }
    }
  }
}
    `;

/**
 * __useGetDataQuery__
 *
 * To run a query within a React component, call `useGetDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDataQuery(baseOptions?: Apollo.QueryHookOptions<GetDataQuery, GetDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDataQuery, GetDataQueryVariables>(GetDataDocument, options);
      }
export function useGetDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDataQuery, GetDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDataQuery, GetDataQueryVariables>(GetDataDocument, options);
        }
export type GetDataQueryHookResult = ReturnType<typeof useGetDataQuery>;
export type GetDataLazyQueryHookResult = ReturnType<typeof useGetDataLazyQuery>;
export type GetDataQueryResult = Apollo.QueryResult<GetDataQuery, GetDataQueryVariables>;