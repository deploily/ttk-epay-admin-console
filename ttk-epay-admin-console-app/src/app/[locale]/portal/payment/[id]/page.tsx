import PaymentDetails from "./components/paymentDetails";

type Props = {
  params: { id: string };
};
export default function Page({ params: { id } }: Props) {
  return (
    <>
      <PaymentDetails paymentId={id} />
    </>
  );
}
