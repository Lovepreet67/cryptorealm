export interface ButtonProps {
  title: string;
  onClick(e: React.MouseEvent<HTMLElement>): void;
}
