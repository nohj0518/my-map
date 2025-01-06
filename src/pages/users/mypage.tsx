import { useRouter } from "next/router";
export default function MyPage() {
  const router = useRouter();
  return (
    <div>
      <h1>My Page</h1>
    </div>
  );
}
