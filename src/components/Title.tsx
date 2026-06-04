type props = {
  text: string;
};

export default function Title({ text }: props) {
  return <h1 style={{ marginBottom: "15px", textAlign: "center" }}>{text}</h1>;
}
