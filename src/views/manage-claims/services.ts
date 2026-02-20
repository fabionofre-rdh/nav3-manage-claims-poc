import type { Claim, ClaimRawResponse, ClaimUpdateRawResponse, User, Team, EdcPlan, HosPlan, Group, ClaimStatus } from "./types";
import api from "@/services/api/axios";

function mapToClaim(raw: ClaimRawResponse): Claim {
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
    memberId: raw.member.memberId,
    firstName: raw.member.firstName,
    lastName: raw.member.lastName,
    navDob: raw.member.navDob,
    dateMemberMoopMet: raw.member.dateMemberMoopMet,
    notes: raw.member.notes,
    familyId: raw.family.familyId,
    dateFamilyMoopMet: raw.family.dateFamilyMoopMet,
    familyNotes: raw.family.familyNotes,
    completedBy: raw.completedBy.teamName,
    completedDate: raw.completedDate,
    claimsBucket: raw.claimsBucket.bucketName,
  };
}

export async function fetchClaims(): Promise<Claim[]> {
  const { data } = await api.get<{ data: ClaimRawResponse[]; statusCode: number; message: string }>("claimDataTemp/claims");
  return data.data.map(mapToClaim);
}

export async function fetchClaimById(id: string): Promise<Claim | null> {
  const { data } = await api.get<{ data: ClaimRawResponse; statusCode: number; message: string }>(`claimDataTemp/claims/by-claim/${id}`);
  return data.data ? mapToClaim(data.data) : null;
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
  const { data } = await api.get<User[]>("claimDataTemp/users");
  return data;
}

export async function fetchTeams(): Promise<Team[]> {
  const { data } = await api.get<Team[]>("claimDataTemp/teams");
  return data;
}

export async function fetchEdcPlans(): Promise<EdcPlan[]> {
  const { data } = await api.get<EdcPlan[]>("claimDataTemp/edc-plans");
  return data;
}

export async function fetchHosPlans(): Promise<HosPlan[]> {
  const { data } = await api.get<HosPlan[]>("claimDataTemp/hos-plans");
  return data;
}

export async function fetchGroups(): Promise<Group[]> {
  const { data } = await api.get<Group[]>("claimDataTemp/groups");
  return data;
}

export async function fetchStatuses(): Promise<ClaimStatus[]> {
  const { data } = await api.get<ClaimStatus[]>("claimDataTemp/statuses");
  return data;
}

export async function updateClaim(id: string, payload: Partial<Claim>) {
  const patchPayload = {
    claimId: payload.claimId,
    currentStatusId: payload.currentStatusId,
    assignedToId: payload.assignedToId,
    assignedTeamId: payload.assignedTeamId,
    serviceDate: payload.serviceDate,
    serviceDateEnd: payload.serviceDateEnd,
    ecdPlanId: payload.ecdPlanId,
    hosPlanId: payload.hosPlanId,
    cptCodes: payload.cptCodes,
    groupId: payload.groupId,
    dcn: payload.dcn,
    providerId: payload.providerId,
  };
  const { data } = await api.patch<{ data: ClaimUpdateRawResponse; statusCode: number; message: string }>(`claimDataTemp/claims/by-claim/${id}`, patchPayload);
  return mapToClaimUpdate(data.data);
}
