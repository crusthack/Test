import StatusCard from "./StatusCard";
import Grid from "@/components/ui/Grid";

interface StatusItem {
  label: string;
  value: string;
  status?: "normal" | "success";
}

interface StatusGridProps {
  statuses: StatusItem[]; // 상태 항목 배열
}

export default function StatusGrid({ statuses }: StatusGridProps) {
  return (
    <Grid columns={{ default: 1, md: 2 }} gap="md" marginBottom={false}>
      {/*
        Grid 컴포넌트 사용
        marginBottom={false}: 하단 여백 없음 (부모가 처리)
      */}
      {statuses.map((status, index) => (
        <StatusCard
          key={index}
          label={status.label}
          value={status.value}
          status={status.status}
        />
      ))}
    </Grid>
  );
}