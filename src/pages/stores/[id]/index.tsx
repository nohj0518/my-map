import { useRouter } from "next/router";
export default function StoreDetail() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <h1>Store Detail id: {id}</h1>
    </div>
  );
}
