import ClaimDetails from "./components/claimDetails";

type Props = {
  params: { id: string };
};
export default function Page({ params: { id } }: Props) {
  return (
    <>
      <ClaimDetails claimId={id} />
    </>
  );
}
