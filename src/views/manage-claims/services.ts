import type { Claim, ClaimRawResponse, ClaimUpdateRawResponse, User, Team, EdcPlan, HosPlan, Group, ClaimStatus } from "./types";
import api from "@/services/api/axios";

function mapToClaim(raw: ClaimRawResponse): Claim {
  console.log("raw", raw);
  return {
    id: raw.id,
    claimId: raw.claimId,
    currentStatus: raw.currentStatus.statusName,
    currentStatusId: raw.currentStatus.id,
    assignedTo: raw.assignedTo.userName,
    assignedToId: raw.assignedTo.id,
    assignedTeam: raw.assignedTeam.teamName,
    assignedTeamId: raw.assignedTeam.id,
    serviceDate: raw.serviceDate,
    serviceDateEnd: raw.serviceDateEnd,
    ecdPlan: raw.ecdPlan?.planName,
    ecdPlanId: raw.ecdPlan?.id,
    hosPlan: raw.hosPlan?.planName,
    hosPlanId: raw.hosPlan?.id,
    cptCodes: raw.cptCodes,
    group: raw.group.groupName,
    groupId: raw.group.id,
    dcn: raw.dcn,
    provider: raw.provider.providerName,
    providerId: raw.provider.id,
    memberId: raw.member.memberId,
    familyId: raw.member.familyId,
    firstName: raw.member.memberFirstName,
    lastName: raw.member.memberLastName,
    navDob: raw.member.memberDOB,
    dateMemberMoopMet: '',
    notes: '',
    dateFamilyMoopMet: '',
    familyNotes: '',
    completedBy: '',
    completedDate: raw.completedDate,
    claimsBucket: raw.claimBucket?.name,
    claimsBucketId: raw.claimBucket?.id,
    sku: raw.sku,
    dateReceived: raw.receivedDate,
  };
}

export async function fetchClaims(): Promise<Claim[]> {
  const { data } = await api.get<ClaimRawResponse[]>("claims");
  return data.map(mapToClaim);
}

export async function fetchClaimById(id: string): Promise<Claim | null> {
  const { data } = await api.get<ClaimRawResponse>(`claims/by-claim/${id}`);
  return data ? mapToClaim(data) : null;
}

function mapToClaimUpdate(raw: ClaimUpdateRawResponse): Pick<Claim, "id" | "claimId" | "currentStatus" | "currentStatusId" | "assignedTo" | "assignedToId" | "assignedTeam" | "assignedTeamId" | "serviceDate" | "serviceDateEnd" | "ecdPlan" | "ecdPlanId" | "hosPlan" | "hosPlanId" | "cptCodes" | "group" | "groupId" | "dcn" | "provider" | "providerId"> {
  return {
    id: raw.id,
    claimId: raw.claimId,
    currentStatus: raw.currentStatus.statusName,
    currentStatusId: raw.currentStatus.id,
    assignedTo: raw.assignedTo.userName,
    assignedToId: raw.assignedTo.id,
    assignedTeam: raw.assignedTeam.teamName,
    assignedTeamId: raw.assignedTeam.id,
    serviceDate: raw.serviceDate,
    serviceDateEnd: raw.serviceDateEnd,
    ecdPlan: raw.ecdPlan.planName,
    ecdPlanId: raw.ecdPlan.id,
    hosPlan: raw.hosPlan.planName,
    hosPlanId: raw.hosPlan.id,
    cptCodes: raw.cptCodes,
    group: raw.group.groupName,
    groupId: raw.group.id,
    dcn: raw.dcn,
    provider: raw.provider.providerName,
    providerId: raw.provider.id,
  };
}

export async function fetchUsers(): Promise<User[]> {
  const { data } = await api.get<User[]>("users");
  return data;
}

export async function fetchTeams(): Promise<Team[]> {
  const { data } = await api.get<Team[]>("teams");
  return data;
}

export async function fetchEdcPlans(): Promise<EdcPlan[]> {
  const { data } = await api.get<EdcPlan[]>("edc-plans");
  return data;
}

export async function fetchHosPlans(): Promise<HosPlan[]> {
  const { data } = await api.get<HosPlan[]>("hos-plans");
  return data;
}

export async function fetchGroups(): Promise<Group[]> {
  const { data } = await api.get<Group[]>("groups");
  return data;
}

export async function fetchStatuses(): Promise<ClaimStatus[]> {
  const { data } = await api.get<ClaimStatus[]>("statuses");
  return data;
}

export async function updateClaim(id: string, payload: Partial<Claim>) {
  const patchPayload = {
    currentStatusId: payload.currentStatusId,
    assignedToId: payload.assignedToId,
    assignedTeamId: payload.assignedTeamId,
    ecdPlanId: payload.ecdPlanId,
    hosPlanId: payload.hosPlanId,
    groupId: payload.groupId,
    dcn: payload.dcn,
  };
  const { data } = await api.patch<ClaimUpdateRawResponse>(`claims/${id}`, patchPayload);
  return mapToClaimUpdate(data);
}
