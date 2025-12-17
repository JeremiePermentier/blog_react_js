import type { ReactNode } from "react"; // ✅ correct
import { useBreakpoint } from "../../hooks/useBreakpoint";

type Props = {
  mobile: ReactNode;
  tablet?: ReactNode;
  desktop: ReactNode;
};

export const Responsive = ({ mobile, tablet, desktop }: Props) => {
  const bp = useBreakpoint();

  if (bp === "mobile") return <>{mobile}</>;
  if (bp === "tablet" && tablet) return <>{tablet}</>;
  return <>{desktop}</>;
};
