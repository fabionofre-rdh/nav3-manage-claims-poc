export type Claim = {
  id: string;
  claimId: string;
  currentStatus: string;
  currentStatusId?: string;
  assignedTo: string;
  assignedToId?: string;
  assignedTeam: string;
  assignedTeamId?: string;
  serviceDate: string;
  serviceDateEnd: string;
  ecdPlan: string;
  ecdPlanId?: string;
  hosPlan: string;
  hosPlanId?: string;
  cptCodes: string;
  group: string;
  groupId?: string;
  dcn: string;
  provider: string;
  providerId?: string;
  memberId: string;
  familyId: string;
  firstName: string;
  lastName: string;
  navDob: string;
  dateMemberMoopMet: string;
  notes: string;
  dateFamilyMoopMet: string;
  familyNotes: string;
  completedBy: string;
  completedDate: string;
  claimsBucket: string;
  claimsBucketId?: string;
  sku: string;
  dateReceived: string;
  planStartDate?: string;
  planName?: string;
  planCode?: string;
  originalEffectiveDate?: string;
  memberEndDate?: string;
  daysOldSinceReceived?: string;
  relatedClaim?: string;
  noPaymentReason?: string;
  possibleDuplicate?: string;
};

export type User = {
  id: string;
  userName: string;
  status: string;
  createdAt: string;
  lastUpdatedAt: string;
};

export type Team = {
  id: string;
  teamName: string;
  teamStatus: string;
  createdAt: string;
  lastUpdatedAt: string;
};

export type EdcPlan = {
  id: string;
  planName: string;
  status: string;
  createdAt: string;
  lastUpdatedAt: string;
};

export type HosPlan = {
  id: string;
  planName: string;
  status: string;
  createdAt: string;
  lastUpdatedAt: string;
};

export type Group = {
  id: string;
  groupName: string;
  createdAt: string;
  lastUpdatedAt: string;
};

export type ClaimStatus = {
  id: string;
  statusName: string;
  status: string;
  createdAt: string;
  lastUpdatedAt: string;
};

export type ClaimUpdateRawResponse = Omit<
  ClaimRawResponse,
  "member" | "claimBucket" | "completedDate" | "receivedDate" | "sku"
>;

export type ClaimRawResponse = {
  id: string;
  claimId: string;
  currentStatus: {
    id: string;
    statusName: string;
  };
  assignedTo: User;
  assignedTeam: Team;
  serviceDate: string;
  serviceDateEnd: string;
  ecdPlan: EdcPlan;
  hosPlan: HosPlan;
  cptCodes: string;
  group: Group;
  dcn: string;
  provider: {
    id: string;
    providerName: string;
  };
  member: {
    memberId: string;
    familyId: string;
    memberFirstName: string;
    memberLastName: string;
    memberDOB: string;
  };
  claimBucket: {
    id: string;
    name: string;
    status: string;
  };
  completedDate: string;
  receivedDate: string;
  sku: string;
};
