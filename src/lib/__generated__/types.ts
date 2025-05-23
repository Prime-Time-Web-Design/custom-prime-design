import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  JSON: { input: any; output: any; }
  /** References another document, used as a foreign key */
  Reference: { input: any; output: any; }
};

export type BooleanFilter = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Collection = {
  __typename?: 'Collection';
  documents: DocumentConnection;
  fields?: Maybe<Array<Maybe<Scalars['JSON']['output']>>>;
  format?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  matches?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  path: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  templates?: Maybe<Array<Maybe<Scalars['JSON']['output']>>>;
};


export type CollectionDocumentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<DocumentFilter>;
  first?: InputMaybe<Scalars['Float']['input']>;
  folder?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Float']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};

/** A relay-compliant pagination connection */
export type Connection = {
  pageInfo: PageInfo;
  totalCount: Scalars['Float']['output'];
};

export type Document = {
  _sys?: Maybe<SystemInfo>;
  _values: Scalars['JSON']['output'];
  id: Scalars['ID']['output'];
};

export type DocumentConnection = Connection & {
  __typename?: 'DocumentConnection';
  edges?: Maybe<Array<Maybe<DocumentConnectionEdges>>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Float']['output'];
};

export type DocumentConnectionEdges = {
  __typename?: 'DocumentConnectionEdges';
  cursor: Scalars['String']['output'];
  node?: Maybe<DocumentNode>;
};

export type DocumentFilter = {
  global?: InputMaybe<GlobalFilter>;
  page?: InputMaybe<PageFilter>;
  post?: InputMaybe<PostFilter>;
};

export type DocumentMutation = {
  global?: InputMaybe<GlobalMutation>;
  page?: InputMaybe<PageMutation>;
  post?: InputMaybe<PostMutation>;
};

export type DocumentNode = Folder | Global | Page | Post;

export type DocumentUpdateMutation = {
  global?: InputMaybe<GlobalMutation>;
  page?: InputMaybe<PageMutation>;
  post?: InputMaybe<PostMutation>;
  relativePath?: InputMaybe<Scalars['String']['input']>;
};

export type Folder = {
  __typename?: 'Folder';
  name: Scalars['String']['output'];
  path: Scalars['String']['output'];
};

export type Global = Document & Node & {
  __typename?: 'Global';
  _sys: SystemInfo;
  _values: Scalars['JSON']['output'];
  alertBanner?: Maybe<GlobalAlertBanner>;
  id: Scalars['ID']['output'];
  navigation?: Maybe<GlobalNavigation>;
};

export type GlobalAlertBanner = {
  __typename?: 'GlobalAlertBanner';
  alertLabel: Scalars['String']['output'];
  alertLink: Scalars['String']['output'];
  alertLinkText: Scalars['String']['output'];
};

export type GlobalAlertBannerFilter = {
  alertLabel?: InputMaybe<StringFilter>;
  alertLink?: InputMaybe<StringFilter>;
  alertLinkText?: InputMaybe<StringFilter>;
};

export type GlobalAlertBannerMutation = {
  alertLabel?: InputMaybe<Scalars['String']['input']>;
  alertLink?: InputMaybe<Scalars['String']['input']>;
  alertLinkText?: InputMaybe<Scalars['String']['input']>;
};

export type GlobalConnection = Connection & {
  __typename?: 'GlobalConnection';
  edges?: Maybe<Array<Maybe<GlobalConnectionEdges>>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Float']['output'];
};

export type GlobalConnectionEdges = {
  __typename?: 'GlobalConnectionEdges';
  cursor: Scalars['String']['output'];
  node?: Maybe<Global>;
};

export type GlobalFilter = {
  alertBanner?: InputMaybe<GlobalAlertBannerFilter>;
  navigation?: InputMaybe<GlobalNavigationFilter>;
};

export type GlobalMutation = {
  alertBanner?: InputMaybe<GlobalAlertBannerMutation>;
  navigation?: InputMaybe<GlobalNavigationMutation>;
};

export type GlobalNavigation = {
  __typename?: 'GlobalNavigation';
  footer?: Maybe<GlobalNavigationFooter>;
  mainNav?: Maybe<Array<Maybe<GlobalNavigationMainNav>>>;
};

export type GlobalNavigationFilter = {
  footer?: InputMaybe<GlobalNavigationFooterFilter>;
  mainNav?: InputMaybe<GlobalNavigationMainNavFilter>;
};

export type GlobalNavigationFooter = {
  __typename?: 'GlobalNavigationFooter';
  companyName?: Maybe<Scalars['String']['output']>;
  contact?: Maybe<GlobalNavigationFooterContact>;
  social?: Maybe<Array<Maybe<GlobalNavigationFooterSocial>>>;
};

export type GlobalNavigationFooterContact = {
  __typename?: 'GlobalNavigationFooterContact';
  email?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  textNumber?: Maybe<Scalars['String']['output']>;
};

export type GlobalNavigationFooterContactFilter = {
  email?: InputMaybe<StringFilter>;
  phone?: InputMaybe<StringFilter>;
  textNumber?: InputMaybe<StringFilter>;
};

export type GlobalNavigationFooterContactMutation = {
  email?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  textNumber?: InputMaybe<Scalars['String']['input']>;
};

export type GlobalNavigationFooterFilter = {
  companyName?: InputMaybe<StringFilter>;
  contact?: InputMaybe<GlobalNavigationFooterContactFilter>;
  social?: InputMaybe<GlobalNavigationFooterSocialFilter>;
};

export type GlobalNavigationFooterMutation = {
  companyName?: InputMaybe<Scalars['String']['input']>;
  contact?: InputMaybe<GlobalNavigationFooterContactMutation>;
  social?: InputMaybe<Array<InputMaybe<GlobalNavigationFooterSocialMutation>>>;
};

export type GlobalNavigationFooterSocial = {
  __typename?: 'GlobalNavigationFooterSocial';
  platform?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type GlobalNavigationFooterSocialFilter = {
  platform?: InputMaybe<StringFilter>;
  url?: InputMaybe<StringFilter>;
};

export type GlobalNavigationFooterSocialMutation = {
  platform?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type GlobalNavigationMainNav = {
  __typename?: 'GlobalNavigationMainNav';
  featuredCards?: Maybe<Array<Maybe<GlobalNavigationMainNavFeaturedCards>>>;
  href?: Maybe<Scalars['String']['output']>;
  label: Scalars['String']['output'];
  subItems?: Maybe<Array<Maybe<GlobalNavigationMainNavSubItems>>>;
};

export type GlobalNavigationMainNavFeaturedCards = {
  __typename?: 'GlobalNavigationMainNavFeaturedCards';
  ctaLink: Scalars['String']['output'];
  ctaText: Scalars['String']['output'];
  description: Scalars['String']['output'];
  image?: Maybe<GlobalNavigationMainNavFeaturedCardsImage>;
  layout?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type GlobalNavigationMainNavFeaturedCardsFilter = {
  ctaLink?: InputMaybe<StringFilter>;
  ctaText?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  image?: InputMaybe<GlobalNavigationMainNavFeaturedCardsImageFilter>;
  layout?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type GlobalNavigationMainNavFeaturedCardsImage = {
  __typename?: 'GlobalNavigationMainNavFeaturedCardsImage';
  alt: Scalars['String']['output'];
  src: Scalars['String']['output'];
};

export type GlobalNavigationMainNavFeaturedCardsImageFilter = {
  alt?: InputMaybe<StringFilter>;
  src?: InputMaybe<StringFilter>;
};

export type GlobalNavigationMainNavFeaturedCardsImageMutation = {
  alt?: InputMaybe<Scalars['String']['input']>;
  src?: InputMaybe<Scalars['String']['input']>;
};

export type GlobalNavigationMainNavFeaturedCardsMutation = {
  ctaLink?: InputMaybe<Scalars['String']['input']>;
  ctaText?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<GlobalNavigationMainNavFeaturedCardsImageMutation>;
  layout?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type GlobalNavigationMainNavFilter = {
  featuredCards?: InputMaybe<GlobalNavigationMainNavFeaturedCardsFilter>;
  href?: InputMaybe<StringFilter>;
  label?: InputMaybe<StringFilter>;
  subItems?: InputMaybe<GlobalNavigationMainNavSubItemsFilter>;
};

export type GlobalNavigationMainNavMutation = {
  featuredCards?: InputMaybe<Array<InputMaybe<GlobalNavigationMainNavFeaturedCardsMutation>>>;
  href?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  subItems?: InputMaybe<Array<InputMaybe<GlobalNavigationMainNavSubItemsMutation>>>;
};

export type GlobalNavigationMainNavSubItems = {
  __typename?: 'GlobalNavigationMainNavSubItems';
  description?: Maybe<Scalars['String']['output']>;
  href: Scalars['String']['output'];
  icon?: Maybe<Scalars['String']['output']>;
  label: Scalars['String']['output'];
  variant?: Maybe<Scalars['String']['output']>;
};

export type GlobalNavigationMainNavSubItemsFilter = {
  description?: InputMaybe<StringFilter>;
  href?: InputMaybe<StringFilter>;
  icon?: InputMaybe<StringFilter>;
  label?: InputMaybe<StringFilter>;
  variant?: InputMaybe<StringFilter>;
};

export type GlobalNavigationMainNavSubItemsMutation = {
  description?: InputMaybe<Scalars['String']['input']>;
  href?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  variant?: InputMaybe<Scalars['String']['input']>;
};

export type GlobalNavigationMutation = {
  footer?: InputMaybe<GlobalNavigationFooterMutation>;
  mainNav?: InputMaybe<Array<InputMaybe<GlobalNavigationMainNavMutation>>>;
};

export type ImageFilter = {
  eq?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addPendingDocument: DocumentNode;
  createDocument: DocumentNode;
  createFolder: DocumentNode;
  createGlobal: Global;
  createPage: Page;
  createPost: Post;
  deleteDocument: DocumentNode;
  updateDocument: DocumentNode;
  updateGlobal: Global;
  updatePage: Page;
  updatePost: Post;
};


export type MutationAddPendingDocumentArgs = {
  collection: Scalars['String']['input'];
  relativePath: Scalars['String']['input'];
  template?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateDocumentArgs = {
  collection?: InputMaybe<Scalars['String']['input']>;
  params: DocumentMutation;
  relativePath: Scalars['String']['input'];
};


export type MutationCreateFolderArgs = {
  collection?: InputMaybe<Scalars['String']['input']>;
  relativePath: Scalars['String']['input'];
};


export type MutationCreateGlobalArgs = {
  params: GlobalMutation;
  relativePath: Scalars['String']['input'];
};


export type MutationCreatePageArgs = {
  params: PageMutation;
  relativePath: Scalars['String']['input'];
};


export type MutationCreatePostArgs = {
  params: PostMutation;
  relativePath: Scalars['String']['input'];
};


export type MutationDeleteDocumentArgs = {
  collection?: InputMaybe<Scalars['String']['input']>;
  relativePath: Scalars['String']['input'];
};


export type MutationUpdateDocumentArgs = {
  collection?: InputMaybe<Scalars['String']['input']>;
  params: DocumentUpdateMutation;
  relativePath: Scalars['String']['input'];
};


export type MutationUpdateGlobalArgs = {
  params: GlobalMutation;
  relativePath: Scalars['String']['input'];
};


export type MutationUpdatePageArgs = {
  params: PageMutation;
  relativePath: Scalars['String']['input'];
};


export type MutationUpdatePostArgs = {
  params: PostMutation;
  relativePath: Scalars['String']['input'];
};

export type Node = {
  id: Scalars['ID']['output'];
};

export type NumberFilter = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
};

export type Page = Document & Node & {
  __typename?: 'Page';
  _sys: SystemInfo;
  _values: Scalars['JSON']['output'];
  blocks?: Maybe<Array<Maybe<PageBlocks>>>;
  description: Scalars['String']['output'];
  headerBlocks?: Maybe<Array<Maybe<PageHeaderBlocks>>>;
  id: Scalars['ID']['output'];
  subtitle?: Maybe<Scalars['String']['output']>;
  template: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type PageBlocks = PageBlocksCarouselBlock | PageBlocksCtaBlock | PageBlocksHero | PageBlocksRichTextBlock | PageBlocksServiceListingBlock;

export type PageBlocksCarouselBlock = {
  __typename?: 'PageBlocksCarouselBlock';
  autoplayInterval?: Maybe<Scalars['Float']['output']>;
  blockSubtitle?: Maybe<Scalars['String']['output']>;
  blockTitle?: Maybe<Scalars['String']['output']>;
  options_loop?: Maybe<Scalars['Boolean']['output']>;
  slides?: Maybe<Array<Maybe<PageBlocksCarouselBlockSlides>>>;
};

export type PageBlocksCarouselBlockFilter = {
  autoplayInterval?: InputMaybe<NumberFilter>;
  blockSubtitle?: InputMaybe<StringFilter>;
  blockTitle?: InputMaybe<StringFilter>;
  options_loop?: InputMaybe<BooleanFilter>;
  slides?: InputMaybe<PageBlocksCarouselBlockSlidesFilter>;
};

export type PageBlocksCarouselBlockMutation = {
  autoplayInterval?: InputMaybe<Scalars['Float']['input']>;
  blockSubtitle?: InputMaybe<Scalars['String']['input']>;
  blockTitle?: InputMaybe<Scalars['String']['input']>;
  options_loop?: InputMaybe<Scalars['Boolean']['input']>;
  slides?: InputMaybe<Array<InputMaybe<PageBlocksCarouselBlockSlidesMutation>>>;
};

export type PageBlocksCarouselBlockSlides = {
  __typename?: 'PageBlocksCarouselBlockSlides';
  alt?: Maybe<Scalars['String']['output']>;
  clientName: Scalars['String']['output'];
  clientType?: Maybe<Scalars['String']['output']>;
  src?: Maybe<Scalars['String']['output']>;
  testimonialText: Scalars['String']['output'];
};

export type PageBlocksCarouselBlockSlidesFilter = {
  alt?: InputMaybe<StringFilter>;
  clientName?: InputMaybe<StringFilter>;
  clientType?: InputMaybe<StringFilter>;
  src?: InputMaybe<ImageFilter>;
  testimonialText?: InputMaybe<StringFilter>;
};

export type PageBlocksCarouselBlockSlidesMutation = {
  alt?: InputMaybe<Scalars['String']['input']>;
  clientName?: InputMaybe<Scalars['String']['input']>;
  clientType?: InputMaybe<Scalars['String']['input']>;
  src?: InputMaybe<Scalars['String']['input']>;
  testimonialText?: InputMaybe<Scalars['String']['input']>;
};

export type PageBlocksCtaBlock = {
  __typename?: 'PageBlocksCtaBlock';
  backgroundColor?: Maybe<Scalars['String']['output']>;
  buttonLink?: Maybe<Scalars['String']['output']>;
  buttonText?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Scalars['JSON']['output']>;
  heading?: Maybe<Scalars['String']['output']>;
  imageAlt?: Maybe<Scalars['String']['output']>;
  imageLeft?: Maybe<Scalars['Boolean']['output']>;
  imageSrc?: Maybe<Scalars['String']['output']>;
  subheading?: Maybe<Scalars['String']['output']>;
};

export type PageBlocksCtaBlockFilter = {
  backgroundColor?: InputMaybe<StringFilter>;
  buttonLink?: InputMaybe<StringFilter>;
  buttonText?: InputMaybe<StringFilter>;
  content?: InputMaybe<RichTextFilter>;
  heading?: InputMaybe<StringFilter>;
  imageAlt?: InputMaybe<StringFilter>;
  imageLeft?: InputMaybe<BooleanFilter>;
  imageSrc?: InputMaybe<ImageFilter>;
  subheading?: InputMaybe<StringFilter>;
};

export type PageBlocksCtaBlockMutation = {
  backgroundColor?: InputMaybe<Scalars['String']['input']>;
  buttonLink?: InputMaybe<Scalars['String']['input']>;
  buttonText?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['JSON']['input']>;
  heading?: InputMaybe<Scalars['String']['input']>;
  imageAlt?: InputMaybe<Scalars['String']['input']>;
  imageLeft?: InputMaybe<Scalars['Boolean']['input']>;
  imageSrc?: InputMaybe<Scalars['String']['input']>;
  subheading?: InputMaybe<Scalars['String']['input']>;
};

export type PageBlocksFilter = {
  carouselBlock?: InputMaybe<PageBlocksCarouselBlockFilter>;
  ctaBlock?: InputMaybe<PageBlocksCtaBlockFilter>;
  hero?: InputMaybe<PageBlocksHeroFilter>;
  richTextBlock?: InputMaybe<PageBlocksRichTextBlockFilter>;
  serviceListingBlock?: InputMaybe<PageBlocksServiceListingBlockFilter>;
};

export type PageBlocksHero = {
  __typename?: 'PageBlocksHero';
  buttonLink?: Maybe<Scalars['String']['output']>;
  buttonText?: Maybe<Scalars['String']['output']>;
  heading?: Maybe<Scalars['String']['output']>;
  src?: Maybe<Scalars['String']['output']>;
  subheading?: Maybe<Scalars['String']['output']>;
};

export type PageBlocksHeroFilter = {
  buttonLink?: InputMaybe<StringFilter>;
  buttonText?: InputMaybe<StringFilter>;
  heading?: InputMaybe<StringFilter>;
  src?: InputMaybe<ImageFilter>;
  subheading?: InputMaybe<StringFilter>;
};

export type PageBlocksHeroMutation = {
  buttonLink?: InputMaybe<Scalars['String']['input']>;
  buttonText?: InputMaybe<Scalars['String']['input']>;
  heading?: InputMaybe<Scalars['String']['input']>;
  src?: InputMaybe<Scalars['String']['input']>;
  subheading?: InputMaybe<Scalars['String']['input']>;
};

export type PageBlocksMutation = {
  carouselBlock?: InputMaybe<PageBlocksCarouselBlockMutation>;
  ctaBlock?: InputMaybe<PageBlocksCtaBlockMutation>;
  hero?: InputMaybe<PageBlocksHeroMutation>;
  richTextBlock?: InputMaybe<PageBlocksRichTextBlockMutation>;
  serviceListingBlock?: InputMaybe<PageBlocksServiceListingBlockMutation>;
};

export type PageBlocksRichTextBlock = {
  __typename?: 'PageBlocksRichTextBlock';
  features?: Maybe<Array<Maybe<PageBlocksRichTextBlockFeatures>>>;
  heading?: Maybe<Scalars['String']['output']>;
  subheading?: Maybe<Scalars['String']['output']>;
};

export type PageBlocksRichTextBlockFeatures = {
  __typename?: 'PageBlocksRichTextBlockFeatures';
  description?: Maybe<Scalars['JSON']['output']>;
  src?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type PageBlocksRichTextBlockFeaturesFilter = {
  description?: InputMaybe<RichTextFilter>;
  src?: InputMaybe<ImageFilter>;
  title?: InputMaybe<StringFilter>;
};

export type PageBlocksRichTextBlockFeaturesMutation = {
  description?: InputMaybe<Scalars['JSON']['input']>;
  src?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type PageBlocksRichTextBlockFilter = {
  features?: InputMaybe<PageBlocksRichTextBlockFeaturesFilter>;
  heading?: InputMaybe<StringFilter>;
  subheading?: InputMaybe<StringFilter>;
};

export type PageBlocksRichTextBlockMutation = {
  features?: InputMaybe<Array<InputMaybe<PageBlocksRichTextBlockFeaturesMutation>>>;
  heading?: InputMaybe<Scalars['String']['input']>;
  subheading?: InputMaybe<Scalars['String']['input']>;
};

export type PageBlocksServiceListingBlock = {
  __typename?: 'PageBlocksServiceListingBlock';
  backgroundColor?: Maybe<Scalars['String']['output']>;
  ctaContent?: Maybe<Scalars['String']['output']>;
  ctaLink?: Maybe<Scalars['String']['output']>;
  ctaText?: Maybe<Scalars['String']['output']>;
  services?: Maybe<Array<Maybe<PageBlocksServiceListingBlockServices>>>;
  title?: Maybe<Scalars['String']['output']>;
};

export type PageBlocksServiceListingBlockFilter = {
  backgroundColor?: InputMaybe<StringFilter>;
  ctaContent?: InputMaybe<StringFilter>;
  ctaLink?: InputMaybe<StringFilter>;
  ctaText?: InputMaybe<StringFilter>;
  services?: InputMaybe<PageBlocksServiceListingBlockServicesFilter>;
  title?: InputMaybe<StringFilter>;
};

export type PageBlocksServiceListingBlockMutation = {
  backgroundColor?: InputMaybe<Scalars['String']['input']>;
  ctaContent?: InputMaybe<Scalars['String']['input']>;
  ctaLink?: InputMaybe<Scalars['String']['input']>;
  ctaText?: InputMaybe<Scalars['String']['input']>;
  services?: InputMaybe<Array<InputMaybe<PageBlocksServiceListingBlockServicesMutation>>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type PageBlocksServiceListingBlockServices = {
  __typename?: 'PageBlocksServiceListingBlockServices';
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type PageBlocksServiceListingBlockServicesFilter = {
  name?: InputMaybe<StringFilter>;
  slug?: InputMaybe<StringFilter>;
};

export type PageBlocksServiceListingBlockServicesMutation = {
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type PageConnection = Connection & {
  __typename?: 'PageConnection';
  edges?: Maybe<Array<Maybe<PageConnectionEdges>>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Float']['output'];
};

export type PageConnectionEdges = {
  __typename?: 'PageConnectionEdges';
  cursor: Scalars['String']['output'];
  node?: Maybe<Page>;
};

export type PageFilter = {
  blocks?: InputMaybe<PageBlocksFilter>;
  description?: InputMaybe<StringFilter>;
  headerBlocks?: InputMaybe<PageHeaderBlocksFilter>;
  subtitle?: InputMaybe<StringFilter>;
  template?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type PageHeaderBlocks = PageHeaderBlocksHero;

export type PageHeaderBlocksFilter = {
  hero?: InputMaybe<PageHeaderBlocksHeroFilter>;
};

export type PageHeaderBlocksHero = {
  __typename?: 'PageHeaderBlocksHero';
  buttonLink?: Maybe<Scalars['String']['output']>;
  buttonText?: Maybe<Scalars['String']['output']>;
  heading?: Maybe<Scalars['String']['output']>;
  subheading?: Maybe<Scalars['String']['output']>;
};

export type PageHeaderBlocksHeroFilter = {
  buttonLink?: InputMaybe<StringFilter>;
  buttonText?: InputMaybe<StringFilter>;
  heading?: InputMaybe<StringFilter>;
  subheading?: InputMaybe<StringFilter>;
};

export type PageHeaderBlocksHeroMutation = {
  buttonLink?: InputMaybe<Scalars['String']['input']>;
  buttonText?: InputMaybe<Scalars['String']['input']>;
  heading?: InputMaybe<Scalars['String']['input']>;
  subheading?: InputMaybe<Scalars['String']['input']>;
};

export type PageHeaderBlocksMutation = {
  hero?: InputMaybe<PageHeaderBlocksHeroMutation>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor: Scalars['String']['output'];
};

export type PageMutation = {
  blocks?: InputMaybe<Array<InputMaybe<PageBlocksMutation>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  headerBlocks?: InputMaybe<Array<InputMaybe<PageHeaderBlocksMutation>>>;
  subtitle?: InputMaybe<Scalars['String']['input']>;
  template?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Post = Document & Node & {
  __typename?: 'Post';
  _sys: SystemInfo;
  _values: Scalars['JSON']['output'];
  body?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type PostConnection = Connection & {
  __typename?: 'PostConnection';
  edges?: Maybe<Array<Maybe<PostConnectionEdges>>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Float']['output'];
};

export type PostConnectionEdges = {
  __typename?: 'PostConnectionEdges';
  cursor: Scalars['String']['output'];
  node?: Maybe<Post>;
};

export type PostFilter = {
  body?: InputMaybe<RichTextFilter>;
  title?: InputMaybe<StringFilter>;
};

export type PostMutation = {
  body?: InputMaybe<Scalars['JSON']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  collection: Collection;
  collections: Array<Collection>;
  document: DocumentNode;
  getOptimizedQuery?: Maybe<Scalars['String']['output']>;
  global: Global;
  globalConnection: GlobalConnection;
  node: Node;
  page: Page;
  pageConnection: PageConnection;
  post: Post;
  postConnection: PostConnection;
};


export type QueryCollectionArgs = {
  collection?: InputMaybe<Scalars['String']['input']>;
};


export type QueryDocumentArgs = {
  collection?: InputMaybe<Scalars['String']['input']>;
  relativePath?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetOptimizedQueryArgs = {
  queryString: Scalars['String']['input'];
};


export type QueryGlobalArgs = {
  relativePath?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGlobalConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<GlobalFilter>;
  first?: InputMaybe<Scalars['Float']['input']>;
  last?: InputMaybe<Scalars['Float']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryNodeArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPageArgs = {
  relativePath?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPageConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<PageFilter>;
  first?: InputMaybe<Scalars['Float']['input']>;
  last?: InputMaybe<Scalars['Float']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPostArgs = {
  relativePath?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPostConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<PostFilter>;
  first?: InputMaybe<Scalars['Float']['input']>;
  last?: InputMaybe<Scalars['Float']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};

export type RichTextFilter = {
  eq?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StringFilter = {
  eq?: InputMaybe<Scalars['String']['input']>;
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type SystemInfo = {
  __typename?: 'SystemInfo';
  basename: Scalars['String']['output'];
  breadcrumbs: Array<Scalars['String']['output']>;
  collection: Collection;
  extension: Scalars['String']['output'];
  filename: Scalars['String']['output'];
  hasReferences?: Maybe<Scalars['Boolean']['output']>;
  path: Scalars['String']['output'];
  relativePath: Scalars['String']['output'];
  template: Scalars['String']['output'];
  title?: Maybe<Scalars['String']['output']>;
};


export type SystemInfoBreadcrumbsArgs = {
  excludeExtension?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AlertBannerFieldsFragment = { __typename?: 'GlobalAlertBanner', alertLabel: string, alertLink: string, alertLinkText: string };

export type GenericImageFieldsFragment = { __typename?: 'GlobalNavigationMainNavFeaturedCardsImage', src: string, alt: string };

export type FeaturedCardFieldsFragment = { __typename?: 'GlobalNavigationMainNavFeaturedCards', title: string, description: string, ctaText: string, ctaLink: string, layout?: string | null, image?: { __typename?: 'GlobalNavigationMainNavFeaturedCardsImage', src: string, alt: string } | null };

export type SubNavItemFieldsFragment = { __typename?: 'GlobalNavigationMainNavSubItems', label: string, href: string, icon?: string | null, variant?: string | null, description?: string | null };

export type MainNavItemFieldsFragment = { __typename?: 'GlobalNavigationMainNav', label: string, href?: string | null, featuredCards?: Array<{ __typename?: 'GlobalNavigationMainNavFeaturedCards', title: string, description: string, ctaText: string, ctaLink: string, layout?: string | null, image?: { __typename?: 'GlobalNavigationMainNavFeaturedCardsImage', src: string, alt: string } | null } | null> | null, subItems?: Array<{ __typename?: 'GlobalNavigationMainNavSubItems', label: string, href: string, icon?: string | null, variant?: string | null, description?: string | null } | null> | null };

export type FooterContactFieldsFragment = { __typename?: 'GlobalNavigationFooterContact', phone?: string | null, textNumber?: string | null, email?: string | null };

export type FooterSocialFieldsFragment = { __typename?: 'GlobalNavigationFooterSocial', platform?: string | null, url?: string | null };

export type FooterSettingsFieldsFragment = { __typename?: 'GlobalNavigationFooter', companyName?: string | null, contact?: { __typename?: 'GlobalNavigationFooterContact', phone?: string | null, textNumber?: string | null, email?: string | null } | null, social?: Array<{ __typename?: 'GlobalNavigationFooterSocial', platform?: string | null, url?: string | null } | null> | null };

export type PageHeroBlockFieldsFragment = { __typename?: 'PageBlocksHero', heading?: string | null, subheading?: string | null, buttonText?: string | null, buttonLink?: string | null, src?: string | null };

export type CtaBlockFieldsFragment = { __typename?: 'PageBlocksCtaBlock', heading?: string | null, subheading?: string | null, content?: any | null, buttonText?: string | null, buttonLink?: string | null, imageLeft?: boolean | null, imageSrc?: string | null, imageAlt?: string | null, backgroundColor?: string | null };

export type RichTextFeatureFieldsFragment = { __typename?: 'PageBlocksRichTextBlockFeatures', src?: string | null, title?: string | null, description?: any | null };

export type RichTextBlockFieldsFragment = { __typename?: 'PageBlocksRichTextBlock', heading?: string | null, subheading?: string | null, features?: Array<{ __typename?: 'PageBlocksRichTextBlockFeatures', src?: string | null, title?: string | null, description?: any | null } | null> | null };

export type CarouselSlideFieldsFragment = { __typename?: 'PageBlocksCarouselBlockSlides', src?: string | null, alt?: string | null, testimonialText: string, clientName: string, clientType?: string | null };

export type CarouselBlockFieldsFragment = { __typename?: 'PageBlocksCarouselBlock', blockTitle?: string | null, blockSubtitle?: string | null, options_loop?: boolean | null, autoplayInterval?: number | null, slides?: Array<{ __typename?: 'PageBlocksCarouselBlockSlides', src?: string | null, alt?: string | null, testimonialText: string, clientName: string, clientType?: string | null } | null> | null };

export type ServiceListingServiceFieldsFragment = { __typename?: 'PageBlocksServiceListingBlockServices', name: string, slug: string };

export type ServiceListingBlockFieldsFragment = { __typename?: 'PageBlocksServiceListingBlock', title?: string | null, ctaText?: string | null, ctaLink?: string | null, ctaContent?: string | null, backgroundColor?: string | null, services?: Array<{ __typename?: 'PageBlocksServiceListingBlockServices', name: string, slug: string } | null> | null };

export type GetGlobalQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGlobalQuery = { __typename?: 'Query', global: { __typename?: 'Global', alertBanner?: { __typename?: 'GlobalAlertBanner', alertLabel: string, alertLink: string, alertLinkText: string } | null, navigation?: { __typename?: 'GlobalNavigation', mainNav?: Array<{ __typename?: 'GlobalNavigationMainNav', label: string, href?: string | null, featuredCards?: Array<{ __typename?: 'GlobalNavigationMainNavFeaturedCards', title: string, description: string, ctaText: string, ctaLink: string, layout?: string | null, image?: { __typename?: 'GlobalNavigationMainNavFeaturedCardsImage', src: string, alt: string } | null } | null> | null, subItems?: Array<{ __typename?: 'GlobalNavigationMainNavSubItems', label: string, href: string, icon?: string | null, variant?: string | null, description?: string | null } | null> | null } | null> | null, footer?: { __typename?: 'GlobalNavigationFooter', companyName?: string | null, contact?: { __typename?: 'GlobalNavigationFooterContact', phone?: string | null, textNumber?: string | null, email?: string | null } | null, social?: Array<{ __typename?: 'GlobalNavigationFooterSocial', platform?: string | null, url?: string | null } | null> | null } | null } | null } };

export type GetPageQueryVariables = Exact<{
  relativePath: Scalars['String']['input'];
}>;


export type GetPageQuery = { __typename?: 'Query', page: { __typename?: 'Page', title: string, blocks?: Array<{ __typename?: 'PageBlocksCarouselBlock', blockTitle?: string | null, blockSubtitle?: string | null, options_loop?: boolean | null, autoplayInterval?: number | null, slides?: Array<{ __typename?: 'PageBlocksCarouselBlockSlides', src?: string | null, alt?: string | null, testimonialText: string, clientName: string, clientType?: string | null } | null> | null } | { __typename?: 'PageBlocksCtaBlock', heading?: string | null, subheading?: string | null, content?: any | null, buttonText?: string | null, buttonLink?: string | null, imageLeft?: boolean | null, imageSrc?: string | null, imageAlt?: string | null, backgroundColor?: string | null } | { __typename?: 'PageBlocksHero', heading?: string | null, subheading?: string | null, buttonText?: string | null, buttonLink?: string | null, src?: string | null } | { __typename?: 'PageBlocksRichTextBlock', heading?: string | null, subheading?: string | null, features?: Array<{ __typename?: 'PageBlocksRichTextBlockFeatures', src?: string | null, title?: string | null, description?: any | null } | null> | null } | { __typename?: 'PageBlocksServiceListingBlock', title?: string | null, ctaText?: string | null, ctaLink?: string | null, ctaContent?: string | null, backgroundColor?: string | null, services?: Array<{ __typename?: 'PageBlocksServiceListingBlockServices', name: string, slug: string } | null> | null } | null> | null } };

export const AlertBannerFieldsFragmentDoc = gql`
    fragment AlertBannerFields on GlobalAlertBanner {
  alertLabel
  alertLink
  alertLinkText
}
    `;
export const GenericImageFieldsFragmentDoc = gql`
    fragment GenericImageFields on GlobalNavigationMainNavFeaturedCardsImage {
  src
  alt
}
    `;
export const FeaturedCardFieldsFragmentDoc = gql`
    fragment FeaturedCardFields on GlobalNavigationMainNavFeaturedCards {
  image {
    ...GenericImageFields
  }
  title
  description
  ctaText
  ctaLink
  layout
}
    ${GenericImageFieldsFragmentDoc}`;
export const SubNavItemFieldsFragmentDoc = gql`
    fragment SubNavItemFields on GlobalNavigationMainNavSubItems {
  label
  href
  icon
  variant
  description
}
    `;
export const MainNavItemFieldsFragmentDoc = gql`
    fragment MainNavItemFields on GlobalNavigationMainNav {
  label
  href
  featuredCards {
    ...FeaturedCardFields
  }
  subItems {
    ...SubNavItemFields
  }
}
    ${FeaturedCardFieldsFragmentDoc}
${SubNavItemFieldsFragmentDoc}`;
export const FooterContactFieldsFragmentDoc = gql`
    fragment FooterContactFields on GlobalNavigationFooterContact {
  phone
  textNumber
  email
}
    `;
export const FooterSocialFieldsFragmentDoc = gql`
    fragment FooterSocialFields on GlobalNavigationFooterSocial {
  platform
  url
}
    `;
export const FooterSettingsFieldsFragmentDoc = gql`
    fragment FooterSettingsFields on GlobalNavigationFooter {
  contact {
    ...FooterContactFields
  }
  social {
    ...FooterSocialFields
  }
  companyName
}
    ${FooterContactFieldsFragmentDoc}
${FooterSocialFieldsFragmentDoc}`;
export const PageHeroBlockFieldsFragmentDoc = gql`
    fragment PageHeroBlockFields on PageBlocksHero {
  heading
  subheading
  buttonText
  buttonLink
  src
}
    `;
export const CtaBlockFieldsFragmentDoc = gql`
    fragment CtaBlockFields on PageBlocksCtaBlock {
  heading
  subheading
  content
  buttonText
  buttonLink
  imageLeft
  imageSrc
  imageAlt
  backgroundColor
}
    `;
export const RichTextFeatureFieldsFragmentDoc = gql`
    fragment RichTextFeatureFields on PageBlocksRichTextBlockFeatures {
  src
  title
  description
}
    `;
export const RichTextBlockFieldsFragmentDoc = gql`
    fragment RichTextBlockFields on PageBlocksRichTextBlock {
  heading
  subheading
  features {
    ...RichTextFeatureFields
  }
}
    ${RichTextFeatureFieldsFragmentDoc}`;
export const CarouselSlideFieldsFragmentDoc = gql`
    fragment CarouselSlideFields on PageBlocksCarouselBlockSlides {
  src
  alt
  testimonialText
  clientName
  clientType
}
    `;
export const CarouselBlockFieldsFragmentDoc = gql`
    fragment CarouselBlockFields on PageBlocksCarouselBlock {
  blockTitle
  blockSubtitle
  slides {
    ...CarouselSlideFields
  }
  options_loop
  autoplayInterval
}
    ${CarouselSlideFieldsFragmentDoc}`;
export const ServiceListingServiceFieldsFragmentDoc = gql`
    fragment ServiceListingServiceFields on PageBlocksServiceListingBlockServices {
  name
  slug
}
    `;
export const ServiceListingBlockFieldsFragmentDoc = gql`
    fragment ServiceListingBlockFields on PageBlocksServiceListingBlock {
  title
  services {
    ...ServiceListingServiceFields
  }
  ctaText
  ctaLink
  ctaContent
  backgroundColor
}
    ${ServiceListingServiceFieldsFragmentDoc}`;
export const GetGlobalDocument = gql`
    query GetGlobal {
  global(relativePath: "Navigation_Data.yaml") {
    alertBanner {
      ...AlertBannerFields
    }
    navigation {
      mainNav {
        ...MainNavItemFields
      }
      footer {
        ...FooterSettingsFields
      }
    }
  }
}
    ${AlertBannerFieldsFragmentDoc}
${MainNavItemFieldsFragmentDoc}
${FooterSettingsFieldsFragmentDoc}`;
export const GetPageDocument = gql`
    query GetPage($relativePath: String!) {
  page(relativePath: $relativePath) {
    title
    blocks {
      ... on PageBlocksHero {
        ...PageHeroBlockFields
      }
      ... on PageBlocksCtaBlock {
        ...CtaBlockFields
      }
      ... on PageBlocksRichTextBlock {
        ...RichTextBlockFields
      }
      ... on PageBlocksCarouselBlock {
        ...CarouselBlockFields
      }
      ... on PageBlocksServiceListingBlock {
        ...ServiceListingBlockFields
      }
    }
  }
}
    ${PageHeroBlockFieldsFragmentDoc}
${CtaBlockFieldsFragmentDoc}
${RichTextBlockFieldsFragmentDoc}
${CarouselBlockFieldsFragmentDoc}
${ServiceListingBlockFieldsFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    GetGlobal(variables?: GetGlobalQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetGlobalQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetGlobalQuery>(GetGlobalDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetGlobal', 'query', variables);
    },
    GetPage(variables: GetPageQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetPageQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPageQuery>(GetPageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetPage', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;