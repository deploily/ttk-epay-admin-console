import PayementDetails from "./components/payementDetails";

type Props = {
  params: { id: string };
};
export default function Page({ params: { id } }: Props) {
  return (
    <>
      <PayementDetails payementId={id} />
    </>
  );
}
