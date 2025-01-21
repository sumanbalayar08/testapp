import { fetchUserData } from "@/app/lib/fetchUserData";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
