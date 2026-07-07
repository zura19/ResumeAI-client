interface props {
  children: React.ReactNode;
}

export default function BuildResumeTemplate({ children }: props) {
  return <div className="h-full w-full">{children}</div>;
}
