import Link from "next/link";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  return (
    <>
      <h1>Page : {router.query.slug} </h1>
      <div>
        <button
          type="button"
          onClick={() =>
            router.push({ pathname: "/[slug]", query: { slug: "push" } })
          }
        >
          PUSH
        </button>
        <br />
        <button
          type="button"
          onClick={() =>
            router.replace({ pathname: "/[slug]", query: { slug: "push" } })
          }
        >
          REPLACE
        </button>

        <br />
        <button type="button" onClick={() => router.reload()}>
          RELOAD
        </button>

        <br />
        <Link href="/hello">HELLO</Link>

        <br />
        <Link href="/bye">BYE</Link>
      </div>
    </>
  );
}
