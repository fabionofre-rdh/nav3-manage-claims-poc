import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "@/components/shared";
import Card from "@/components/ui/Card";
import DataTable from "@/components/shared/DataTable";
import type { ColumnDef } from "@tanstack/react-table";
import type { Claim } from "./types";
import { fetchClaims } from "./services";

const getColumns = (
  navigate: ReturnType<typeof useNavigate>
): ColumnDef<Claim>[] => [
  {
    header: "Claim ID",
    accessorKey: "claimId",
    enableSorting: true,
    cell: ({ row }) => (
      <span
        className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
        onClick={() => navigate(`/manage-claims/${row.original.claimId}`)}
      >
        {row.original.claimId}
      </span>
    ),
  },
  {
    header: "Status",
    accessorKey: "currentStatus",
    enableSorting: true,
  },
  {
    header: "Assigned To",
    accessorKey: "assignedTo",
    enableSorting: true,
  },
  {
    header: "Assigned Team",
    accessorKey: "assignedTeam",
    enableSorting: true,
  },
  {
    header: "Service Date",
    accessorKey: "serviceDate",
    enableSorting: true,
  },
  {
    header: "ECD Plan",
    accessorKey: "ecdPlan",
    enableSorting: true,
  },
  {
    header: "HOS Plan",
    accessorKey: "hosPlan",
    enableSorting: true,
  },
  {
    header: "CPT Codes",
    accessorKey: "cptCodes",
    enableSorting: true,
  },
  {
    header: "Group",
    accessorKey: "group",
    enableSorting: true,
  },
  {
    header: "DCN",
    accessorKey: "dcn",
    enableSorting: true,
  },
  {
    header: "Provider",
    accessorKey: "provider",
    enableSorting: true,
  },
];

const ManageClaims = () => {
  const navigate = useNavigate();
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState<Claim[]>([]);
  const columns = getColumns(navigate);

  useEffect(() => {
    const loadClaims = async () => {
      setLoading(true);
      const data = await fetchClaims();
      setClaims(data);
      setLoading(false);
    };
    loadClaims();
  }, []);

  const handleCheckBoxChange = (checked: boolean, row: Claim) => {
    if (checked) {
      setSelectedRows((prev) => [...prev, row]);
    } else {
      setSelectedRows((prev) => prev.filter((r) => r.id !== row.id));
    }
  };

  const handleIndeterminateCheckBoxChange = (checked: boolean) => {
    if (checked) {
      setSelectedRows([...claims]);
    } else {
      setSelectedRows([]);
    }
  };

  return (
    <Container className="h-full">
      <div className="flex flex-col gap-4">
        <h3>Manage Claims</h3>
        <Card bodyClass="p-0">
          <DataTable<Claim>
            selectable
            columns={columns}
            data={claims}
            loading={loading}
            onCheckBoxChange={handleCheckBoxChange}
            onIndeterminateCheckBoxChange={handleIndeterminateCheckBoxChange}
            pagingData={{
              total: claims.length,
              pageIndex: 1,
              pageSize: 50,
            }}
            stickyHeader
            maxHeight="calc(100vh - 220px)"
          />
        </Card>
      </div>
    </Container>
  );
};

export default ManageClaims;
