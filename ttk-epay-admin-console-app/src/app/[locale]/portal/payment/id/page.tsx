import PaymentDetails from "./components/paymentDetails";

type Props = {
  params: { id: number };
};
export default function Page({ params: { id } }: Props) {
  return (
    <>
      <PaymentDetails paymentId={id} />
    </>
  );
}
