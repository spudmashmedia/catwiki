export default function CountryFlag({ code }: { code: string }) {
  return <img src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.1/flags/1x1/${code.toLowerCase()}.svg`} width={32} />;
}
