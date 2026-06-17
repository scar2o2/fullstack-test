import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const filters = ["All", "Placement", "Result", "Event"];

export function NotificationFilter({ value, onChange }) {
  return <ToggleButtonGroup value={value} exclusive size="small" onChange={(_, next) => next && onChange(next)} sx={{ flexWrap: "wrap", gap: 1 }}>{filters.map(type => <ToggleButton key={type} value={type} sx={{ borderRadius: 1, textTransform: "none", px: 2 }}>{type}</ToggleButton>)}</ToggleButtonGroup>;
}
