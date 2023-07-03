import { useRouter } from "next/router";

export default function CardInfoPage() {
  const router = useRouter();

  return <div>Page for card: {router.query.slug}</div>;
}
