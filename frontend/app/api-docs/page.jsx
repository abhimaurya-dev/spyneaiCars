"use cient";
import { useRouter } from "next/navigation";

export default function DocsPage() {
  const router = useRouter();
  return router.push(
    "https://documenter.getpostman.com/view/20868478/2sAYX2LiBd"
  );
}
