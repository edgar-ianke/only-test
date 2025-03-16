import "./posts.scss";

interface Props {
  title: number;
  text: string;
}
export function Post({ title, text }: Props) {
  return (
    <div className="posts">
      <h3 className="posts__title">{title}</h3>
      <p className="posts__text">{text}</p>
    </div>
  );
}
