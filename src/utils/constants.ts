export const DATE_FORMAT_WITHOUT_TIME = "yyyy-MM-dd";
export const DATE_FORMAT_WITH_TIME = "MM/dd/yy hh:mm a";
export const DATE_FORMAT_WITH_DAY_NAME_AND_SHORT_MONTH = "iiii MMM dd, yyyy";
export const DATE_FORMAT_WITH_DAY_SHORT_MONTH_AND_YEAR = "dd MMM, yyyy";
export const DATE_FORMAT_WITH_TIME_AND_DATE = "hh:mm aa, MMM dd";
export const DATE_FORMAT_WITH_ONLY_TIME = "hh:mm aa";
export const DATE_FORMAT_WITH_SHORT_MONTH_DAY_AND_YEAR = "MMM dd, yyyy";
export const DATE_FORMAT_WITH_DATE_AND_TIME = "MMM DD, hh:mm a";
export const DATE_FORMAT_WITH_MM_DD_YYYY = "MM/dd/yyyy";
export const DATE_FORMAT_WITH_MM_DD_YYYY_HH_MM_AM_PM = "MM/dd/yyyy hh:mm a";

// List Table Constants
export const LIST_TABLE_CONFIG = {
  PAGE_SIZES: [50, 100, 200, 500],
  DEFAULT_PAGE_SIZE: 100,
  MIN_SEARCH_LENGTH: 3,
} as const;

export type TimespanName =
  | "TODAY"
  | "THISWEEK"
  | "LAST7DAYS"
  | "LAST30DAYS"
  | "THISMONTH"
  | "ALLTIME";

export const DocumentDuration = [
  { value: "TODAY", label: "Today" },
  { value: "THISWEEK", label: "This Week" },
  { value: "LAST7DAYS", label: "Last 7 Days" },
  { value: "LAST30DAYS", label: "Last 30 Days" },
  { value: "THISMONTH", label: "This Month" },
  { value: "ALLTIME", label: "All Time" },
];

export const ActivityDuration = [
  { value: "LAST7DAYS", label: "Last 7 Days" },
  { value: "NEXT7DAYS", label: "Next 7 Days" },
  { value: "LAST30DAYS", label: "Last 30 Days" },
  { value: "ALLTIME", label: "All Time" },
] as const;

export const ActivityCategory = [
  { value: "ALL", label: "All" },
  { value: "CALLS", label: "Calls" },
  { value: "EMAILS", label: "Emails" },
  { value: "VOICEMAILS", label: "Voicemails" },
  { value: "FOLLOWUPS", label: "Follow Up" },
  { value: "NOTE", label: "Notes" },
  { value: "APPOINTMENTS", label: "Appointments" },
  { value: "TAG", label: "Tags" },
] as const;

// export type TimespanName = "LAST7DAYS" | "NEXT7DAYS" | "LAST30DAYS" | "ALLTIME";
export enum NoteType {
  LogACall = 1,
  Note = 2,
  AutoNotes = 3,
}
export enum EntityType {
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
export enum EnrollmentStatus {
  ENROLLED = 1,
  OPTOUT = 2,
  PENDING = 3,
  ACTIVATED = 4,
}
export enum TaskStatus {
  Pending = 1,
  Started = 2,
  Completed = 3,
  Canceled = 4,
}
export enum enumPermissions {
  // URAM related
  //User
  ViewUser = "rTfd",
  AddUser = "lM8T",
  EditUser = "o8N8",
  ListUsers = "OI9e",
  DeleteUser = "OrIo",
  //Role
  ListRoles = "tdk0",
  ViewRole = "Dz9B",
  AddRole = "VwQx",
  EditRole = "ka5O",
  DeleteRole = "tDVk",
  //PermissionSets
  ListPermissionSets = "XloC",
  ViewPermissionSet = "4Cvd",
  AddPermissionSet = "HFmQ",
  EditPermissionSet = "uXa9",
  DeletePermissionSet = "X4Hu",
  //Permissions
  ListPermissions = "Pl60",

  //Profile
  EditProfile = "CMso",

  // CRM related
  //Product
  ListProducts = "t0CK",
  ViewProduct = "vcaw",
  AddProduct = "2veb",
  EditProduct = "VAg3",
  DeleteProduct = "X4Cu",
  //Product - Tab Component
  ViewProductComponents = "c5lk",
  ListProductComponents = "hfpk",
  EditProductComponent = "yigk",
  AddProductComponent = "3in2",
  DeleteProductComponent = "hcu7",
  //Product - Tab Product Code
  ViewProductCodes = "cqof",
  ListProductCodes = "r17l",
  EditProductCode = "nl3u",
  AddProductCodes = "2e93",
  DeleteProductCodes = "gryb",
  //Product - Tab SKU
  ProductSKUListSku = "5omi",
  ProductSKUAddSku = "aqi5",
  ProductSKUEditSku = "7d15",
  ProductSKUDeleteSku = "i0b2",
  ProductSKUProductRateSheet = "0ufv",
  ProductSKUProductMappings = "6k8b",
  //Leads
  ListLeads = "iUqq",
  ViewLead = "7Eas",
  AddLead = "kfhL",
  EditLead = "36ZF",
  AssignLead = "TxM8",
  DeleteLead = "i7k3",
  ArchiveLead = "xM7t",
  //Resellers
  ListResellers = "fo0a",
  ViewReseller = "fo1a",
  AddReseller = "fo2a",
  EditReseller = "fo3a",
  DeleteReseller = "fo4a",
  ListGeneralAgents = "96fb",
  EditGeneralAgents = "e464",
  AddGeneralAgents = "34ca",
  //Reseller - Tab Plans
  ResellerPlanAddPlan = "2yar",
  ResellerPlanEditPlan = "9qda",
  ResellerPlanListPlan = "ksp9",
  ResellerPlanDeletePlan = "5j2q",
  //Reseller - Tab Employer
  ResellerEmployerListEmployer = "1sqi",
  //Reseller - Tab Agent
  ResellerAgentListAgent = "p01e",
  ResellerAgentAddAgent = "zfkd",
  ResellerAgentEditAgent = "pa4n",
  ResellerAgentDeleteAgent = "knyb",
  //Reseller - Tab Sites
  ResellerSitesListSite = "bx8o",
  ResellerSitesAddSite = "1ldf",
  ResellerSitesEditSite = "suc7",
  ResellerSitesDeleteSite = "61go",
  // Prospect - Employer Management
  ListProspectEmployers = "q0r7",
  ViewProspectEmployer = "q0r8",
  AddProspectEmployer = "q0r9",
  EditProspectEmployer = "q0r6",
  //Prospects
  ListProspects = "fZaG",
  ViewProspect = "xMe3",
  AddProspect = "PFFB",
  EditProspect = "kfpL",
  DeleteProspect = "kLMe",
  //Prospect Workflows
  ListProspectsIM = "LPps",
  ListProspectsEnrollmentActivation = "e2S3",
  ViewProspectIM = "xIe3",
  AddProspectIM = "PIFB",
  EditProspectIM = "kIpL",
  DeleteProspectIM = "kIMe",
  SyncupWorkflow = "LR3b",
  RenewalsRewritesWorkflow = "sq9g",
  SalesWorkflow = "8g1w",
  ListProspectsMember = "LQps",
  ViewProspectMember = "xxe3",
  AddProspectMember = "PMFB",
  EditProspectMember = "kMpL",
  DeleteProspectMember = "kMMe",
  ListProspectsCSA = "LRps",
  ViewProspectCSA = "xCe3",
  AddProspectCSA = "PCFB",
  EditProspectCSA = "kCpL",
  DeleteProspectCSA = "kCMe",
  //Contact Management
  ListContacts = "491a",
  ViewContact = "2034",
  EditContact = "8ddb",
  AddContact = "8eab",
  //Contact Management - Tab Related Contacts
  RelatedContactListRelatedContact = "d3w9",
  RelatedContactAddRelatedContact = "s9dg",
  RelatedContactEditRelatedContact = "omk4",
  //Contact Management - Tab Plan Coverage
  PlanCoverageListPlanCoverage = "598s",
  PlanCoverageAddPlanCoverage = "7iln",
  PlanCoverageEditPlanCoverage = "794x",
  PlanCoverageDeletePlanCoverage = "ztv0",
  PlanCoverageViewRID = "rpd1",
  //Contact Management - Tab Card
  CardListCardRequestHistory = "0zfi",
  //Contact Management - Tab Health Condition
  HealthConditionListHealthCondition = "2ce6",
  HealthConditionAddHealthCondition = "r8mc",
  HealthConditionEditHealthCondition = "xr6q",
  HealthConditionDeleteHealthCondition = "c2uf",
  HealthConditionListPreCondition = "jsd5",
  HealthConditionEditPreCondition = "q3sj",
  HealthConditionListMedicalNeed = "b7di",
  //Contact Management - Tab Medication
  MedicationListMedication = "zhol",
  MedicationAddMedication = "2akg",
  MedicationEditMedication = "s1yv",
  MedicationDeleteMedication = "aq48",
  //Contact Management - Tab Contacts
  ContactsListContacts = "j5tz",
  ContactsAddContacts = "52is",
  ContactsEditContacts = "2dea",
  //Contact Management - Tab Appointments
  AppointmentsListAppointments = "zxk7",
  AppointmentsAddAppointments = "pi7n",
  AppointmentsEditAppointments = "ohcq",
  //Contact Management - Tab Payments
  PaymentListPayment = "9kjs",
  AddWexPayment = "4V1n",
  GetEPaymentCardByCard = "3np7",
  //Contact Management - Tab Claims
  ClaimsListClaim = "7gmf",
  ClaimsDownloadClaimReceipt = "12eb",
  //Contact Management - Tab Cases
  CasesListCase = "e1b2",
  CasesAddCase = "1ugi",
  //Contact Management - Tab Mobile App
  MobileAppListMobileAppInfo = "gij0",
  //Contact Management - Tab Request Logs
  RequestsLogsListRequestsLogs = "98yn",
  //Contact Management - Tab Text Logs
  TextLogsListTextLogs = "5m8b",
  TextLogsViewMoreDetails = "4qsi",
  //Contact Actions
  ActionMemberAssignUpdateRID = "m5x1",
  ActionMemberArchiveMember = "m5x2",
  ActionMemberPushToDrexi = "m5x3",
  ActionMemberSendEnrollmentText = "m5x4",
  ActionMemberSendActivationText = "m5x5",
  ActionMemberSendWelcomeEmail = "m5x6",
  ActionMemberTextMembershipCardBenefitsSummary = "m5x7",
  ActionMemberSendMemberApp = "m5x8",
  ActionMemberPushToECW = "m5x9",
  ActionMemberSendAText = "m5y1",
  ActionMemberPrintMembershipCard = "m5y2",
  ActionMemberUpdateECWNumber = "m5y3",
  ActionDownloadENChangeLogs = "m5y4",
  //Other Contacts
  ListOtherContact = "u3lo",
  EditOtherContact = "b7gp",
  ViewOtherContact = "xbde",
  //Other Contacts Actions
  ActionOtherContactSendActivation = "2ahz",
  ActionOtherContactCreateUser = "u1a4",
  //Other Contacts - Tab Associated Members
  AssociatedMembersListAssociatedMembers = "ztx2",

  //All contacts
  ListAllContact = "mt63",

  //Opportunities
  AddOpportunity = "e32p",
  EditOpportunity = "el9k",
  ViewOpportunity = "9ft2",
  ListOpportunity = "yi6p",
  ArchiveOpportunity = "y0nu",
  //Opportunities Actions
  OppActionDownloadEmployerApplication = "f4b6",
  OppActionDownloadAchAuthorization = "fcdc",
  OppActionDownloadCreditCardAuthorization = "5b5a",
  OppActionDownloadActiveRoster = "2de8",
  OppActionDownloadRoster = "9f2f",
  OppActionSendWelcomeEmail = "9f6c",
  OppActionSendEnrollmentTexts = "f771",
  OppActionSendActivationTexts = "b59a",
  OppActionSendMembershipCards = "a526",
  OppActionSendAText = "1ebe",
  OppActionSendMemberApp = "4f1e",
  OppActionAssignUpdateGroupID = "e3f3",
  OppActionPushToECW = "cb79",
  OppActionPushToDrexi = "cb81",
  OppActionPrintMembershipCards = "6db7",
  OppActionInitiateAutoEnrollment = "b7ff",
  OppActionStartEnrollments = "9a1f",
  OppActionPackage1ForSignOff = "027c",
  OppActionCarryForwardMembers = "p73c",
  OppActionAssignUpdateDealID = "c46s",
  OppActionPushtoHubSpot = "c47s",
  OppActionAssignUpdateFullTimeEmployees = "c48s",
  //Opportunity - Tab Contacts
  OppContacsListContacts = "8plq",
  OppContacsEditContacts = "g7vb",
  //Opportunity - Tab Plans
  OppPlansListPlans = "t6u8",
  OppPlansAddPlans = "hq9y",
  OppPlansEditPlans = "o8q3",
  OppPlansDeletePlans = "xdh8",
  OppPlansDownloadSpdPdf = "2hx7",
  //Opportunity - Tab Contributions
  OppContributionsListContributions = "dif2",
  OppContributionsAddContributions = "sc6j",
  OppContributionsEditContributions = "is61",
  OppContributionsDeleteContributions = "ajnr",
  OppContributionsAddEmployeeClass = "l1ua",
  OppContributionsDeleteEmployeeClass = "t9kt",
  //Opportunity - Tab Employee List
  OppEmployeesListEmployee = "d8zc",
  OppEmployeesAddEmployee = "1xlk",
  OppEmployeesImportEmployee = "b0qe",
  OppEmployeesDeleteEmployee = "4jzc",
  OppEmployeesSendEnrollmentText = "mt0r",
  OppEmployeesSendActivationText = "vf8t",
  //Opportunity - Tab Roster
  OppRosterListRoster = "19yu",
  OppRosterImportRoster = "xli5",
  //Opportunity - Tab Invoice
  OppInvoiceListInvoice = "eb24",
  OppInvoiceViewInvoice = "5a3a",
  OppInvoiceDownloadInvoice = "t42d",
  OppInvoiceGenerateDownloadInvoice = "AaQ5",
  OppInvoiceRefreshInvoice = "Gm4L",
  OppInvoiceFreezeInvoice = "x24L",
  //Opportunity - Tab Payments
  OppPaymentViewPaymentDetails = "xg38",
  //Opportunity - Tab Import Logs
  OppImportLogsListImportLogs = "okh4",
  OppImportLogsImportEmployees = "p7s4",
  OppImportLogsDownloadLogFile = "ohl9",

  //Account - Tab Division
  AccountDivisionList = "dc3l",
  SaveAccountDivision = "Ku23",
  UpdateAccountDivision = "ad7e",
  DeleteAccountDivision = "8ghd",

  //Account
  ListAccounts = "9b0b",
  ViewAccount = "e022",
  AddAccount = "9b6f",
  EditAccount = "a6bb",
  DeleteAccount = "4232",
  ActiveOpportunityTab = "jm17",
  //Account Actions
  ActionInitiateRenewRewrite = "aBfG", //not using
  ActionConverttoClient = "e5x1",
  ActionDownloadEmployerApplication = "e5x2",
  ActionDownloadActiveRoster = "e5x3",
  ActionDownloadRoster = "e5x4",
  ActionDownloadACHAuthorization = "e5x5",
  ActionDownloadCreditCardAuthorization = "e5x6",
  ActionStartEnrollments = "e5x7",
  ActionAssignUpdateGroupID = "e5x8",
  ActionPushToDrexi = "e5x9",
  ActionSendEnrollmentTexts = "e5y1",
  ActionSendActivationTexts = "e5y2",
  ActionSendMembershipCards = "e5y3",
  ActionPrintMembershipCards = "e5y4",
  ActionSendWelcomeEmail = "ooh4",
  ActionSendMemberApp = "e5y5",
  ActionSendAText = "e5y6",
  ActionTerminateGroup = "e5y7",
  ActionPushToECW = "m6x0",
  ActionPackage1ForSignOff = "fnxD",
  ActionCarryForwardMembers = "aq3d",
  ActionAddUpdatePastDueAmount = "k3f0",
  //Account - Tab Opportunity
  OpportunitiesListOpportunity = "Fl3P",

  //Travel Group
  ListTravelGroup = "2q6d",
  ViewTravelGroup = "g5td",
  AddTravelGroup = "zep5",
  EditTravelGroup = "s0f6",
  DeleteTG = "p4f3",
  // Role Specific: Marketing
  MarketingDashboard = "u0r7",
  // Role Specific: Sales
  SalesDashboard = "v0r7",
  // Role Specific: Membership
  MembershipDashboard = "w0r7",
  // Role Specific: Employer
  EmployerDashboard = "x0r7",

  //Tenants
  ListTenants = "190b",
  ViewTenant = "LKVQ",
  AddTenant = "x7lV",
  EditTenant = "8kMb",
  DeleteTenant = "KOc2",
  TenantConfiguration = "mcK2",

  //Dashboard
  SuperAdminDashboard = "qlwg",
  TenantAdminDashboard = "qf4M",
  SetterDashboard = "hYjR",
  SalesAgentDashboard = "JGvW",
  WelcomeDashboard = "mk34",

  //Impersonate Login
  ManagerLoginImpersonate = "im01",
  PlanProductLoginImpersonate = "ip02",
  MarketingLoginImpersonate = "im03",
  SalesLoginImpersonate = "is04",
  MembershipLoginImpersonate = "im05",
  CareLogisticsLoginImpersonate = "ic06",
  ClinicalLoginImpersonate = "ic07",
  AssociationsAffiliateLoginImpersonate = "ia08",
  VendorLoginImpersonate = "iv09",
  FinanceLoginImpersonate = "if10",
  EmployerLoginImpersonate = "ie11",
  MemberFamilyImpersonate = "im12",

  // Orders
  ListOrders = "G6hT",
  ViewOrder = "dNgG",
  AddOrder = "Bzcm",
  EditOrder = "Ezcm",

  //case management
  ListCases = "z0r0",
  ViewCases = "z0r1",
  AddCases = "z0r2",
  EditCases = "z0r3",
  ListScbCaseManagement = "af5f",

  //ExtraHelp
  ListExtraHelp = "MMgu",
  ViewExtraHelp = "UnYU",
  AddExtraHelp = "OYja",
  EditExtraHelp = "Y5GJ",

  //SupportTak
  ViewSupportTask = "4a0a",
  ExecuteSupportTask = "0d62",
  EditSupportTask = "b751",
  ListSupportTask = "cb4a",

  //EmailManagement
  ListExtraHelpEmail = "uhRw",
  ViewExtraHelpEmail = "T8XF",
  AddExtraHelpEmail = "XDZ5",
  EditExtraHelpEmail = "oXnD",

  // Claims
  ListClaims = "9c1b",
  ViewClaims = "a6f5",
  AddClaims = "aE3d",
  EditClaims = "a114",

  // Reports
  Report1 = "Rp01",
  Report2 = "Rp02",
  Report3 = "Rp03",

  // Broker Leads
  ListBrokerLeads = "3b0c",
  ViewBrokerLeads = "91b7",

  // Others
  ListOthers = "3b2c",
  ViewOthers = "7z3c",

  // Broker Prospect Management
  ListBrokerProspects = "4ca4",

  // Care Logistics Management
  ListHGR = "2b85",
  EditHGR = "49af",
  ListProgramList = "27ae",
  ListCaseManagement = "1e4b",

  // Care Logistics Management >> OutOfPocket
  ViewOutOfPocket = "9v6p",
  AddOutOfPocket = "9a6p",
  EditOutOfPocket = "9e6p",
  ListOutOfPocket = "9l6p",

  // Care Logistics Management >> PayMyDoctor
  ViewPayMyDoctor = "9v6d",
  ListPayMyDoctor = "9l6d",

  // TPA Management
  ListEligibilityRoster = "2v8k",
  ListAddChangeDrops = "qr1t",
  EditAddChangeDrops = "2c7z",
  ListInvoicing = "8y5h",
  ListGroupTermination = "sRzz",
  EditGroupTermination = "weEn",

  // TPA Management
  AddTagsCategory = "49b9",
  EditTagsCategory = "g93t",
  DeleteTagsCategory = "5me3",
  ListTagsCategory = "bf4c",
  AddTags = "6fb3",
  EditTags = "fc1c",
  DeleteTags = "1xe3",
  ListTags = "b0c4",

  //Quotes
  ListQuotes = "Acde",
  EditQuote = "aBce",
  ViewQuote = "1A2b",

  //Invoice Adjustment
  ListInvoiceAdjustment = "IALI",
  ViewInvoiceAdjustment = "IAVI",
  AddInvoiceAdjustment = "IAAD",
  EditInvoiceAdjustment = "IAED",
  DeleteInvoiceAdjustment = "IADE",
  ApproveInvoiceAdjustment = "IAAP",
}
export enum EmployeeClass {
  EmployeeOnly = 1,
  EmployeeAndSpouse = 2,
  EmployeeAndChildren = 3,
  Family = 4,
}
export enum PreviewDownloadContract {
  Preview = 1,
  Download = 2,
  Send = 3,
}
