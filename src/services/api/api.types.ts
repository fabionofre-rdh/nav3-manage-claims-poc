import { TimespanName } from "@/utils/constants";

export interface PaginationMetadata {
  limit: 20 | 25 | 50 | 100;
  nextPage: number;
  totalCount: number;
  totalPages: number;
}

export interface APIAddAccountOpportunityRequest {
  name: string;
  effectiveDate: string;
  endDate: string;
  type: string;
}

interface APIGeneralResponse<T> {
  data: T;
  statusCode: number;
  message: string;
  metadata?: PaginationMetadata;
}

export interface APIGetUserRequest {
  page: number;
  limit: number;
  query?: string;
}

export interface User {
  id: number;
  tenantId: number;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  phoneMobile: string;
  userName: string;
  otp2Factor: string | null;
  imagePath: string | null;
  addressId: number | null;
  timezone: string | null;
  reportToUserId: number | null;
  lastPasswordChanged: string; // ISO date string
  googleUserId: string | null;
  facebookUserId: string | null;
  recordKey: string | null;
  externalSystemId: string | null;
  isDefaultAdmin: boolean | null;
  isActive: boolean | null;
  created: string | null; // ISO date string
  createdBy: number | null;
  modified: string | null; // ISO date string
  modifiedBy: number | null;
  isDeleted: boolean | null;
  deleted: string | null; // ISO date string or null
  deletedBy: number | null;
  isFirstTimeLogin: boolean | null;
  adName: string | null;
  loginAttempts: number | null;
  loginAttemptTime: string | null;
  internalRoleID?: number;
  userId?: number;
  userPermissionHash?: string; // Add this field back
}

export type APIGetUsersResponse = APIGeneralResponse<User>;

export type Member = {
  status?: number;
  ecwacNo?: string;
  totalRecords?: number;
  id?: number;
  tenantId?: number;
  contactTypeID?: number;
  shortCode?: string | null;
  name?: string;
  shortName?: string | null;
  firstName?: string;
  lastName?: string;
  middleName?: string | null;
  maidenName?: string | null;
  gender?: string;
  genderIdentified?: string | null;
  email?: string;
  phone?: string | null;
  mobile?: string;
  ssn?: string | null;
  description?: string | null;
  className?: string | null;
  accountTypeID?: number;
  recordKey?: string;
  primaryMemberID?: number | null;
  primaryMemberName?: string | null;
  relationship?: string | null;
  relationType?: string | null;
  birthDate?: string; // ISO date string
  preferredName?: string | null;
  workPhone?: string | null;
  workPhoneExt?: string | null;
  homePhone?: string | null;
  isTobaccoUser?: boolean | null;
  accountID?: number;
  accountShortCode?: string;
  upcomingAccountShortCode?: string | null;
  assignedTo?: number | null;
  assignedName?: string | null;
  assignedShortName?: string | null;
  assignedImage?: string | null;
  profilePhoto?: string | null;
  ownerId?: number | null;
  ownerName?: string | null;
  ownerShortName?: string | null;
  ownerImage?: string | null;
  campaignId?: number | null;
  score?: number | null;
  employerYears?: number | null;
  employer?: string;
  monthlyIncome?: number | null;
  billingAddressId?: number | null;
  shippingAddressId?: number | null;
  isMarried?: boolean | null;
  uid?: string | null;
  created?: string; // ISO date string
  createdBy?: string | null;
  accountType?: string;
  billingAddress1?: string | null;
  billingAddress2?: string | null;
  billingCity?: string | null;
  billingCountry?: string | null;
  billingPostalCode?: string | null;
  billingStateCode?: string | null;
  billingState?: string | null;
  shippingAddress1?: string | null;
  shippingAddress2?: string | null;
  shippingCity?: string | null;
  shippingCountry?: string | null;
  shippingPostalCode?: string | null;
  shippingStateCode?: string | null;
  shippingState?: string | null;
  userId?: number | null;
  isActivationHash?: boolean;
  isUserActive?: boolean;
  internalRoleID?: number | null;
  statusID?: number | null;
  isGroupStartEnrollment?: boolean | null;
  accountTPA?: string | null;
  customFieldJSONData?: string | null;
  isActive?: boolean;
  modified?: string | null; // ISO date string
  modifiedBy?: string | null;
  createdByName?: string | null;
  modifiedByName?: string | null;
  groupId?: string;
  contactOpportunityID?: number | null;
  primaryContactOpportunityID?: number | null;
  accountOpportunityID?: number | null;
  isActiveStatus?: boolean | null;
  claimCount?: number;
  caseCount?: number;
  age?: number;
  isCobra?: boolean;
};

export type SortOrder = "ASC" | "DESC" | "";

export interface APIAuthSyncRequest {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

export interface APIGetMembersRequest {
  page: number;
  limit: number;
  sortBy?: string | null;
  sortOrder?: SortOrder;
  search?: string | null;
  filterBy?: string | null;
  filter?: string | null;
  tagQuery?: string | null;
  accountTypeIds?: string | null;
}

export enum TenantSettingsCode {
  EventsAssignUserList = "EventsAssignUserList",
  ScheduleCallbackAssignUserList = "ScheduleCallbackAssignUserList",
  ClaimsAssignUserList = "ClaimsAssignUserList",
  ExtraHelpAssignUserList = "ExtraHelpAssignUserList",
  AddChangeDropsAssignUserList = "AddChangeDropsAssignUserList",
  HgrAssignUserList = "HgrAssignUserList",
  AccountsCsaUserList = "AccountsCsaUserList",
  AccountsHccUserList = "AccountsHccUserList",
  OpportunityCsaUserList = "OpportunityCsaUserList",
  OpportunityHccUserList = "OpportunityHccUserList",
  GroupTerminationAssignUserList = "GroupTerminationAssignUserList",
  OutofPocketAssignUserList = "OutofPocketAssignUserList",
  OutOfPocketResponseDays = "OutOfPocketResponseDays",
}

export enum CaseTypes {
  ClinicalIssue = 1,
  BillingIssue = 2,
  MembershipIssue = 3,
  Others = 4,
  CareLogistics = 7,
}

export enum SourceTypes {
  Advica = 1,
  AdvicaClub = 2,
  Canada = 3,
  RDH = 4,
}

export enum GenderType {
  Male = "M",
  Female = "F",
  PreferNotToDisclose = "ND",
}

export enum TPA {
  RDH = "RDH",
  RDA = "RDA",
  AITHER = "AITHER",
  HMA = "HMA",
  GROUPRESOURCES = "GROUPRESOURCES",
  ENROLLMENT = "ENROLLMENT",
}

export enum MemberStatus {
  NOT_INITIATED = "Not Initiated",
  IN_PROGRESS = "In Progress",
  ACTIVATED = "Activated",
  ENROLLED = "Enrolled",
  DECLINED = "Declined",
  PENDING = "Pending",
  ECW_CHART_CREATED = "ECW Chart Created",
  COMPLETED = "Completed",
  // Add more as needed
}

export enum ReferenceType {
  ENTITY_REQUEST = "EntityRequest",
  ECW_RACE = "ECW-Race",
  ECW_ETHINICITY = "ECW-Ethinicity",
  RELATION_TYPES = "RelationTypes",
  CASE_TYPES = "CaseTypes",
  COVERAGE_WAITING_PERIOD_TYPE = "CoverageWaitingPeriodType",
  COVERAGE_WAITING_PERIOD_TYPE_DAYS = "CoverageWaitingPeriodTypeDays",
  COVERAGE_BEGINS_TYPE = "CoverageBeginsType",
  COVERAGE_BEGINS_TYPE_DURATION = "CoverageBeginsTypeDuration",
  TERMINATION_DATE_TYPE = "TerminationDateType",
  TERMINATION_DATE_DURATION = "TerminationDateDuration",
  OPPORTUNITY_TYPES = "OpportunityTypes",
}

export enum Entity {
  Tenants = 1,
  Users = 2,
  Leads = 3,
  Prospects = 4,
  Accounts = 5,
  Contacts = 6,
  Products = 7,
  Orders = 8,
  Notes = 9,
  Tasks = 10,
  Events = 11,
  Files = 12,
  EntityStageTaskTransitions = 13,
  Resellers = 14,
  MemberHealthConditions = 15,
  MemberMedicine = 16,
  ProductSkus = 17,
  ContactRequestHistory = 18,
  Cases = 19,
  EntityTags = 20,
  EntityShortCodes = 21,
  ExtraHelp = 22,
  MembershipCard = 99,
  AccountOpportunities = 100,
  ContactOpportunities = 101,
  Quotes = 104,
  FormInquiry = 105,
  MobileJourneyRequests = 106,
  MedicalNeed = 107,
  ProductComponents = 41,
  ContractConfigurationSkus = 110,
  JiraConfiguration = 111,
  MobileAppRegistrationIssue = 112,
  ProductCodes = 113,
  InvoiceAdjustment = 114,
}

export enum EntityRequestStatus {
  Pending = 1,
  InProcess = 2,
  Completed = 3,
  Failed = 4,
  ReadyForPrint = 5,
  StagedTextMessage = 6,
  Rejected = 7,
  Staged = 8,
}

export enum EntityRequest {
  TextCard = 1,
  PrintCard = 2,
  MailCard = 3,
  GenerateCard = 4,
  PushToDrexi = 5,
  Admin123 = 6,
  EDI834 = 7,
  HL7_ECWToRDH = 8,
  HL7_RDHToECW = 9,
  AddMember = 10,
  ChangeMember = 11,
  DropMember = 12,
  RosterMaster = 13,
  TerminateGroup = 14,
  TerminateOldDrexiRecord = 15,
  WiTTRegistration = 16,
}

export interface APIMember {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phone: string;
  mobile: string;
  birthDate: string;
  gender: GenderType;
  age: number;
  recordKey?: string;
  accountId?: number;
  accountName?: string;
  accountPhone?: string;
  accountType?: string;
  ecwPatientId?: string;
  accountTPAId?: string;
  accountShortCode?: string;
  tenantId: number;
  workPhone: string | null;
  workPhoneExt: string;
  preferredName: string | null;
  maidenName: string | null;
  modified: string; // ISO date string
  modifiedBy: number;
  ssn: string | null;
  isTobaccoUser: boolean;
  isDeleted: boolean;
  contactTypeId: number;
  genderIdentified: string | null;
  membershipRecordKey: string;
  status: number;
  ecwACNo: string;
}

export enum MemberStatusTypes {
  Inactive = 0,
  Active = 1,
  FutureActive = 2,
}

export interface APIMemberDetails {
  id: number;
  tenantId?: number;
  contactTypeID?: number;
  shortCode?: string | null;
  name?: string | null;
  shortName?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  middleName?: string | null;
  maidenName?: string | null;
  gender?: GenderType;
  genderIdentified?: GenderType;
  email?: string;
  phone?: string | null;
  mobile?: string;
  ssn?: string | null;
  description?: string | null;
  className?: string | null;
  accountTypeID?: number;
  accountShortCode?: string | null;
  recordKey?: string | null;
  primaryMemberID?: number | null;
  primaryMemberName?: string | null;
  profilePhoto?: string | null;
  relationship?: string | null;
  relationType?: number;
  birthDate?: string | null;
  preferredName?: string;
  workPhone?: string | null;
  workPhoneExt?: string | null;
  homePhone?: string | null;
  isTobaccoUser?: boolean;
  accountID?: number | null;
  campaignId?: number | null;
  score?: number | null;
  employerYears?: number | null;
  employer?: string | null;
  monthlyIncome?: number | null;
  billingAddressId?: number | null;
  shippingAddressId?: number | null;
  isMarried?: boolean | null;
  externalSystemKey?: string | null;
  statusID?: number | null;
  isGroupStartEnrollment?: boolean | null;
  accountId?: number | null;
  accountName?: string | null;
  accountPhone?: string | null;
  accountType?: string | null;
  membershipRecordKey?: string | null;
  productCode?: string | null;
  productMappingCode01?: string | null;
  productMappingCode02?: string | null;
  accountTPAId?: string | null;
  accountTPA?: string | null;
  ecwAccount?: string | null;
  ecwPatientId?: string | null;
  modifiedByUser?: string | null;
  productID?: number;
  startDate?: string | null;
  status?: string | null;
  billingAddress: Address;
  shippingAddress: Address;
  customFieldJSONData?: string | null;
  employeeEnrollmentLink?: string | null;
  upcomingEmployeeEnrollmentLink?: string | null;
  employeeActivationLink?: string | null;
  contactsExt?: ContactsExt | null;
  userId?: number;
  userName?: string | null;
  isActive?: true;
  created?: string | null;
  createdBy?: number | null;
  createdByName?: string | null;
  modified?: string | null;
  modifiedBy?: number | null;
  modifiedByName?: string | null;
  groupId?: string | null;
  hasAccountActive?: boolean;
  isCompanyEnrollmentStarted?: boolean;
  contactOpportunityID?: number | null;
  primaryContactOpportunityID?: number | null;
  accountOpportunityID?: number | null;
  contactOpportunityCustomFieldJSONData: ContactOpportunityCustomFieldJSONData | null;
  claimCount?: number | null;
  caseCount?: number | null;
  isActiveStatus?: number | null;
  age?: number | null;
  isCobra: boolean;
  effectiveDate?: string | null;
}

export interface ContactsExt {
  id?: number;
  contactId?: number;
  tpa?: string | null;
  pushedToDrexiDate?: string | null;
  rxactiveDate?: string | null;
  rxtermDate?: string | null;
  ecwPatientId?: string | null;
  legacyEcwPatientId?: string | null;
  ethnicity?: string | null;
  race?: string | null;
}

export interface Address {
  id?: number;
  address1?: string;
  address2?: string;
  city?: string;
  stateCode?: string;
  stateOrProvince?: string;
  postalCode?: string;
  country?: string;
  stateName?: string;
  countryName?: string;
}

export interface ContactOpportunityCustomFieldJSONData {
  c_ID: number;
  "TPA#": string | null;
  TPAID: string | null;
  RXBIN: string;
  RXPCN: string;
  RXGroup: string;
  RXID: string;
  RXPlanCode: string;
  RXPersonCode: string;
  RXActiveDate: string | null;
  RXTermDate: string | null;
  LAB: string;
  PushedToDrexiDate: string | null;
  EmploymentStatus: string | null;
  BenefitStatus: string | null;
  HireDate: string | null;
  isSendEnrollmentText: boolean | null;
  isSendActivaitonText: boolean | null;
  TerminationDate: string | null;
  ChangeType: string | null;
  NextVisitDate: string | null;
  HRA: boolean | null;
  Vision: boolean | null;
  Dental: boolean | null;
  EmployeeAssistance: boolean | null;
  BasicLife: boolean | null;
  Additionallife: boolean | null;
  ShortTermDisability: boolean | null;
  LongTermDisability: boolean | null;
  CriticalIllness: boolean | null;
  FixedBenefit: boolean | null;
  ADnD: boolean | null;
}

export interface Contact {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  phone: string;
  mobile: string;
  workPhone?: string;
  workPhoneExt?: string;
  preferredName?: string;
  maidenName?: string;
  birthDate: string;
  modified: string;
  modifiedBy: number;
  ssn: string;
  isTobaccoUser?: boolean;
  gender: GenderType | string;
  genderIdentified?: GenderType | string;
  age: number;
  ecwPatientId: string;
  ecwAccount: string;
  ethnicity?: string;
  race?: string;
}
export interface Country {
  id: number;
  countryCode2Char: string;
  countryCode3Char: string;
  name: string;
  created: string;
  createdBy: number;
  modified: string | null;
  modifiedBy: number | null;
  deleted: string | null;
  isDeleted: boolean;
  deletedBy: number | null;
  isVisible: boolean;
}

export interface State {
  id: number;
  code: string;
  countryId: string;
  name: string;
  created: string;
  createdBy: number;
  modified: string | null;
  modifiedBy: number | null;
  deleted: string | null;
  isDeleted: boolean;
  deletedBy: number | null;
}

export interface entityTag {
  id: number;
  tenantID: number;
  tagCategoryID: number;
  name: string;
  displayOrder: number;
  image: string;
  isActive: boolean;
}

export interface APITagCategories {
  tagCategoryId: number;
  tagCategoryName: string;
  entityTagList: entityTag[];
}

export interface APICases {
  id: number;
  name: string;
  receivedTime: string;
  description: string;
  caseType: string;
  caseSubType: string;
  groupName: string;
  groupId: number;
  status: string;
  assignedTo: string;
}

export interface APIGetLogsRequestsRequest {
  id: number;
  page: number;
  limit: number;
  sortBy?: string | null;
  sortOrder?: SortOrder;
  search?: string | null;
  filterBy?: string | null;
  filter?: string | null;
  requestTypeIds?: string | null;
}

export interface APIGetBrokerLeadsRequest {
  page?: number;
  limit?: number;
  sortBy?: string | null;
  sortOrder?: SortOrder;
  search?: string | null;
}

export interface APIGetLogsTextsRequest {
  id: number;
  page: number;
  limit: number;
  sortBy?: string | null;
  sortOrder?: SortOrder;
  search?: string | null;
  filterBy?: string | null;
  filter?: string | null;
}

export interface CreatedBy {
  id: number;
  name: string;
  email: string;
}

export interface APILogsRequests {
  id: number;
  requestType: string;
  status: string;
  notes: string;
  createdOn: string;
  createdBy: CreatedBy;
}
export interface APILogsTexts {
  id: number;
  phone: string;
  status: string;
  notes: string;
  sentOn: string;
  messageText: string;
  requestedBy: string;
  entityId: number;
}
export interface APIMemberReference {
  id: number;
  contactId: number;
  doctorFirstName: string | null;
  doctorLastName: string | null;
  referralNumber: number;
  referralReferenceNumber: string | null;
  speciality: string | null;
  referralAuthDate: string;
  createdBy: string;
  firstVisitDate: string;
  authorizedVisit: number;
}

export interface APIMemberMobileApp {
  id: number;
  device: string;
  osVersion: string;
  appVersion: string;
  lastAccessed: string;
}

export interface APIPlanDetails {
  id: number;
  tenantId: number;
  contactId: number;
  productID: number;
  productName: string;
  productCode: string;
  startDate: string; // ISO date string
  endDate: string | null;
  balanceAmount: number | null;
  subscriptionStatusId: number | null;
  subscriptionStatus: string | null;
  description: string;
  categoryId: number;
  categoryName: string;
  recordKey: string | null;
  stageId: number | null;
  statusId: number | null;
  scopeId: number | null;
  isActive: boolean;
  url: string | null;
  location: string;
  addressId: number | null;
  price: number | null;
  unitId: number | null;
  size: number | null;
  mfgYear: number | null;
  sellerID: number | null;
  primaryImageId: number | null;
  isPreferred: boolean;
  externalId: string | null;
  created: string; // ISO date string
  skuid: number;
  productSKUName: string;
  stockQty: number | null;
  minLevelQty: number | null;
  maxLevelQty: number | null;
  holdLevelQty: number | null;
  planName: string;
  edccode: string | null;
  mcscode: string | null;
  bsFileName: string;
  contactEntityTypeID: number;
  isWithInConverage: boolean;
  benefitSummary: string | null;
  isActivePlan: boolean;
  accountOpportunityID: number;
  contactOpportunityID: number;
  accountID: number;
  accountName?: string;
  className: string;
  everydayCarrierName: string;
  hospitalCarrierName: string;
  netsuitePlanDetails?: NetSuitePlanDetails | null;
}

export interface MobileAppResponse {
  userName: string;
  devices: APIMemberMobileApp[];
}

export interface APIMedicalNeed {
  id: number;
  MedicalNeed: boolean;
  ShowEditButton: boolean;
  ShowDeleteButton: boolean;
  IsMedicalNeed: string;
}

export interface APIHealthConditions {
  id: number;
  HealthCondition: string;
  Type: string | null;
  StartDate: string | null;
  EndDate: string | null;
  Notes: string | null;
  IsDeleted: boolean;
  ShowEditButton: boolean;
  ShowDeleteButton: boolean;
}

export interface APIPreConditions {
  id: number;
  AdditionalInformation: string;
  SpecializationType: string | null;
  VisitReason: string | null;
  NextVisitDate: string | null;
  Nationality: string | null;
  HasHnC: boolean | null;
  HasPrimaryConditions: boolean | null;
  HasGeneticDefect: boolean | null;
  PrimaryConditions: string | null;
  GeneticDefect: string | null;
  HTGRSource: string;
  ShowEditButton: boolean;
  ShowDeleteButton: boolean;
}

export interface APIClinicalHealthConditions {
  memberMedicalNeed: APIMedicalNeed[];
  healthConditions: APIHealthConditions[];
  preConditions: APIPreConditions[];
}

export interface APIHealthConditionsList {
  value: string;
  text: string;
}

export interface APIAddHealthConditionData {
  HealthCondition: string;
  Notes: string;
}

export interface APIClinicalMedication {
  id: number;
  MedicationName: string;
  Dose: string;
  NextRefillDate: string | null;
  Notes: string | null;
  IsDeleted: boolean;
  FrequencyTimeperday: string | null;
  RouteofAdmin: string | null;
}

export interface APIClinicalContacts {
  contactRelations_ID: number;
  contacts_Name: string;
  contacts_Mobile: string;
  addresses_City: string | null;
  relatedContactId: number;
  relationship: string;
  entityId: number;
  specializationType: string;
  showEditButton: boolean;
}

export interface APIClinicalAppointments {
  ID: number;
  ContactID: number;
  Subject: string;
  OwnerName: string;
  OwnerID: number;
  ActivityDate: string;
  StartTime: string;
  EndTime: string;
  ShowEditButton: boolean;
}

export interface APIClientPlan {
  id: number;
  productSkuId: number;
  productId: number;
  tenantId: number;
  accountId: number;
  categoryName: string;
  productName: string;
  skuDisplayName: string;
  productSkuName: string;
  productCode: string;
  productCodeId: number;
  priceM: number;
  priceMS: number;
  priceMC: number;
  priceMF: number;
  description: string;
  startDate: string;
  endDate: string;
  isSelected: boolean;
  accountOpportunityId: number;
  activeMembers: number;
  primaryMembers: number;
  showEditButton: boolean;
  showDeleteButton: boolean;
  netsuitePlanCategoryName: string;
  netsuitePlanCoverageTierName: string;
  netsuitePlanName: string;
  netsuitePlanPrice: number;
  netsuitePlanProductCode: string;
  netsuitePlanSku: string;
  netsuitePlanId: number;
}

export interface ImportLogFileData {
  FirstName: string;
  LastName: string;
  personCode: number;
  Mobile: string;
  Phone: string;
  Gender: string;
  EmployeeSSN: string;
  BirthDate: string;
  MembershipId: string;
  Address1: string;
  Address2: string;
  City: string;
  StateCode: string;
  PostalCode: string;
  Country: string;
  Email: string;
  EmploymentStatus: string;
  EmployeeClass: string;
  StartDate: string;
  hasError: boolean;
  RowNo: number;
  ID: number;
  ConatctOpportunityId: number;
  IsRoasterErr: boolean;
  RoasterErrorMsg: string;
  IsRIDInOthrGroup: boolean;
}

export interface APIImportLogFileDetails {
  id: number;
  name: string;
  dob: string;
  fileName: string;
  rowNumber: number;
  data: ImportLogFileData;
  invalidReason: string;
}
export interface APISaveAccountPlanRequest {
  id: number;
  accountId: number;
  skuId: number;
  productCodeId: number;
  startDate: string;
  endDate: string;
  IsAllowProceed: number;
  OperationId: number;
  accountOpportunityId: number;
  isAllowProceed: number;
  isEdit: boolean;
  operationId: number;
}

export interface APIBrokerLeads {
  id: number;
  created: string;
  createdByUserTimeZone: string;
  formId: number;
  isActive: boolean;
  description: string;
  formName: string;
}

export interface APIBrokerLeadDetails {
  id: number;
  formId: number;
  submissionUrl: string;
  data: string;
  created: string;
  createdBy?: string;
  modified?: string;
  modifiedBy?: string;
  isActive?: boolean;
}

export type APIGetClinicalHealthConditionsResponse =
  APIGeneralResponse<APIClinicalHealthConditions>;

export type APIHealthConditionResponse = APIGeneralResponse<string>;

export type APIGetHealthConditionsListResponse = APIGeneralResponse<APIHealthConditionsList[]>;

export type APIGetClinicalMedicationResponse = APIGeneralResponse<APIClinicalMedication[]>;

export type APIGetClinicalContactsResponse = APIGeneralResponse<APIClinicalContacts[]>;

export type APIGetClinicalAppointmentsResponse = APIGeneralResponse<APIClinicalAppointments[]>;

export interface APIMemberClaims {
  cases_ID: number;
  type: string | null;
  providerType: string | null;
  dateOfService: string;
  totalBilledAmount: number;
  created: string;
  hasFiles: boolean;
  hasNotes: boolean;
  groupName: string;
  groupId: number;
}
export interface APIEntityTagForFlags {
  id: number;
  tenantId: number;
  entityTypeId: number;
  entityName: string;
  tagCategoryId: number;
  tagCategoryName: string;
  name: string;
  displayOrder: number;
  shape: string;
  tagClass: string;
  color: string;
  image: string;
  tagIsActive: boolean;
  tagCategoryIsActive: boolean;
  isSingular: boolean;
}
export interface APIMembershipCobraList {
  cobraStartDate: string;
  cobraEndDate: string;
  productId: number;
  productSkuId: number;
  productSku: string;
  productSkuName: string;
  accountName: string;
  cobraTerminationDate: string;
  accountId: number;
  contactOpportunityId: string;
  accountOpportunityId?: string;
}
export interface APIMembershipAccountCobraList {
  accountId: number;
  accountName: string;
  contactProductId: number;
  productId: number;
  productSkuId: number;
  productSku: string;
  productSkuName: string;
  planStartDate: string;
  planEndDate: string;
}
export interface APIMembershipCardList {
  id: number;
  date: string;
  requestedBy: string;
  requestType: string;
  status: string;
}

export interface APIMembershipCardImageResponse {
  pdfUrl: string;
  imageFrontUrl: string;
  imageBackUrl: string;
}

export interface MembershipCoverageAccount {
  id: number;
  name: string;
}
export interface MembershipCoverageProduct {
  id: number;
  name: string;
  productSkuName: string;
}
export interface NetSuitePlanDetails {
  contactId: number;
  productSkuId: number;
  accountOpportunityId: number;
  planId: number;
  accountProductId: number;
  planCategoryName: string;
  planCoverageTierName: string;
  planName: string;
  planProductCode: string;
  planSku: string;
}
export interface APIMembershipCoverageList {
  id: number;
  account: MembershipCoverageAccount;
  product: MembershipCoverageProduct;
  className: string;
  accountDivision?: string | null;
  accountBusinessUnit?: string | null;
  category: string;
  categoryId?: number;
  redirectId?: string;
  startDate?: string;
  endDate?: string;
  moopMetDate?: string | null;
  accountID?: number;
  netsuitePlanDetails?: NetSuitePlanDetails | null;
  accountName?: string;
  everydayCarrierName: string;
  hospitalCarrierName: string;
  recordKey?: string;
}
export interface APIReferenceTypes {
  id: number;
  name: string;
  refType: ReferenceType;
  intValue1: number | null;
  intValue2: number | null;
  strValue1: string | null;
  strValue2: string | null;
}

export interface APIRelatedContactList {
  contacts_Name: string;
  mobile: string;
  birthDate: string;
  gender: string;
  recordKey: string;
  contactRelations2_ID: number;
  relatedContactId: number;
  relationship: string;
  relationId: number;
  groupName: string;
  groupId: number;
  status: boolean;
  showEditButton: boolean;
  contactRelationId: string;
  name: string;
  isActiveStatus: number;
}
export interface RelatedContactParams {
  id: number;
  accountTypeId: 4;
  accountOpportunityId: number;
  primaryContactOpportunityId: number;
}
export interface GetRelatedContactsParams {
  id: number;
  accountTypeId: 4;
  accountOpportunityId: number;
  primaryContactOpportunityId: number;
  hideLoader?: boolean;
}
export interface APISpeciality {
  name: string;
  strValue1: string;
}

export interface APIPostReferenceNumberRequest {
  firstName: string;
  lastName: string;
  speciality: string;
  referralAuthNumberDate: string;
  firstVisitDate: string;
  noOfAuthorizedVisit: number;
  contactID: number;
  caseID: number | null;
}

export interface APIReferenceNumber {
  id: number;
  contactId: number | null;
  referralAuthNumber: number;
  firstName: string | null;
  lastName: string | null;
  referralAuthNumberDate: string | null;
  firstVisitDate: string | null;
  speciality: string | null;
  noOfAuthorizedVisit: number | null;
  createdBy: number;
  created: string;
  caseId: number | null;
  referralReferenceNumber: string | null;
}

export interface APIresetPasswordRequest {
  id: number;
  userName: string;
  confirmPassword: string;
  newPassword: string;
}

export interface ResetPassword {
  id: number;
  tenantId: number;
  entityTypeId: number;
  entityId: number;
  noteTypeId: number;
  subject: string;
  isPrivate: boolean;
  description: string;
  uid: string | null;
  createdBy: number;
}
export interface CoveragePlan {
  id: number;
  accountId?: number;
  accountOpportunityId?: number;
  categoryId?: number;
  categoryName: string;
  productId?: number;
  skuId?: number;
  sku?: string;
  productName?: string;
  startDate?: string; // ISO string format
  endDate?: string; // ISO string format
  primaryContactOpportunityId?: number | null;
  className?: string;
}
export interface requestPlanData {
  id?: string;
  contactId?: number | null;
  accountId?: number | null;
  productId?: number | null;
  startDate?: string | null;
  endDate?: string | null;
  productSkuId?: number | null;
  accountOpportunityId?: number | null;
  categoryId?: number | null;
  primaryContactOpportunityId?: number | null;
  className?: string;
  relationshipId?: number | null;
  primaryMemberId?: number | null;
  subscriptionStatusId?: number | null;
  price?: number;
  orderId?: number;
  balanceAmount?: number;
  productSkuTierId?: number;
  moopMetDate?: string | null;
}
export interface contactClassData {
  className?: string;
  accountId?: number;
  accountOpportunityId?: number;
  isActiveAccountOpportunity?: boolean;
}
export type cobraInfo = {
  cobraProductId: number | null;
  cobraProductSkuId: number | null;
  cobraTerminationDate: string | null;
  cobraStartDate: string | null;
  cobraEndDate: string | null;
  contactOpportunityId: number | null;
  primaryContactOpportunityId: number | null;
  primaryContactId: number | null;
};
export interface contactPlanData {
  contactProductId: number;
  productId: number;
  skuId: number;
  planName: string;
  startDate: string;
  endDate: string;
}

export interface ContactRelationsDto {
  id?: number | null;
  contactId?: number | null;
  relatedContactId?: number | null;
  accountId?: number | null;
  accountTypeId?: number | null;
  accountOpportunityId?: number | null;
  relationId?: RelationTypes;
  primaryContactOpportunityId?: number | null;
}

export interface ContactRelationData {
  id: number;
  accountOpportunityId: number;
  contactOpportunityId: number;
  name: string;
  firstName: string;
  lastName: string;
  ssn: string | null;
  mobile: string;
  birthDate: string;
  email: string;
  gender: string;
  isTobaccoUser: boolean;
  primaryMemberId: number;
  contactId?: number | null;
  relatedContactId?: number;
  accountId?: number | null;
  accountTypeId?: number | null;
  relationId?: RelationTypes;
  primaryContactOpportunityId?: number | null;
}
export enum RelationTypes {
  Primary = 1,
  Spouse = 2,
  Child = 3,
  PrimaryCarePhysician = 4,
  Caregiver = 5,
  CareCoordinator = 6,
  Anesthesiologist = 7,
  Dentist = 8,
  GroupMembers = 9,
}

export interface RelatedContactData {
  id: number;
  tenantId: number;
  name: string;
  firstName: string;
  lastName: string;
  middleName: string | null;
  email: string;
  phone: string | null;
  mobile: string;
  workPhone: string | null;
  workPhoneExt: string | null;
  preferredName: string | null;
  maidenName: string | null;
  birthDate: string;
  modified: string;
  modifiedBy: number;
  ssn: string | null;
  isTobaccoUser: boolean;
  isDeleted: boolean;
  contactTypeId: number;
  gender: string;
  genderIdentified: string | null;
  homePhone: string | null;
  created: string;
  createdBy: number;
  billingAddressId: number;
  shippingAddressId: number;
  profilePhoto: string;
  assignedTo: number | null;
  assignedOn: string | null;
  ownerId: number | null;
  ownerAssignedOn: string | null;
  prospectStageId: number | null;
  leadStageId: number | null;
  campaignId: number | null;
  leadSourceId: number | null;
  isActive: boolean;
  externalSystemKey: string | null;
  isSelfEmployed: boolean;
  employerYears: number | null;
  employer: string | null;
  monthlyIncome: number | null;
  description: string | null;
  title: string | null;
  assistantName: string | null;
  assistantPhone: string | null;
  reportsToId: number | null;
  rating: string | null;
  score: number | null;
  doNotCall: boolean | null;
  emailOptOut: boolean | null;
  isMarried: boolean;
  uid: string | null;
  contactPictureId: number | null;
  oldRecordKey: string | null;
  shortCode: string;
  deleted: string | null;
  deletedBy: number | null;
  source: string | null;
  age: number;
}
export interface PatchRelatedContactPayload {
  contactRelationsDto?: ContactRelationsDto;
  name?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string | null;
  birthDate?: string;
  email?: string;
  primaryMemberId?: number;
  mobile?: string;
  gender?: string;
  contactOpportunityId?: number | null;
  accountOpportunityId?: number | null;
  primaryContactOpportunityId?: number | null;
  relationId?: number;
}

export interface AddRelatedcontact {
  primaryMemberId: number | null;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  gender: string;
  birthDate: string;
  ssn: string;
  isTobaccoUser: boolean;
  contactProductId: number;
  startDate: string;
  contactRelationsDto: ContactRelationsDto;
  accountOpportunityId: number | null;
  primaryContactOpportunityId: number | null;
}

export interface MemberAddress {
  address1?: string;
  address2?: string;
  city?: string;
  stateCode?: string;
  postalCode?: string;
  country?: string;
}

export interface requestMemberDetailsData {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  email?: string;
  name?: string;
  phone?: string;
  mobile?: string;
  ssn?: string;
  gender?: string;
  genderIdentified?: string;
  homePhone?: string;
  isTobaccoUser?: boolean;
  maidenName?: string;
  preferredName?: string;
  workPhone?: string;
  workPhoneExt?: string;
  birthDate?: string;
  billingAddressId?: number;
  billingAddress?: Address;
  shippingAddressId?: number;
  shippingAddress?: MemberAddress;
  contactOpportunityId?: number;
  ethnicity?: string;
  race?: string;
  pushedToDrexiDate?: string;
  rxActiveDate?: string;
  rxTermDate?: string;
}

export interface APIPatchClientDetailsRequest {
  id?: number;
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  isTest?: boolean;
  billingAddress?: Address;
  shippingAddress?: Address;
  customFieldJSONData?: ClientCustomFieldJSONData;
  accountExt?: ClientAccountExt;
}

export interface APIPatchClientAccountOpportunityDetailsRequest {
  id?: number;
  accountId?: number;
  name?: string;
  startDate?: string;
  endDate?: string;
  closeDate?: string;
  opportunityTypeId?: number;
  ownerId?: number;
  primaryContactId?: number;
  billingContactId?: number;
  hrContactId?: number;
  primaryContact?: {
    id?: number;
    name?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    mobile?: string;
    birthDate?: string;
  };
  billingContact?: {
    id?: number;
    name?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    mobile?: string;
    birthDate?: string;
  };
  hrContact?: {
    id?: number;
    name?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    mobile?: string;
    birthDate?: string;
  };
  accountOpportunityExt?: AccountOpportunityExt;
  customFieldJSONData?: APIAddCustomFieldData;
  activeOpportunityCustomFieldJSONData?: {};
  activeOpportunityId?: number;
  accountExt?: {
    accountId?: number;
    sic?: number;
    coverageWaitingPeriodTypeId?: number;
    coverageWaitingPeriodDurationId?: number;
    afterWaitingPeriodTypeId?: number;
    afterWaitingPeriodDurationId?: number;
    terminationDateTypeId?: number;
    terminationDateDurationId?: number;
  };
}

export interface APIAddCustomFieldData {
  TotalEmpFT?: number | null;
  TotalEmpPT?: number | null;
  AppSignedDate?: string | null;
  SignedByName?: string | null;
  SignedByTitle?: string | null;
  IsAgreeAddnSignature?: boolean | null;
  AppSubmittedDate?: string | null;
  AppProcessedDate?: string | null;
  EnrollmenStartDate?: string | null;
  EnrollmenEndDate?: string | null;
  IsStartEnrollment?: boolean | null;
  EffectiveDateRequested?: string | null;
  IsSendLinkByEmail?: boolean | null;
  IsSendLinkBySMS?: boolean | null;
  MinHoursForElligibility?: number | null;
  NewHireWaitPeriod?: string | null;
  TerminateAfterNoWorkForXDays?: string | null;
  HasExcludedClassOfEmp?: boolean | null;
  Is1099Offered?: boolean | null;
  AutoEnrollment?: string | null;
  HasEmpOnCOBRA?: boolean | null;
  IsCOBRA?: boolean | null;
  NeedTPAForCOBRA?: boolean | null;
  HRA?: boolean | null;
  HRAWaived?: boolean | null;
  Vision?: boolean | null;
  Dental?: boolean | null;
  EmployeeAssistance?: boolean | null;
  BasicLife?: boolean | null;
  Additionallife?: boolean | null;
  LongTermCare?: boolean | null;
  ShortTermDisability?: boolean | null;
  LongTermDisability?: boolean | null;
  CriticalIllness?: boolean | null;
  FixedBenefit?: boolean | null;
  ADnD?: boolean | null;
}

export interface APIAddMedicationData {
  fields: {
    MedicationName: string;
    Dose: string;
    NextRefillDate: string;
    Notes: string;
  };
}
export interface APIAddNoteRequest {
  entityTypeId?: number;
  entityId?: number;
  noteTypeId?: number;
  subject?: string;
  description?: string;
  isPrivate?: boolean;
  uid?: number;
}

export interface APIAddTaskRequest {
  entityTypeId?: number;
  entityId?: number;
  taskTypeId?: number;
  assignedUserId?: number;
  name?: string;
  description?: string;
  isPrivate?: boolean;
  uid?: number;
}

export interface APIAddOtherContact {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  relationType: RelationTypes;
  memberId: number;
}
export interface APINoteResponse {
  id: number;
  tenantId: number;
  entityTypeId: number;
  entityId: number;
  noteTypeId: number;
  subject: string;
  description: string;
  created: string;
  createdBy: number;
  modified: string;
  modifiedBy: number;
  uid: string | null;
  isPrivate: boolean;
  isDeleted: boolean;
  deleted: string | null;
  deletedBy: number | null;
}
export interface APITaskResponse {
  id: number;
  tenantId: number;
  entityTypeId: number;
  entityId: number;
  taskTypeId: number;
  name: string;
  description: string;
  assignedUserId: number;
  dueDate: string;
  taskDate: string;
  completedOn: string;
  statusId: number;
  created: string;
  createdBy: number;
  modified: string;
  modifiedBy: number;
  uid: string | null;
}

export interface APIPatchNoteRequest {
  description: string;
  subject: string;
  isPrivate: boolean;
}

export interface APIPatchRedirectIdRequest {
  recordKey: string;
}

export interface APIMemberDocuments {
  id: number;
  tenantId?: number;
  entityTypeId: number;
  entityName?: string;
  entityId: number;
  fileCategoryId?: number;
  fileCategoryName?: string;
  fileSubCategoryId?: number;
  fileSubCategoryName?: string;
  name: string;
  description: string;
  filePath: string;
  mimeType: string;
  size: number;
  formattedSize: string;
  isPrivate: boolean;
  createdBy?: number;
  createdByName?: string;
  created: string;
  utcCreated: string;
}

export interface APIGetMemberDocumentsRequest {
  entityTypeId: number;
  entityId: number;
  timespanName: TimespanName;
  uid?: number;
  tenantId?: number;
  fileCategoryId?: number;
  fileSubCategoryId?: number;
  searchTerm?: string;
}

export interface APIUploadDocumentRequest {
  entityTypeId: number;
  entityId: number;
  uid?: number;
  files: File[];
}

export interface APIPatchECWNumberRequest {
  ecwNumber: string;
}

export interface APIPatchTaskRequest {
  id: number;
  name: string;
  description: string;
  taskDate: string;
  dueDate: string | null;
  statusId: number;
  assignedUserId: number;
  taskTypeId: number;
  uid: string | null;
  modifiedBy: number;
}
export interface APIAssignToUsersList {
  value: number;
  text: string;
}
export interface APIActivity {
  id: number;
  activityID: number;
  activitySubTypeId: number;
  activityType: string;
  title: string;
  description: string;
  activityDate: string;
  activityEndDate: string;
  activityCompletedDate: string | null;
  activityUtcDateCreated: string;
  activityDateCreated: string;
  activityAssignedUserID: number;
  activityAssignedUserName: string;
  attendeeID: number;
  createdBy: number;
  entityTypeId: number;
  attendeeUserName: string;
  assignedShortName: string;
  attendeeUserImage: string;
  createdByName: string;
  createdByShortName: string;
  createdByImage: string;
  isPrivateNote: boolean;
  statusId: number;
  statusChangeOn: string | null;
  statusName: string;
  isActivityInFuture: boolean;
  removedBy: number | null;
  eventTypeId: number | null;
  externalSystem: string | null;
  externalStatus: string | null;
}

export interface APIEntityStageTask {
  id: number;
  tenantId: number;
  entityTypeId: number;
  name: string;
  displayOrder: number;
  isCompleted: boolean;
  isClosed: boolean;
  estCompletionMins: number | null;
  workflowId: number | null;
  code: string;
  isDefault: number;
  isFrozen: boolean;
  isSemiFrozen: boolean;
  stageTasks: number | null;
}

export type APIGetActivitiesResponse = APIGeneralResponse<{
  data: APIActivity[];
  totalPages: number;
  nextPage: number;
  limit: number;
  totalCount: number;
}>;

export interface APIGetActivities {
  entityTypeId: number;
  entityId: number;
  filterType: string;
  activitySubTypeId: number;
  timespanName: TimespanName;
  page?: number;
  limit?: number;
}
export interface APIAllTags {
  id: number;
  tenantId: number;
  tagCategoryId: number;
  entityTypeId: number;
  entityName: string;
  tagCategoryName: string;
  name: string;
  displayOrder: number;
  shape: string;
  tagClass: string;
  color: string;
  image: string;
  tagIsActive: boolean;
  tagCategoryIsActive: boolean;
  isSingular: boolean;
}
export interface APIAddTagRequest {
  entityTypeId: number;
  entityId: number;
  tagId: number;
}
export interface APIDeleteTagRequest {
  entityTypeId: number;
  entityId: number;
  tagId: number;
}

export interface APIUpdateDocumentRequest {
  id: number;
  name: string;
  description: string;
  isPrivate: boolean;
}

export interface APICaseSubTypes {
  Id: number;
  TenantId: number;
  TypeId: number;
  Name: string;
  IsActive: boolean;
  CategoryId: number | null;
  IssueTypeId: number | null;
  RequestTypeId: number | null;
}

export interface APIAddCaseRequest {
  tenantId: number;
  name: string;
  description?: string;
  entityId: number;
  assignedToUserId: number;
  typeId: number;
  subTypeId: number;
  callbackDateTime: string;
  isActive?: boolean;
  stageId: number;
  sourceId?: number;
  callbackNumber?: string;
  entityTypeId?: number;
  contactOpportunityId?: number;
  accountOpportunityId?: number;
}

export interface APISendCustomTextRequest {
  entityId: number;
  entityTypeId: number;
  customText: string;
  accountOpportunityID: number;
  isPrimary: boolean;
}
export interface APIContactFamilyMember {
  id: number;
  isPrimary: boolean;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  mobile: string;
  gender: "M" | "F";
  birthDate: string; // ISO date string
  address1: string;
  address2: string;
  city: string;
  stateCode: string;
  postalCode: string;
  billingAddressId: number;
  tagId: number | null;
  accountId: number;
  accountOpportunityId: number;
  contactOpportunityId: number;
  country: string;
  status: boolean;
  middleName: string | null;
}

export interface APIPostPrintMembershipCardRequest {
  entityId: number;
  entityTypeId: Entity;
  requestType: EntityRequest;
  entityRequestStatus: EntityRequestStatus;
  note: string;
}

export interface APIEntityRequest {
  tenantId: number;
  entityTypeId: Entity;
  entityId: number;
  requestTypeId: EntityRequest;
  statusId: EntityRequestStatus;
  notes: string;
  created: string;
  createdBy: number;
  modified: string;
  modifiedBy: number | null;
  source: string | null;
  destination: string | null;
  inboundDataId: number | null;
  completed: string | null;
  requestLog: string | null;
  attempts: number | null;
  parentEntityRequestId: number | null;
  parentEntityTypeId: number | null;
  parentEntityId: number | null;
  ownerId: number | null;
  data1: string | null;
  data2: string | null;
  data3: string | null;
  data4: string | null;
  data5: string | null;
  id: number;
}

export interface APIPostSendActivationTextRequest {
  contactOpportunityId: number;
  phoneNumber: string;
}

export interface APIPostSendEnrollmentTextRequest {
  contactOpportunityId: number;
  phoneNumber: string;
}
export type APIGetMembershipCardImageResponse = APIMembershipCardImageResponse;

export interface APIPostTextMembershipCardRequest {
  contactId: number;
  requestType: EntityRequest;
  mobile: string;
  contactOpportunityId: number;
}

export interface AuthSync {
  id: number;
  tenantId: number;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  phoneMobile: string;
  userName: string;
  imagePath: string;
  timezone: string;
  isActive: boolean;
  isFirstTimeLogin: boolean;
  isDefaultAdmin: boolean;
  created: string;
  modified: string;
}
export interface APIGetUserCurrentTimeWithNextRoundUpTimeResponseData {
  nextRoundUpTime: string;
  currentTime: string;
}
export interface APIProductPlanDetails {
  id: number;
  tenantID: number;
  contactID: number;
  productID: number;
  productName: string;
  productCode: string;
  startDate: string;
  endDate: string;
  balanceAmount: number | null;
  subscriptionStatusID: number | null;
  subscriptionStatus: string | null;
  description: string;
  categoryID: number;
  categoryName: string;
  recordKey: string | null;
  stageID: number | null;
  statusID: number | null;
  scopeID: number | null;
  isActive: boolean;
  url: string | null;
  location: string;
  addressID: number | null;
  price: number | null;
  unitID: number | null;
  size: number | null;
  mfgYear: number | null;
  sellerID: number | null;
  primaryImageID: number | null;
  isPreferred: boolean;
  externalID: string | null;
  created: string;
  skuid: number;
  productSKUName: string;
  stockQty: number | null;
  minLevelQty: number | null;
  maxLevelQty: number | null;
  holdLevelQty: number | null;
  planName: string;
  edccode: string;
  mcscode: string;
  contactEntityTypeID: number;
  isWithInConverage: boolean;
  benefitSummary: string | null;
  isActivePlan: boolean;
  bsFileName: string;
  skuDescription: string;
  accountOpportunityID: number;
  contactOpportunityID: number;
  accountID: number;
  className: string;
  moopMetDate: string | null;
}
export interface APIPlan {
  id: number;
  name: string;
  rootSKU: string;
  description: string;
  planCategoryId: number;
  planCategoryName: string;
  planProductCodeId: number;
  planProductCode: string;
  resiliencePro: boolean;
  acaCompliantForPenaltyA: boolean;
  acaCompliantForPenaltyB: boolean;
  tpaCode: string;
  createdAt: string;
  updatedAt: string | null;
  everydayCarrierName: string;
  hospitalCarrierName: string;
}

export interface APIDirectLeads {
  id: number;
  created: string;
  createdByUserTimeZone: string;
  formId: number;
  isActive: boolean;
  description: string;
  formName: string;
  data: string;
}

export interface APIGetAllClientsRequest {
  page: number;
  limit: number;
  sortOrder?: SortOrder;
  sortBy?: string | null;
  filterBy?: string | null;
  filter?: string | null;
  tagIds?: string | null;
  accountTypeIds?: string | null;
  search?: string | null;
  effectiveDate?: string | null;
  opportunityStartDate?: string | null; // Changed from lastOpportunityStartDate
  hccIds?: string | null;
  csaIds?: string | null;
}

export interface APIClient {
  id: number;
  tenantId: number;
  name: string;
  groupId: string;
  tpa: string;
  healthcareConsultantID: number;
  hccName: string;
  hccEmail: string;
  hccPhone: string;
  hccShortName: string;
  hccImage: string;
  ownerID: number;
  csaName: string;
  csaEmail: string;
  csaPhone: string;
  csaShortName: string;
  csaImage: string;
  resellerId: number | null;
  resellerName: string | null;
  rsShortName: string;
  accountTypeID: number;
  isActive: boolean;
  currentStatus: string;
  effectiveDate: string;
  tagsJson: string | null;
  totalPrimaryMember: number;
  employeesEnrolled: number;
  employeesPending: number;
  employeesDeclined: number;
  totalMemberCount: number;
  fullTimeEmployee: number;
  activeOpportunityID: number;
  status: boolean;
  accountOpportunityStartDate: string | null;
}

export interface APIGetClientEmployeesRequest {
  accountId: string;
  accountOpportunityId: string;
  sortOrder?: string;
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
}

export interface APIGetImportLogsRequest {
  entityId: number;
  entityTypeId: number;
  sortOrder?: string;
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
}
export interface APIGetPlansRequest {
  page: number;
  limit: number;
  sortBy?: string | null;
  sortOrder?: SortOrder;
  search?: string | null;
}

export interface APIGetDirectLeadsRequest {
  page: number;
  limit: number;
  sortBy?: string | null;
  sortOrder?: SortOrder;
  search?: string | null;
  formName: string;
}

export interface APIGetOpportunityEmployeesRequest {
  accountId: number;
  accountOpportunityId: number;
  sortOrder?: string;
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
}

export interface APIGetRosterPaginationRequest {
  accountId: number;
  accountOpportunityId: number;
  sortDirection?: string;
  pageSize?: number;
  currentPage?: number;
  sortBy?: string;
  search?: string;
}

export interface APIAccountOpportunityHCCUsers {
  value: number;
  text: string;
}

export interface APIAccountOpportunityCSAUsers {
  value: number;
  text: string;
}
export interface APIPlansDetails {
  id: number;
  name: string;
  rootSKU: string;
  description: string;
  planCategoryId: number;
  planCategoryName: string;
  planProductCodeId: number;
  planProductCode: string;
  resiliencePro: boolean;
  acaCompliantForPenaltyA: boolean;
  acaCompliantForPenaltyB: boolean;
  tpaCode: string;
  createdAt: string;
  updatedAt: string | null;
  membershipGuidelinesURL: string | null;
  summaryOfShareableMedicalExpensesURL: string | null;
  benefitSummaryMemberFacingURL: string | null;
  summaryBenefitsCoverageURL: string | null;
  summaryOfBenefitsURL: string | null;
  summaryPlanDescriptionFileURL: string | null;
  rxInformation?: APIRxInformation | null;
  coverageAttributes?: APICoverageAttributes | null;
  claimsInformation?: APIClaimsInformation | null;
  prices?: APIPlanPrice[] | null;
}

export interface APIRxInformation {
  pbmName: string;
  rxGroup: string;
  pcn: string;
  rxFormulary: string;
  bin: string;
}

export interface APICoverageAttributes {
  individualDeductible: number;
  familyDeductible: number;
  outOfPocketMaxIndividual: number;
  outOfPocketMaxFamily: number | null;
  embeddedDeductible: boolean;
  coInsurancePercentage: number;
}

export interface APIClaimsInformation {
  everydayComponentCode: string;
  everydayCarrierComponentCode: string;
  hospitalComponentCode: string;
  hospitalCarrierComponentCode: string;
  everydayCarrierName: string;
  hospitalCarrierName: string;
}

export interface APIPlanPrice {
  id: number;
  sku: string;
  priceCode: number;
  planCoverageTierId: number;
  coverageTierCode: string;
  planAgeBandCodeId: number | null;
  price: number;
  description: string;
  netSuiteId: number;
  claimsInformation: APIClaimsInformation;
  ageBandCode: string;
  planId: number;
  legacyProductSkuId: number;
  legacyProductSku: string;
  isDeleted: boolean;
  createdAt: string; // ISO 8601 date string
  createdBy: number;
  updatedAt: string | null;
  updatedBy: number | null;
  deletedAt: string | null;
  deletedBy: number | null;
}

export interface ActiveOpportunityCustomFieldJSONData {
  c_ID: number;
  AppSubmittedDate: null;
  AppSignedDate: string | null;
  AppProcessedDate: string | null;
  EffectiveDateRequested: string | null;
  EffectiveDate: string | null;
  EndDate: string | null;
  ClosedDate: string | null;
  EnrollmenStartDate: string | null;
  SignedByName: string | null;
  SignedByTitle: string | null;
  IsSendLinkByEmail: boolean;
  IsSendLinkBySMS: boolean;
  TotalEmpFT: number;
  TotalEmpPT: number | null;
  MinHoursForElligibility: number | null;
  TerminateAfterNoWorkForXDays: number | null;
  HasExcludedClassOfEmp: boolean;
  Is1099Offered: boolean;
  IsCOBRA: boolean;
  NeedTPAForCOBRA: boolean;
  HasEmpOnCOBRA: boolean;
  IsAgreeAddnSignature: string | null;
  EnrollmenEndDate: string | null;
  CompanyAccountName: string | null;
  BankName: string | null;
  BankRouting: string | null;
  BankAccountNumber: string | null;
  BankCity: string | null;
  BankState: string | null;
  ACHEnabled: number;
  CheckDate: string | null;
  CheckNumber: string | null;
  RoutingNumber: string | null;
  AccountNumber: string | null;
  Amount: number | null;
  NewHireWaitPeriod: string | null;
  HRA: boolean;
  Vision: boolean;
  Dental: boolean | null;
  EmployeeAssistance: boolean | null;
  BasicLife: boolean | null;
  Additionallife: boolean | null;
  ShortTermDisability: boolean | null;
  LongTermDisability: boolean | null;
  CriticalIllness: boolean | null;
  FixedBenefit: boolean | null;
  ADnD: boolean | null;
  AutoEnrollment: boolean | null;
  IsStartEnrollment: boolean;
  Paid: boolean | null;
  HRAWaived: boolean;
}
export interface HrContactJSONData {
  id: number;
  tenantId: number;
  name: string;
  firstName: string;
  lastName: string;
  middleName: string | null;
  title: string | null;
  email: string | null;
  phone: string | null;
  mobile: string | null;
  birthDate: string | null;
  contactTypeId: number;
  accountTypeId: number | null;
  accountID: number | null;
  entityID: number | null;
  memberID: number | null;
  billingAddressId: number | null;
  ssn: string | null;
  isTobaccoUser: false;
  externalSystemKey: string | null;
  address: Address | null;
  genderIdentified: string | null;
  preferredName: string | null;
  maidenName: string | null;
  homePhone: string | null;
  workPhone: string | null;
  workPhoneExt: string | null;
  relationType: string | null;
  shortCode: string | null;
  className: string | null;
  productionSplit: string | null;
  ein: string | null;
  description: string | null;
  statusId: number | null;
  dependentStartDate: string | null;
  terminateDate: string | null;
  productSku: string | null;
  customFieldJSONData: string | null;
  recordKey: string | null;
  primaryMemberId: number;
  contactRelationId: number;
  contactsExt: string | null;
  isDecline: boolean | null;
  contactOpportunityId: number;
  accountOpportunityId: number | null;
  contactOpportunityDto: string | null;
}
export interface BillingContactJSONData {
  id: number;
  tenantId: number;
  name: string;
  firstName: string;
  lastName: string;
  middleName: string | null;
  email: string;
  phone: string;
  mobile: string;
  birthDate: string | null;
  contactTypeId: number;
  accountTypeId: number | null;
  billingAddressId: number | null;
  title: string;
  gender: string | null;
  ssn: string | null;
  isTobaccoUser: boolean;
  externalSystemKey: string | null;
  address: string | null;
  genderIdentified: string | null;
  preferredName: string | null;
  description: string | null;
  statusId: number | null;
  dependentStartDate: string | null;
  terminateDate: string | null;
  productSku: string | null;
  customFieldJSONData: string | null;
  recordKey: string | null;
  primaryMemberId: number;
  contactRelationId: number;
  contactsExt: string | null;
  isDecline: boolean | null;
  contactOpportunityId: number;
  accountOpportunityId: number | null;
  contactOpportunityDto: string | null;
}
export interface ResellerCustomFieldJSONData {
  c_ID: number;
  SID: string | null;
  PRIMARY_BG_COLOR_BUSINESS_CSSCLASS: string | null;
  PRIMARY_TEXT_COLOR_BUSINESS_CSSCLASS: string | null;
  SECONDARY_BG_COLOR_BUSINESS_CSSCLASS: string | null;
  SECONDARY_TEXT_COLOR_BUSINESS_CSSCLASS: string | null;
  PRIMARY_BG_COLOR_CSSCLASS: string | null;
  PRIMARY_TEXT_COLOR_CSSCLASS: string | null;
  SECONDARY_BG_COLOR_CSSCLASS: string | null;
  SECONDARY_TEXT_COLOR_CSSCLASS: string | null;
  LOGO_IMAGE_URL: string | null;
  PHOTO_IMAGE_URL: string | null;
  PRIMARY_BG_IMAGE: string | null;
  HERO_BG_IMAGE: string | null;
  THIRD_BG_COLOR_CSS_CLASS: string | null;
  WEBPAGE_TITLE: string | null;
  HERO_IMAGE_BUSINESS_TITLE_TEXT: string | null;
}
export interface ResellerJSONData {
  id: number;
  tenantId: number;
  name: string;
  email: string;
  phone: string;
  phone2: string | null;
  shortCode: string;
  ownerId: 0;
  primaryContactId: number | null;
  billingContactId: number | null;
  shippingAddressId: number | null;
  campaignId: number | null;
  leadSourceId: number | null;
  resellerTypeId: number;
  parentResellerId: number;
  industryId: number | null;
  website: string | null;
  externalSystemKey: string | null;
  billingAddressId: number;
  billingAddress: Address | null;
  customFieldJSONData: ResellerCustomFieldJSONData;
  companyName: string;
  isActive: boolean;
}
export interface APIClientDetails {
  id: number;
  accountOpportunityID: number;
  name: string;
  company: string;
  isTest: boolean;
  email: string;
  phone: string;
  billingAddress: Address;
  shippingAddress: Address;
  customFieldJSONData: ClientCustomFieldJSONData;
  accountExt: ClientAccountExt;
  modified: string;
  modifiedByUser: string;
  isActive: boolean;
  terminationDate: string;
}

export interface ClientSIC {
  value: number;
  label: string;
}

export interface ClientAccountExt {
  accountId: number;
  sicCode: number;
  sicDescription: string;
  coverageWaitingPeriodTypeId: number;
  coverageWaitingPeriodType: string;
  coverageWaitingPeriodDurationId: number;
  coverageWaitingPeriodDuration: string;
  afterWaitingPeriodTypeId: number;
  afterWaitingPeriodType: string;
  afterWaitingPeriodDurationId: number;
  afterWaitingPeriodDuration: string;
  terminationDateTypeId: number;
  terminationDateType: string;
  terminationDateDurationId: number;
  terminationDateDuration: string;
}

export interface APIAccountOpportunityDetails {
  activeOpportunityCustomFieldJSONData: ActiveOpportunityCustomFieldJSONData;
  hrContact: HrContactJSONData;
  billingContact: BillingContactJSONData;
  id: number;
  accountId: number;
  accountName: string;
  name: string;
  startDate: string;
  endDate: string;
  renewalDate: string;
  tpa: string;
  tpaid: string;
  accountOpportunityExt: AccountOpportunityExt;
  csaName: string;
  hccName: string;
  hccEmail: string;
  hccPhone: string;
  hccImage: string;
  csaEmail: string;
  csaPhone: string;
  csaImage: string;
  modifiedByUser: string;
  modifiedBy: number;
  modified: string;
  primaryContact: {
    id: number;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    title: string;
    phone: string;
    workPhone: string;
    birthDate: string;
    image: string;
    mobile: string;
    opportunityYear: string;
  };
  ownerId?: number | null;
  closeDate: string;
  resellerId: number;
  resellerName: string;
  plan: APIPlanDetails[];
  isActive: boolean;
  opportunityTypeName: string;
  customFieldJSONData: APIAddCustomFieldData;
  primaryContactId: number;
  hrContactId: number;
  billingContactId: number;
  enrollmentLink: string | null;
  healthcareConsultantId: number;
}

export interface AccountOpportunityExt {
  accountOpportunityId: number;
  enrollmentBegin: string;
  enrollmentEnd: string;
  isAutoEnroll: boolean;
  healthcareConsultantId: number;
  ownerId: number;
  tpaid: string;
  tpa: string;
  agent1AgencyID: number; // agency 1
  agent1Commission: number; // commission 1
  agent1Id: number; // agent 1 id
  agent2AgencyID: number; // agency 2
  agent2Commission: number; // commission 2
  agent2Id: number; // agent 2 id
  generalAgent1AgencyID: number;
  generalAgent1Commission: number; // commission 1
  generalAgent1Id: number; // agent 1 id
  generalAgent2AgencyID: number;
  generalAgent2Commission: number; // commission 2
  generalAgent2Id: number; // agent 2 id
  shortCode: string;
  ebixTpaId: string;
  assignedToId: number;
}

export interface ClientOpportunityStats {
  id: number;
  totalEmployee: number;
  totalEnrolled: number;
  enrolledPercentage: number;
  totalPending: number;
  pendingPercentage: number;
  totalOptOut: number;
  optoutPercentage: number;
  criticalNumber: number;
  totalLives: number;
  totalEnrolledMember: number;
  totalActivatedMember: number;
  activatedMemberPercentage: number;
  totalMemberWithMobileApp: number;
  totalEnrolledActivatedMember: number;
  mobileAppMemberPercentage: number;
}
export interface ClientCustomFieldJSONData {
  c_ID: number;
  TaxIdentifier: string;
  LegalStructure: string;
  EnrollmentType: string;
  ReferralName: string;
  ReferralContactNumber: string;
  ReferralType: string;
  RefID: string;
  IsReferralEmployee: boolean;
  CampaignName: string;
}

export interface APIEmployee {
  id: number;
  contactId: number;
  contactOpportunityId: number;
  accountOpportunityId: number;
  isActive: boolean;
  terminationDate: string | null;
  name: string;
  dob: string;
  birthDate: string;
  gender: string;
  employeeClass: string;
  activatedDate: string;
  activatedDate1: string;
  employeeStatus: string;
  contactType: string;
  mobile: string;
  totalLiveCount: number;
  showEnrolledText: boolean;
  showDeleteButton: boolean;
  showActivationText: boolean;
  hasActivePlan: boolean;
  coverageLevel: string;
  rank: number;
  startDate: string;
  hasCOBRA: boolean;
}

export interface AddEmployee {
  accountId: number;
  accountOpportunityId: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  birthDate: string | null;
  socialSecurityNumber: string;
  gender: string;
  isTobaccoUser: boolean | null;
  employeeClass: string;
  employeePlan: number | null;
  startDate: string;
}
export interface APIPlanRequest {
  accountId: number;
  accountOpportunityId: number;
}
export interface APIEmployeePlan {
  className: string;
  productSkuId: number;
  productName: string;
  startDate: string;
  endDate: string | null;
  sku: string;
}

export interface APIDeleteEmployeeRequest {
  contactId: number;
  contactOpportunityId: number;
  accountOpportunityId: number;
}

export interface APIBrokerageAccounts {
  value: number;
  text: string;
  agentCode: number;
}

export interface APIGeneralAgentAccounts {
  value: number;
  agentCode: number;
  text: string;
}

export interface APIProductCode {
  id: number;
  tenantId: number;
  code: string;
  isDefault: boolean;
}

export interface APIProductComponent {
  id: number;
  name: string;
  edcid: number;
  edc: string;
  hncid: number;
  hnC: string;
  addonid: number;
  addon: string;
}

export interface APIProductComponentsData {
  edc: APIProductComponent[];
  hnc: APIProductComponent[];
  addon: APIProductComponent[];
  plancode: APIProductComponent[];
}

export interface APIGetProductComponentsRequest {
  operationId: number;
  componentTypeId: number;
  edcId: number;
  hncId: number;
  addonId: number;
  planId: number;
  isFilter: boolean;
  isEdit: boolean;
  accountOpportunityId: number;
}

export interface APIBrokerDetails {
  id: number;
  accountId: number;
  resellerID: number;
  activeOpportunityId: number;
  accountOpportunityId: number;
  agent1AgencyId: number | null;
  agent1Id: number | null;
  agent1Commission: number | null;
  agent2AgencyId: number | null;
  agent2Id: number | null;
  agent2Commission: number | null;
  generalAgent1AgencyId: number | null;
  generalAgent1Id: number | null;
  generalAgent1Commission: number | null;
  generalAgent2AgencyId: number | null;
  generalAgent2Id: number | null;
  generalAgent2Commission: number | null;
}

export type APIUpdateBrokerDetailsResponse = APIGeneralResponse<APIBrokerDetails>;

export type APIGetBrokerageAccountsResponse = APIGeneralResponse<APIBrokerageAccounts[]>;
export type APIGetGeneralAgentAccountsResponse = APIGeneralResponse<APIGeneralAgentAccounts[]>;
export type APIGetProductCodesResponse = APIGeneralResponse<APIProductCode[]>;
export type APIGetProductComponentsResponse = APIGeneralResponse<APIProductComponentsData>;
export interface APIDivision {
  accountId: number;
  divisionId: number;
  divisionName: string;
  divisionType: string;
  showEditButton: boolean;
  showDeleteButton: boolean;
}

export interface APIAccountDivisionType {
  id: number;
  refType: string;
  name: string;
  intValue1: number | null;
  intValue2: number | null;
  decimalValue1: number | null;
  strValue1: string | null;
  strValue2: string | null;
  displayOrder: number | null;
  isActive: boolean;
}
export interface APIAddUpdateAccountDivisionRequest {
  accountId: number;
  name: string;
  typeId: number | null;
}
export interface APIAccountCustomFieldOption {
  value: string;
  text: string;
}

export interface APIAccountCustomField {
  fieldName: string;
  optionsJson: APIAccountCustomFieldOption[];
}

export type APIGetAccountCustomFieldsResponse = APIGeneralResponse<APIAccountCustomField[]>;

export interface APIAccountOpportunity {
  id: number;
  tenantId: number;
  accountId: number;
  name: string;
  type: string;
  effectiveDate: string;
  endDate: string;
  renewalDate: string;
  plans: string;
  showDeleteText: boolean;
  status: string;
}
export interface APIInvoice {
  id: number;
  monthId: number;
  accountId: number;
  fileId: number | null;
  invoiceNo: string;
  invoiceDate: string;
  achDate: string;
  invoiceDateObj: string;
  achDateObj: string;
  converagePeriodDate: string;
  coveragePeriod: string;
  totalEmployeeEDC: number;
  totalEmployeeHnC: number;
  invoiceAmount: number;
  created: string | null;
  createdBy: string;
  isShowRefresh: boolean;
  isFreezed: boolean;
}

export interface APIDownloadInvoiceRequest {
  accountId: number;
  invoiceNumber: string;
  invoiceDate: string;
  aCHDate: string;
  invoiceCoveragePeriod: string;
  fileId: number | null;
  isSaveFile: boolean;
}

export interface APIFreezeInvoiceRequest {
  accountId: number;
  invoiceNumber: string;
  invoiceDate: string;
  aCHDate: string;
  invoiceCoveragePeriod: string;
  fileId: number | null;
  isSaveFile: boolean;
}

export interface APIFreezeInvoiceResponseData {
  success: boolean;
}

export type APIFreezeInvoiceResponse = APIGeneralResponse<APIFreezeInvoiceResponseData>;

export interface APIDownloadInvoiceData {
  fileUrl?: string;
  fileName?: string;
  message?: string;
}

export type APIDownloadInvoiceResponse = APIGeneralResponse<APIDownloadInvoiceData>;

export interface APIGenerateInvoiceNumberData {
  invoiceNo: string;
}

export type APIGenerateInvoiceNumberResponse = APIGeneralResponse<APIGenerateInvoiceNumberData>;
export interface APIGenerateInvoiceSnapshotRequest {
  accountId: number;
  invoiceNumber: string;
  invoiceDate: string;
  achDate: string;
  invoiceCoveragePeriod: string;
  fileId?: number;
  isSaveFile?: boolean;
}

export interface APIGenerateInvoiceSnapshotData {
  success: boolean;
}

export type APIGenerateInvoiceSnapshotResponse = APIGeneralResponse<APIGenerateInvoiceSnapshotData>;

export interface APIInvoicePreviewRequest {
  accountId: number;
  invoiceNumber: string;
  invoiceDate: string;
  aCHDate: string;
  invoiceCoveragePeriod: string;
  fileId?: number;
  isSaveFile?: boolean;
}

export interface APIInvoicePreviewMetadata {
  ID: number;
  TenantID: number;
  MonthID: number;
  GroupID: number;
  GroupName: string;
  GroupNumber: string;
  TPA: string;
  GroupEffectiveDate: string;
  FileID: number;
  InvoiceNo: string;
  InvoiceDate: string;
  ACHDate: string;
  TotalHasHnCPlanSmoker: number;
  TobaccoRate: number;
  TotalPriceHasHnCPlanSmoker: number;
  TotalAdjustments: number;
  Created: string;
  CreatedBy: string;
  AccountOpportunityID: number;
  BillingContactID: number | null;
  ResellerID: number;
  IsFreezed: number;
  PastDueBalance: number;
}

export interface APIInvoicePreviewData {
  applicationAddressLine1: string;
  applicationAddressLine2: string;
  dueDate: string;
  achDate: string;
  invoiceNumber: string;
  notes: string;
  paymentCredit: string;
  billingContcatFullName: string;
  billingContactFirstName: string;
  fromToDate: string;
  phone: string;
  email: string;
  brokerName: string;
  brokerCompanyName: string;
  brokerApplicationAddress1: string;
  brokerApplicationAddress2: string;
  brokerCommissionGrandTotal: number;
  totalHnCMembers: number;
  totalMemberCount: number;
  grandTotal: number;
  planGrandTotal: number;
  memberGrandTotal: number;
  adjMemberGrandTotal: number;
  crobraMemberGrandTotal: number;
  aCDUrl: string;
  refreshOn: string;
  refreshBy: string;
  groupType: string;
  applicationInvoicePreview: APIInvoicePreviewMetadata;
  applicationInvoicePreviewPlansDetails: Record<string, unknown>[];
  applicationInvoiceMemberPreview: Record<string, unknown>[];
  adjApplicationInvoiceMemberPreview: Record<string, unknown>[];
  applicationInvoiceCobraMembers: Record<string, unknown>[];
  applicationInvoicePreviewPlanSummary: Record<string, unknown>[];
  divisionWiseTotalList: Record<string, unknown>[];
}
export interface APIRefreshInvoiceSnapshotRequest {
  accountId: number;
  invoiceNumber: string;
  invoiceDate: string;
  achDate: string;
  invoiceCoveragePeriod: string;
  fileId?: number;
  isSaveFile?: boolean;
}
export interface APIRefreshInvoiceSnapshotData {
  success: boolean;
}
export type APIInvoicePreviewResponse = APIGeneralResponse<APIInvoicePreviewData>;

export interface APIRoster {
  id: number;
  employeeID: number;
  name: string;
  dob: string;
  birthDate: string;
  gender: string;
  className: string;
  relationship: string;
  employeeStatus: string;
  employee: string;
  coverageLevel: string;
  isTobaccoUser: string;
  currentSKU: string;
  previousSKU: string;
  upcomingSKU: string;
  startDate: string;
  rank: number;
  hasCOBRA: string;
  recordKey: string;
}

export interface APIImportLogs {
  id: number;
  entityId: number;
  name: string;
  importBy: string;
  created: string;
  totalRecords: number;
  errorRecords: number;
  validRecords: number;
}
export interface APIUpdateAccountOpportunityRequest {
  id: number;
  accountId: number;
  name: string;
  startDate: string;
  ownerId: number | null; // Change from: ownerId: number;
  primaryContact?: {
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    phone: string;
    mobile: string;
    birthDate: string;
  };
  billingContact?: {
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    phone: string;
    mobile: string;
  };
  hrContact?: {
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    phone: string;
    mobile: string;
    birthDate: string;
  };
  activeOpportunityId: number;
  primaryContactId: number;
  hrContactId: number;
  billingContactId: number;
  customFieldJSONData?: ActiveOpportunityCustomFieldJSONData;
}
export interface APIUpdateAccountOpportunity {
  id: number;
  tenantId: number;
  accountId: number;
  name: string;
  startDate: string;
  endDate: string | null;
  closeDate: string | null;
  renewalDate: string | null;
  opportunityTypeId: number;
  resellerId: number;
  primaryContactId: number | null;
  billingContactId: number | null;
  hrContactId: number | null;
  ownerId: number;
  isActive: boolean;
  isTerminated: boolean;
  terminated: string | null;
  terminatedBy: number | null;
  created: string;
  createdBy: number;
  modified: string;
  modifiedBy: number;
  isDeleted: boolean;
  deleted: string | null;
  deletedBy: number | null;
}
export interface APIGetAccountOpportunityEntityStagesRequest {
  opportunityId: number;
  entityTypeId: number;
  workflowId: number;
}

export interface APIEntityStage {
  id: number;
  tenantId: number;
  entityTypeId: number;
  name: string;
  displayOrder: number;
  isCompleted: boolean;
  isClosed: boolean;
  estCompletionMins: number | null;
  workflowId: number | null;
  code: string;
  isDefault: number;
  isFrozen: boolean;
  isSemiFrozen: boolean;
  stageTasks: APIEntityStageTask[];
}

export interface APIOpportunityComission {
  id?: number;
  productId: number;
  productSkuId: number;
  name?: string;
  sku?: string;
  mBrokerage: number;
  msBrokerage: number;
  mcBrokerage: number;
  mfBrokerage: number;
}

export interface APIAddOpportunityRequest {
  name: string;
  startDate: string;
  endDate: string;
  accountId: number;
  activeOpportunityId: number;
  opportunityTypeId: number;
}

export interface SavedOpportunityResponse {
  id: number;
  tenantId: number;
  accountId: number;
  name: string;
  startDate: string;
  endDate: string;
  renewalDate: string;
  opportunityTypeId: number;
  resellerId: number | null;
  ownerId: number | null;
  primaryContactId: number | null;
  billingContactId: number | null;
  hrcontactId: number | null;
  isTerminated: boolean;
  terminated?: string | null;
  terminatedBy?: number | null;
  created: string;
  createdBy: number;
  modified?: string | null;
  modifiedBy?: number | null;
  isActive: boolean;
}

export interface APICalculateAccountOpportunityEndDateRequest {
  accountId: number;
  startDate: string;
}

export interface APICalculateAccountOpportunityEndDateResponseData {
  id: number;
  endDate: string;
}

export type APIAuthSyncResponse = APIGeneralResponse<AuthSync>;
export interface APIGetAccountContributionPlansRequest {
  accountId: number;
  className: string;
  accountOpportunityId: number;
}
export type APIGetAccountContributionPlansResponse = APIGeneralResponse<number[]>;
export interface APIAccountContributionClass {
  text: string;
  value: string;
}
export interface APIAddAccountContributionPlansByIdRequest {
  accountId: number; // query param
  className: string; // query param
  accountOpportunityId: number; // query param
  planIds: number[]; // request body array
}
export interface APIAccountContributionPlanItem {
  id: number;
  tenantId: number;
  accountId: number;
  className: string;
  startDate: string | null;
  endDate: string | null;
  employeeClassId: number;
  edcPrice: number | null;
  mcsPrice: number | null;
  mcsPercent: number | null;
  created: string;
  createdBy: number;
  modified: string;
  modifiedBy: number;
  distribute: number | null;
  productSkuId: number;
  planPrice: number;
  accountOpportunityId: number;
  accountProductId: number;
}

export interface APIAddAccountContributionRequest {
  accountId: number;
  className: string;
  accountOpportunityId: number;
  accountContributionDto: number[];
}
export interface APIAddAccountContribution {
  accountId: number;
  className: string;
  distribute: number | null;
  accountOpportunityId: number;
  accountProductId: number | null;
  accountContributions: number[] | null;
}
export interface APIDeleteAccountContributionClassRequest {
  accountId: number;
  className: string;
  accountOpportunityId: number;
}
export interface APIDeleteAccountContributionClassResponsedetails {
  data: boolean;
  statusCode: number;
  message: string;
}
// Adding save contribution types after line 2696

export interface APISaveContributionItem {
  employeeClassId: number;
  planPrice: number | null;
}

export interface APISaveAccountContributionRequest {
  accountId: number | string;
  className: string;
  distribute: number | string | null;
  productSkuId: number | string;
  accountOpportunityId: number | string;
  accountProductId: number | string;
  contributions: APISaveContributionItem[];
}

export interface APISaveAccountContributionItem {
  accountId: number;
  className: string;
  distribute: number | null;
  productSkuId: number;
  accountOpportunityId: number;
  accountProductId: number;
  contributions: APISaveContributionItem[];
}
export interface APIDeleteAccountContributionByPlanIdRequest {
  id: number;
  className: string;
  planId: number;
  accountOpportunityId: number;
}

export interface APIUpdateAccountOpportunityCsaRequest {
  accountOpportunityId: number;
  csaId: number;
}
export interface APIUpdateAccountOpportunityCsaResponse {
  data: number;
  statusCode: number;
  message: string;
}

export interface APIUpdateAccountOpportunityHccRequest {
  accountOpportunityId: number;
  hccId: number;
}
export interface APIUpdateAccountOpportunityHccResponse {
  data: number;
  statusCode: number;
  message: string;
}

export interface APIGetUpcomingOpportunityResponse {
  data: {
    upcomingOpportunityId: number;
    upcomingOpportunityName: string;
    pendingMemberCount: number;
    upcomingStartDate: string;
  };
  statusCode: number;
  message: string;
}
export interface APICarryForwardOpportunityMembersRequest {
  activeOpportunityId: number;
  carryforwardOpportunityId: number;
}
export interface APICarryForwardOpportunityMembersResponse {
  data: {
    success: boolean;
    message: string;
  };
}
export interface APIStartEnrollmentsResponse {
  data: {
    message: string;
    messageCode: string;
  };
  statusCode: number;
  message: string;
  error: string;
}

export interface APIAddSendMembershipCardResponse {
  accountOpportunityId: number;
  tpa: string;
  tpaId: string;
  shortCode: string;
  enrollmentBegin: string | null;
  enrollmentEnd: string | null;
  isAutoEnroll: boolean;
  assignedToId: number | null;
  resellerSiteId: number | null;
  pandaDocFolderId: number | null;
  healthcareConsultantId: number;
  agent1AgencyId: number;
  agent2AgencyId: number;
  generalAgent1AgencyId: number;
  generalAgent2AgencyId: number;
  agent1Id: number | null;
  agent2Id: number | null;
  generalAgent1Id: number;
  generalAgent2Id: number;
  agent1Commission: number | null;
  agent2Commission: number | null;
  generalAgent1Commission: number | null;
  generalAgent2Commission: number | null;
}

export interface APIUpdateTPAIdResponse {
  data: string;
  statusCode: number;
  message: string;
}

export interface APISendPackage1ForSignOffRequest {
  accountId: number;
  accountOpportunityId: number;
  documentName: string;
  actionType: number;
}
export interface APISendPackage1ForSignOffResponse {
  data: {
    success: boolean;
    message: string;
  };
}
export type APIIsTPAIdExistResponse = APIGeneralResponse<boolean>;
export type APIGenerateTPAIdResponse = APIGeneralResponse<string>;
export interface APIAddSendMemberAppResponse {
  data: string;
  statusCode: number;
  message: string;
}

export interface APIPreviewOrDownloadPdfForContractRequest {
  accountId: number;
  accountOpportunityId: number;
  documentName: string;
  actionType: number;
}
export interface APIPreviewOrDownloadPdfForContractResponse {
  data: {
    success: boolean;
    message: string;
  };
}
export type APICheckContractSignerEmailResponse = APIGeneralResponse<boolean>;
export interface APIAddUpdatePastDueAmountRequest {
  id?: number;
  accountId: number;
  monthId: number;
  pastDueBalance: number;
  description?: string;
}
export interface APIGetFreezeInvoiceResponseData {
  id: number;
  tenantId: number;
  monthId: number;
  groupId: number;
  groupName: string;
  groupNumber: string;
  tpa: string;
  groupEffectiveDate: string;
  fileId: number;
  invoiceNo: string;
  invoiceDate: string;
  achDate: string;
  totalHasHnCPlanSmoker: number;
  tobaccoRate: number;
  totalPriceHasHnCPlanSmoker: number;
  totalAdjustments: number;
  created: string;
  createdBy: number;
  accountOpportunityId: number;
  pastDueBalance: number;
  recordKey: string;
}

export interface APIGetPastDueAmountResponseData {
  id: number;
  accountId: number;
  monthId: number;
  pastDueBalance: number;
  description: string;
  created: string;
  createdBy: number;
  modified: string;
  modifiedBy: number;
  isDeleted: boolean;
  deleted: string;
  deletedBy: number;
}
export type APIGetPastDueAmountResponse = APIGeneralResponse<APIGetPastDueAmountResponseData[]>;
export type APIGetFreezeInvoiceResponse = APIGeneralResponse<APIGetFreezeInvoiceResponseData[]>;
export type APIAddUpdatePastDueAmountResponse = APIGeneralResponse<boolean>;
export interface APIUpdateTerminateGroupRequest {
  accountId: number;
  reasonForTermination: string;
  terminationDate: string;
}

export interface APIInitiateAutoEnrollmentResponseData {
  hasError: boolean;
  message: string;
  messageCode: string;
  data: null;
}
export interface APIFullTimeEmployee {
  fullTimeEmp: number;
  enrolledAndActivatedEmp: number;
}

export interface APIUpdateFullTimeEmployeesRequest {
  accountId: number;
  accountOpportunityId: number;
  CustomFieldJSONData: {
    TotalEmpFT: number;
  };
}

export interface APISendEnrollmentTextsRequest {
  accountId: number;
  accountOpportunityId: number;
}

export interface APIGetSMSTextMaxLengthResponseData {
  smsTextMaxLength: number;
}

export interface APIStageBulkCustomTextRequest {
  entityId: number;
  entityTypeId: number;
  customText: string;
  accountOpportunityId: number;
}

export interface APIGetDealIdResponse {
  entityTypeId: number;
  entityId: number;
  source: string;
  externalKey: string;
  externalName: string | null;
}

export interface APIUpdateDealIdRequest {
  accountId: number;
  accountOpportunityId: number;
  dealId: string;
  isManually: boolean;
}
export interface APIHgr {
  groupId: number;
  groupName: string;
  memberShortName: string;
  memberName: string;
  memberId: number;
  cell: string;
  stateCode: string;
  effectiveDate: string;
  stage: string;
  stageId: number;
  htgrSource: string;
  assignedTo: number;
  assignedName: string;
  assignedImage: string;
  assignedShortName: string;
  memberLNameFName: string;
  memberFNameLName: string;
  healthCondition: string;
  medication: string;
  doctors: string;
  nextVisitDate: string;
  activationDate: string;
  tagAdded: string;
}

export interface APIHgrEntityStagesWithTask {
  id: number;
  tenantId: number;
  entityTypeId: number;
  isCompleted: boolean;
  isClosed: boolean;
  estCompletionMins: number | null;
  name: string;
  displayOrder: number;
  workflowId: number;
  code: string;
  isDefault: boolean;
  isFrozen: boolean;
  isSemiFrozen: boolean;
  stageTasks: string[];
}

export interface APIGetAllHgrRequest {
  page: number;
  limit: number;
  sortBy?: string | null;
  sortOrder?: SortOrder;
  filterBy?: string | null;
  search?: string | null;
  stageIds?: string | null;
}

export interface APISendEmployeeEnrollmentTextRequest {
  contactId: number;
  accountOpportunityId: number;
}

export interface APISendEmployeeActivationTextRequest {
  contactId: number;
  accountOpportunityId: number;
}

export type APIStageWelcomeEmailsResponse = APIGeneralResponse<boolean>;
export type APIAddBulkMembershipCardPrintRequestResponse = APIGeneralResponse<boolean>;
export type APISaveAccountContributionResponse = APIGeneralResponse<boolean>;
export type APIAddAccountContributionResponse = APIGeneralResponse<APIAddAccountContribution>;
export type APIDeleteAccountContributionClassResponse =
  APIGeneralResponse<APIDeleteAccountContributionClassResponsedetails>;
export type APIConvertToClientResponse = APIGeneralResponse<boolean>;
export type APIGetContactFamilyDetailsResponse = APIGeneralResponse<APIContactFamilyMember[]>;

export type APIGetImportLogsResponse = APIGeneralResponse<APIImportLogs[]>;
export type APIGetMembersResponse = APIGeneralResponse<APIMember[]>;
export type APIGetMemberDetailsResponse = APIGeneralResponse<APIMemberDetails>;
export type APIGetEntityTagResponse = APIGeneralResponse<APITagCategories[]>;
export type APIGetCasesResponse = APIGeneralResponse<APICases[]>;
export type APIGetCountryResponse = APIGeneralResponse<Country[]>;
export type APIGetStateResponse = APIGeneralResponse<State[]>;
export type APIGetMemberClaimsResponse = APIGeneralResponse<APIMemberClaims[]>;
export type APIGetMemberReferenceResponse = APIGeneralResponse<APIMemberReference[]>;
export type APIGetEntityTagsForFlagsResponse = APIEntityTagForFlags[];
export type APIGetMemberSubscriptionStatusResponse = APIGeneralResponse<string>;
export type APIGetMemberMobileAppResponse = APIGeneralResponse<MobileAppResponse>;
export type APIGetMemberPlanDetailsResponse = APIGeneralResponse<APIPlanDetails[]>;
export type APIGetMembershipCobraListResponse = APIGeneralResponse<APIMembershipCobraList[]>;
export type APIGetMembershipAccountCobraListResponse = APIGeneralResponse<
  APIMembershipAccountCobraList[]
>;
export type APIGetMembershipCardListResponse = APIGeneralResponse<APIMembershipCardList[]>;
export type APIGetMembershipCoverageListResponse = APIGeneralResponse<APIMembershipCoverageList[]>;
export type APIGetLogsRequestsResponse = APIGeneralResponse<APILogsRequests[]>;
export type APIGetLogsTextsResponse = APIGeneralResponse<APILogsTexts[]>;
export type APIGetReferenceTypesResponse = APIGeneralResponse<APIReferenceTypes[]>;
export type APIGetRelatedContactResponse = APIGeneralResponse<[APIRelatedContactList]>;
export type APIGetSpecialitiesResponse = APIGeneralResponse<APISpeciality[]>;
export type APIpostReferenceNumberResponse = APIGeneralResponse<APIReferenceNumber[]>;
export type APIResetMobileAppPasswordResponse = APIGeneralResponse<ResetPassword>;
export type APIGetAddPlanListResponse = APIGeneralResponse<CoveragePlan[]>;
export type APIPostAddPlanRequest = APIGeneralResponse<requestPlanData[]>;
export type APIPostAddPlanResponse = APIGeneralResponse<requestPlanData[]>;
export type APIPatchCovergaerplanRequest = Partial<requestPlanData>;
export type APIPatchCovergaerplanResponse = APIGeneralResponse<requestPlanData>;
export type APIDeleteCoverageplanResponse = APIGeneralResponse<requestPlanData>;
export type APIPostAccountCobraRequest = Partial<cobraInfo>;
export type APIPostAccountCobraResponse = APIGeneralResponse<cobraInfo>;
export type APIPatchMemberDetailsRequest = Partial<requestMemberDetailsData>;
export type APIPatchMemberDetailsResponse = APIGeneralResponse<APIMemberDetails>;
export type APIPatchRelatedContactsResponse = APIGeneralResponse<RelatedContactData>;
export type APIPatchRelatedContactsRequest = APIGeneralResponse<PatchRelatedContactPayload>;
export type APIPostRelatedContactsRequest = AddRelatedcontact;
export type APIPostRelatedContactsResponse = APIGeneralResponse<AddRelatedcontact[]>;
export type APIAddMedicationResponse = APIGeneralResponse<APIAddMedicationData>;
export type APIAddNoteResponse = APIGeneralResponse<APINoteResponse>;
export type APIPatchNoteResponse = APIGeneralResponse<APIPatchNoteRequest>;
export type APIRedirectIdResponse = APIGeneralResponse<string>;
export type APIPatchRedirectIdResponse = APIGeneralResponse<boolean>;
export type APIGetMemberDocumentsResponse = APIGeneralResponse<APIMemberDocuments[]>;

export type APIAddTaskResponse = APIGeneralResponse<APITaskResponse>;
export type APIPatchTaskResponse = APIGeneralResponse<APIPatchTaskRequest>;

export type APIUploadDocumentResponse = APIGeneralResponse<string>;
export type APIDeleteMobileUserResponse = APIGeneralResponse<boolean>;
export type APIGetTagsResponse = APIGeneralResponse<APIAllTags[]>;
export type APIAddTagResponse = APIGeneralResponse<APIAddTagRequest>;
export type APIDeleteTagResponse = APIGeneralResponse<APIDeleteTagRequest>;
export type APIGetCaseSubTypesResponse = APIGeneralResponse<APICaseSubTypes[]>;
export type APIGetAssignToUsersListResponse = APIGeneralResponse<APIAssignToUsersList[]>;
export type APIGetEntityStageTaskResponse = APIGeneralResponse<APIEntityStageTask[]>;
export type APIAddCaseResponse = APIGeneralResponse<APIAddCaseRequest>;

export type APIPostPushToEcwResponse = APIGeneralResponse<null>;
export type APIPostSendActivationTextResponse = APIGeneralResponse<boolean>;
export type APIPostSendEnrollmentTextResponse = APIGeneralResponse<boolean>;
export type APIGetSendMemberAppResponse = APIGeneralResponse<boolean>;
export type APIPostSendWelcomeEmailResponse = APIGeneralResponse<boolean>;
export type APIPostPrintMembershipCardResponse = APIGeneralResponse<APIEntityRequest>;
export type APISendCustomTextResponse = APIGeneralResponse<boolean>;
export type APIGetDocumentResponse = APIGeneralResponse<string>;
export type APIGetUserCurrentTimeWithNextRoundUpTimeResponse =
  APIGeneralResponse<APIGetUserCurrentTimeWithNextRoundUpTimeResponseData>;
export type APIGetProductPlanDetailsResponse = APIGeneralResponse<APIProductPlanDetails>;
export type APIGetAllClientsResponse = APIGeneralResponse<APIClient[]>;
export type APIGetPlansResponse = APIGeneralResponse<APIPlan[]>;
export type APIDirectLeadsResponse = APIGeneralResponse<APIDirectLeads[]>;
export type APIGetAccountOpportunityHCCUsersResponse = APIGeneralResponse<
  APIAccountOpportunityHCCUsers[]
>;
export type APIGetAccountOpportunityCSAsResponse = APIGeneralResponse<
  APIAccountOpportunityCSAUsers[]
>;
export type APIGetPlanDetailsResponse = APIGeneralResponse<APIPlansDetails>;
export type APIGetClientDetailsResponse = APIGeneralResponse<APIClientDetails>;
export type APIGetClientSICResponse = APIGeneralResponse<ClientSIC[]>;
export type APIGetClientEmployeesResponse = APIGeneralResponse<APIEmployee[]>;
export type APIAddEmployeeResponse = APIGeneralResponse<AddEmployee>;
export type APIEmployeePlanResponse = APIGeneralResponse<APIPlanRequest>;
export type APIDeleteEmployeeResponse = APIGeneralResponse<APIDeleteEmployeeRequest>;
export type APIGetClientDivisionsResponse = APIGeneralResponse<APIDivision[]>;
export type APIGetClientDivisionTypesResponse = APIGeneralResponse<APIAccountDivisionType[]>;
export type APIAddUpdateAccountDivisionResponse = APIGeneralResponse<APIDivision>;
export type APIGetOpportunitiesResponse = APIGeneralResponse<APIAccountOpportunity[]>;
export type APIGetInvoicesResponse = APIGeneralResponse<APIInvoice[]>;
export type APIRefreshInvoiceSnapshotResponse = APIGeneralResponse<APIRefreshInvoiceSnapshotData>;
export type APIGetRosterPaginationResponse = APIGeneralResponse<APIRoster[]>;
export type APIUpdateAccountOpportunityResponse = APIGeneralResponse<APIUpdateAccountOpportunity[]>;
export type APIGetClientPlansResponse = APIGeneralResponse<APIClientPlan[]>;
export type APIGetAccountOpportunityEntityStagesResponse = APIGeneralResponse<APIEntityStage[]>;
export type APIGetAccountContributionClassesResponse = APIGeneralResponse<
  APIAccountContributionClass[]
>;
export type APIAccountContributionPlansResponse = APIAccountContributionPlanItem[];
export type APIGetOpportunitiesBrokerCommission = APIGeneralResponse<APIOpportunityComission[]>;
export type APIGetOpportunitiesEmployeeResponse = APIGeneralResponse<APIEmployee[]>;
export type APIGetImportLogFileDetailsResponse = APIGeneralResponse<APIImportLogFileDetails[]>;

export type APISaveAccountPlanResponse = APIGeneralResponse<APIClientPlan>;
export type APIAddOpportunityResponse = APIGeneralResponse<SavedOpportunityResponse>;
export type APICalculateAccountOpportunityEndDateResponse =
  APIGeneralResponse<APICalculateAccountOpportunityEndDateResponseData>;
export type APIDeleteAccountOpportunityResponse = APIGeneralResponse<boolean>;
export type APIGetAccountOpportunityResponse =
  APIGeneralResponse<APIPatchClientAccountOpportunityDetailsRequest>;
export type APIGetBrokerLeadsResponse = APIGeneralResponse<APIBrokerLeads[]>;
export type APIGetBrokerLeadDetailsResponse = APIGeneralResponse<APIBrokerLeadDetails>;
export type APIGetDirectLeadsDetailsResponse = APIGeneralResponse<APIDirectLeads>;
export type APIInitiateAutoEnrollmentResponse =
  APIGeneralResponse<APIInitiateAutoEnrollmentResponseData>;
export type APIGetDealIdByAccountOpportunityIdResponse = APIGeneralResponse<APIGetDealIdResponse>;
export type APIUpdateDealIdResponse = APIGeneralResponse<boolean>;
export type APIGetClientEmployeeDetailsResponse = APIGeneralResponse<APIFullTimeEmployee>;
export type APIUpdateFullTimeEmployeesResponse = APIGeneralResponse<boolean>;
export type APIGetSMSTextMaxLengthResponse = APIGeneralResponse<APIGetSMSTextMaxLengthResponseData>;
export type APIGetAllHgrResponse = APIGeneralResponse<APIHgr[]>;
export type APIGetAllHgrEntityStagesWithTaskResponse = APIGeneralResponse<
  APIHgrEntityStagesWithTask[]
>;

export interface APIAgentEvent {
  id: string;
  timestamp: number;
  author: string;
  text: string;
  _id: string;
  session_id: string;
}

export interface APIAgentState {
  user_id: string;
  /** * Nullable based on observed data (e.g. value is null in example).
   */
  user_name: string | null;
  business_id: string;
}

export interface APIAgentSession {
  app_name: string;
  user_id: string;
  id: string;
  state: APIAgentState;
  events: APIAgentEvent[];
}

export type APIGetUserSessionsResponse = APIAgentSession[];

export interface APISendMessageRequest {
  message: string;
  sessionId?: string;
}

export interface APISendMessageResponse {
  session_id: string;
  message: string;
  user_id: string;
}
