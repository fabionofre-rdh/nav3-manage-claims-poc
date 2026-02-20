import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container } from "@/components/shared";
import Card from "@/components/ui/Card";
import Tabs from "@/components/ui/Tabs";
import Tag from "@/components/ui/Tag";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import Input from "@/components/ui/Input";
import DatePicker from "@/components/ui/DatePicker";
import Select from "@/components/ui/Select";
import { HiOutlineArrowLeft, HiOutlinePencil, HiChevronDown } from "react-icons/hi";
import {
  PiLockSimpleDuotone,
  PiMagnifyingGlassDuotone,
} from "react-icons/pi";
import type { Claim, User, Team, EdcPlan, HosPlan, Group, ClaimStatus } from "./types";
import { fetchClaimById, fetchUsers, fetchTeams, fetchEdcPlans, fetchHosPlans, fetchGroups, fetchStatuses, updateClaim } from "./services";

const ReadOnlyField = ({
  label,
  value,
  editing,
  hideLock,
  onChange,
}: {
  label: string;
  value: string;
  editing?: boolean;
  hideLock?: boolean;
  onChange?: (value: string) => void;
}) => (
  <div className="flex items-center gap-2 py-2 border-b border-gray-100">
    <span className="text-gray-500 text-sm min-w-[160px]">{label}</span>
    {editing ? (
      <Input
        size="sm"
        className="flex-1"
        value={value || ""}
        onChange={(e) => onChange?.(e.target.value)}
      />
    ) : (
      <span className="flex-1 text-sm flex items-center gap-1">
        {!hideLock && <PiLockSimpleDuotone className="text-gray-400 text-xs flex-shrink-0" />}
        {value ? (
          <span className="text-gray-900">{value}</span>
        ) : (
          <span className="text-gray-400">---</span>
        )}
      </span>
    )}
  </div>
);

const LookupField = ({
  label,
  value,
  editing,
  options,
  onChange,
}: {
  label: string;
  value: string;
  editing?: boolean;
  options?: { value: string; label: string }[];
  onChange?: (value: string) => void;
}) => {
  const selectedValues = value
    ? value.split(",").map((v) => v.trim()).filter(Boolean)
    : [];

  const selectedOptions = selectedValues.map(
    (v) => options?.find((o) => o.value === v) ?? { value: v, label: v }
  );

  return (
    <div className="flex items-center gap-2 py-2 border-b border-gray-100">
      <span className="text-gray-500 text-sm min-w-[160px]">{label}</span>
      {editing ? (
        <div className="flex-1">
          <Select<{ value: string; label: string }, false>
            isSearchable
            size="sm"
            placeholder={`Select ${label}...`}
            options={options}
            value={selectedOptions[0] ?? null}
            onChange={(opt) => {
              onChange?.((opt as { value: string; label: string } | null)?.value ?? "");
            }}
          />
        </div>
      ) : (
        <>
          <div className="flex-1 flex flex-wrap gap-1">
            {selectedValues.length > 0 ? (
              selectedValues.map((v) => (
                <Tag
                  key={v}
                  className="inline-flex items-center gap-1 !bg-blue-50 !text-blue-700 !border-blue-200"
                >
                  {selectedOptions.find((o) => o.value === v)?.label ?? v}
                  <span className="cursor-pointer text-blue-400 hover:text-blue-600 ml-1">
                    &times;
                  </span>
                </Tag>
              ))
            ) : (
              <span className="text-gray-400 text-sm">---</span>
            )}
          </div>
          <PiMagnifyingGlassDuotone className="text-gray-400 cursor-pointer hover:text-gray-600" />
        </>
      )}
    </div>
  );
};

const DateField = ({
  label,
  sublabel,
  value,
  editing,
  onChange,
}: {
  label: string;
  sublabel?: string;
  value: string;
  editing?: boolean;
  onChange?: (value: string) => void;
}) => {
  const parseDate = (str: string): Date | null => {
    if (!str) return null;
    const parsed = new Date(str);
    return isNaN(parsed.getTime()) ? null : parsed;
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    return `${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}/${date.getFullYear()}`;
  };

  return (
    <div className="flex items-center gap-2 py-2 border-b border-gray-100">
      <span className="text-gray-500 text-sm min-w-[160px]">
        <span>{label}</span>
        {sublabel && (
          <span className="block text-xs text-gray-400">{sublabel}</span>
        )}
      </span>
      {editing ? (
        <div className="flex-1">
          <DatePicker
            size="sm"
            inputFormat="MM/DD/YYYY"
            value={parseDate(value)}
            onChange={(date) => onChange?.(formatDate(date))}
          />
        </div>
      ) : (
        <span className="flex-1 text-gray-900 text-sm">{value || ""}</span>
      )}
    </div>
  );
};

const SelectField = ({
  label,
  value,
  editing,
  options,
  onChange,
}: {
  label: string;
  value: string;
  editing?: boolean;
  options?: { value: string; label: string }[];
  onChange?: (value: string) => void;
}) => (
  <div className="flex items-center gap-2 py-2 border-b border-gray-100">
    <span className="text-gray-500 text-sm min-w-[160px]">{label}</span>
    {editing ? (
      <div className="flex-1">
        <Select<{ value: string; label: string }, false>
          size="sm"
          placeholder="Select..."
          options={options}
          value={options?.find((o) => o.value === value) ?? null}
          onChange={(opt) =>
            onChange?.((opt as { value: string; label: string } | null)?.value ?? "")
          }
        />
      </div>
    ) : (
      <>
        <span className="flex-1 text-gray-900 text-sm">{value || "---"}</span>
        <HiChevronDown className="text-gray-400" />
      </>
    )}
  </div>
);

const ClaimDetail = () => {
  const { claimId } = useParams<{ claimId: string }>();
  const navigate = useNavigate();
  const [claim, setClaim] = useState<Claim | null>(null);
  const [editData, setEditData] = useState<Claim | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [userOptions, setUserOptions] = useState<{ value: string; label: string }[]>([]);
  const [teamOptions, setTeamOptions] = useState<{ value: string; label: string }[]>([]);
  const [edcPlanOptions, setEdcPlanOptions] = useState<{ value: string; label: string }[]>([]);
  const [hosPlanOptions, setHosPlanOptions] = useState<{ value: string; label: string }[]>([]);
  const [groupOptions, setGroupOptions] = useState<{ value: string; label: string }[]>([]);
  const [statusOptions, setStatusOptions] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    const loadClaim = async () => {
      if (!claimId) return;
      setLoading(true);
      const [found, users, teams, edcPlans, hosPlans, groups, statuses] = await Promise.all([
        fetchClaimById(claimId),
        fetchUsers(),
        fetchTeams(),
        fetchEdcPlans(),
        fetchHosPlans(),
        fetchGroups(),
        fetchStatuses(),
      ]);
      setClaim(found);
      setEditData(found);
      setUserOptions(
        users
          .filter((u: User) => u.status === "active")
          .map((u: User) => ({ value: u.id, label: u.userName }))
      );
      setTeamOptions(
        teams
          .filter((t: Team) => t.teamStatus === "active")
          .map((t: Team) => ({ value: t.id, label: t.teamName }))
      );
      setEdcPlanOptions(
        edcPlans
          .filter((p: EdcPlan) => p.status === "active")
          .map((p: EdcPlan) => ({ value: p.id, label: p.planName }))
      );
      setHosPlanOptions(
        hosPlans
          .filter((p: HosPlan) => p.status === "active")
          .map((p: HosPlan) => ({ value: p.id, label: p.planName }))
      );
      setGroupOptions(
        groups.map((g: Group) => ({ value: g.id, label: g.groupName }))
      );
      setStatusOptions(
        statuses
          .filter((s: ClaimStatus) => s.status === "active")
          .map((s: ClaimStatus) => ({ value: s.id, label: s.statusName }))
      );
      setLoading(false);
    };
    loadClaim();
  }, [claimId]);

  const handleEdit = () => {
    setEditData(claim ? { ...claim } : null);
    setEditing(true);
  };

  const handleCancel = () => {
    setEditData(claim ? { ...claim } : null);
    setEditing(false);
  };

  const handleSave = async () => {
    if (!claimId || !editData) return;
    setIsSaving(true);
    try {
      const updated = await updateClaim(claimId, editData);
      setClaim((prev) => (prev ? { ...prev, ...updated } : prev));
      setEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = (field: keyof Claim, value: string) => {
    setEditData((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const updateFields = (updates: Partial<Record<keyof Claim, string>>) => {
    setEditData((prev) => (prev ? { ...prev, ...updates } : prev));
  };

  const data = editing ? editData : claim;

  if (loading) {
    return (
      <Container className="h-full">
        <div className="flex items-center justify-center h-96">
          <Spinner size={40} />
        </div>
      </Container>
    );
  }

  if (!data) {
    return (
      <Container className="h-full">
        <div className="flex flex-col items-center justify-center h-96 gap-4">
          <p className="text-gray-500">Claim not found</p>
          <Button size="sm" onClick={() => navigate("/manage-claims")}>
            Back to Claims
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="h-full">
      <div className="flex flex-col gap-4 h-full">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            size="sm"
            variant="plain"
            icon={<HiOutlineArrowLeft />}
            onClick={() => navigate("/manage-claims")}
          />
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h4 className="font-bold">{data.claimId}</h4>
              <span className="text-gray-400 text-sm">Claim</span>
            </div>
          </div>
          <div className="flex gap-2">
            {editing ? (
              <>
                <Button size="sm" variant="plain" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  size="sm"
                  variant="solid"
                  onClick={handleSave}
                  disabled={isSaving}
                  icon={isSaving ? <Spinner size={14} /> : undefined}
                >
                  Save
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                variant="plain"
                icon={<HiOutlinePencil />}
                onClick={handleEdit}
              >
                Edit
              </Button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="general" variant="underline">
          <Tabs.TabList>
            <Tabs.TabNav value="general">General</Tabs.TabNav>
          </Tabs.TabList>

          <Tabs.TabContent value="general">
            <Card className="mt-4">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-8">
                {/* Left Column */}
                <div>
                  {/* Member — not in PATCH */}
                  <LookupField
                    label="Member"
                    value={data.memberId}
                    editing={false}
                  />
                  <div className="border border-gray-200 rounded-md p-4 mt-2 mb-4">
                    {/* Member detail fields — not in PATCH */}
                    <ReadOnlyField
                      label="Member ID"
                      value={data.memberId}
                      editing={false}
                    />
                    <ReadOnlyField
                      label="First Name"
                      value={data.firstName}
                      editing={false}
                    />
                    <ReadOnlyField
                      label="Last Name"
                      value={data.lastName}
                      editing={false}
                    />
                    <ReadOnlyField
                      label="Nav DOB"
                      value={data.navDob}
                      editing={false}
                    />
                    <ReadOnlyField
                      label="Date Member MOOP Met"
                      value={data.dateMemberMoopMet}
                      editing={false}
                    />
                    <ReadOnlyField
                      label="Notes"
                      value={data.notes}
                      editing={false}
                    />
                  </div>

                  {/* Group Name — patchable as groupId */}
                  <LookupField
                    label="Group Name"
                    value={editing ? (data.groupId ?? "") : data.group}
                    editing={editing}
                    options={groupOptions}
                    onChange={(v) => {
                      const label = groupOptions.find((o) => o.value === v)?.label ?? v;
                      updateFields({ group: label, groupId: v });
                    }}
                  />
                  {/* Group ID — read-only */}
                  <ReadOnlyField
                    label="Group ID"
                    value={data.groupId ?? ""}
                    editing={false}
                  />
                  {/* Days Old Since Received — always read-only (calculated) */}
                  <ReadOnlyField
                    label="Days Old Since Received"
                    value={data.daysOldSinceReceived ?? ""}
                    editing={false}
                  />
                  {/* Date Received — not in PATCH */}
                  <DateField
                    label="Date Received"
                    sublabel="MM/DD/YYYY"
                    value={data.dateReceived ?? ""}
                    editing={false}
                  />
                  {/* DCN — patchable */}
                  <ReadOnlyField
                    label="DCN"
                    value={data.dcn}
                    editing={editing}
                    onChange={(v) => updateField("dcn", v)}
                  />
                  {/* Claim Status — patchable as currentStatusId */}
                  <LookupField
                    label="Claim Status"
                    value={editing ? (data.currentStatusId ?? "") : data.currentStatus}
                    editing={editing}
                    options={statusOptions}
                    onChange={(v) => {
                      const label = statusOptions.find((o) => o.value === v)?.label ?? v;
                      updateFields({ currentStatus: label, currentStatusId: v });
                    }}
                  />
                  {/* Assigned To — patchable as assignedToId */}
                  <LookupField
                    label="Assigned To"
                    value={editing ? (data.assignedToId ?? "") : data.assignedTo}
                    editing={editing}
                    options={userOptions}
                    onChange={(v) => {
                      const label = userOptions.find((o) => o.value === v)?.label ?? v;
                      updateFields({ assignedTo: label, assignedToId: v });
                    }}
                  />
                  {/* Team — patchable as assignedTeamId */}
                  <LookupField
                    label="Team"
                    value={editing ? (data.assignedTeamId ?? "") : data.assignedTeam}
                    editing={editing}
                    options={teamOptions}
                    onChange={(v) => {
                      const label = teamOptions.find((o) => o.value === v)?.label ?? v;
                      updateFields({ assignedTeam: label, assignedTeamId: v });
                    }}
                  />
                  {/* Related Claim — not in PATCH */}
                  <LookupField
                    label="Related Claim"
                    value={data.relatedClaim ?? ""}
                    editing={false}
                  />
                  {/* No Payment Reason — not in PATCH */}
                  <LookupField
                    label="No Payment Reason"
                    value={data.noPaymentReason ?? ""}
                    editing={false}
                  />
                  {/* Possible duplicate — not in PATCH */}
                  <SelectField
                    label="Possible duplicate"
                    value={data.possibleDuplicate ?? ""}
                    editing={false}
                  />
                </div>

                {/* Right Column */}
                <div>
                  {/* Family ID — not in PATCH */}
                  <LookupField
                    label="Family ID"
                    value={data.familyId}
                    editing={false}
                  />
                  <div className="border border-gray-200 rounded-md p-4 mt-2 mb-4">
                    {/* Family detail fields — not in PATCH */}
                    <ReadOnlyField
                      label="Date Family MOOP Met"
                      value={data.dateFamilyMoopMet}
                      editing={false}
                    />
                    <ReadOnlyField
                      label="Family Notes"
                      value={data.familyNotes}
                      editing={false}
                    />
                  </div>

                  {/* Completed By — not in PATCH */}
                  <LookupField
                    label="Completed By"
                    value={data.completedBy}
                    editing={false}
                  />
                  {/* Completed Date — not in PATCH */}
                  <DateField
                    label="Completed Date"
                    sublabel="MM/DD/YYYY"
                    value={data.completedDate}
                    editing={false}
                  />
                  {/* Claims Bucket — not in PATCH */}
                  <LookupField
                    label="Claims Bucket"
                    value={data.claimsBucket}
                    editing={false}
                  />
                  {/* EDC Plan — patchable as ecdPlanId */}
                  <LookupField
                    label="EDC Plan Effective at DOS"
                    value={editing ? (data.ecdPlanId ?? "") : data.ecdPlan}
                    editing={editing}
                    options={edcPlanOptions}
                    onChange={(v) => {
                      const label = edcPlanOptions.find((o) => o.value === v)?.label ?? v;
                      updateFields({ ecdPlan: label, ecdPlanId: v });
                    }}
                  />
                  {/* HOS Plan — patchable as hosPlanId */}
                  <LookupField
                    label="HOS Plan Effective at DOS"
                    value={editing ? (data.hosPlanId ?? "") : data.hosPlan}
                    editing={editing}
                    options={hosPlanOptions}
                    onChange={(v) => {
                      const label = hosPlanOptions.find((o) => o.value === v)?.label ?? v;
                      updateFields({ hosPlan: label, hosPlanId: v });
                    }}
                  />
                  {/* SKU — not in PATCH */}
                  <LookupField
                    label="SKU"
                    value={data.sku ?? ""}
                    editing={false}
                  />
                  {/* Plan info — always read-only */}
                  <ReadOnlyField
                    label="Plan Start Date"
                    value={data.planStartDate ?? ""}
                    editing={false}
                  />
                  <ReadOnlyField
                    label="Plan Name"
                    value={data.planName ?? ""}
                    editing={false}
                  />
                  <ReadOnlyField
                    label="Plan Code"
                    value={data.planCode ?? ""}
                    editing={false}
                  />
                  <ReadOnlyField
                    label="Original Effective Date"
                    value={data.originalEffectiveDate ?? ""}
                    editing={false}
                  />
                  <ReadOnlyField
                    label="Member End Date"
                    value={data.memberEndDate ?? ""}
                    editing={false}
                  />
                </div>
              </div>
            </Card>
          </Tabs.TabContent>
        </Tabs>
      </div>
    </Container>
  );
};

export default ClaimDetail;
