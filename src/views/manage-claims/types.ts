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
  firstName: string;
  lastName: string;
  navDob: string;
  dateMemberMoopMet: string;
  notes: string;
  familyId: string;
  dateFamilyMoopMet: string;
  familyNotes: string;
  completedBy: string;
  completedDate: string;
  claimsBucket: string;
  sku?: string;
  planStartDate?: string;
  planName?: string;
  planCode?: string;
  originalEffectiveDate?: string;
  memberEndDate?: string;
  daysOldSinceReceived?: string;
  dateReceived?: string;
  relatedClaim?: string;
  noPaymentReason?: string;
  possibleDuplicate?: string;
};

export type ClaimUpdateRawResponse = Omit<
  ClaimRawResponse,
  "member" | "family" | "completedBy" | "completedDate" | "claimsBucket"
>;

export type ClaimRawResponse = {
  id: string;
  claimId: string;
  currentStatus: {
    id: string;
    statusName: string;
  };
  assignedTo: {
    id: string;
    userName: string;
  };
  assignedTeam: {
    id: string;
    teamName: string;
  };
  serviceDate: string;
  serviceDateEnd: string;
  ecdPlan: {
    id: string;
    planName: string;
  };
  hosPlan: {
    id: string;
    planName: string;
  };
  cptCodes: string;
  group: {
    id: string;
    groupName: string;
  };
  dcn: string;
  provider: {
    id: string;
    providerName: string;
  };
  member: {
    memberId: string;
    firstName: string;
    lastName: string;
    navDob: string;
    dateMemberMoopMet: string;
    notes: string;
  };
  family: {
    familyId: string;
    dateFamilyMoopMet: string;
    familyNotes: string;
  };
  completedBy: {
    teamName: string;
  };
  completedDate: string;
  claimsBucket: {
    bucketName: string;
  };
};
