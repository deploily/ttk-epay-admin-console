import InvoiceDetails from "./components/invoiceDetails";

type Props = {
  params: { id: string };
};
export default function Page({ params: { id } }: Props) {
  return (
    <>
      <InvoiceDetails invoiceId={id} />
    </>
  );
}
