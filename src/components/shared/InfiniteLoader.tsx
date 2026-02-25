import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface props {
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}

export default function InfiniteLoader(props: props) {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const { hasNextPage, fetchNextPage, isFetchingNextPage } = props;

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isFetchingNextPage)
    return (
      <div className="flex items-center justify-center py-4">
        <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );

  if (hasNextPage && !isFetchingNextPage)
    return (
      <div
        ref={ref}
        onClick={() => fetchNextPage()}
        className="h-2 w-full"
      ></div>
    );
}
